import { LightningElement, api, track} from 'lwc';
import getTasks from '@salesforce/apex/actionItemTracker.getTasks';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class actionItemTracker extends NavigationMixin(LightningElement) {

    @api recordId;
    isloading;
    @track taskList;
    renderTable = false;

    connectedCallback() {
        this.isLoading = true;
        getTasks()
            .then(result => {
                this.taskList = result;
                console.log(JSON.stringify(result));
                if (this.taskList.length === 0) {
                    this.renderTable = false;
                }
                else {
                    this.renderTable = true;
                }
            })
            this.isLoading = false;
    }

    //To navigate to record edit page for selected record
    navigateToRecordEditPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recid,
                objectApiName: 'Task',
                actionName: 'edit'
            }
        });
    }

    //To delete the selected contact
    deleteTasks(event) {
        this.isLoading = true;
        deleteRecord(event.currentTarget.dataset.recid)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is Deleted',
                        variant: 'success',
                    }),
                );
                this.connectedCallback();
                this.isLoading = false;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    }),
                );
                this.connectedCallback();
                this.isLoading = false;
            });
    }

     // To navigate to task new functionality aura component
     
     navigateToNewPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Task',
                actionName: 'new'
            }
            
        });
    }

     
}