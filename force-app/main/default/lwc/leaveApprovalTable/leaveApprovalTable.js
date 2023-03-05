import { LightningElement, track, wire,api 
} from 'lwc';

import getLeave from '@salesforce/apex/LeaveHistoryController.getLeaveDetails';
import Leaveupdate from '@salesforce/apex/LeavePortal.updateLeave';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference , NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Leave ID', fieldName: 'Name', type: 'URL' },
    { label: 'Leave From', fieldName: 'From__c', type: 'Date' },
    { label: 'Leave Till', fieldName: 'Till__c', type: 'Date' },
    { label: 'Type of Leave', fieldName: 'Type_of_Leave__c', type: 'Picklist' },
    { label: 'Half Day', fieldName: 'Half_Day__c', type: 'Boolean' },

    {
        type: "button",
        fixedWidth: 100,
        typeAttributes: {
            disabled: {fieldName: 'isApproved'},
            label: 'Approve',
            name: 'Approve',
            variant: 'Success',

        }
    },
    {
        type: "button",
        fixedWidth: 100,
        typeAttributes: {
            disabled: {fieldName: 'isRejected'},
            label: 'Reject',
            name: 'Reject',
            variant: 'Neutral',

        }
    }
];
export default class leaveApprovalTable extends LightningElement {
    //@track empId = '0031s00000nuB2VAAU';
     empid;
    @track LeaveList;
    @track leaveRecords = [];
    fldsItemValues = [];
    @track approve = false;
    @track reject = false;
    @track updateRecord;
    columns = columns;
    @track empployeeId = this.empid;
    @track savedata;
    @track errorMsg;
    

    @wire(CurrentPageReference)
        setCurrentPageReference(currentPageReference) {
            this.empid = currentPageReference.state.c__empId;
            //console.log(' Cart Id => ', this.empid);
        }

    connectedCallback() {
        //console.log('inside cb LT::' + this.empid);
        getLeave({ empId: this.empid})
            .then(result => {
                this.LeaveList = result;
                // console.log(this.LeaveList[0]);
            })
            .catch(error => {
                //console.log('check error::' + error);
                //console.log('check error::' + error.message);
                //this.errorMsg=error.message;
            });

    }

    onRowUpdate(event) {
        const recordId = event.detail.row;
        //console.log('rec Id >>', recordId.Id);

        const action = event.detail.action;
        //console.log('action >>', action.name);
        if (action.name == 'Approve') {
            this.approve = true;
            this.reject = false;
            // let rec = this.LeaveList.filter(re => {re.Id ==recordId.Id});
            // console.log('is Approved'+ rec.isApproved);
            // console.log('rec', rec);
            // rec.isApproved = true;
            // console.log('is Approved', rec.isApproved);
            // rec.isRejected = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Approved',
                message: 'Leave is Approved',
                variant: 'success'
            }));
            this.refreshApex(this.LeaveList);
        }
        else {
            this.reject = true;
            this.approve = false;
            
            this.dispatchEvent(new ShowToastEvent({
                title: 'Rejected',
                message: 'Leave is Rejected',
                variant: 'failure'
            }));
            this.refreshApex(this.LeaveList);

        }
        //console.log('appr', this.approve);
        //console.log('rej', this.reject);

        Leaveupdate({ Approve: this.approve, Reject: this.reject, leaveId: recordId.Id })
            .then(result => {
                //console.log('appr scpr => ', this.approve);
                //console.log('appr apx => ', this.Approve);
            }).catch(error => {
                this.errorMsg = error.message;
                //console.log('err msgs>>>' + this.errorMsg);
                //console.log('error ' + this.error);
            });
    }

}