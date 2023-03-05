import { LightningElement,track,api } from 'lwc';
import employeeId from '@salesforce/label/c.Employee_Id';
import verification from '@salesforce/label/c.otpverification';
import getEmloyeeData from '@salesforce/apex/fetchEmployee.getEmployee';
import generateOtp from '@salesforce/apex/fetchEmployee.generateOtp';
export default class EmployeeLogin extends LightningElement {

    empId;
    @track empData={};
    @track employeeId;
    @track empEmail;
    emailMap;
    error;

    performEmpId;

    vCode;
    otpGenerated;
    
    
    login=true;
    otp=false;
    label=
    {
        employeeId,
        verification
    }

    

    handleInput(e)
    {
        this.empId=e.target.value
    }
    handleOtp(e)
    {
        this.vCode = e.target.value
    }
    handleNext(event)
    {
       
       // this.empId = event.target.value;
       // console.log('Empid',this.empId)
        getEmloyeeData({eid:this.empId})
        .then(res=>
            {
               this.empData=res;
              //  console.log('contact',res);
                this.empEmail = res.Email;
                this.employeeId = res.Employee_ID__c;
                this.performEmpId = res.Id;
                this.sendOtp()
                this.emailMapping(this.empEmail)
                this.login=false;
                this.otp=true;
            })
        .catch(error=>
            {
                this.error=error
                console.log('error',error)
                let inpCmp = this.template.querySelector(".empid");
                inpCmp.setCustomValidity("Please enter a valid Employee Id");               
                inpCmp.reportValidity();
            })

      
    }

    emailMapping(email)
    {
        this.emailMap = email.slice(0,4) + '*********com' 
    }

    sendOtp()
    {
        generateOtp({con:this.empData})
        .then(res=>
            {
               // console.log(res);
                this.otpGenerated = res;
            })
            .catch(error=>
                {
                    this.error=error
                })
    }

    handleNext1()
    {
        let inpCmp = this.template.querySelector(".otp");
        if((this.otpGenerated == this.vCode))
        {
           
            inpCmp.setCustomValidity("");
           // console.log('otp is corect');
          //  alert('Correct Otp');
          const pEvent = new CustomEvent('otpverify',
          {
              detail:
              {
                    employeeId:this.performEmpId
              }
          });
          this.dispatchEvent(pEvent);
        }
        else
        {       
            inpCmp.setCustomValidity("Please enter a valid OTP");               
           
           // console.log(' correct is not Otp');
        }
        inpCmp.reportValidity();
    }
   
}