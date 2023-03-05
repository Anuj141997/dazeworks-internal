import { api, LightningElement, track } from 'lwc';
//import submitScoreAction from '@salesforce/apex/LeavePortal.submitScoreAction';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
export default class insertRecordCustomObjectLwc extends NavigationMixin (LightningElement) {
    @track Name;
    @track radSelMultiple;
    @track radiosel;
    @track StartDate;
    @track EndDate;
    @track Reason;
    @track errorMsg;
    value = '';
    EmployeeId='a0Q1s000005VHGjEAO'
   scoreHandleChange(event){
        if(event.target.name == 'Name'){
        this.Name = event.target.value;
        window.console.log('scoreObName ##' + this.Name);
        }
      if(event.target.name == 'StartDate'){
        this.StartDate = event.target.value;
      }
      if(event.target.name == 'EndDate'){
        this.EndDate = event.target.value;
      }
      if(event.target.name == 'Reason'){
        this.Reason = event.target.value;
      }
 }
 submitAction(){
    submitScoreAction({Name:this.Name,StartDate:this.StartDate,EndDate:this.EndDate,Reason:this.Reason})
    .then(result=>{
        this.scoreRecoreId = result.Id;
        const toastEvent = new ShowToastEvent({
            title:'Success!',
            message:'Record created successfully',
            variant:'success'
          });
          this.dispatchEvent(toastEvent);
          /*Start Navigation*/
          this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.scoreRecoreId,
                objectApiName: 'Leave__c',
                actionName: 'view'
            },
         });
         window.console.log('Leave Record ' + this.scoreRecoreId);
         /*End Navigation*/
    })
    .catch(error =>{
       this.errorMsg=error.message;
       window.console.log(this.error);
    });
 }
 get options() {
  return [
      { label: 'CasualLeave', value: 'CasualLeave' },
      { label: 'SickLeave', value: 'SickLeave' },
      { label: 'Compenstory', value: 'Compenstory' },
  ];
  }
  get leaveoptions() {
    return [
        { label: 'Half Day', value: 'HalfDay' },
        { label: 'Single Day', value: 'SingleDay' },
        { label: 'Multiple Day', value: 'MultipleDays' },
    ];
}
handleRadioChange(event) {
  console.log('event.detail-->'+event.target.value);
  const selectedOption = event.target.value;
  console.log('selectedOption-->'+selectedOption);
  //alert('selectedOption ' + selectedOption);
  if (selectedOption == 'HalfDay'){
      console.log('inside half day');
      this.radiosel = true;
      this.radSelMultiple = false;
  }else{
    console.log('check2');
      this.radSelMultiple = true;
  }
  if (selectedOption == 'SingleDay'){
    console.log('inside single day');
    this.radiosel = true;
      this.radSelMultiple = false;
  }else{
      this.radSelMultiple = true;
  }
  if (selectedOption == 'MultipleDays'){
    console.log('inside multiple day');
      this.radSelMultiple = true;
      this.radiosel = false;
  }else{
      this.radSelMultiple = false;
  }
}
  handleChange(event) {
    this.value = event.detail.value;
}
}