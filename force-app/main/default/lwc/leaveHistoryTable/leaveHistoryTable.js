import { LightningElement,wire,track ,api} from 'lwc';
import getLeave from '@salesforce/apex/LeaveHistoryController.getLeaveDetails';

import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Leave ID', fieldName: 'Name',type: 'URL', fixedWidth: 150},
    { label: 'Leave From', fieldName: 'From__c', type: 'Date', fixedWidth: 125 },
    { label: 'Leave Till', fieldName: 'Till__c', type: 'Date', fixedWidth: 125 },
    { label: 'Leave Type', fieldName: 'Type_of_Leave__c', type: 'String' },
    { label: 'Manager Approval Status', fieldName: 'Manager_Approval_Status__c' },
    //{ label: 'Status', fieldName: 'Status__c', type: 'String' }
];

export default class LeaveHistoryTable extends LightningElement {
    //@track empId =  '0031s00000gG9tBAAS';
    @api empid;
    @track LeaveList;
    @track leaveRecords=[];
    columns = columns;
    @track empployeeId=this.empid;
    
    /*@wire(getLeave,{empId:'$empployeeId'}) wiredLeave({data,error}){
        this.leaveRecords=data;
        if (data) {
            this.LeaveList = data;
            console.log(data); 
        } 
        else if (error) {
            console.log(error);
        }
    };*/

    connectedCallback(){
        //console.log('inside cb LT::'+this.empid);
        getLeave({empId:this.empid})
        .then(result=>{
            this.LeaveList=result;
            //return refreshApex(this.LeaveList);
        })
        .catch(error =>{
            //console.log('check error::'+error);
            //console.log('check error::'+error.message);
            //this.errorMsg=error.message;
        });
    }

    @api
    handleRefresh(){
        //console.log('inside leave history');
        this.LeaveList=[];
        //return refreshApex(this.LeaveList);
        getLeave({empId:this.empid})
        .then(result=>{
            this.LeaveList=result;
            //return refreshApex(this.LeaveList);
        })
        .catch(error =>{
            //console.log('check error::'+error);
            //console.log('check error::'+error.message);
            //this.errorMsg=error.message;
        });
        
    }
}