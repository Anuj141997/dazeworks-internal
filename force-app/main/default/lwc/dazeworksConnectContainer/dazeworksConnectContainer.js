/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-30-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-27-2022   Shivam Kumar   Initial Version
**/
import { LightningElement ,api} from 'lwc';

export default class DazeworksConnectContainer extends LightningElement {
    showLogin = true;
    showConnect = false;
    empid;
    recid;
    empName;
    messageFromVF;
    ipaddress;
    empEmail;
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

        if(this.recid !== null || this.recid !=='' || this.recid !== undefined){
            this.showLogin = false;
            this.showConnect = true;
        }
        else{
            this.showLogin = true;
            this.showConnect = false;
        }
        //console.log('EMp Id In container:::>', this.empid);
        //console.log('Rec Id In container:::>', this.recid);
        //console.log('EMp Name Id In container:::>', this.empName);
        //console.log('Emp Email >>> :: ',this.empEmail);

    }

}