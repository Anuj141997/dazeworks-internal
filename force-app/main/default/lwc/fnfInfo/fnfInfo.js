import { LightningElement,api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fnfitem from '@salesforce/apex/FnfInfo.fnfitem';
import { refreshApex } from '@salesforce/apex';
import delSelectedItems from '@salesforce/apex/FnfInfo.deleteItems';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [ 
    { label: 'Edit', name: 'edit'}, 
    { label: 'Delete', name: 'delete'},
];
const columns =[
    { label: 'Month', fieldName: 'Month__c',type:'text'},
    { label: 'Year', fieldName: 'Year__c', type:'Number'},
    { label: 'Amount', fieldName: 'Amount__c',type:'text'},
    { label: 'Comment', fieldName: 'Comments__c', type:'Text'},
    { label: 'Type', fieldName: 'Type__c', type:'Text'},
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        },
    },     
];


export default class FnfInfo extends NavigationMixin(LightningElement) {

    @wire (fnfitem) wireTask;
    @track data;
    @track currentRecordId;
    @track errorMsg;
    @track columns = columns;
    @track open = false;
    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;
    // retrieving the data using wire service
    @wire(fnfitem)
    tasks(result) {
        this.refreshTable = result;
        if (result.data) {
            console.log('selecteddata# ' + JSON.stringify(result));
            this.data = result.data;
            console.log('actualdata# ' + JSON.stringify(this.data));
            this.error = undefined;
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
                        objectApiName: 'FNF_Line_Items__c',
                        actionName: 'edit'
                    }                    
                }); 
                refreshApex(this.refreshTable);             
                break;
            case 'delete':
                this.deletefnfitems(row);
                break;
                default:
            }
          }
          catch(err) {
            console.log('hi'+ err.message);           
          }    
    } 

    deletefnfitems(currentRow) {
        let currentRecord = [];
        currentRecord.push(currentRow.Id);
        // calling apex class method to delete the selected contact
        delSelectedItems({lstItemIds: currentRecord})
        .then(result => {
            window.console.log('result ====> ' + result);
            // showing success message
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Item deleted',
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

}