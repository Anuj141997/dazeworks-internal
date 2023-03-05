/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 08-09-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   07-28-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, wire, api } from 'lwc';
import dwDesign_1 from '@salesforce/resourceUrl/DW_Design_For_portal';
import dwDesign_2 from '@salesforce/resourceUrl/portalLoginPortalBackground';
import portalName from '@salesforce/resourceUrl/empPortalName';
import inputDesg_1 from '@salesforce/resourceUrl/inputDgn_1';

import checkUser from '@salesforce/apex/LoginController.checkUser';
import checkIp from '@salesforce/apex/LoginIpController.checkIp';
import autoCheckIp from '@salesforce/apex/LoginIpController.autoCheckIp';
import insertSession from '@salesforce/apex/LoginIpController.insertSession';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewEmpPortal extends LightningElement {
  img_1 = portalName;
  img_2 = dwDesign_2;
  inpuDes_1 = inputDesg_1;
  inpuDes_2 = inputDesg_1;

  mainUI = true;
  forgot = false;

  empId='';
  password='';
  appLoginRecord;
  urltwo;
  employID;
  recId;
  empName;
  @api ipaddress;
  empEmail;

  forgatePassword = false;
  login = true;

  tittle='';
  empManager='';
  phone='';
  empDOJ='';
  mobile='';


  forgotPassUI() {
    this.mainUI = false;
    this.forgot = true;
  }

  backtologin() {
    this.mainUI = true;
    this.forgot = false;
  }



  //old methods

  handleIPMessage(message){
    //console.log('##$$$ -- ' +  JSON.stringify ( message ) );
    
  }
  connectedCallback(){
      //console.log('000000--login' + this.ipaddress);
      autoCheckIp({ipAddress: this.ipaddress})
          .then(result => {
          this.empWrapper=result;
          if(this.empWrapper.status==true){
              this.empId=this.empWrapper.empid;
              this.password=this.empWrapper.emppass;
              //console.log('emp Id Auto Login :: ',this.empId);
              //console.log('password Auto Login  :: ',this.password); 
              //console.log('Employeee Id====>',this.empId);
              checkUser({username:this.empId, userpassw:this.password}).then(result=>{
                this.appLoginRecord = result;
                //console.log('result :: ', JSON.stringify(result));
                this.recId = this.appLoginRecord.Id;
                //console.log('recId :: ',this.recId);
                this.empName= this.appLoginRecord.Name;
                //console.log('empName :: ',this.empName);
                this.empEmail=this.appLoginRecord.Email;
                //console.log('empEmail :: ',this.empEmail);
                this.tittle=this.appLoginRecord.Title;
                //console.log('tittle :: ',this.tittle);
                this.empDOJ=this.appLoginRecord.Date_of_Joining__c;
                //console.log('empDOJ :: ',this.empDOJ);
                this.phone=this.appLoginRecord.Phone;
                //console.log('phone :: ',this.phone);
                this.mobile=this.appLoginRecord.MobilePhone;
                //console.log('mobile :: ',this.mobile);
                this.empManager=this.appLoginRecord.ReportsTo.Name;
                //console.log('empManager :: ',this.empManager);
                //console.log('ipaddress====>',this.ipaddress);
                  if(this.recId != null && this.recId != undefined ){
                      //console.log("success");
                      const pEvent = new CustomEvent('otpverify',
                                                     {
                          detail:
                          {
                                employeeId:this.performEmpId,
                                empId: this.empId,
                                recId : this.recId,
                                emName: this.empName,
                                empEmail: this.empEmail,
                                tittle: this.tittle,
                                empMan: this.empManager,
                                phone: this.phone,
                                mobile: this.mobile,
                                doj: this.empDOJ
                             
                          }
                      });
                      this.dispatchEvent(pEvent);

                  }
                  else{ 

                      const errorevt = new ShowToastEvent({
                          variant: 'error',
                          title: 'Incorrect Employee Id or password', 
                          message:''

                      });
                      this.dispatchEvent(errorevt);
                  } 
              }).catch(error=>{
                  //console.log(error);
                  const errorevt2 = new ShowToastEvent({
                      variant: 'error',
                      title: 'Incorrect Employee Id or password', 
                      message:''

                  });
                  this.dispatchEvent(errorevt2);

              })

          }
      })
          .catch(error => {
          //console.log(error);
      });

  }

  emailHandler(event){
      this.empId= event.target.value;
      //console.log('Emp ID :: > ',this.empId);
  }

  passwordHandler(event){
      this.password= event.target.value;
  }

  submitHandler(event){
    //console.log('ip Addr in sub : ',this.ipaddress);
      if((this.empId ===null || this.empId === undefined) && (this.password ===null || this.password === undefined)){
          const errorevt = new ShowToastEvent({
              variant: 'error',
              title: 'Incorrect Employee Id or password', 
              message:''

          });
          this.dispatchEvent(errorevt);
      }
      //console.log('emp Id passed in class==>',this.empId);


      checkUser({username:this.empId, userpassw:this.password}).then(result=>{
        this.appLoginRecord = result;
        //console.log('result :: ', JSON.stringify(result));
        this.recId = this.appLoginRecord.Id;
        //console.log('recId :: ',this.recId);
        this.empName= this.appLoginRecord.Name;
        //console.log('empName :: ',this.empName);
        this.empEmail=this.appLoginRecord.Email;
        //console.log('empEmail :: ',this.empEmail);
        this.tittle=this.appLoginRecord.Title;
        //console.log('tittle :: ',this.tittle);
        this.empDOJ=this.appLoginRecord.Date_of_Joining__c;
        //console.log('empDOJ :: ',this.empDOJ);
        this.phone=this.appLoginRecord.Phone;
        //console.log('phone :: ',this.phone);
        this.mobile=this.appLoginRecord.MobilePhone;
        //console.log('mobile :: ',this.mobile);
        this.empManager=this.appLoginRecord.ReportsTo.Name;
        //console.log('empManager :: ',this.empManager);
          
          if(this.recId != null && this.recId != undefined ){
              checkIp({empId:this.empId, ipAddress: this.ipaddress})
                  .then(result => {
                  this.empWrapper=result;
                  if(this.empWrapper==false){
                      insertSession({empId:this.empId, ipAddress: this.ipaddress})
                          .then(result => {
                          //console.log('Session was inserted successfully');
                          
                      })
                          .catch(error => {
                          //console.log(error);
                      });
                  }
                  else{
                      //console.log('Session already exists');
                  }
              })
                  .catch(error => {
                  //console.log(error);
              });
              //console.log("success");
              const pEvent = new CustomEvent('otpverify',
                                             {
                  detail:
                  {
                      //employeeId:this.performEmpId,
                      empId: this.empId,
                      recId : this.recId,
                      emName: this.empName,
                      empEmail: this.empEmail,

                      tittle: this.tittle,
                      empMan: this.empManager,
                      phone: this.phone,
                      mobile: this.mobile,
                      doj: this.empDOJ

                      
                  }
              });
              this.dispatchEvent(pEvent);

          }
          else{ 

              const errorevt = new ShowToastEvent({
                  variant: 'error',
                  title: 'Incorrect Employee Id or password', 
                  message:''

              });
              this.dispatchEvent(errorevt);
          } 
      }).catch(error=>{
          //console.log(error);
          const errorevt2 = new ShowToastEvent({
              variant: 'error',
              title: 'Incorrect Employee Id or password', 
              message:''

          });
          this.dispatchEvent(errorevt2);

      })

      this.connectedCallback();

  }

  navigateToLwc(){ 
      //console.log('inside ntl');


      var compDefinition = {
          componentDef: "c:forgetPassword",
          attributes: {

          }
      };
      //console.log('inside ntl1');
      var encodedCompDef = btoa(JSON.stringify(compDefinition));
      //console.log('inside ntl2');
      this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
              url: '/one/one.app#' + encodedCompDef
          }
      });
      //console.log('inside ntl3');
  }


  forgatePasswordHandler(){
      this.forgatePassword=true;
      this.login=false;
  }

  loginPageHandler(){
      this.login=true;
      this.forgatePassword=false;
  }

}