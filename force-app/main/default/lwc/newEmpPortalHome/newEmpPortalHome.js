/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-10-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-01-2022   Shivam Kumar   Initial Version
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
import homeicon from '@salesforce/resourceUrl/Home_2';
import logout from '@salesforce/apex/LoginIpController.logout';
import setPageName from '@salesforce/apex/LoginIpController.setPageName';
import resetPageName from '@salesforce/apex/LoginIpController.resetPageName';
import currentPage from '@salesforce/apex/LoginIpController.currentPage';
import Family from '@salesforce/schema/Product2.Family';
import ninjaprofileImges from '@salesforce/resourceUrl/ninjaPic';
import inputDesg_1 from '@salesforce/resourceUrl/inputDgn_1';
import 	rightArrow from '@salesforce/resourceUrl/rightArrow';
import 	leftArrow from '@salesforce/resourceUrl/leftArrow';
import line01 from '@salesforce/resourceUrl/Line01';
import Dazeworksicon from '@salesforce/resourceUrl/DWiconWide';
//import profileImges_1 from '@salesforce/resourceUrl/Shivam';
import Dazeworksconn from '@salesforce/resourceUrl/Dazeworksconnectblue';
import TimesheetImage from '@salesforce/resourceUrl/TimesheetImage';
import fi from '@salesforce/apex/LoginController.uploadFile';
import empEmageToDisplay from '@salesforce/apex/LoginController.empEmageToDisplay';
import { NavigationMixin } from "lightning/navigation";
export default class NewEmpPortalHome extends NavigationMixin(LightningElement) {
	ninjaImage = ninjaprofileImges;
	daze = Dazeworksicon;
	dazecon = Dazeworksconn;
	image_prf;
	inpuDes_1=line01;
	page_1 = true;
	@api empId;
	//empId = 'DW11242';
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
	rArrow = rightArrow;
	lArrow = leftArrow;

	@api recId;
	@api empName;
	@api ipaddress;
	@api tittle;
	@api empManager;
	@api phone;
	@api mobile;
	@api empDOJ;
	@api empEmail;
	loading = false;
	showInductionDetails = false;
	@api home;
	home = true;
	empid;
	pgName;
	perfMangt = false;
	leaveport = false;
	certificate = false;
	showTicket = false;
	showInternalMeet = false;
	showMeetingfeedback = false;
	interviewTemplate=false;
	appreciationTemplate=false;
	currentPageName;
	img="/sfc/servlet.shepherd/version/download/";

	connectedCallback() {

		empEmageToDisplay({empId : this.recId}).then(result =>{
			//console.log('emp id in emg :: ',this.empId);
			//console.log('img result :: ', result);
			if(result.length>0){
				this.image_prf=this.img+result[0].Id;
				//console.log('img url  :: ', this.image_prf);
			}
			else{
				this.image_prf =this.ninjaImage;
			}
		}).catch(error =>{
			//console.log('img err ;',error);
			this.image_prf =this.ninjaImage;
		})

		this.loading = true;

		let timer = window.setTimeout(() => {
			this.loading = false;

			window.clearTimeout(timer)
		}, 1000)

		/*if (this.image_prf == null || this.image_prf == undefined) {
			this.image_prf = this.ninjaImage;
		}*/
		currentPage({empId: this.empId, ipAddress: this.ipaddress})
		.then(result => {
			if(result==''){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.perfMangt = false;
				this.home = true;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='internalMeeting'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = true;
				this.perfMangt = false;
				this.home = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='ticketManagement'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.perfMangt = false;
				this.home = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = true;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='performanceParentCmp'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.perfMangt = true;
				this.home = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='leaveContainer'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = true;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='certificationDWEMP'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = true;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='updateContact'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = true;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='employeeFeedback'){
				this.showMeetingfeedback = true;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=false;
			}
			if(result=='InterviewManagement'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=true;
				this.appreciationTemplate=false;
			}
			if(result=='appreciation'){
				this.showMeetingfeedback = false;
				this.showInternalMeet = false;
				this.home = false;
				this.perfMangt = false;
				this.certificate = false;
				this.showInductionDetails = false;
				this.leaveport = false;
				this.showLogin = false;
				this.showInductionDetails = false;
				this.showTicket = false;
				this.interviewTemplate=false;
				this.appreciationTemplate=true;
			}
		})
		.catch(error => {
			//console.log(error);
		});
	}
	/*profile(event) {
		var image = document.getElementById("output");
		image = URL.createObjectURL(event.target.files[0]);
		this.image_prf = image;
		console.log('image :: ', image);
		console.log('image 2 :: ', this.image_prf);
		empImg({empImage: this.image_prf}).then(result =>{
			console.log('emp Img ==>', result);
		}).catch(error =>{
			console.log('emp Img Error ==>', error);
		})		
	}*/

	profile(e) {

		var image = document.getElementById("output");
		image = URL.createObjectURL(e.target.files[0]);
		this.image_prf = image;
		const f = e.target.files[0];
		var reader = new FileReader();
		reader.onload = () => {
		  var base64 = reader.result.split(",")[1];
		  this.filedata = {
			filename: f.name,
			base64: base64,
			recordId: this.recId
		  };
		 // console.log(this.filedata);
		  // this.showSpinner = false;
		  this.upload();
		};
		//this.showSpinner = true;
		reader.readAsDataURL(f);
	  }

	  upload() {
		const b = this.filedata.base64;
		const f = this.filedata.filename;
		const r = this.filedata.recordId;
		// alert( base64, filename, recId );
		//console.log(b, f, r);
		fi({ base64: b, filename: f, recordId: r })
		  .then((res) => {
			//console.log("res :>> ", res);
			this.filedata = null;
		  }).catch(error =>{
			//console.log('err img upload : ',error);
		  });
		}
	page_2_back_handler() {
		this.page_1 = true;
	}
	page_1_next_handler() {
		this.page_1 = false;
	}
	setPage() {
		setPageName({ empId: this.empId, pageName: this.pgName, ipAddress: this.ipaddress})
			.then(result => {
				this.backIdtoHome = this.empId
				//console.log('Status==>', result);
			})
			.catch(error => {
				//console.log(error);
			});
	}
	companyPoliciesHandler(){
		const config = {
			type: 'standard__webPage',
			attributes: {
				url: 'https://drive.google.com/drive/folders/1jthFtMQum9DV825lV8m8Ss75mpPuXmzS'
			}
		};
		this[NavigationMixin.Navigate](config);
	}
	rewardHandler(){
		const config = {
			type: 'standard__webPage',
			attributes: {
				url: 'https://dazeworks.engageloop.in/login'
			}
		};
		this[NavigationMixin.Navigate](config);
	}
	payslipHandler(){
		const config = {
			type: 'standard__webPage',
			attributes: {
				url: 'https://mypayinfo.co.in/payroll/daze/emplogin.aspx'
			}
		};
		this[NavigationMixin.Navigate](config);
	}
	timsheetHandler(){
		const config = {
			type: 'standard__webPage',
			attributes: {
				url: 'https://ipeople.ilink-digital.com/ilinkdigital/zp#home/dashboard'
			}
		};
		this[NavigationMixin.Navigate](config);
	}
	internalMeeting() {
		this.pgName = 'internalMeeting';
		this.showInternalMeet = true;
		this.home = false;
		this.certificate = false;
		this.perfMangt - false;
		this.showMeetingfeedback = false;
		this.interviewTemplate=false;
		this.showTicket = false;
		this.leaveport = false;
		this.showInductionDetails = false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'InternalMeeting';
		//this.lastPageHandler();
	}

	showTicketHandler() {
		this.pgName = 'ticketManagement';
		this.showTicket = true;
		this.home = false;
		this.certificate = false;
		this.perfMangt - false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.leaveport = false;
		this.showInductionDetails = false;
		this.interviewTemplate=false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'TicketManagement';
		//this.lastPageHandler();
	}


	perfMangtHandler() {
		this.pgName = 'performanceParentCmp';
		this.perfMangt = true;
		this.home = false;
		this.certificate = false;
		this.leaveport = false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.interviewTemplate=false;
		this.showLogin = false;
		this.showTicket = false;
		this.showInductionDetails = false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//console.log('rec Id for emp portal home', this.recId);
		//console.log('emp id for perform', this.empId);
		//this.currentPageName = "EmployeePerformanceManagement";
		//this.lastPageHandler();
	}

	applyLeave() {
		//console.log('emi id for leave apply com::>', this.empId);
		this.pgName = 'leaveContainer';
		this.home = false;
		this.leaveport = true;
		this.perfMangt = false;
		this.certificate = false;
		this.showInductionDetails = false;
		this.showLogin = false;
		this.showTicket = false;
		this.showMeetingfeedback = false;
		this.interviewTemplate=false;
		this.showInternalMeet = false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'LeavePortal';
		//this.lastPageHandler();
	}

	homehandler() {
		this.home = true;
		this.showInductionDetails = false;
		this.certificate = false;
		this.leaveport = false;
		this.perfMangt = false;
		this.showLogin = false;
		this.showTicket = false;
		this.interviewTemplate=false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.appreciationTemplate=false;
		resetPageName({ empId: this.empId, ipAddress: this.ipaddress })
			.then(result => {
				this.backIdtoHome = this.empId
				//console.log('Status==>', result);
			})
			.catch(error => {
				//console.log(error);
			});
		//this.connectedCallback();
	}

	certificatehandler() {
		this.pgName = 'certificationDWEMP';
		this.home = false;
		this.certificate = true;
		this.showInductionDetails = false;
		this.leaveport = false;
		this.showLogin = false;
		this.perfMangt = false;
		this.showInductionDetails = false;
		this.showTicket = false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.interviewTemplate=false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'certification';
		//this.lastPageHandler();
	}


	inductionHandler() {
		this.pgName = 'updateContact';
		//console.log('emp id for induction form::', this.empId);
		this.showInductionDetails = true;
		this.home = false;
		this.showLogin = false;
		this.certificate = false;
		this.perfMangt = false;
		this.leaveport = false;
		this.showTicket = false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.interviewTemplate=false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'InductionForm';
		//this.lastPageHandler();

	}
	logoutResult;
	logoutHandler() {
		//console.log('empId in logout Handler :: ',this.empId);
		logout({ empId: this.empId, ipAddress: this.ipaddress })
			.then(result => {
				this.logoutResult = result
				window.location.reload();
				//console.log('result in logout handler :: ',result);
			})
			.catch(error => {
				//console.log('error in logout handler :: ',error);
			})

	}
	showMeetingfeedbackHandler() {
		this.pgName = 'employeeFeedback';
		this.showMeetingfeedback = true;
		this.showInternalMeet = false;
		this.home = false;
		this.certificate = false;
		this.showInductionDetails = false;
		this.perfMangt = false;
		this.leaveport = false;
		this.showLogin = false;
		this.showInductionDetails = false;
		this.showTicket = false;
		this.interviewTemplate=false;
		this.appreciationTemplate=false;
		this.setPage();
		//this.connectedCallback();
		//this.currentPageName = 'MeetingsFeedback';
		//this.lastPageHandler();
	}

	lastPageHandler(){
		//console.log('Current Page :: ',this.currentPageName);
		setPageName({ empId: this.empId, pageName: this.currentPageName }).then(result=> {
			//console.log('result of current page :: ', result);
	}).catch (error => {
		//console.log('error of current page :: ', error);
	});
	}

	
	interviewTemplateHandler(){
		this.interviewTemplate=true;
		this.pgName = 'InterviewManagement';
		this.showTicket = false;
		this.home = false;
		this.certificate = false;
		this.perfMangt - false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.leaveport = false;
		this.showInductionDetails = false;
		this.appreciationTemplate=false;
		this.setPage();
	}
	appreciationHandler(){
		this.appreciationTemplate=true;
		this.interviewTemplate=false;
		this.pgName = 'appreciation';
		this.showTicket = false;
		this.home = false;
		this.certificate = false;
		this.perfMangt - false;
		this.showMeetingfeedback = false;
		this.showInternalMeet = false;
		this.leaveport = false;
		this.showInductionDetails = false;
		this.setPage();
	}
}