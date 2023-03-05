/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-08-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-07-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track,api } from 'lwc';
import sumbitApp from '@salesforce/apex/EmployeeAppreciation.submitAppreciation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import apprList from '@salesforce/apex/EmployeeAppreciation.appreList';

const columns = [
    { label: 'Appreciation No', fieldName: 'Name',},
    { label: 'Appreciation Date', fieldName: 'Date__c', },
    { label: 'Appreciation From', fieldName: 'From__c'},
    { label: 'Project Name', fieldName: 'Project__c', },
    { label: 'Message', fieldName: 'Message__c', },
    
];
export default class Appreciation extends LightningElement {
    @api empid;
    EmpName;
    empRecId;
    columns =columns;
    //empid='DW11242';
    @track appDate = '';
    @track appfrom = '';
    @track projectName = '';
    @track appMassage = '';

    @track appreList=[];

    meetingSelection(event){  
        this.EmpName = event.detail.selectedValue;  
        this.empRecId = event.detail.selectedRecordId;  
        //console.log('con Id>>'+this.Meeting);
    } 
    appDateonchange(event) {
        this.appDate = event.target.value;
    }
    appfromonchange(event) {
        this.appfrom = event.target.value;
    }
    projectNameonchange(event) {
        this.projectName = event.target.value;
    }
    appMassageonchange(event) {
        this.appMassage = event.target.value;
    }

    connectedCallback(){
        apprList({empID:this.empid})
        .then(result=>{
            //console.log('result in List :: ', JSON.stringify(result));
            this.appreList=result;
            //console.log('app list :: ', this.appreList);
        })
        .catch(error=>{
            //console.log('error in List :: ', error);
            
        })
    }

    submitHandler() {
        if(this.empRecId==null||this.empRecId==''||this.empRecId==undefined||
        this.appDate==null||this.appDate==''||this.appDate==undefined||
        this.appfrom==null||this.appfrom==''||this.appfrom==undefined||
        this.appMassage==null||this.appMassage==''||this.appMassage==undefined||
        this.projectName==null||this.projectName==''||this.projectName==undefined){
            const event = new ShowToastEvent({
                title: 'Required fields are missing.',
                message: 'Please fill all the required fields.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }else{
        sumbitApp({ memberId: this.empRecId, appDate: this.appDate, Appfrom: this.appfrom, appMassage: this.appMassage, projectName: this.projectName })
            .then(data => {
                //console.log('create Data : ', JSON.stringify(data));
                //console.log('created successfully ');
                const event1 = new ShowToastEvent({
                    title: 'Employee Appreication',
                    message: 'Appreication has been submitted succesfully for '+this.EmpName,
                    variant: 'success'
                });
                this.dispatchEvent(event1);
                this.valueblack();
                eval("$A.get('e.force:refreshView').fire();");

            })
            .catch(error => {
                //console.log('create Error : ', JSON.stringify(error));
            })
        }
    }
    valueblack(){       
       this.appDate = '';
       this.appfrom = '';
       this.projectName = '';
       this.appMassage = '';
    }

}