/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-27-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-27-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, api } from 'lwc';
import clockifyImages from '@salesforce/resourceUrl/Timesheet';
import empImages from '@salesforce/resourceUrl/empDetals';
import rewardsImages from '@salesforce/resourceUrl/RewardAndRecog';
import policyImages from '@salesforce/resourceUrl/CompanyPolicies';
import payslipImages from '@salesforce/resourceUrl/Payslips';
import supportImages from '@salesforce/resourceUrl/RaiseTickets';
import prfMgt from '@salesforce/resourceUrl/PerformanceMgt';
import AppLeave from '@salesforce/resourceUrl/applyLeave';
import IntMeet from '@salesforce/resourceUrl/IntMeeting';
import IntMeetFeedback from '@salesforce/resourceUrl/MeetFeedback';
import Certificate from '@salesforce/resourceUrl/Certification';
import homeicon from '@salesforce/resourceUrl/HomeIcon';
import logout from '@salesforce/apex/LoginIpController.logout';
import Family from '@salesforce/schema/Product2.Family';
export default class empPortalHome extends LightningElement {
    @api empId;
    image1 = empImages;
    image2 = rewardsImages;
    image3 = policyImages;
    image4 = payslipImages;
    image5 = clockifyImages;
    image6 = supportImages;
    image7 = prfMgt;
    image8 = AppLeave;
    image9 = IntMeet;
    image10 = IntMeetFeedback;
    image11 = Certificate;
    image12 = homeicon;

    @api recId;
    @api empName;
    @api ipaddress;
    loading=false;
    showInductionDetails = false;
    @api home;
    empid;
    perfMangt = false;
    leaveport = false;
    certificate = false;
    showTicket = false;
    showInternalMeet =false;
    showMeetingfeedback =false;


    connectedCallback()
    {
        this.loading = true;
        
        let timer = window.setTimeout(() =>
        {
            this.loading = false;
           
            window.clearTimeout(timer)
         },1000)

         //console.log('emp Id inside dazeworks Connect ::', this.empId);
    }
		internalMeeting(){
				this.showInternalMeet=true;
        this.home=false;
        this.certificate=false;
        this.perfMangt-false;
        this.showMeetingfeedback=false;
				this.showTicket=false;
        this.leaveport=false;
        this.showInductionDetails=false;
        this.connectedCallback();
		}

    showTicketHandler(){
        this.showTicket=true;
        this.home=false;
        this.certificate=false;
        this.perfMangt-false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.leaveport=false;
        this.showInductionDetails=false;
        this.connectedCallback();
    }
    

    perfMangtHandler() {
        this.perfMangt = true;
        this.home = false;
        this.certificate = false;
        this.leaveport = false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.showLogin = false;
        this.showInductionDetails = false;
        //console.log('rec Id for emp portal home', this.recId);
        //console.log('emp id for perform', this.empId);
        this.connectedCallback();
    }

    applyLeave() {
        //console.log('emi id for leave apply com::>', this.empId);
        this.home = false;
        this.leaveport = true;
        this.perfMangt=false;
        this.certificate=false;
        this.showInductionDetails = false;
        this.showLogin = false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.connectedCallback();
    }

    homehandler() {
        this.home = true;
        this.showInductionDetails = false;
        this.certificate = false;
        this.leaveport = false;
        this.perfMangt=false;
        this.showLogin = false;
        this.showTicket=false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.connectedCallback();
    }

    certificatehandler() {
        this.home = false;
        this.certificate = true;
        this.showInductionDetails = false;
        this.leaveport=false;
        this.showLogin = false;
        this.showInductionDetails=false;
        this.showTicket=false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.connectedCallback();
    }


    inductionHandler(event) {
        //console.log('emp id for induction form::', this.empId);
        this.showInductionDetails = true;
        this.home = false;
        this.showLogin = false;
        this.certificate = false;
        this.leaveport=false;
        this.showTicket=false;
        this.showMeetingfeedback=false;
    this.showInternalMeet=false;
        this.connectedCallback();

    }
    logoutResult;
    logoutHandler(){
        //console.log('empId in logout Handler :: ',this.empId);
        logout({empId : this.empId, ipAddress:this.ipaddress})
        .then(result => {
            this.logoutResult=result
            window.location.reload();
            //console.log('result in logout handler :: ',result);
        })
        .catch(error =>{
            //console.log('error in logout handler :: ',error);
        })
			
    }

    showInternalMeetHandler(){
        this.showInternalMeet=true
        this.home = false;
        this.certificate = false;
        this.showInductionDetails = false;
        this.leaveport=false;
        this.showLogin = false;
        this.showInductionDetails=false;
        this.showTicket=false;
        this.showMeetingfeedback=false;
        this.connectedCallback();
    }

    showMeetingfeedbackHandler(){
        this.showMeetingfeedback=true;
        this.showInternalMeet=false;
        this.home = false;
        this.certificate = false;
        this.showInductionDetails = false;
        this.leaveport=false;
        this.showLogin = false;
        this.showInductionDetails=false;
        this.showTicket=false;
        this.connectedCallback();
    }    

   



}