import { LightningElement, api, wire, track } from 'lwc';
import sendEmail from '@salesforce/apex/LoginController.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import Dazeworksicon from '@salesforce/resourceUrl/Dazeworks';
import getEmloyeeData from '@salesforce/apex/fetchEmployee.getEmployee';
import generateOtp from '@salesforce/apex/fetchEmployee.generateOtp';

export default class ForgetPassword extends LightningElement {
    image = Dazeworksicon;
    homepage=false;
    forgotPage=true;
    @track email = '';
    appLoginRecord;
    userName;
    sentEmailOff;

    home(){
        this.forgotPage=false;
        this.homepage=true;
        this.sentEmailOff=false;
    }
   
    handleChange(event) {
            this.email = event.target.value;
            //console.log('check em:'+this.email);
        
    }

    goBack(){
        this.sentEmailOff=false;;
        this.forgotPage=true;
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
   
    sendEmailHandler(event) {
        //console.log('check em1:'+this.email);
        sendEmail(
            { empEmail: this.email, 
            subject: "Finish resetting your Employee Portal password"}
            ).then(result=>{
            this.appLoginRecord = result;
            
            if(this.appLoginRecord){
                this.sentEmailOff=true;
                this.forgotPage=false;
               // this.userName=this.email;
               // console.log(this.userName);
                const successevt = new ShowToastEvent({
                    variant: 'Success',
                    title: 'Success', 
                    message:'Link has been sent. Please check your email'
                });
                this.dispatchEvent(successevt);
   
            }else{ 
                const errorevt = new ShowToastEvent({
                    variant: 'error',
                    title: 'Error', 
                    message:'Incorrect mail details'
                });
                this.dispatchEvent(errorevt);
            } 
        }).catch(error=>{
            //console.log(error);
            const errorevt2 = new ShowToastEvent({
                variant: 'error',
                title: 'Incorrect Email Details', 
                message:'Please enter valid email address'
              
            });
            this.dispatchEvent(errorevt2);
    
        })

        getEmloyeeData({ eid: this.email })
            .then(res => {
                this.empData = res;
                this.empEmail = res.Email;
                this.empname = res.Name;
                this.employID = res.Employee_ID__c;
                //console.log('id >>>>>>>>>>>>' + this.employID);
                //console.log('emp Name >>> ' + this.empname);
                //console.log('email:::::>>>>>' + this.empEmail);
                this.sendOtp()
                this.emailMapping(this.empEmail)
                this.login = false;
                this.otp = true;
            })
            .catch(error => {
                this.error = error
                //console.log('error', error)
                let inpCmp = this.template.querySelector(".empid");
                inpCmp.setCustomValidity("Please enter a valid Employee Email Id");
                inpCmp.reportValidity();
            })
       
    }

    homeHandler(){
        //console.log('inside home');
        //window.history.back();
        // var defination={ 
        //     //componentDef:'c:signInForm',
        //     componentDef:"c:login",
        //     attributes: {
                
        //     }
        // }
        // this[NavigationMixin.Navigate]({ 
        //     type:'standard__webPage',
        //     attributes: { 
        //         url:'/one/one.app#'+btoa(JSON.stringify(defination))
        //     }
        // })

    }
}