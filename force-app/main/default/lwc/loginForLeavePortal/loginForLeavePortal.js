import { LightningElement,track,api } from 'lwc';
import employeeId from '@salesforce/label/c.Employee_Id';
import verification from '@salesforce/label/c.otpverification';
import getEmloyeeData from '@salesforce/apex/fetchEmployee.getEmployee';
import generateOtp from '@salesforce/apex/fetchEmployee.generateOtp';
import { NavigationMixin } from 'lightning/navigation';
export default class EmployeeLogin   extends NavigationMixin(LightningElement) {

    empId;
    

    @track empData={};
    @track empEmail; //TO Store Employee ID
    empname;
    employID;
    emailMap;
    error;
    showOTP = true;
    showContainer = false;
   

    vCode;
    otpGenerated;
    
    
    login=true;
    otp=false;
    label=
    {
        employeeId,
        verification
    }

    wireRecord(Data, error){
        if(Data){
            this.record=Data;
        }else{
            this.error=error;
        }
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
       
        getEmloyeeData({eid:this.empId})
        .then(res=>
            {
               this.empData=res;
                this.empEmail = res.Email;
                this.empname = res.Name;
                this.employID=res.Employee_ID__c;
                //console.log('id >>>>>>>>>>>>'+ this.employID);

                //console.log('employee Id >>> '+ this.employID);
                //console.log('email:::::>>>>>'+ this.empEmail);
                this.sendOtp()
                this.emailMapping(this.empEmail)
                this.login=false;
                this.otp=true;
            })
        .catch(error=>
            {
                this.error=error
                //console.log('error',error)
                let inpCmp = this.template.querySelector(".empid");
                inpCmp.setCustomValidity("Please enter a valid Employee Email Id");               
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

    handleNext1(event)
    {
        this.empEmailToImportData = this.empEmail;
        let inpCmp = this.template.querySelector(".otp");
        if((this.otpGenerated == this.vCode))
        {
            this.showOTP = false;
            this.showContainer = true;
            inpCmp.setCustomValidity("");
           // console.log('otp is corect');
          //  alert('Correct Otp');
          const pEvent = new CustomEvent('otpverify');
          this.dispatchEvent(pEvent);
            //console.log('console 1'+ this.empEmail);//email id
            //console.log('console 1'+ this.empname);// contact name
            //console.log('console 1'+ this.employID);// emp id
         var compDefinition = {
            componentDef: "c:leaveContainer",
            attributes: {
                empemail:this.empEmail,
                empname:this.empname,
                empid:this.employID
            }
          };

          /*var encodedCompDef = btoa(JSON.stringify(compDefinition));
          this[NavigationMixin.Navigate]({
               type: 'standard__webPage',
               attributes: {
                     url: '/one/one.app#' + encodedCompDef
              }
         });*/
        
        this.vCode='';
       //console.log('empDataImport:::>>>>'+ this.empEmail);

        }
        else
        {       
            inpCmp.setCustomValidity("Please enter a valid OTP");               
           
           // console.log(' correct is not Otp');
        }
        inpCmp.reportValidity();
    }
   
}