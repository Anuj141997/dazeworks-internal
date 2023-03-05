/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-16-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-15-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContact from '@salesforce/apex/updateContact.getContact';
import getPicklist from '@salesforce/apex/updateContact.getPicklist';
import updateContactMethod from '@salesforce/apex/updateContact.updateContactMethod';
export default class UpdateContact extends LightningElement {
		
		@api employID;
		@track details=false;
		@track successmsg=false;
		@track EmployeeId = this.empid;
		@api empId;
		@api emName;
		@track bloodGroupOptions;
		home = false;
	    editEnable=true;
		@track contRec;
		@track genderOption;
		@track shrtSizeOption;
		backIdtoHome;
		homeHandler(){
			this.home=true;
			this.details=false;
			this.successmsg=false;
			

		}
		connectedCallback() {

				//console.log('inside cb LT child ::' + this.employid);
				getContact({ empId: this.empId })
						.then(result => {
						this.details=true;
						this.contRec = result;
						this.backIdtoHome=this.empId
						//console.log('backIdtoHome',this.backIdtoHome)
						//console.log('certype::', JSON.stringify(this.contRec));
				})
						.catch(error => {
						//console.log(error);
				});
				getPicklist({ objectName: 'Contact', fieldName: 'Blood_Group__c' })
				.then(result => {
					this.bloodGroupOptions=result;
				})
				.catch(error => {
				//console.log(error);
		        });

				getPicklist({ objectName: 'Contact', fieldName: 'Shirt_Size__c' })
				.then(result => {
					this.shrtSizeOption=result;
				})
				.catch(error => {
				//console.log(error);
		        });

				getPicklist({ objectName: 'Contact', fieldName: 'Spouse_Gender__c' })
				.then(result => {
					this.genderOption=result;
				})
				.catch(error => {
				//console.log(error);
		        });
		}
		changesHandler(event) {

		}
		makeRecordEditable(){
			if(this.contRec.Update_By_Employee__c){
			this.editEnable=false;
			}
			if(!this.contRec.Update_By_Employee__c){
				const event = new ShowToastEvent({
					title: 'You do not have permission to Edit.',
					message: 'Please contact the HR - Team.',
					variant: 'error'
				});
				this.dispatchEvent(event);
			}
		}
		makeRecordNotEditable(){
			this.editEnable=true;
		}
		backToDetailPage(){
			this.details=true;
			this.successmsg=false;
			this.editEnable=true;
		}


		changesHandler(event) {
			if(event.target.name === "Birthdate"){
				this.contRec.Birthdate = event.target.value;
			}
			if(event.target.name === "MobilePhone"){
				this.contRec.MobilePhone = event.target.value;
			}
			if(event.target.name === "Email"){
				this.contRec.Email = event.target.value;
			}
			if(event.target.name === "Fathers_Name__c"){
				this.contRec.Fathers_Name__c = event.target.value;
			}
			if(event.target.name === "Mother_s_Name__c"){
				this.contRec.Mother_s_Name__c = event.target.value;
			}
			if(event.target.name === "Permanent_Address__c"){
				this.contRec.Permanent_Address__c = event.target.value;
			}
			if(event.target.name === "Blood_Group__c"){
				this.contRec.Blood_Group__c = event.target.value;
			}
			if(event.target.name === "Shirt_Size__c"){
				this.contRec.Shirt_Size__c = event.target.value;
			}
			if(event.target.name === "Father_s_DOB__c"){
				this.contRec.Father_s_DOB__c = event.target.value;
			}
			if(event.target.name === "Mother_s_DOB__c"){
				this.contRec.Mother_s_DOB__c = event.target.value;
			}
			if(event.target.name === "Spouse_Name__c"){
				this.contRec.Spouse_Name__c = event.target.value;
			}
			if(event.target.name === "Spouse_Gender__c"){
				this.contRec.Spouse_Gender__c = event.target.value;
			}
			if(event.target.name === "Spouse_DOB__c"){
				this.contRec.Spouse_DOB__c = event.target.value;
			}
			if(event.target.name === "Child_1_Name__c"){
				this.contRec.Child_1_Name__c = event.target.value;
			}
			if(event.target.name === "Child_1_Gender__c"){
				this.contRec.Child_1_Gender__c = event.target.value;
			}
			if(event.target.name === "Child_1_DOB__c"){
				this.contRec.Child_1_DOB__c = event.target.value;
			}
			if(event.target.name === "Child_2_Name__c"){
				this.contRec.Child_2_Name__c = event.target.value;
			}
			if(event.target.name === "Child_2_Gender__c"){
				this.contRec.Child_2_Gender__c = event.target.value;
			}
			if(event.target.name === "Child_2_DOB__c"){
				this.contRec.Child_2_DOB__c = event.target.value;
			}
			if(event.target.name === "Bank_Account_Number__c"){
				this.contRec.Bank_Account_Number__c = event.target.value;
			}
			if(event.target.name === "IFSC_Code__c"){
				this.contRec.IFSC_Code__c = event.target.value;
			}
			if(event.target.name === "Bank_Name__c"){
				this.contRec.Bank_Name__c = event.target.value;
			}
			if(event.target.name === "Certifications_if_any__c"){
				this.contRec.Certifications_if_any__c = event.target.value;
			}
			if(event.target.name === "Emergency_contact_name__c"){
				this.contRec.Emergency_contact_name__c = event.target.value;
			}
			if(event.target.name === "Emergency_Contact_Number__c"){
				this.contRec.Emergency_Contact_Number__c = event.target.value;
			}
			if(event.target.name === "Medical_History_If_any__c"){
				this.contRec.Medical_History_If_any__c = event.target.value;
			}
			if(event.target.name === "Fun_Fact_about_you__c"){
				this.contRec.Fun_Fact_about_you__c = event.target.value;
			}
			if(event.target.name === "Keywords_that_best_describe_you__c"){
				this.contRec.Keywords_that_best_describe_you__c = event.target.value;
			}
			if(event.target.name === "Hates__c"){
				this.contRec.Hates__c = event.target.value;
			}
			if(event.target.name === "Hobbies__c"){
				this.contRec.Hobbies__c = event.target.value;
			}
			if(event.target.name === "Success_community_profile_link__c"){
				this.contRec.Success_community_profile_link__c = event.target.value;
			}
			if(event.target.name === "Facebook_Link__c"){
				this.contRec.Facebook_Link__c = event.target.value;
			}
			if(event.target.name === "LinkedIn_Link__c"){
				this.contRec.LinkedIn_Link__c = event.target.value;
			}
			if(event.target.name === "Twitter_Link__c"){
				this.contRec.Twitter_Link__c = event.target.value;
			}
			if(event.target.name === "Likes__c"){
				this.contRec.Likes__c = event.target.value;
			}
		}

		onclickUpdateHandler(){
			updateContactMethod({uCon : this.contRec})
			.then(result => {
				if(result){
					this.details=false;
					this.successmsg=true;
					this.editEnable=true;
				}
				else{
					const event = new ShowToastEvent({
						title: 'You do not have permission to Edit.',
						message: 'Please contact the HR - Team.',
						variant: 'error'
					});
					this.dispatchEvent(event);
				}
			})
			.catch(error => {
			//console.log(error);
			});
		}
}