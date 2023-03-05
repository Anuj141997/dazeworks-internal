import { LightningElement, wire,api, track } from 'lwc';
import fetchTaskRecord from '@salesforce/apex/TaskTracker.fetchTaskRecord';
import updateMultipleTaskRecord from '@salesforce/apex/TaskTracker.updateMultipleTaskRecord';
import delSelectedTasks from '@salesforce/apex/TaskTracker.deleteTasks';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// row actions
const actions = [ 
    { label: 'Edit', name: 'edit'}, 
    { label: 'Delete', name: 'delete'},
];
const columns =[
   // { label: 'Case Number', fieldName: 'CaseNumber',type:'text'},
    { label: 'Action Item Name', fieldName: 'Subject', type:'text'},
    { label: 'Description', fieldName: 'Description',type:'text'},
    { label: 'Steps To Be Taken', fieldName: 'Steps_to_be_taken__c',type:'Text'},
    { label: 'Type', fieldName: 'Type',type:'text'},
    { label: 'Assigned To', fieldName: 'OwnerName',type:'lookup'},
    { label: 'Asked By', fieldName: 'AssignedBy',type:'lookup'},
    { label: 'Due Date', fieldName: 'Due_Date__c',type:'text'},
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        },
    },     
];
export default class TaskTracker extends NavigationMixin( LightningElement ) {
    @wire (fetchTaskRecord) wireTask;
    @track data;
    @track currentRecordId;
    @api selectedTaskIdList=[];
    @track errorMsg;
    @track columns = columns;
    @track open = false;
    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;
    // retrieving the data using wire service
    @wire(fetchTaskRecord)
    tasks(result) {
        this.refreshTable = result;
        if (result.data) {
            console.log('selecteddata# ' + JSON.stringify(result));
            this.data = result.data.map(row=>{
                return{...row, OwnerName: (row.Assigned_To__r) ? row.Assigned_To__r.Name :'-', AssignedBy: (row.Contact) ? row.Contact.Name : '-'}
            });
            console.log('actualdata# ' + JSON.stringify(this.data));
            this.error = undefined;
        }
    }
    getSelectedIdAction(event){
        this.selectedTaskIdList = [];
        const selectedTaskRows = event.detail.selectedRows;
        console.log('selectedTaskRows# ' + JSON.stringify(selectedTaskRows));
        this.selectedTaskRows=[];
        
        for (let i = 0; i<selectedTaskRows.length; i++){
            this.selectedTaskIdList.push(selectedTaskRows[i].Id);
        }
       // window.console.log('selectedTaskRows1 ' + this.selectedTaskRows + selectedTaskRows.length );
    }
    navigateToNewPage(){

    if(!this.open)
    {
        this.open=true;
    }
    }

    handleRowAction(event) {
        try {
                
        const actionName = event.detail.action.name;
        console.log('actionName ====> ' + actionName);
        const row = event.detail.row;
        console.log('row ====> ' + row);
        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Case',
                        actionName: 'edit'
                    }                    
                }); 
                refreshApex(this.refreshTable);             
                break;
            case 'delete':
                this.deleteTasks(row);
                break;
                default:
            }
          }
          catch(err) {
            console.log('hi'+ err.message);           
          }    
    } 
    updateTaskRowAction(){
        updateMultipleTaskRecord({taskObj:this.selectedTaskIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedTaskRows=[];
 
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record Updated successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);
 
            return refreshApex(this.wireTask);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to update the record due to ' + JSON.stringify(this.errorMsg));
        });
      
    }
    deleteTasks(currentRow) {
        let currentRecord = [];
        currentRecord.push(currentRow.Id);
        // calling apex class method to delete the selected contact
        delSelectedTasks({lstTaskIds: currentRecord})
        .then(result => {
            window.console.log('result ====> ' + result);
            // showing success message
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'task deleted',
                variant: 'success'
            }),);
            // refreshing table data using refresh apex
             return refreshApex(this.refreshTable);
        })
        .catch(error => {
            window.console.log('Error ====> '+error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!', 
                message: error.message, 
                variant: 'error'
            }),);
        });		
	}

    redirect = false;
    resetpage = false;

    handleSuccess(event) {
        const even = new ShowToastEvent({
            title: 'Success!',
            message: 'Action Item created!',
            variant: 'success'
        });
        refreshApex(this.refreshTable);
        this.dispatchEvent(even);
        if(this.redirect == true){
            console.log('handleSuccess'+this.redirect);
            let creditnoteId = event.detail.id;
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId:creditnoteId,
                    objectApiName:'Case',
                    actionName:'view'
                }
            })
        }
        if(this.resetpage== true){
            this.handleReset();
        }
    }

    handleError(event){
        const evt = new ShowToastEvent({
            title: 'Error!',
            message: event.detail.detail,
            variant: 'error',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }

    saveAndNewClick() {
        this.redirect = false;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.resetpage = true;
    }
    save() {
        this.redirect = false;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.resetpage = true;
        this.open=false;
    }
    
    handleReset() {
       const inputFields = this.template.querySelectorAll(
           'lightning-input-field'
       );
       if (inputFields) {
           inputFields.forEach(field => {
               field.reset();
           });
       }
    }
    
    handleCancel(){
        this.open=false;
    }
}