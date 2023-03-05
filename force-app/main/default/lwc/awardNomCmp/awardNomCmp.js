import { LightningElement,track,api,wire } from 'lwc';
import getContact from '@salesforce/apex/PerformanceController.getContacts';
import createPerformance from '@salesforce/apex/PerformanceController.createPerformance';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import performanceObj from '@salesforce/schema/Performance__c';
import { ShowToastEvent } from "lightning/platformShowToastEvent";


import PerformanceLogin from '@salesforce/label/c.awardNomination';
import Employee from '@salesforce/label/c.Employee';
import Manager from '@salesforce/label/c.Manager';

import AwardType from '@salesforce/label/c.AwardType';
import NominatedBy from '@salesforce/label/c.NominatedBy';
import JustificationPoints from '@salesforce/label/c.JustificationPoints';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

export default class AwardNomCmp extends LightningElement {

    @track items=[];
    @track empValue;
   // @track objectInfo;
    recordTypeId;

    @api empid;
   @track label=
    {
        PerformanceLogin,Employee,Manager,AwardType,NominatedBy,JustificationPoints
    }

    @track saveData=
        {
            Employee__c:'',Manager__c:'',Award_Type__c:'',Period__c:'',
            Nominated_By__c:'',Justification_Points__c:'',RecordTypeId:''
        }


  
   
    @wire(getObjectInfo, { objectApiName: performanceObj })
    accObjectInfo({data, error}) {
            if(data) {    
                    const rtInfos = data.recordTypeInfos;
                    let rtValues = Object.values(rtInfos);
                    //console.log('rtValues :>> ', rtValues);
                    for(let i = 0; i < rtValues.length; i++) {
                       
                        if(rtValues[i].name == 'Award Nomination') 
                        {
                            this.saveData.RecordTypeId=rtValues[i].recordTypeId
                          
                        }
                    }
            }  
            else if(error) 
            {
                this.error=error;
            }
        }

    get managerValue()
    {
        this.saveData.Manager__c = this.empid;
        return this.empid;
    }
    get nominatedValue()
    {
        this.saveData.Nominated_By__c = this.empid;

        return this.empid;
    }

    handleValueChange(e)
    {
        this.saveData[e.target.name] = e.target.value;
    }
    handleManagerValue(e)
    {
        let managerId = JSON.parse(JSON.stringify(e.detail));
        
        this.saveData.Manager__c = managerId[0];
    }
    handleNominatedValue(e)
    {
        let nominatedId = JSON.parse(JSON.stringify(e.detail));
        
        this.saveData.Nominated_By__c = nominatedId[0];
    }
  

    @wire(getContact)wiredgetContact({ error, data }) {
        if (data) {
         
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label: data[i].Name + " - " + data[i].Employee_ID__c}];
            }
          
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
    }

    handleText(e)
    {
        //console.log('text :>> ', e.target.value);
    }


    handleSave()
    {
        this.isLoading = true;
      
        const allValid = [...this.template.querySelectorAll("lightning-input")].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        const allCBValid = [...this.template.querySelectorAll("lightning-combobox")].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        const allTextValid = [...this.template.querySelectorAll("lightning-textarea")].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if ( allValid && allCBValid && allTextValid) {
       this.savePerformance();

        }
        else {
            this.isLoading = false;
            this.displayMessage("Please check your entries.", "error", "You may have missed a required field.");
        }
        
    }

    savePerformance()
    {
      
        //console.log('this.saveData :>> ', this.saveData);
        this.saveData.Created_By_Contact__c = this.empid;
        this.saveData.Last_Modified_By__c = this.empid;
        createPerformance({per:JSON.stringify(this.saveData)})
        .then(res=>
            {
               // alert('Created');
                this.displayMessage("Success", "success", "Record Created Succesfully");
                this.handleBack();
            })
        .catch(error=>
            {
            //console.log('error :>> ', error);
            this.error= error.body.pageErrors[0].message;
                this.displayMessage('error', 'error', this.error);
            })
    }

    handleBack()
    {
        const backEvent= new CustomEvent('backevent', {
               
        });
        //dispatching the custom event
        this.dispatchEvent(backEvent);
    }

    displayMessage(title, type, message) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: type,
            mode: 'dismissable'
        }));
    }
    /*Added By Somya*/
    dependentDisabled=true;
    periodDependentPicklist =[];
    awardControllingPicklist =[];
    finalPeriodDependentVal = [];
   
    @wire(getPicklistValuesByRecordType, { objectApiName: performanceObj, recordTypeId: '$saveData.RecordTypeId' })
    fetchPicklist({error,data}){        
        if(data && data.picklistFieldValues){            
            data.picklistFieldValues["Award_Type__c"].values.forEach(optionData => {
                this.awardControllingPicklist= [...this.awardControllingPicklist,{label : optionData.label, value : optionData.value}];
            });
            this.periodDependentPicklist = data.picklistFieldValues["Period__c"];            
        }
    }
    fetchDependentValue(event){
        this.finalPeriodDependentVal=[];
        const selectedVal =  event.detail.value;
       this.saveData.Award_Type__c = selectedVal;
        let controllerValues = this.periodDependentPicklist.controllerValues;        
        this.periodDependentPicklist.values.forEach(depVal => {
            depVal.validFor.forEach(depKey =>{
                if(depKey === controllerValues[selectedVal]){
                    this.dependentDisabled = false;
                    this.finalPeriodDependentVal= [...this.finalPeriodDependentVal,{label : depVal.label, value : depVal.value}];
                }
            });             
        });
    }
    /*Added By Somya*/
}