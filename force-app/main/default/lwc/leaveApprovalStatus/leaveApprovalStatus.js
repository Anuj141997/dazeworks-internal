import { LightningElement,wire,track ,api} from 'lwc';
import getLeave from '@salesforce/apex/LeaveHistoryController.getLeaveDetails';

import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Leave ID', fieldName: 'Name',type: 'URL'},
    { label: 'Leave From', fieldName: 'From__c', type: 'Date' },
    { label: 'Leave Till', fieldName: 'Till__c', type: 'Date' },
    { label: 'Leave of Type', fieldName: 'Type_of_Leave__c', type: 'String' },
    { label: 'Half Day', fieldName: 'Half_Day__c', type: 'Boolean' },
    { label: 'Leave Type', fieldName: 'Leave Type', type: 'picklist' },
    { lable : 'Manager Approval Status', fieldName:'Manager_Approval_Status__c',type:'Picklist'},
    {
            type:"button",
            fixedWidth: 150,
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                variant: 'brand'
            }
    },     
];

export default class leaveApprovalStatus extends LightningElement {
    //@track empId =  '0031s00000gG9tBAAS';
    @api empid;
    @track LeaveList;
    @track leaveRecords=[];
    columns = columns;
    @track empployeeId=this.empid;
    @track empName;
    @track from;
    @track till;
    @track halfday;
    @track leavetype;
    @track typeofLeave;
    @track managerStatus;
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
            this.empName=result[0].Name;
            this.from=result[0].From__c;
            this.till=result[0].Till__c;
            this.halfday=result[0].Half_Day__c;
            this.typeofLeave=result[0].Type_of_Leave__c;
            
            //console.log('list of leave>>>>'+this.LeaveList);
            //console.log('list of leave>>>>'+this.empName);
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