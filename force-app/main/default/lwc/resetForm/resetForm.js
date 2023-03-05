/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 08-11-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-01-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track, wire, api } from 'lwc';
import ACC_RESET from '@salesforce/apex/LoginController.getAppReset';
import ACC_Password from '@salesforce/apex/LoginController.getPasswordReset';
import getEmployeeInfo from '@salesforce/apex/LoginController.getEmployeeInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
import employeeId from '@salesforce/label/c.Employee_Id';
import verification from '@salesforce/label/c.otpverification';
import getEmloyeeData from '@salesforce/apex/fetchEmployee.getEmployee';
import generateOtp from '@salesforce/apex/fetchEmployee.generateOtp';
import portalName from '@salesforce/resourceUrl/empPortalName';

export default class ResetForm extends NavigationMixin(LightningElement) {
  securityQuestion;
  yourAnswer;
  password;
  repassword;
  appLoginRecord;
  empName;
  selectedBtn = '';
  selectedBtn1 = '';
  showValidation;
  showaction = false;
  currentPageReference = '';
  urlStateParameters = '';
  showForm = true;
  loginPage = false;
  /* Params from Url */
  urlUsername = '';
  urlSecurity = '';
  empemailId;
  image = portalName;





  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    console.log("urlUsername::" + this.urlUsername);
    if (currentPageReference) {
      this.urlStateParameters = currentPageReference.state;
      this.urlUsername = this.urlStateParameters.c__username;
      console.log("urlUsername::" + this.urlUsername);
    }
  }

  connectedCallback() {
    console.log("urlUsername::" + this.urlUsername);
    getEmployeeInfo({ username: this.urlUsername }).then(result => {
      this.appLoginRecord = result;
      this.empName = result.Name;
      this.empemailId = result.Email;

      if (this.appLoginRecord) {
        this.urlSecurity = this.appLoginRecord.Security_Question__c;
        this.selectedBtn1 = this.selectedBtn;

      } else {
        this.showToast("Error!!", "Incorrect details(catch)", "error", "pester")
      }
    }).catch(error => {
      console.log(error);
      this.showToast("Error!!", "Incorrect details(catch)", "error", "pester")
    })
  }


  answerHandler(event) {
    this.yourAnswer = event.target.value;
  }

  submitHandler(event) {


    console.log("submit handler called");
    this.selectedBtn = event.target.label;
    ACC_RESET({ username: this.urlUsername, yourAnswer: this.yourAnswer }).then(result => {
      this.appLoginRecord = result;

      if (this.appLoginRecord) {

        this.selectedBtn1 = this.selectedBtn;

      } else {
        this.showToast("Error!!", "Incorrect details(catch)", "error", "pester")
      }
    }).catch(error => {
      console.log(error);
      this.showToast("Error!!", "Incorrect details(catch)", "error", "pester")
    })
  }

  handleFocus() {
    this.showValidation = true;
  }
  handleBlur() {
    this.showValidation = false;
  }
  repasswordHandler(event) {
    this.repassword = event.target.value;
  }
  passwordHandler(event) {
    console.log("handlechange method called");
    // Validate lowercase letters
    this.password = event.target.value;
    let passwordValue = event.target.value;
    var lowerCaseLetters = /[a-z]/g;
    if (passwordValue.match(lowerCaseLetters)) {
      console.log("lowercase if called");
      this.template
        .querySelector('[data-id="letter"]')
        .classList.remove("invalid");
      this.template.querySelector('[data-id="letter"]').classList.add("valid");
    } else {
      console.log("lowercase if else called");
      this.template
        .querySelector('[data-id="letter"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="letter"]')
        .classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (passwordValue.match(upperCaseLetters)) {
      this.template
        .querySelector('[data-id="capital"]')
        .classList.remove("invalid");
      this.template.querySelector('[data-id="capital"]').classList.add("valid");
    } else {
      this.template
        .querySelector('[data-id="capital"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="capital"]')
        .classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (passwordValue.match(numbers)) {
      this.template
        .querySelector('[data-id="number"]')
        .classList.remove("invalid");
      this.template.querySelector('[data-id="number"]').classList.add("valid");
    } else {
      this.template
        .querySelector('[data-id="number"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="number"]')
        .classList.add("invalid");
    }

    // Validate length
    if (passwordValue.length >= 8) {
      this.template
        .querySelector('[data-id="length"]')
        .classList.remove("invalid");
      this.template.querySelector('[data-id="length"]').classList.add("valid");
    } else {
      this.template
        .querySelector('[data-id="length"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="length"]')
        .classList.add("invalid");
    }
  }


  handleClick(event) {


    this.empEmailToImportData = this.empEmail;
    let inpCmp = this.template.querySelector(".otp");
    if ((this.otpGenerated == this.vCode)) {
      this.showComponent = true;
      this.showOTP = false;
      this.showContainer = true;
      inpCmp.setCustomValidity("");
      console.log('console 1' + this.empEmail);//email id
      console.log('Name 1' + this.empname);// contact name
      console.log('console 1' + this.employID);// emp id
      //inpCmp.reportValidity();
      const pEvent = new CustomEvent('otpverify',
        {
          detail:
          {
            //employeeId:this.performEmpId,
            empId: this.employID,
            emName: this.empname
          }
        });
      this.dispatchEvent(pEvent);
      console.log('attr Name : ', this.emName);

      this.vCode = '';
      console.log('empDataImport:::>>>>' + this.empEmail);
      this.selectedBtn = event.target.label;
      console.log("this.selectedBtn", this.selectedBtn);
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;

      if (this.password.length >= 8 && this.password.length <= 14) {
        if (this.password.match(upperCaseLetters)) {
          if (this.password === this.repassword) {
            ACC_Password({ username: this.urlUsername, password: this.password }).then(result => {
              this.appLoginRecord = result;

              if (this.appLoginRecord) {
                this.selectedBtn1 = this.selectedBtn;
                console.log("this.selectedBtn", this.selectedBtn1);
                this.showToast("Success", "Password Updated successfully ", "success", "sticky");
                this.showaction = true;
                this.showForm = false;
              }
              else {
                this.showToast("Error", "Something went wrong", "error", "info");
              }
            }).catch(error => {
              console.log(error);
            })
          }
          else {
            this.showToast("Error!!", "Password and re-password must be same", "error", "pester");
          }
        }

        else {
          this.showToast("Error!!", "Password Must  contain atleast one capital letter", "error", "pester");
        }
      }
      else {
        this.showToast("Error!!", "Password Must contain 8-10 characters", "error", "pester");
      }

    }
    else {
      inpCmp.setCustomValidity("Please enter a valid OTP");

      // console.log(' correct is not Otp');
    }
    inpCmp.reportValidity();
    //////////




  }


  showToast(title, message, variant, mode) {
    const event = new ShowToastEvent({
      title,
      message,
      variant,
      mode,
    })
    this.dispatchEvent(event);
  }

  gotoLoginPageHandler() {
    this.showaction = false;
    this.showForm = false;
    this.loginPage = true;

  }


  empId;
  emName;

  @track empData = {};
  @track showComponent = false;
  @track empEmail; //TO Store Employee ID  
  empname;
  employID;
  emailMap;
  error;
  showOTP = true;
  showContainer = false;


  vCode;
  otpGenerated;


  login = true;
  otp = false;
  label =
    {
      employeeId,
      verification
    }

  wireRecord(Data, error) {
    if (Data) {
      this.record = Data;
    } else {
      this.error = error;
    }
  }

  handleInput(e) {
    this.empId = e.target.value
  }
  handleOtp(e) {
    this.vCode = e.target.value
  }

  connectedCallback() {

    getEmloyeeData({ eid: this.urlUsername })
      .then(res => {
        this.empData = res;
        this.empEmail = res.Email;
        this.empname = res.Name;
        this.employID = res.Employee_ID__c;
        console.log('id >>>>>>>>>>>>' + this.employID);
        console.log('emp Name >>> ' + this.empname);
        console.log('email:::::>>>>>' + this.empEmail);
        this.sendOtp()
        this.emailMapping(this.empEmail)
        this.login = false;
        this.otp = true;
      })
      .catch(error => {
        this.error = error
        console.log('error', error)
        let inpCmp = this.template.querySelector(".empid");
        inpCmp.setCustomValidity("Please enter a valid Employee Email Id");
        inpCmp.reportValidity();
      })


  }

  emailMapping(email) {
    this.emailMap = email.slice(0, 4) + '*********com'
  }

  sendOtp() {
    generateOtp({ con: this.empData })
      .then(res => {
        // console.log(res);
        this.otpGenerated = res;
      })
      .catch(error => {
        this.error = error
      })

  }

}