/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-07-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-02-2022   Shivam Kumar   Initial Version
**/
import { LightningElement,track,wire,api} from 'lwc';
import getLeave from '@salesforce/apex/Leavedashboard.LeaveDashboard_1';
import { NavigationMixin } from 'lightning/navigation';
import getLeaveDetails from '@salesforce/apex/Leavedashboard.getLeaveDetails';
import onRecord from '@salesforce/resourceUrl/noRecords';
const options = [
		{label:'---None---', value:''},
		{ label:'Submit for Approval', value:'Submit for Approval' },
		{ label:'Approved', value:'Approved' },
		{ label:'Rejected', value:'Rejected' }
];
const options1 = [
		{label:'---None---', value:''},
		{ label:'2018-2019', value:'2018-2019' },
		{ label:'2019-2020', value:'2019-2020' },
		{ label:'2020-2021', value:'2020-2021' },
		{ label:'2021-2022', value:'2021-2022' },
		{ label:'2022-2023', value:'2022-2023' },
		{ label:'2023-2024', value:'2023-2024' },
		{ label:'2024-2025', value:'2024-2025' },
		{ label:'2025-2026', value:'2025-2026' },
		{ label:'2026-2027', value:'2026-2027' },
		{ label:'2027-2028', value:'2027-2028' },
		{ label:'2028-2029', value:'2028-2029' },
		{ label:'2029-2030', value:'2029-2030' }
];
const options2 = [
		{label:'---None---', value:''},
		{ label:'January', value:'1' },
		{ label:'February', value:'2' },
		{ label:'March', value:'3' },
		{ label:'April', value:'4' },
		{ label:'May', value:'5' },
		{ label:'June', value:'6' },
		{ label:'July', value:'7' },
		{ label:'August', value:'8' },
		{ label:'September', value:'9' },
		{ label:'October', value:'10' },
		{ label:'November', value:'11' },
		{ label:'December', value:'12' }
];

export default class GetDataDisplayData extends NavigationMixin(LightningElement) {
    //@track empId =  '0031s00000gG9tBAAS';
   // @track empid = 'DW11242';
    @api empid;
    @track LeaveDataList;
    @track sickLeave;
    @track earnedLeave;
    @track casualLeave;
    @track optOutLeave;
    //@track TotalLeaveBalance;
    onRecord=onRecord;
    connectedCallback(){
        //console.log('inside db::'+this.empid);
        getLeave({empId:this.empid})
        .then(data=>{
            if (data) {
                this.LeaveDataList = data;
                this.optOutLeave =data[0].Optout_For_Leave__c;
                //console.log('optout'+ data[0].Optout_For_Leave__c);
                this.sickLeave = data[0].Sick_Leave_Balance__c;
                this.earnedLeave = data[0].Earned_Leave_Balance__c;
                this.casualLeave = data[0].CasualLeaveBalance__c;
                //this.TotalLeaveBalance = data[0].Total_leave_balance__c;
               // console.log(this.TotalAnnualLeave);
                //console.log(data);  
            } 
            else if (error) {
                //console.log(error);
            }
            //this.LeaveList=result;
            //return refreshApex(this.LeaveList);
        })
        .catch(error =>{
            //console.log('check error::'+error);
           // console.log('check error::'+error.message);
            ////this.errorMsg=error.message;
        });


        this.currentYear=new Date().getFullYear();
        let mon = new Date().getMonth();
        mon=mon+1;
        //console.log('current month',this.currentMonth);
        var nextYear =this.currentYear+1;
        var CurrentYearSession = this.currentYear+'-'+nextYear;
        this.sessionValue=CurrentYearSession;
        this.monthValue=mon.toString();
        //console.log('the month is '+this.monthValue);
        //console.log('the sesson is '+this.sessionValue);
        this.gettingData();
    }

    @api
    refreshDashboard(){
        getLeave({empId:this.empid})
        .then(data=>{
            if (data) {
                this.LeaveDataList = data;
                this.sickLeave = data[0].Sick_Leave_Balance__c;
                this.earnedLeave = data[0].Earned_Leave_Balance__c;
                this.casualLeave = data[0].CasualLeaveBalance__c;
                //this.TotalLeaveBalance = data[0].Total_leave_balance__c;
                //console.log(this.TotalAnnualLeave);
               // console.log(data); 
            } 
            else if (error) {
                //console.log(error);
            }
            //this.LeaveList=result;
            //return refreshApex(this.LeaveList);
        })
        .catch(error =>{
            //console.log('check error::'+error);
           // console.log('check error::'+error.message);
            //this.errorMsg=error.message;
        });
    }
    isModal=false;
    isModalHandler(){
        this.isModal=true;
    }
    closeModal(){
        this.isModal=false;
    }

    /////////////////////////////////////////Manage Leave Data////////////////////

    @track recordEnd = 0;
    @track recordStart = 0;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track loaderSpinner = false;
    @track pageSize = 15;    
    @track isPrev = true;
    @track isNext = true;
    sessionValue;
    data;
    monthValue;
    sortedColumn;
    sortedDirection = 'asc';
    sessionOptions=options1;
    statusValue;
    statusOptions=options;
    monthOptions=options2;

    EmpName;
    empRecId;
    currentYear;

    handleChange(event) {
            this.value = event.detail.value;
    }
    meetingSelection(event){
            this.EmpName = event.detail.selectedValue;  
            this.empRecId = event.detail.selectedRecordId;  
            //console.log('con Id>>'+this.empRecId);
            this.gettingData();
    }
    handleStatusChange(event){
            //console.log('the status is==>',event.target.value);
            this.statusValue=event.target.value;
            //console.log('the status assigned is==>',this.statusValue);
            this.gettingData();
    }
    handleSessionChange(event){
            //console.log('the status is==>',event.target.value);
            this.sessionValue=event.target.value;
            //console.log('the status assigned is==>',this.sessionValue);
            this.gettingData();
    }
    handleMonthChange(event){
            //console.log('the month is==>',event.target.value);
            this.monthValue=event.target.value;
            //console.log('the month assigned is==>',this.monthValue);
            this.gettingData();
    }
     handlePageNextAction(){
    this.pageNumber = this.pageNumber+1;
    this.gettingData();
}
handlePagePrevAction(){
    this.pageNumber = this.pageNumber-1;
    this.gettingData();
}
    
    viewRecord(event) {
            let rec = event.target.dataset.id;
            //console.log('the data set===>',rec);
            this[NavigationMixin.GenerateUrl]({
        type: 'standard__recordPage',
        attributes: {
            recordId: rec,
                            objectApiName: "Leave__c",
            actionName: "view",
        },
    }).then((url) => {
        window.open(url) 
    });
            /*const config = {
  type: "standard__recordPage",
  attributes: {
    recordId:this.recId ,
    objectApiName: "Leave__c",
    actionName: "view"
  }
};
this[NavigationMixin.Navigate](config);*/
}
   /* connectedCallback(){
            this.currentYear=new Date().getFullYear();
            let mon = new Date().getMonth();
            mon=mon+1;
            //console.log('current month',this.currentMonth);
            var nextYear =this.currentYear+1;
            var CurrentYearSession = this.currentYear+'-'+nextYear;
            this.sessionValue=CurrentYearSession;
            this.monthValue=mon.toString();
            //console.log('the month is '+this.monthValue);
            //console.log('the sesson is '+this.sessionValue);
            this.gettingData();
    }*/
    gettingData(){
            this.loaderSpinner = true;
            getLeaveDetails({filSession:this.sessionValue,empId:this.empRecId,filStatus:this.statusValue,monthFilter:this.monthValue,pageSize: this.pageSize, pageNumber : this.pageNumber,currentEmployeeId : this.empid})
                    .then(result =>{
                    this.loaderSpinner = true;
                    if(result){
                            this.data=result.lvData;
                            this.recordEnd = result.recordEnd;
                            this.totalRecords = result.totalRecords;
                            this.recordStart = result.recordStart;
                            this.pageNumber = result.pageNumber;                
            this.totalPages = Math.ceil(result.totalRecords / this.pageSize);
            this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
            this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
                            //console.log('the data is',JSON.stringify(result));
                    }
            })
                    .catch(error => {
                    //console.log('check error::' + JSON.stringify(error));
                   // console.log('check error::' + error.message);
            });
    }
    get isDisplayNoRecords() {
    var isDisplay = true;
    if(this.data){
        if(this.data.length == 0){
            isDisplay = true;
        }else{
            isDisplay = false;
        }
    }
    return isDisplay;
}
    sortRecs( event ) {
            let colName = event.currentTarget.dataset.id;
            //console.log( 'Column Name is ',colName);
            if ( this.sortedColumn === colName) {
                    this.sortedDirection = ( this.sortedDirection === 'asc' ? 'desc' : 'asc' );
            }
            else {
                    this.sortedDirection = 'asc';
            }
            //console.log('sortedColumn ==>',this.sortedColumn);
            //console.log('sortedDirection ==>',this.sortedDirection);
            let isReverse = this.sortedDirection === 'asc' ? 1 : -1;
            //console.log('IsReverse',isReverse);
            this.sortedColumn = colName;
            //console.log('sortedColumn ==>',this.sortedColumn);
            // sort the data
            this.data = JSON.parse(JSON.stringify(this.data)).sort((a, b) => {
                    a = a[colName] ? a[colName].toLowerCase() : ''; // Handle null values
                    b = b[colName] ? b[colName].toLowerCase() : '';

                    return a > b ? 1 * isReverse : -1 * isReverse;
            });;
            //console.log('the data that is getting sorted is ==>',JSON.stringify(this.data));
    }
  
}