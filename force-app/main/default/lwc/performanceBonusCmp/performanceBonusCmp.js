import { LightningElement,track,api,wire } from 'lwc';
import getContact from '@salesforce/apex/PerformanceController.getContacts';
import createPerformance from '@salesforce/apex/PerformanceController.createPerformance';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import performanceObj from '@salesforce/schema/Performance__c';
import FINAL_FIELD from '@salesforce/schema/Performance__c.Final_Performance_Rating__c';
import { ShowToastEvent } from "lightning/platformShowToastEvent";


import PerformanceLogin1 from '@salesforce/label/c.traineeTacking';
import PerformanceLogin2 from '@salesforce/label/c.perfBonus';

import Employee from '@salesforce/label/c.Employee';
import Manager from '@salesforce/label/c.Manager';
import FromDate from '@salesforce/label/c.From';
import TillDate from '@salesforce/label/c.Till';
import Parameters from '@salesforce/label/c.Parameter';
import Review from '@salesforce/label/c.Review';
import AreaofStrength from '@salesforce/label/c.AreaofStrength';
import OperationalExcellence from '@salesforce/label/c.Operational_Excellence';
import Achievement from '@salesforce/label/c.Achievement';
import AreaofImprovement from '@salesforce/label/c.AreaofImprovement';
import PerformanceRating from '@salesforce/label/c.Final_Performance_Rating';
import OverallSummarybyManager from '@salesforce/label/c.Overall_Summary_By_Manager';

export default class PerformanceBonusCmp extends LightningElement {

    @track items=[];
    @track finalTypes=[];
    
    @api type='tpt'; 
   
    Header;
    pick;
    @api empid;
    @track label=
    {
       Employee,Manager,FromDate,TillDate,Parameters,Review,AreaofImprovement,AreaofStrength,
        OperationalExcellence,Achievement,PerformanceRating,OverallSummarybyManager
    }

    @track bonusData=
    {
        Employee__c:'',Manager__c:'',Review_Date_From__c:'',Review_Date_Till__c:'', Area_of_strength__c:'',
        Operational_Excellence_Manager__c:'',Achievement__c:'',Area_of_improvement__c:'',Final_Performance_Rating__c:'',
        Overall_Summery_By_Manager__c:''
    }

    @wire(getObjectInfo, { objectApiName: performanceObj })
    objectInfo({data, error}) {
            if(data) {    
                    const rtInfos = data.recordTypeInfos;
                    let rtValues = Object.values(rtInfos);
                    for(let i = 0; i < rtValues.length; i++) {
                       
                        if(this.type === 'pbt')
                        {
                            if(rtValues[i].name == 'Performance Bonus Tracking') 
                            {
                                this.bonusData.RecordTypeId=rtValues[i].recordTypeId
                                this.pick = rtValues[i].recordTypeId
                                //console.log('recType :>> ', this.bonusData.RecordTypeId);
                              
                            }
                        }

                        if(this.type === 'tpt')
                        {
                            if(rtValues[i].name == 'Trainee Performance Tracking') 
                            {
                                this.bonusData.RecordTypeId=rtValues[i].recordTypeId
                                this.pick = rtValues[i].recordTypeId
                                //console.log('recType :>> ', this.bonusData.RecordTypeId);

                            }
                        }
                        
                       
                    }
            }  
            else if(error) 
            {
                this.error=error;
            }
        }


  
    @wire(getPicklistValues, { recordTypeId: '$pick' , fieldApiName: FINAL_FIELD })
    finalField({data,error})
    {
       this.finalTypes=undefined
       if(data)
       {
           this.finalTypes=data.values
        
       }
       else if (error) {
           this.error = error;            
       }
    }

    get managerValue()
    {
        this.bonusData.Manager__c = this.empid;
        return this.empid;
    }

    connectedCallback()
    {
        if(this.type == 'pbt')
        {
            this.Header = PerformanceLogin2;
        }
        else if(this.type == 'tpt')
        {
            this.Header = PerformanceLogin1;
        }
    }

   
    handleValueChange(e)
    {
        this.bonusData[e.target.name] = e.target.value;
    }
    handleManagerValue(e)
    {
        let managerId = JSON.parse(JSON.stringify(e.detail));
        
        this.bonusData.Manager__c = managerId[0];
    }
   

    
   
    @wire(getContact)wiredgetContact({ error, data }) {
        if (data) {
            //console.log('data',data)
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label: data[i].Name + " - " + data[i].Employee_ID__c}];
            }
            //console.log('this.items 2 ' + JSON.stringify(this.items));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
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
      
        //console.log('this.saveData :>> ', this.bonusData);
        this.bonusData.Created_By_Contact__c = this.empid;
        this.bonusData.Last_Modified_By__c = this.empid;

        createPerformance({per:JSON.stringify(this.bonusData)})
        .then(res=>
            {
                this.displayMessage("Success", "success", "Record Created Succesfully");
                this.handleBack();
            })
        .catch(error=>
            {
                //console.log('error :>> ', error);
                this.displayMessage('error', 'error', error.body.message);
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
}