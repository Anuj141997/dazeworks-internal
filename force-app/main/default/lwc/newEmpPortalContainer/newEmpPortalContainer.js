/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-07-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-05-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class NewEmpPortalContainer extends LightningElement {

    showLogin = false;
    showConnect = false;
    empid;
    recid;
    empName;
    messageFromVF;
    ipaddress;
    empEmail;
    tittle='';
    empManager='';
    phone='';
    empDOJ='';
    mobile='';

    connectedCallback() {
        // var vfpage1 = document.getElementById('{!$Component.form1.accName}');
         window.addEventListener("message", (message) => {
     
             if (message.data.name && message.data.name === "SampleVFToLWCMessage" ) {
                 this.messageFromVF = message.data.payload;
                 //console.log('$$$' + JSON.stringify(this.messageFromVF));
                 this.showLogin = true;
           }
             
             
         });
     }
     submitLogin(event) {
         
        //console.log('ip add in dw container :: ', this.ipaddress);
         this.empid = event.detail.empId;
         this.recid = event.detail.recId;
         this.empName = event.detail.emName;
         this.empEmail=event.detail.empEmail;

         this.tittle=event.detail.tittle;
         this.empManager=event.detail.empMan;
         this.phone=event.detail.phone;
         this.empDOJ=event.detail.doj;
         this.mobile=event.detail.mobile;
 
         if(this.recid !== null || this.recid !=='' || this.recid !== undefined){
             this.showLogin = false;
             this.showConnect = true;
            //console.log('opening next page');
         }
         else{
             this.showLogin = true;
             this.showConnect = false;
            // console.log('not opening');
         }
        // console.log('EMp Id In container:::>', this.empid);
        // console.log('Rec Id In container:::>', this.recid);
        // console.log('EMp Name Id In container:::>', this.empName);
        // console.log('showconnect >>> :: ',this.showConnect);
        // console.log('messageFromVF:::>', this.messageFromVF);
        // console.log('tittle:::>', this.tittle);
        // console.log('phone:::>', this.phone);
        // console.log('mobile>>> :: ',this.mobile);
        // console.log('empManager:::>', this.empManager);
        // console.log('empDOJ:::>', this.empDOJ);
        // console.log('empEmail>>> :: ',this.empEmail);
 
     }
    
}