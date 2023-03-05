import { LightningElement, track, wire,api} from 'lwc';
import insertTimecards from '@salesforce/apex/Timet.insertTimecards';
import saveTimesheet from '@salesforce/apex/Timet.saveTimesheet';
import pickListValueDynamically from '@salesforce/apex/Timet.pickListValueDynamically';
import getProjects from '@salesforce/apex/Timet.getProjects';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import getTimesheet from '@salesforce/apex/Timet.getTimesheet';
import createTimecard from '@salesforce/apex/Timet.createTimecard';
import getTimeCard from '@salesforce/apex/Timet.getTimeCard';
import statusUpdate from '@salesforce/apex/Timet.updateStatus';
import ReceivesAdminInfoEmails from '@salesforce/schema/User.ReceivesAdminInfoEmails';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
export default class Timesheet extends NavigationMixin(LightningElement) {    

    @track listOfTimecards = [];
    @track globalTimesheet = [];
    @track selectedWeekDate = '2020-11-16';
    @api employID;
    @api empname;
    hoursTodisplay= '';
    Projectname='';
    popUpStartTime = '';
    popUpEndTime = '';
    showRow= false;
    popUpDescription = '';
    selectedNProjectame = '';
    selectedPopUpDate = '';
    popUpSelectedDay ='';
    popUpSelectedRow = '';
    popUpActivityType = '';
    popUpBillable = false;
    TimesheetDate= '';
    WeekStartDate='';
    WeekEndDate='';
   
    mon;
    tues;
    wed;
    thur;
    fri;
    sat;
    sun;
    totalAll = 0;
    totalMonday = 0;
    totalTuesday = 0;
    totalWednesday= 0;
    totalThrusday= 0;
    totalFriday= 0;
    totalSaturday= 0;
    totalSunday= 0;
    start_to_end=0;
    openModalApproveRaw=false;
    commentApprove='';
    commentReject='';
    commentApproveAll='';
    commentRejectALL='';
    @api empemail;

    @track isModalOpen = false;
    @track projectOptions = [];
    @track hourValue = '';
    isToggle=false;
    @track isDisabled=true;
	
	urlId = null;
    urlLanguage = null;
    urlType = null;
    urlStateParameters='';
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          //console.log('inside cp::'+this.urlStateParameters.c__email);
          //console.log('inside cp::'+this.urlStateParameters.c__startDate);
          //console.log('inside cp::'+this.urlStateParameters.c__endDate);
          //this.setParametersBasedOnUrl();
       }
    }
	
	
    handleToggle(event){
        //console.log('inside handle toggle::'+event.target.checked);
        var isChecked=event.target.checked;
        if(isChecked){
            this.isDisabled=false;
            this.isToggle=true;
        }
        else{
            this.isDisabled=true;
            this.isToggle=false;
        }
    }
    selectedRecordId; //store the record id of the project 
    selectedDate;
	openmodelForReject=false;
    openModalForApprove=false;

    handleDate(event){
        this.selectedWeekDate = event.target.value;
        //console.log('test>>>'+this.selectedWeekDate);
        var dateString  = this.selectedWeekDate;
        var dateList = dateString.split('-');
        var newDate = new Date(dateList[0],dateList[1]-1,dateList[2],0,0,0);
        var seven_date = newDate.getDate();
        var curr_month = newDate.getMonth();
        var curr_year = newDate.getFullYear();
        newDate = new Date(curr_year,curr_month,seven_date);
        //console.log('newDate'+newDate);
        this.fetchDatesOfWeek(newDate);
       
    }

    @wire(getProjects)
    projectList({data,error})
    {
       if (data) {
           for(const list of data){
               const option = {
                   label: list.Name,
                   value: list.Id
               };
               this.projectOptions = [ ...this.projectOptions, option ];
           }
       } 
       var curr = new Date;
       this.fetchDatesOfWeek(curr);
       
   }

   handleSave(){
        
        saveTimesheet({timesheetWeek: this.start_to_end,mon:this.mon,sun:this.sun})
            .then(result => {
                //console.log('inside saveTimesheet::'+result);
                //var res=result[0];
                if(result){
                    const evt = new ShowToastEvent({
                        title: 'success',
                        message: 'Timesheet inserted successfully!',
                        variant: 'success',
                    });
                    this.dispatchEvent(evt);
                    
                }
                else{
                    const event = new ShowToastEvent({
                        title: 'success',
                        message: 'Timesheet inserted failed! Please contact your system admin',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                }
                
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'success',
                    message: 'Timesheet inserted failed! Please contact your system admin',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });
    }
	
   fetchDatesOfWeek(curr){
    //console.log('Test'+curr);
    var mon = new Date(curr.setDate(curr.getDate() - curr.getDay()+1));
    var monthValue = parseInt(mon.getMonth()) + parseInt(1);
    this.selectedWeekDate =  mon.getFullYear()+'-'+monthValue+'-'+mon.getDate();    
    this.mon =  mon.getFullYear()+'-'+monthValue+'-'+mon.getDate();     
    this.WeekStartDate =  this.mon;
    
    
    var tues = new Date(curr.setDate(curr.getDate() - curr.getDay()+2));
    monthValue = parseInt(tues.getMonth()) + parseInt(1);
    this.tues =  tues.getFullYear()+'-'+monthValue+'-'+tues.getDate();

    var wed = new Date(curr.setDate(curr.getDate() - curr.getDay()+3));
    monthValue = parseInt(wed.getMonth()) + parseInt(1);
    this.wed =  wed.getFullYear()+'-'+monthValue+'-'+wed.getDate();

    var thur = new Date(curr.setDate(curr.getDate() - curr.getDay()+4));
    monthValue = parseInt(thur.getMonth()) + parseInt(1);
    this.thur =  thur.getFullYear()+'-'+monthValue+'-'+thur.getDate();

    var fri = new Date(curr.setDate(curr.getDate() - curr.getDay()+5));
    monthValue = parseInt(fri.getMonth()) + parseInt(1);
    this.fri =  fri.getFullYear()+'-'+monthValue+'-'+fri.getDate();

    var sat = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
    monthValue = parseInt(sat.getMonth()) + parseInt(1);
    this.sat =  sat.getFullYear()+'-'+monthValue+'-'+sat.getDate();

    var sun = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
    monthValue = parseInt(sun.getMonth()) + parseInt(1);
    this.sun =  sun.getFullYear()+'-'+monthValue+'-'+sun.getDate();
    this.WeekEndDate = this.sun;

    this.start_to_end = this.mon+" - "+ this.sun;

   }
   currWeek(){
    
    var newDate =  new Date;
    //console.log('newDate1b'+newDate);
    for(let i = 0; i < this.listOfTimecards.length; i++) {
        if(this.listOfTimecards[i].Project==null || this.listOfTimecards[i].Project==''){
            this.listOfTimecards[i].showRow= true;

        }
    }
    this.fetchDatesOfWeek(newDate);
    this.fetchTimesheet();
  
   }
   nextWeek(){

        //console.log('newDate1 sele'+this.selectedWeekDate);
        var dateString  = this.selectedWeekDate;
        var dateList = dateString.split('-');
        var newDate = new Date(dateList[0],dateList[1]-1,dateList[2],0,0,0);
        var seven_date = newDate.getDate()+7;
        var curr_month = newDate.getMonth();
        var curr_year = newDate.getFullYear();
        newDate = new Date(curr_year,curr_month,seven_date);
        //console.log('newDate'+newDate);
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            if(this.listOfTimecards[i].Project==null || this.listOfTimecards[i].Project==''){
                this.listOfTimecards[i].showRow= true;
    
            }
        }
        this.fetchDatesOfWeek(newDate);

        //console.log('newDate1 sele'+this.WeekStartDate);
        //console.log('newDate2 sele'+this.WeekEndDate);
        
        this.fetchTimesheet();

   }

   fetchTimesheet(){
       //console.log('inside ft::'+this.WeekStartDate);
       //console.log('inside ft::'+this.WeekEndDate);
    var tempTimesheet=[];
    var tempStartDate;
    var tempEndDate;
    getTimesheet({
        startDate: this.WeekStartDate, endDate: this.WeekEndDate, userEmail:this.empemail
    })
        .then(data => {
            //console.log('inside gettimesheet::'+JSON.stringify(data));
            tempTimesheet=data;
            var tempStartEnddate;
            if(tempTimesheet.length>0){
                tempStartDate=tempTimesheet[0].WeekStartDate;
                tempEndDate=tempTimesheet[0].WeekEndDate;
                tempStartEnddate=tempStartDate+' - '+tempEndDate;
            }
            else{
                tempStartDate=this.WeekStartDate;
                tempEndDate=this.WeekEndDate;
                tempStartEnddate=tempStartDate+' - '+tempEndDate;
            }
            
            //console.log('inside tempStartEnddate::'+tempStartEnddate);
            var tempBoolean=false;
    //console.log('inside 1st::'+JSON.stringify(this.globalTimesheet));
    if(this.globalTimesheet.length>0){
        for(var i=0;i<this.globalTimesheet.length;i++){
            //console.log('inside timesheet:'+this.globalTimesheet[i].start_to_end);
            if(this.globalTimesheet[i].start_to_end==tempStartEnddate){
                this.listOfTimecards=this.globalTimesheet[i].listOfTimecards;
                this.totalMonday=this.globalTimesheet[i].totalMonday;
                this.totalTuesday=this.globalTimesheet[i].totalTuesday;
                this.totalWednesday=this.globalTimesheet[i].totalWednesday;
                this.totalThrusday=this.globalTimesheet[i].totalThrusday;
                this.totalFriday=this.globalTimesheet[i].totalFriday;
                this.totalSaturday=this.globalTimesheet[i].totalSaturday;
                this.totalSunday=this.globalTimesheet[i].totalSunday;
                this.totalAll=parseFloat(this.totalMonday)+parseFloat(this.totalTuesday)+parseFloat(this.totalWednesday)+parseFloat(this.totalThrusday)+parseFloat(this.totalFriday)+parseFloat(this.totalSaturday)+parseFloat(this.totalSunday);
                tempBoolean=true;
            }
        }
    }
    
    if(!tempBoolean && tempTimesheet.length==0){
        //console.log('inside false');
            let timeCardObject = {};
            this.listOfTimecards=[];
        if(this.listOfTimecards.length > 0) {
            timeCardObject.index = this.listOfTimecards[this.listOfTimecards.length - 1].index + 1;
        } else {
            timeCardObject.index = 1;
        }
        timeCardObject.Project = null;
        timeCardObject.Mon = {};
        timeCardObject.Tue = {};
        timeCardObject.Wed = {};
        timeCardObject.Thu = {};
        timeCardObject.Fri = {};
        timeCardObject.Sat = {};
        timeCardObject.Sun = {};
        timeCardObject.totalHours = '';
        timeCardObject.TimesheetDate = null;
        
        //this.listOfTimecards = [ ...this.listOfTimecards, timeCardObject ];
        this.listOfTimecards.push(timeCardObject);
        var globalTimecard={};
        globalTimecard.totalMonday='';
        globalTimecard.totalTuesday='';
        globalTimecard.totalWednesday='';
        globalTimecard.totalThrusday='';
        globalTimecard.totalFriday='';
        globalTimecard.totalSaturday='';
        globalTimecard.totalSunday='';
        globalTimecard.start_to_end=this.start_to_end;
        globalTimecard.listOfTimecards=this.listOfTimecards;
        this.totalMonday='';
        this.totalTuesday='';
        this.totalWednesday='';
        this.totalThrusday='';
        this.totalFriday='';
        this.totalSaturday='';
        this.totalSunday='';
        this.totalAll='';
        this.globalTimesheet.push(globalTimecard);
        //console.log('inside this.globalTimesheet::'+JSON.stringify(this.globalTimesheet));
    }
    else if(!tempBoolean && tempTimesheet.length>0){
        //console.log('inside true');
        var totalMon=0;
        var totalTue=0;
        var totalWed=0;
        var totalThu=0;
        var totalFri=0;
        var totalSat=0;
        var totalSun=0;
        this.listOfTimecards=[];
        for(var i=0; i<tempTimesheet.length;i++){
            var tempTotalHours=0;
            let timeCardObject={};
            timeCardObject.Mon = {};
            timeCardObject.Tue = {};
            timeCardObject.Wed = {};
            timeCardObject.Thu = {};
            timeCardObject.Fri = {};
            timeCardObject.Sat = {};
            timeCardObject.Sun = {};
            timeCardObject.totalHours = '';
            timeCardObject.TimesheetDate = null;

            timeCardObject.index = tempTimesheet[i].index;
            timeCardObject.timesheetId = tempTimesheet[i].timesheetId;
            timeCardObject.Project = tempTimesheet[i].Project;
            if(tempTimesheet[i].Mon){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Mon.timeCrardId;
                timeCardObject.Mon.ActivityType=tempTimesheet[i].Mon.ActivityType;
                timeCardObject.Mon.Billable=tempTimesheet[i].Mon.Billable;
                timeCardObject.Mon.Description=tempTimesheet[i].Mon.Description;
                timeCardObject.Mon.hour=tempTimesheet[i].Mon.hour;
                timeCardObject.Mon.projectBillable=tempTimesheet[i].Mon.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Mon.hour);
                totalMon=totalMon+parseFloat(tempTimesheet[i].Mon.hour);
                timeCardObject.MonAvail=true;
            }
            if(tempTimesheet[i].Tue){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Tue.timeCrardId;
                timeCardObject.Tue.ActivityType=tempTimesheet[i].Tue.ActivityType;
                timeCardObject.Tue.Billable=tempTimesheet[i].Tue.Billable;
                timeCardObject.Tue.Description=tempTimesheet[i].Tue.Description;
                timeCardObject.Tue.hour=tempTimesheet[i].Tue.hour;
                timeCardObject.Tue.projectBillable=tempTimesheet[i].Tue.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Tue.hour);
                totalTue=totalTue+parseFloat(tempTimesheet[i].Tue.hour);
                timeCardObject.TueAvail=true;
            }
            if(tempTimesheet[i].Wed){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Wed.timeCrardId;
                timeCardObject.Wed.ActivityType=tempTimesheet[i].Wed.ActivityType;
                timeCardObject.Wed.Billable=tempTimesheet[i].Wed.Billable;
                timeCardObject.Wed.Description=tempTimesheet[i].Wed.Description;
                timeCardObject.Wed.hour=tempTimesheet[i].Wed.hour;
                timeCardObject.Wed.projectBillable=tempTimesheet[i].Wed.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Wed.hour);
                totalWed=totalWed+parseFloat(tempTimesheet[i].Wed.hour);
                timeCardObject.WedAvail=true;
            }
            if(tempTimesheet[i].Thu){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Thu.timeCrardId;
                timeCardObject.Thu.ActivityType=tempTimesheet[i].Thu.ActivityType;
                timeCardObject.Thu.Billable=tempTimesheet[i].Thu.Billable;
                timeCardObject.Thu.Description=tempTimesheet[i].Thu.Description;
                timeCardObject.Thu.hour=tempTimesheet[i].Thu.hour;
                timeCardObject.Thu.projectBillable=tempTimesheet[i].Thu.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Thu.hour);
                totalThu=totalThu+parseFloat(tempTimesheet[i].Thu.hour);
                timeCardObject.ThuAvail=true;
            }
            if(tempTimesheet[i].Fri){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Fri.timeCrardId;
                timeCardObject.Fri.ActivityType=tempTimesheet[i].Fri.ActivityType;
                timeCardObject.Fri.Billable=tempTimesheet[i].Fri.Billable;
                timeCardObject.Fri.Description=tempTimesheet[i].Fri.Description;
                timeCardObject.Fri.hour=tempTimesheet[i].Fri.hour;
                timeCardObject.Fri.projectBillable=tempTimesheet[i].Fri.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Fri.hour);
                totalFri=totalFri+parseFloat(tempTimesheet[i].Fri.hour);
                timeCardObject.FriAvail=true;
            }
            if(tempTimesheet[i].Sat){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Sat.timeCrardId;
                timeCardObject.Sat.ActivityType=tempTimesheet[i].Sat.ActivityType;
                timeCardObject.Sat.Billable=tempTimesheet[i].Sat.Billable;
                timeCardObject.Sat.Description=tempTimesheet[i].Sat.Description;
                timeCardObject.Sat.hour=tempTimesheet[i].Sat.hour;
                timeCardObject.Sat.projectBillable=tempTimesheet[i].Sat.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Sat.hour);
                totalSat=totalSat+parseFloat(tempTimesheet[i].Sat.hour);
                timeCardObject.SatAvail=true;
            }
            if(tempTimesheet[i].Sun){
                timeCardObject.Mon.timeCrardId=tempTimesheet[i].Sun.timeCrardId;
                timeCardObject.Sun.ActivityType=tempTimesheet[i].Sun.ActivityType;
                timeCardObject.Sun.Billable=tempTimesheet[i].Sun.Billable;
                timeCardObject.Sun.Description=tempTimesheet[i].Sun.Description;
                timeCardObject.Sun.hour=tempTimesheet[i].Sun.hour;
                timeCardObject.Sun.projectBillable=tempTimesheet[i].Sun.projectBillable;
                tempTotalHours=tempTotalHours+parseFloat(tempTimesheet[i].Sun.hour);
                totalSun=totalSun+parseFloat(tempTimesheet[i].Sun.hour);
                timeCardObject.SunAvail=true;
            }
            timeCardObject.totalHours=tempTotalHours;
            this.listOfTimecards.push(timeCardObject);
            
        }

        this.totalMonday=totalMon;
        this.totalTuesday=totalTue;
        this.totalWednesday=totalWed;
        this.totalThrusday=totalThu;
        this.totalFriday=totalFri;
        this.totalSaturday=totalSat;
        this.totalSunday=totalSun;
        this.totalAll=totalMon+totalTue+totalWed+totalThu+totalFri+totalSat+totalSun;
        var globalTimecard={};
        globalTimecard.totalMonday=totalMon;
        globalTimecard.totalTuesday=totalTue;
        globalTimecard.totalWednesday=totalWed;
        globalTimecard.totalThrusday=totalThu;
        globalTimecard.totalFriday=totalFri;
        globalTimecard.totalSaturday=totalSat;
        globalTimecard.totalSunday=totalSun;
        globalTimecard.start_to_end=this.start_to_end;
        globalTimecard.listOfTimecards=this.listOfTimecards;
        this.globalTimesheet.push(globalTimecard);
        //this.globalTimesheet.push(globalTimecard);
    }



        })
        .catch(error => {
            //console.log(error);
        });

    
   }


   prevWeek(){
        var dateString  = this.selectedWeekDate;
        var dateList = dateString.split('-');
        var newDate = new Date(dateList[0],dateList[1]-1,dateList[2],0,0,0);
        var seven_date = newDate.getDate()-7;
        var curr_month = newDate.getMonth();
        var curr_year = newDate.getFullYear();
        newDate = new Date(curr_year,curr_month,seven_date);
        //console.log('newDate'+newDate);
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            if(this.listOfTimecards[i].Project==null || this.listOfTimecards[i].Project==''){
                this.listOfTimecards[i].showRow= true;
    
            }
        }
        this.fetchDatesOfWeek(newDate);
    
        
        this.fetchTimesheet();
   }


    connectedCallback() {
        //console.log('loginEmailShivam:::>>>>'+ this.empemail);
        //console.log('loginEmailShivam:::>>>>'+ this.empname);
        //console.log('Shivam:::>>>>'+ this.employID);
        this.initData();
        //console.log('loginEmailShivam:::>2>>>'+ this.empemail);
        
        var curr = new Date;
        var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6)); 
        //console.log(firstday);
        //console.log(lastday);
        

    }
    handleValueSelected(event) {
        this.selectedRecordId = event.detail;
    }

    validateLookupField() {
        this.template.querySelector('c-custom-lookup').isValid();
    }

   

    initData() {
        //let listOfTimecards = [];
       //console.log('loginEmailShivam:::>>>>'+ this.empemail);
        this.createRow(this.listOfTimecards);
       // this.listOfTimecards = listOfTimecards;
    }

    @track picklistVal;
	
	selectOptionChanveValue(event){       
      // this.picklistVal = event.target.value;
       this.popUpActivityType = event.target.value;
       //console.log('Activity::'+this.popUpActivityType);
   }  

 
@wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Timecard__c'},
selectPicklistApi: 'Activity_Type__c'}) selectTargetValues;
    
  selectOptionChangeValue(event){       
      // this.picklistVal = event.target.value;
       this.popUpActivityType = event.target.value;
       //console.log('Activity::'+this.popUpActivityType);
   }  

    createRow(listOfTimecards) {
        let timeCardObject = {};
        if(this.listOfTimecards.length > 0) {
            timeCardObject.index = this.listOfTimecards[this.listOfTimecards.length - 1].index + 1;
        } else {
            timeCardObject.index = 1;
        }
        timeCardObject.Project = null;
        timeCardObject.Mon = {};
        timeCardObject.Tue = {};
        timeCardObject.Wed = {};
        timeCardObject.Thu = {};
        timeCardObject.Fri = {};
        timeCardObject.Sat = {};
        timeCardObject.Sun = {};
        timeCardObject.totalHours = null;
        timeCardObject.projectBillable = false;
        timeCardObject.TimesheetDate = null;
        //this.listOfTimecards = [ ...this.listOfTimecards, timeCardObject ];
        this.listOfTimecards.push(timeCardObject);
        var globalTimecard={};
        globalTimecard.start_to_end=this.start_to_end;
        globalTimecard.listOfTimecards=this.listOfTimecards;
        this.globalTimesheet.push(globalTimecard);
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            if(this.listOfTimecards[i].Project==null || this.listOfTimecards[i].Project==''){
                this.listOfTimecards[i].showRow= true;
    
            }
        }
        //console.log('this.listOfTimecards::'+JSON.stringify(this.listOfTimecards));
        
}

    
    addNewRow() {      
        this.createRow(this.listOfTimecards);
       
    }

    /**
     * Removes the selected row
     */
    

    

    totalHoursCal(){
        var Mon;
        var Tue;
        var wed;
        var thru;
        var fri;
        var sat;
        var sun;
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            //console.log('timecard>>>>>>>>>>' + this.listOfTimecards[i]['Mon'].hour);
            
                //Mon = parseFloat(this.listOfTimecards[i]['Mon'].hour);
            
            
                Mon = parseFloat(this.listOfTimecards[i]['Mon'].hour != null?this.listOfTimecards[i]['Mon'].hour:0);
                Tue = parseFloat(this.listOfTimecards[i]['Tue'].hour != null?this.listOfTimecards[i]['Tue'].hour:0);
                wed = parseFloat(this.listOfTimecards[i]['Wed'].hour != null?this.listOfTimecards[i]['Wed'].hour:0);
                thru = parseFloat(this.listOfTimecards[i]['Thu'].hour != null?this.listOfTimecards[i]['Thu'].hour:0);
                fri = parseFloat(this.listOfTimecards[i]['Fri'].hour != null?this.listOfTimecards[i]['Fri'].hour:0);
                sat = parseFloat(this.listOfTimecards[i]['Sat'].hour != null?this.listOfTimecards[i]['Sat'].hour:0);
                sun = parseFloat(this.listOfTimecards[i]['Sun'].hour != null?this.listOfTimecards[i]['Sun'].hour:0);
                this.listOfTimecards[i].totalHours = Mon + Tue + wed + thru + fri + sat + sun;
                
        }
        var totalMonday = 0;
        var totalAll = 0;
        var totalTuesday= 0;
        var totalWednesday= 0;
        var totalThrusday= 0;
        var totalFriday= 0;
        var totalSaturday= 0;
        var totalSunday= 0;
        for(let i=0;i<this.listOfTimecards.length;i++){
            totalMonday += parseFloat(this.listOfTimecards[i]['Mon'].hour != null?this.listOfTimecards[i]['Mon'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Mon'].hour != null?this.listOfTimecards[i]['Mon'].hour:0);
            totalTuesday += parseFloat(this.listOfTimecards[i]['Tue'].hour != null?this.listOfTimecards[i]['Tue'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Tue'].hour != null?this.listOfTimecards[i]['Tue'].hour:0);
            totalWednesday += parseFloat(this.listOfTimecards[i]['Wed'].hour != null?this.listOfTimecards[i]['Wed'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Wed'].hour != null?this.listOfTimecards[i]['Wed'].hour:0);
            totalThrusday += parseFloat(this.listOfTimecards[i]['Thu'].hour != null?this.listOfTimecards[i]['Thu'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Thu'].hour != null?this.listOfTimecards[i]['Thu'].hour:0);
            totalFriday += parseFloat(this.listOfTimecards[i]['Fri'].hour != null?this.listOfTimecards[i]['Fri'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Fri'].hour != null?this.listOfTimecards[i]['Fri'].hour:0);
            totalSaturday += parseFloat(this.listOfTimecards[i]['Sat'].hour != null?this.listOfTimecards[i]['Sat'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Sat'].hour != null?this.listOfTimecards[i]['Sat'].hour:0);
            totalSunday += parseFloat(this.listOfTimecards[i]['Sun'].hour != null?this.listOfTimecards[i]['Sun'].hour:0);
            totalAll += parseFloat(this.listOfTimecards[i]['Sun'].hour != null?this.listOfTimecards[i]['Sun'].hour:0);
        }

        
            this.totalMonday = totalMonday;
        
        this.totalTuesday = totalTuesday;
        this.totalWednesday = totalWednesday;
        this.totalThrusday = totalThrusday;
        this.totalFriday = totalFriday;
        this.totalSaturday = totalSaturday;
        this.totalSunday = totalSunday;
        this.totalAll = totalAll;
        if(this.globalTimesheet){
            for(var i=0;i<this.globalTimesheet.length;i++){
                if(this.globalTimesheet[i].start_to_end==this.start_to_end){
                    
                    this.globalTimesheet[i].totalMonday=this.totalMonday;
                    this.globalTimesheet[i].totalTuesday=this.totalTuesday;
                    this.globalTimesheet[i].totalWednesday=this.totalWednesday;
                    this.globalTimesheet[i].totalThrusday=this.totalThrusday;
                    this.globalTimesheet[i].totalFriday=this.totalFriday;
                    this.globalTimesheet[i].totalSaturday=this.totalSaturday;
                    this.globalTimesheet[i].totalSunday=this.totalSunday;
                }
            }
        }
    }

    handleInputChange(event) {
        let index = event.target.dataset.id;
        //console.log("index>>111>"+index);
        let fieldName = event.target.name;
        let fieldNameAvail = event.target.name+'Avail';
        let hourValue = event.target.value;
        var Mon;
        var Tue;
        var wed;
        var thru;
        var fri;
        var sat;
        var sun;

        //console.log("fieldname>>>"+fieldName);
        //console.log("hourValue>>>"+hourValue);

        for(let i = 0; i < this.listOfTimecards.length; i++) {
            if(this.listOfTimecards[i].index === parseInt(index)) {
                if(hourValue)
                    this.listOfTimecards[i][fieldName].hour = hourValue;
                else
                    this.listOfTimecards[i][fieldName].hour = 0;

                if(hourValue){
                    this.listOfTimecards[i][fieldNameAvail] = true;
                }else{
                    this.listOfTimecards[i][fieldNameAvail] = false;
                }
            }
        }
        
        
        
        this.totalHoursCal();



    }

    handleTask(event){
        var index = event.target.dataset.id;
        this.listOfTimecards[index-1].task=event.target.value;
    }


    openModal(event) {
        this.isModalOpen = true;
        var index = event.target.dataset.id;
        var dateModule = event.target.name;
        //console.log('inside dateModule::'+this.listOfTimecards[index-1].projectBillable);
        index = index-1;
        //this.listOfTimecards[i][fieldName] = value
        //console.log('index'+index);
        //console.log('this.listOfTimecards[index][dateModule].hour::'+this.listOfTimecards[index][dateModule].hour);
        
        this.selectedPopUpDate = event.target.dataset.title;
        //this.listOfTimecards[index][dateModule].selectedDate =  event.target.dataset.title;
        this.selectedProjectName = this.listOfTimecards[index].Project;
        //this.popUpStartTime =this.listOfTimecards[index][dateModule].StartTime;
       // this.popUpEndTime =this.listOfTimecards[index][dateModule].EndTime;
        this.popupHours=this.listOfTimecards[index][dateModule].hour;
        //this.listOfTimecards[index][dateModule].hour =  this.popUpEndTime-this.popUpStartTime;
       // this.listOfTimecards[index][dateModule]=  this.popUpEndTime-this.popUpStartTime;

        this.popUpSelectedDay =dateModule;
        this.popUpSelectedRow = index;
        this.popUpDescription=this.listOfTimecards[index][dateModule].Description;
        this.popUpBillable=this.listOfTimecards[index].projectBillable;
        this.popUpActivityType=this.listOfTimecards[index][dateModule].ActivityType;
        
       // this.TimesheetDate=this.WeekStartDate + '-' + this.WeekEndDate;
        // hoursTodisplay=this.listOfTimecards[index][dateModule].hour;
       //  console.log('hoursTodisplay>>>'+hoursTodisplay);
        //console.log('index::Big issue::'+JSON.stringify(this.listOfTimecards));
        //console.log('index'+index);
        

    }

    handleBillable(event){
        var index = event.target.name;
        //console.log(index);
        this.listOfTimecards[index-1].popUpBillable = event.target.checked;
        //this.popUpBillable = event.target.checked;
        //console.log('value of check'+this.popUpBillable);
    }
	
	closeModal(event){
        //console.log('inside close');
        this.openmodel=false;
    }

    handleClick(event){
        //console.log('inside click:'+event.currentTarget.dataset.id);
        this.openmodel=true;
    }


    

    submitDetails(event) {

        this.isModalOpen = false;
        
        var index = event.target.dataset.id;
        //console.log('inside submit::'+this.popUpSelectedDay);   
        
        //this.selectedPopUpDate = event.target.dataset.title;
        this.listOfTimecards[index-1][this.popUpSelectedDay].selectedDate =  this.selectedDate;
        this.listOfTimecards[index-1][this.popUpSelectedDay].Description=this.popUpDescription;
        this.listOfTimecards[index-1][this.popUpSelectedDay].ActivityType=this.popUpActivityType;

        //console.log('inside submit::'+JSON.stringify(this.listOfTimecards));   
        
                //console.log('inside createTimecard::');
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message:'Timecard created successfully!',
                    variant:'success'
                });
                this.dispatchEvent(evt);
            
    }

    createTimecards() {
        for(var i = 0; i < this.listOfTimecards.length; i++) {
            this.listOfTimecards[i].TimesheetDate=this.WeekStartDate + '/' + this.WeekEndDate;
            this.listOfTimecards[i].WeekStartDate=this.WeekStartDate;
            this.listOfTimecards[i].WeekEndDate=this.WeekEndDate;

        }
        //console.log('listToApex:::>>>'+JSON.stringify(this.listOfTimecards));
        var serverReq = JSON.stringify(this.listOfTimecards);
        insertTimecards({
            jsonOfListOfTimeCards: serverReq
        })
            .then(data => {
               // this.initData();
                let evt = new ShowToastEvent({
                    message: "Timesheet created successfully!",
                    variant: "success",
                    duration: 2000
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                //console.log(error);
            });
    }  
    handlePopUpStartTime(event){
        this.popUpStartTime = event.target.value;
    }
    handlePopUpEndTime(event){
        this.popUpEndTime = event.target.value;
    }
    handlepopUpDescription(event){
        this.popUpDescription = event.target.value;
    }
    handlepopUpBillable(event){
        //this.popUpBillable = event.target.checked;
        //console.log('value of check'+this.popUpBillable);
        var index = event.target.dataset.id;
        //console.log(index);
        this.listOfTimecards[index-1].projectBillable = event.target.checked;
    }
    handleProjectSelection(event){
        var index = event.target.name;
        //console.log(index);
        this.listOfTimecards[index-1].Project = event.target.value;
        this.Projectname= event.target.value;
        if(this.listOfTimecards[index-1].Project !=null || this.listOfTimecards[index-1].Project !=''){
            this.listOfTimecards[index-1].showRow= false;
        }
        

    }

    submitTimesheet(){
        updateTimesheet({
            status: 'Submited',listOfTimecards:JSON.stringify(this.listOfTimecards)
        })
            .then(data => {
                this.initData();
                let event = new ShowToastEvent({
                    message: "Timecard submitted successfully!",
                    variant: "success",
                    duration: 2000
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                //console.log(error);
            });
    }

    backToLoginPageHandle(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'loginPage'
            },
        });
    }
    rejetctCloseModal(event){
        //console.log('inside close');
        this.openmodelForReject=false;
    }
    

    rejectHandleClick(event){
        var index = event.target.dataset.id;
        this.listOfTimecards[index-1].status='Rejected';
        //this.listOfTimecards[index-1].commentTimesheet=this.commentReject;
        //console.log('inside click:'+event.currentTarget.dataset.id);
        this.openmodelForReject=true;
        
    }
    approveCloseModal(event){
        //console.log('inside close');
        this.openModalForApprove=false;
    }

    approveHandleClick(event){
        //console.log('inside click:'+event.currentTarget.dataset.id);
        this.openModalForApprove=true;
        
    }
   
    handleComments(event){
       this.commentReject= event.target.value;
       //console.log('this.comment>>>'+this.commentReject);
       var index = event.target.dataset.id;
        this.listOfTimecards[index-1].commentTimesheet= this.commentReject;
     
       //console.log('this.comment>>>'+this.index);
        //console.log('inside ft::1'+JSON.stringify(this.listOfTimecards));
    }

    
    handleCommentsApproveAll(event){
        this.commentApproveAll= event.target.value;
        //console.log('this.comment>>>'+this.commentApproveAll);
         for(let i = 0; i < this.listOfTimecards.length; i++) {
             this.listOfTimecards[i].commentTimesheet= this.commentApproveAll;
             
         }
         //console.log('inside ft::1'+JSON.stringify(this.listOfTimecards));
     }
     handleCommentsRejectAll(event){
         this.commentRejectAll= event.target.value;
         //console.log('this.comment>>>'+this.commentRejectAll);
          for(let i = 0; i < this.listOfTimecards.length; i++) {
              this.listOfTimecards[i].commentTimesheet= this.commentRejectAll;
              
          }
          //console.log('inside ft::1'+JSON.stringify(this.listOfTimecards));
      }
    

    saveApproveall(){
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            this.listOfTimecards[i].status='Approved';
           // this.listOfTimecards[i].comment= this.comment;
        }
        //console.log('inside ft::12'+JSON.stringify(this.listOfTimecards));
        this.statusToBeUpdated();
        this.openModalForApprove=false;
    }

    saveRejectall(){
        for(let i = 0; i < this.listOfTimecards.length; i++) {
            this.listOfTimecards[i].status='Rejected';
          //  this.listOfTimecards[i].comment= this.comment;
        }
        //console.log('inside ft::13'+JSON.stringify(this.listOfTimecards));
        this.statusToBeUpdated();
        this.openmodelForReject=false;
    }   

    statusToBeUpdated(event){
        //console.log('inside ft::14');
        //console.log('inside ft::15'+JSON.stringify(this.listOfTimecards));
        statusUpdate({
           listOfTimecards:JSON.stringify(this.listOfTimecards)       
        })
            .then(data => {
                //console.log('inside ft::12');
                //this.initData();
                let event = new ShowToastEvent({
                    message: "Timesheet Status Updated Successfully!",
                    variant: "success",
                    duration: 2000
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                //console.log(error);
            });
    }
	saveReject(event){
        this.openmodelForReject=false;
        var index = event.target.dataset.id;
        this.commentReject=event.target.value;
        //console.log('index :: > '+ index);
        //this.listOfTimecards[index].status='Rejected';
        //this.listOfTimecards[index-1].commentTimesheet=this.commentReject;
        //console.log('inside ft::13'+JSON.stringify(this.listOfTimecards));
        this.statusToBeUpdated();
        
    }
   

    rawApproveCloseModal(event){
        //console.log('inside close');
        this.openModalApproveRaw=false;
    }

    rawApproveHandleClick(event){
        //console.log('inside click:'+event.currentTarget.dataset.id);
        this.openModalApproveRaw=true;
        
    }
    ApproveRawhandleComments(event){
        this.commentApprove= event.target.value;
        //console.log('this.comment>>>'+this.commentApprove);
        var index = event.target.dataset.id;
        this.listOfTimecards[index-2].commentTimesheet= this.commentApprove;
        //console.log('this.comment>>>'+this.index);
        //console.log('inside ft::1'+JSON.stringify(this.listOfTimecards));
    }

     saveApprove(event){
        this.openModalApproveRaw=false;
        var index = event.target.dataset.id;
        this.commentApprove=event.target.value;
        //console.log('index :: > '+ index);
        //this.listOfTimecards[index].status='Rejected';
        //this.listOfTimecards[index-1].commentTimesheet=this.commentApprove;
        //console.log('inside ft::13'+JSON.stringify(this.listOfTimecards));
        this.statusToBeUpdated();
        
    }
    ApproveHandleClick(event){
        var index = event.target.dataset.id;
        this.listOfTimecards[index-1].status='Approved';
        
        //console.log('inside click:'+event.currentTarget.dataset.id);
        this.openModalApproveRaw=true;
        
    }
}