/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-27-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-27-2022   Shivam Kumar   Initial Version
**/
import { LightningElement ,track,wire,api} from 'lwc';
import createMeetingDetails from '@salesforce/apex/createInternalMeetings.createMeetingDetails';
import pickListValueDynamically from '@salesforce/apex/createInternalMeetings.pickListValueDynamically';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class InternalMeeting extends LightningElement {
		@api recId;
		@api empId;
		@api empName;
		meetingName;
		department;
		link;
		startdate;
		enddate;
		message='';
		feedpage=true;
		dazeConnectHome=false;
		@track picklistVal;
		recordedSessionLink;

		@track contactName;  
		@track contactRecordId;  
		meetingNameONCH(event){
				this.meetingName=event.target.value;    
				//console.log('name>>'+this.meetingName);
		}
		PreviouspageHandler(){
			this.meetingName='';
			this.department='';
			this.link='';
			this.startdate='';
			this.enddate='';
			this.recordedSessionLink='';

				this.showaction=false;
				this.feedpage=true;
		}
		departmentONCH(event){
				this.department=event.target.value;
		}
		linkONCH(event){
				this.link=event.target.value;
				//console.log('link>>'+this.link);
		}
		startdateONCH(event){
				this.startdate=event.target.value;
				//console.log('startdate>>'+this.startdate);
		}
		enddateONCH(event){
				this.enddate=event.target.value;
		}
		recDriveLinkONCH(event){
				this.recordedSessionLink=event.target.value;
		}

		connectedCallback(){
				//console.log('con Id>>'+this.recId);
		}


		onContactSelection(event){  
				this.contactName = event.detail.selectedValue;  
				this.contactRecordId = event.detail.selectedRecordId;  
				//console.log('con Id>>'+this.contactRecordId);
		}  

		@wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Internal_Meeting__c'},
																		 selectPicklistApi: 'Meeting_Type__c'}) selectTargetValues;

		selectOptionChanveValue(event){       
				this.picklistVal = event.target.value;
				//console.log('meet type >>'+this.picklistVal);
		} 


		submitMeetingDetails(){

				const event = new ShowToastEvent({
						title: 'Internal Meeting detils',
						message: 'Submiteed Successfully',
						variant: 'success'
				});
				if(!this.meetingName || !this.link || !this.recId || !this.startdate ){
						const evt = new ShowToastEvent({
								title: 'Error',
								message: 'Please fill all the required fields!',
								variant: 'error',
								mode: 'dismissable'
						});
						this.dispatchEvent(evt);
						return false;
				}
				this.dispatchEvent(event);
				createMeetingDetails({
						meetName:this.meetingName,
						dept:this.department,
						link:this.link,
						recDriveLink:this.recordedSessionLink,
						startDate:this.startdate,
						endDate:this.enddate,
						meetingType : this.picklistVal,
						conID : this.recId

				}).then(result=>{
						this.message='record created successfully';
						//console.log('Message>>>>'+this.message);
						this.dazeConnectHome=true;
						this.showaction=true;
						this.feedpage=false;
						this.dispatchEvent(event);
				})
						.catch(error=>{
						this.message='Please check your entered details. something went there wrong. try Again letter';
						//console.log('Error Message>>>>'+this.message);
				})

		}
		cancelHandler(){
		this.meetingName='';
		this.department='';
		this.link='';
		this.startdate='';
		this.enddate='';
		this.message='';
		this.recordedSessionLink='';
		 this.template.querySelectorAll('select').forEach(each => {
        each.value = null;
    });
		}


}