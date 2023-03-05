/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 07-06-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-27-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track,wire,api } from 'lwc';
import pickListValueDynamically from '@salesforce/apex/createEmployeeFeedback.pickListValueDynamically';
import submiteFeedback from '@salesforce/apex/createEmployeeFeedback.submitfeedback';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EmployeeFeedback extends LightningElement {
		@track contactName;  

		@track contactRecordId; 
		@api recId;
		@api empId;
		@api empName;
		@track MeetngName;  
		@track Meeting;
		@track picklistVal;
		feedback='';
		date='';
		showaction=false;
		feedpage=true;

		PreviouspageHandler(){
				this.showaction=false;
				this.feedpage=true;
		}

		feedbackONCH(event){
				this.feedback=event.target.value;
		}
		dateONCH(event){
				this.date=event.target.value;
		}

		connectedCallback(){
			//console.log('con Id>>'+this.recId);
	}

		submitefeed(){
				const event = new ShowToastEvent({
						title: 'Feedback Sumitted',
						message: 'Successfully',
						variant: 'success'
				});
				if(!this.recId || !this.Meeting || !this.feedback ){
						const evt = new ShowToastEvent({
								title: 'Error',
								message: 'Please fill all the required fields!',
								variant: 'error',
								mode: 'dismissable'
						});
						this.dispatchEvent(evt);
						return false;
				}

				submiteFeedback({
						feedback:this.feedback,
						meetRecId:this.Meeting,
						resource:this.recId,
						dateOffeedback:this.date,
						rating:this.picklistVal
				}).then(result=>{
						this.message='record created successfully';
						//console.log('Message>>>>'+this.message);
						this.dispatchEvent(event);
						this.showaction=true;
						this.feedpage=false;
				})
						.catch(error=>{
						this.message='Please check your entered details. something went there wrong. try Again letter';
						//console.log('Error Message>>>>'+this.message);
				})
				this.contactName;  
				this.contactRecordId='';
				this.MeetngName='';  
				this.Meeting='';
				this.picklistVal='';
				this.feedback='';
				this.date='';
		}


		selectOptionChanveValue(event){       
				this.picklistVal = event.target.value;
				//console.log('meet type >>'+this.picklistVal);
		} 

		@wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Employee_Feedback__c'},
																		 selectPicklistApi: 'Rating__c'}) selectTargetValues;

		meetingSelection(event){  
				this.MeetngName = event.detail.selectedValue;  
				this.Meeting = event.detail.selectedRecordId;  
				//console.log('con Id>>'+this.Meeting);
		}  

		onContactSelection(event){  
				this.contactName = event.detail.selectedValue;  
				this.contactRecordId = event.detail.selectedRecordId;  
				//console.log('con Id>>'+this.contactRecordId);
		}  
		cancelHandler(){
				setTimeout(function () { (eval("$A.get('e.force:refreshView').fire()")) });
		}
}