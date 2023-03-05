/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-07-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   07-01-2022   Shivam Kumar   Initial Version
**/
import { api, LightningElement, track, wire } from 'lwc';
import submitLeave from '@salesforce/apex/LeavePortal.submitLeave';
import getPicklist from '@salesforce/apex/LeavePortal.getPicklist';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getLeave from '@salesforce/apex/Leavedashboard.LeaveDashboard_1';
import { NavigationMixin } from 'lightning/navigation';

export default class insertRecordCustomObjectLwc extends NavigationMixin(LightningElement) {
	@track Name;
	@track isMultiple = true;
	@track isSingle = false;
	@track fieldValCheck = false;
	@track isHalfDay = false;
	@track leaveValue = '';
	@track startDate;
	@track endDate;
	@track reason;
	@track errorMsg;
	@track leaveType = '';
	@track sessionOptions;
	@track session;
	@api empid;
	@track optOutForLeaves;
	@track buttonAvailable = true;
	@track casualLeaveBal;
	@track earLeaveBal;
	@track sickLeaveBal;

	/* optoutONCH(event){
this.optoutForLeave=event.target.checked;
console.log('optout for leave >>'+ this.optoutForLeave);
}
*/

	//empid = '0031s00000gG9tBAAS';
	leaveOptions = [
		{ label: 'Multiple Day', value: 'MultipleDays' },
		{ label: 'Single Day', value: 'SingleDay' },
		{ label: 'Half Day', value: 'HalfDay' }
	];

	@track leaveTypeOptions;

	connectedCallback() {
		//console.log('inside db::' + this.empid);
		getLeave({ empId: this.empid })
			.then(data => {
				if (data) {
					this.LeaveDataList = data;
					this.optOutForLeaves = data[0].Optout_For_Leave__c;
					this.casualLeaveBal = data[0].CasualLeaveBalance__c;
					//console.log('casual leave :: ', this.casualLeaveBal);
					this.earLeaveBal = data[0].Earned_Leave_Balance__c;
					//console.log('ear Levae :: ', this.earLeaveBal);
					this.sickLeaveBal = data[0].Sick_Leave_Balance__c;
					//console.log('sick Leave :: ', this.sickLeaveBal);

					//console.log('optout>>>>' + data[0].Optout_For_Leave__c);
					//console.log('optout  2>>>' + this.optOutForLeaves);
					//console.log(data);
				}
				else if (error) {
					//console.log(error);
				}
			})
			.catch(error => {
				//console.log('check error::' + error);
				//console.log('check error::' + error.message);
				//this.errorMsg=error.message;
			});
		this.leaveValue = 'MultipleDays';
		this.isMultiple = true;
		getPicklist({ objectName: 'Leave__c', fieldName: 'Type_of_Leave__c' })
			.then(result => {
				this.leaveTypeOptions = result;
			})
			.catch(error => {
				//console.log(error);
			});

		getPicklist({ objectName: 'Leave__c', fieldName: 'Session__c' })
			.then(result => {
				this.sessionOptions = result;
			})
			.catch(error => {
				//console.log(error);
			});
	}

	handleRadioChange(event) {
		const selectedOption = event.detail.value;

		if (selectedOption == 'HalfDay') {
			this.isSingle = false;
			this.isMultiple = false;
			this.isHalfDay = true;
			this.leaveValue = 'HalfDay';
		}
		else if (selectedOption == 'SingleDay') {
			this.isSingle = true;
			this.isMultiple = false;
			this.isHalfDay = false;
			this.leaveValue = 'SingleDay';
		}
		else if (selectedOption == 'MultipleDays') {
			this.isMultiple = true;
			this.isHalfDay = false;
			this.isSingle = false;
			this.leaveValue = 'MultipleDays';
		}
		else {
			this.isMultiple = false;
		}

		//console.log('inside check::' + this.leaveValue);
	}

	handleLeaveType(event) {
		this.leaveType = event.target.value;
		this.buttonAvailable = false;
		//console.log('the leave type is ==>' + this.leaveType);
		if (this.optOutForLeaves == true && (this.leaveType == 'Casual Leave (CL)' || this.leaveType == 'Maternity Leave (ML)' || this.leaveType == 'Paternity Leaves (PL)')) {
			this.buttonAvailable = true;
		}
			if(this.leaveType == 'Casual Leave (CL)'&& this.casualLeaveBal==0){
					this.buttonAvailable = true;
					const evt = new ShowToastEvent({
				title: 'Insufficient Leave Balance',
				message: 'Your Casual Leave Balance is Insufficient!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			}
			if(this.leaveType == 'Sick Leave (SL)'&& this.sickLeaveBal==0){
					this.buttonAvailable = true;
					const evt = new ShowToastEvent({
				title: 'Insufficient Leave Balance',
				message: 'Your Sick Leave Balance is Insufficient!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			}
			if(this.leaveType == 'Earned Leave (EL)'&& this.earLeaveBal==0){
					this.buttonAvailable = true;
					const evt = new ShowToastEvent({
				title: 'Insufficient Leave Balance',
				message: 'Your Earned Leave Balance is Insufficient!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			}

	}

	handleReason(event) {
		this.reason = event.target.value;
	}

	handleSession(event) {
		this.session = event.target.value;
	}

	handleDate(event) {
		var dateType = event.target.name;

		if (dateType === 'startEndDate') {
			this.startDate = event.target.value;
			this.endDate = event.target.value;
		}
		else if (dateType === 'startDateHalf') {
			this.startDate = event.target.value;
			//console.log('half day Date : ', this.startDate);
		}
		else if (dateType === 'StartDate') {
			this.startDate = event.target.value;
		}
		else if (dateType === 'EndDate') {
			this.endDate = event.target.value;
		}

		//console.log(this.startDate + '::inside startEnd date::' + this.endDate);
	}

	applyLeave() {
		//console.log('inside AL::' + this.leaveValue);
		if (!this.leaveValue || !this.leaveType || !this.reason) {
			const evt = new ShowToastEvent({
				title: 'Required fields missing',
				message: 'Please fill all the required fields!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			return false;
		}

		if (this.leaveValue === 'MultipleDays' && !this.startDate && !this.endDate) {
			const evt = new ShowToastEvent({
				title: 'Required fields missing',
				message: 'Start Date & End Date is required for Multiple Days!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			return false;
		}

		if (this.leaveValue === 'SingleDay' && !this.startDate) {
			const evt = new ShowToastEvent({
				title: 'Required fields missing',
				message: 'Date is required for Single Day!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			return false;
		}

		if (this.leaveValue === 'HalfDay' && !this.startDate && !this.session) {
			const evt = new ShowToastEvent({
				title: 'Required fields missing',
				message: 'Date & Session is required for Half Day!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			return false;
		}

		if (this.startDate > this.endDate) {
			const evt = new ShowToastEvent({
				title: 'Invalid date',
				message: 'Please enter valid start and end date!',
				variant: 'error',
				mode: 'dismissable'
			});
			this.dispatchEvent(evt);
			return false;
		}

		//console.log('Half Start Date : ', this.startDate);
		//console.log('is Half day', this.isHalfDay);
		//console.log('session ', this.session);
		//console.log('resn', this.reason);
		submitLeave({ startDate: this.startDate, endDate: this.endDate, reason: this.reason, employeeId: this.empid, isHalfDay: this.isHalfDay, leaveType: this.leaveType, session: this.session })

			.then(result => {
				//console.log('Result is ', result);
				if (result=='Success') {
					this.scoreRecoreId = result.Id;
					//console.log(this.scoreRecoreId);
					//console.log('hfd date : ', this.startDate);
					//console.log('hlf dy', this.isHalfDay);
					//console.log('ses ', this.session);
					//console.log('re', this.reason);
					const evt = new CustomEvent("createrecord", {
						detail: true
					});
					this.dispatchEvent(evt);

					const toastEvent = new ShowToastEvent({
						title: 'Success!',
						message: 'Record created successfully',
						variant: 'success'
					});
					this.dispatchEvent(toastEvent);

					this.startDate = '';
					this.endDate = '';
					this.reason = '';
					this.isHalfDay = false;
					this.leaveType = '';
					this.session = '';
					this.leaveValue = 'MultipleDays';
					this.isMultiple = true;
					this.isSingle = false;

					//console.log('Leave Record ' + this.scoreRecoreId);
				}
				else if(result=='Date Repeat'){
					const toastEvent1 = new ShowToastEvent({
						title: 'Duplicate Record!',
						message: 'Make sure that date should be different from your previously applied leave.',
						variant: 'error'
					});
					this.dispatchEvent(toastEvent1);
				}
			})
			.catch(error => {
				this.errorMsg = error.message;	
				//console.log('err msg>>>' + this.errorMsg);
				//console.log('error ' + JSON.stringify(error));
				
			});
	}


}