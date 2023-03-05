import { LightningElement, track, api } from 'lwc';
import createActionItem from '@salesforce/apex/ticketManagement.createActionItem';
import getTickets from '@salesforce/apex/ticketManagement.getTickets';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
		{ label: 'Assigned To', fieldName: 'Assigned_To__c' },
		{ label: 'Status', fieldName: 'Status__c'  },
		{ label: 'Comments', fieldName: 'Comments__c'},
		{ label: 'Ticket Type', fieldName: 'Ticket_Type__c' },
		{ label: 'Ticket SubType', fieldName: 'Ticket_SubType__c'  },
		{ label: 'Description', fieldName: 'Description__c'}
];
export default class ticketManagement extends LightningElement {
		columns=columns;
		@api empId;
		@api emName;
		@track idss='DW11242';
		@track ticType;
		@track ticSubType;
		@track ticDesc;
		@track actionItems;
		@track employeeIds = this.empId;
		@track showaction;
		@track ticketName;
		listOfTickets;
		@track isModal;
		@api empName;

		/*PreviouspageHandler(){
				this.showaction=true;
		}*/
		createNewRecord(){
				this.isModal=true;
				this.showaction=false;
		}
		closeModal(){
        this.isModal=false;
				this.showaction=false;
				this.connectedCallback();
    }
		ticketType(event) {
				this.ticType = event.target.value;
				//console.log('ticType::' + this.ticType);
		}
		ticketSubType(event) {
				this.ticSubType = event.target.value;
				//console.log('ticSubType::' + this.ticSubType);
		}
		Desc(event) {
				this.ticDesc = event.target.value;
				//console.log('ticDesc::' + this.ticDesc);
		}

		connectedCallback(){
				//console.log('emp ID::', this.empId);
				getTickets({empId: this.empId})
				.then(result => {
						this.listOfTickets = result;
				})
				.catch(error => {
						//console.log(error);
				});
		}

		handleSubmit() {
				//console.log('inside cb LT child ::' + this.empId);
				if(this.ticType==null||this.ticType==''||this.ticType==undefined
				||this.ticDesc==null||this.ticDesc==''||this.ticDesc==undefined){
					const event1 = new ShowToastEvent({
						title: 'Required fields are missing.',
						message: 'Please fill all the required fields.',
						variant: 'error'
				});
				this.dispatchEvent(event1);
				}
				else{
				createActionItem({ empId: this.empId, tickType: this.ticType, tickSubType: this.ticSubType, tickDesc: this.ticDesc })
						.then(result => {
						this.ticketName = result;
						this.showaction = false;
						//console.log('successfully inserted::');
						const event = new ShowToastEvent({
                    title: 'Ticket Created',
                    message: 'Ticket was created Successfully',
                    variant: 'success'
            });
            this.dispatchEvent(event);
						 this.isModal=false;
						this.showModelmain=false;
						this.showaction=true;
				})
						.catch(error => {
						//console.log(error);
				});
			}

		}
}