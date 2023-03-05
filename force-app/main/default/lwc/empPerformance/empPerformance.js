/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 11-17-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-29-2022   Shivam Kumar   Initial Version
**/
import { LightningElement,wire,api, track } from 'lwc';
import getPerformanceData from '@salesforce/apex/EmpPerformanceController.getPerformanceData';
import getPerformanceData2 from '@salesforce/apex/PerformanceLeaveListViewController.getAllPerformance';
import SESSION from '@salesforce/schema/Performance__c.Session__c';
import empPerformRecordId from '@salesforce/label/c.empPerformRecordId';
import performanceObj from '@salesforce/schema/Performance__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import sessionValueLabel from '@salesforce/label/c.Session';
const actions = [
    { label: 'View', name: 'View' },
    { label: 'Edit', name: 'Edit' }
]; 

const columns = [
    { label: 'Employee Name', fieldName: 'Employee__r.Name' },
    { label: 'Employee Manager', fieldName: 'Manager__r.Name'  },
    { label: 'Approved', fieldName: 'Approved__c'},

    {
            label: 'Action',
            type: 'action',
            typeAttributes: { rowActions: actions, menuAlignment: 'slds-popover__body' } 
    },
];

const columns2=[
    {label:'Employee Name', fieldName:'Employee__r.Name', },
    { label: 'Employee Manager', fieldName: 'Manager__r.Name'  },
    { label: 'Rating By Manager', fieldName: 'Employee_Rating_by_Manager__c'},
    { label: 'Over Summery By Manager', fieldName: 'Overall_Summery_By_Manager__c'},
    { label: 'Final Rating By Manager', fieldName: 'Final_Performance_Rating__c'},
    {
            label: 'Action',
            type: "button-icon",
            fixedWidth: 100,
            typeAttributes: {
                    iconName: 'action:edit',
                    disabled: { fieldName: 'isEdit' },
                    label: 'Edit',
                    name: 'Edit',
                    variant: 'Success',
                    title:'Edit',

            } 
    },
]

export default class EmpPerformance extends LightningElement {

    noticeMessage='Please Select Session!!';
    //   empPerformRecordId;

    columns2 = columns2;
    data2=[];
    recId;
    isModal=false;
    @api employeeid;
    @api empIds;
    perHomePage=true;
    listViewPage=false;
    @api sesValue;
    data = [];
    columns = columns;
    sessionValue = sessionValueLabel;
    error = '';
    isDataAvailable = false;
    isAllDataAvailable = false;
    isSessionOptionAvailable = false; 
    sessionOptions = [];
    pick;
    loading = false;
    getPerformanceDataList2;
    permisOnchange = false;


    listViewHandler(){
            this.perHomePage=false;
            this.listViewPage=true;
    }

    handleBack()
    {
            this.perHomePage=true;
            this.listViewPage=false;
    }

    onRowUpdate(event){
            this.loading = true;
            const recordId = event.detail.row;
            //console.log('rec Id >>', JSON.parse(JSON.stringify(recordId)));
            //console.log('rec Id >>', JSON.parse(JSON.stringify(recordId.Id)));
            this.recId = recordId.Id;
            const action = event.detail.action;
            if(action.name=='Edit'){
                    this.isModal=true;
            }

            this.loading = false;
    }
    handleSuccess(){

        this.loading = true;
            const event = new ShowToastEvent({
                    title: 'Performance Updated',
                    message: 'Performance was Updated Successfully',
                    variant: 'success'
            });
            this.dispatchEvent(event);
           
            this.isModal=false;
            this.getAllPerformanceData();
            this.loading = false;          
    }

    closeModal(){
            this.isModal=false;
    }
  

    @wire(getObjectInfo, { objectApiName: performanceObj })
    objectInfo({data, error}) {
            if(data) {    
                    const rtInfos = data.recordTypeInfos;
                    let rtValues = Object.values(rtInfos);
                    for(let i = 0; i < rtValues.length; i++) {
                            if(rtValues[i].name === 'Employee Performance Management') 
                            {
                                    this.pick = rtValues[i].recordTypeId;
                            }                            

                    }
            }  
            else if(error) 
            {
                    this.error=error;
            }
    }

    connectedCallback()
    {
             if(this.sessionValue)
             {
                
                this.getPerformance();
               
             }
             if(this.empIds=='DW1159' || this.empIds == 'dw1159' || this.empIds=='DW11206' || this.empIds=='dw11206') { //|| this.empIds=='DW11206' || this.empIds=='dw11206')
                this.permisOnchange=true;
                this.getAllPerformanceData();
             }
             else {
                this.permisOnchange=false;
                
             }
          
    }

   
    getAllPerformanceData()
    {
        getPerformanceData2({sessionType: this.sessionValue})
        .then(result =>{

        this.getPerformanceDataList2= this.data =  result.map(
                record => Object.assign(
                        { "Employee__r.Name": record.Employee__r.Name,
                            "Manager__r.Name": record.Manager__r.Name
                        },record));
        if(this.getPerformanceDataList2.length > 0){
                this.isAllDataAvailable = true;
                this.noticeMessage ='';
        }else{
                this.isAllDataAvailable = false;
                this.noticeMessage = 'No Record Found!!';
        }

        //console.log('AllPerformancedata::',this.getPerformanceDataList2);
            })
        .catch(error => {
        //console.log('check error::' + error);
        //console.log('check error::' + error.message);
        this.isAllDataAvailable = false;
        //this.errorMsg=error.message;
            });
    }

    @wire(getPicklistValues, { recordTypeId: "$pick", fieldApiName: SESSION })
    sessionField({data,error})
    {
            if (data) {
                    for(const list of data.values){
                            const option = {
                                    label: list.label,
                                    value: list.value
                            };
                            this.sessionOptions = [ ...this.sessionOptions, option ];
                    }
                    this.isSessionOptionAvailable = true;
                    this.error = undefined;
            } else if (error) {
                    this.error = error;            
            }
    };

    


    getPerformance()
    {
        getPerformanceData({sessionType:this.sessionValue, employeeId:this.employeeid})
        .then(result => {
        //console.log('this.data'+this.result);
        this.data =  result.map(
                record => Object.assign(
                        { "Employee__r.Name": record.Employee__r.Name,
                            "Manager__r.Name": record.Manager__r.Name
                        },record));  
        if(this.data.length > 0){
                this.isDataAvailable = true;
                this.noticeMessage ='';
        }else{
                this.isDataAvailable = false;
                this.noticeMessage = 'No Record Found!!';
        }
            })
        .catch(error => {
        // console.log('this.error'+JSON.stringify(error));
        this.error = error;
        this.isDataAvailable = false;
            });
    }

    handleSessionChange(event){
            this.loading = true;
            this.sessionValue = event.detail.value;
            //console.log('this.sessionValue'+this.sessionValue);
            this.getPerformance();
            if(this.permisOnchange)
            {
                this.getAllPerformanceData();
            }
           
            this.loading = false;
          
    }

    handleRowAction(event) {
            const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                    case 'View':
                          
                            const pEvent = new CustomEvent('view',
                                                                                            {
                                    detail:
                                    {
                                            recid:row.Id
                                    }
                            });
                            this.dispatchEvent(pEvent);
                            break;
                    case 'Edit':

                            const pEvent2 = new CustomEvent('edit',
                                                                                            {
                                    detail:
                                    {
                                            recid:row.Id
                                    }
                            });
                            this.dispatchEvent(pEvent2);

                            break;
            }
    }

    createNewRecord(e)
    {
            const pEvent = new CustomEvent('new');
            this.dispatchEvent(pEvent);
    } 


    handleCancel(e)
    {
            const backEvent= new CustomEvent('backevent', {

            });
            //dispatching the custom event
            this.dispatchEvent(backEvent);
    }
}