public without sharing class Timet {
    @AuraEnabled(Cacheable=false)
    public static void createTimecard(String projectName,boolean billable,String hours,String start_to_end,String tcday,String tcdate,String description,String activityType) {
        
        Timecard__c tc=new Timecard__c();
        tc.Timesheet_Week__c=start_to_end;
        tc.Activity_Type__c=activityType;
        tc.Billable__c=billable;
        tc.Description__c=description;
        tc.Hours__c=hours;
        tc.Project__c=projectName;
        tc.Timesheet_Date__c=Date.valueOf(tcdate);        
        insert tc;
    }
    
    @AuraEnabled(Cacheable=false)
    public static void insertTimecards(String jsonOfListOfTimeCards) {
        system.debug('jsonOfListOfTimeCards::'+jsonOfListOfTimeCards);
        List<timecardWrapper> timeWrapList = (List<timecardWrapper>) JSON.deserialize(jsonOfListOfTimeCards, List<timecardWrapper>.class);        
        system.debug('timeWrapList'+JSON.serialize(timeWrapList));
        list<Timecard__c> timeList = new list<Timecard__c>();
        list<Timesheet__c> timeSheetList = new list<Timesheet__c>();
        Map<String,timecardWrapper> timesheetMap=new Map<String,timecardWrapper>();
        for(timecardWrapper timeWrap:timeWrapList){
            Timesheet__c timesheet=new Timesheet__c();
            timesheet.Billable__c=timewrap.projectBillable;
            timesheet.Project__c=timewrap.Project;
            timesheet.Task__c=timewrap.task;
             timesheet.Id=timewrap.timesheetId;
            timesheet.Name=timeWrap.TimesheetDate;
            if(!String.isEmpty(timeWrap.WeekStartDate))
                timesheet.Week_Start_Date__c=Date.valueOf(timeWrap.WeekStartDate);
            if(!String.isEmpty(timeWrap.WeekEndDate))
                timesheet.Week_End_Date__c=Date.valueOf(timeWrap.WeekEndDate);
            timeSheetList.add(timesheet);
            timesheetMap.put(timewrap.Project, timeWrap);
        }
        System.debug('inside timet::' +timeSheetList);
        upsert timeSheetList;
        
        
        //for(timecardWrapper timeWrap:timeWrapList){
        for(Timesheet__c timesheet:timeSheetList){
            if(timesheetMap.containsKey(timesheet.Project__c)){
                timecardWrapper  timeWrap=timesheetMap.get(timesheet.Project__c);
                if(timeWrap.Mon != null && timeWrap.Mon.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Mon,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Mon'));
                }  
                if(timeWrap.Tue != null && timeWrap.Tue.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Tue,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Tue'));
                }  
                if(timeWrap.Wed != null && timeWrap.Wed.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Wed,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Wed'));
                }  
                if(timeWrap.Thu != null && timeWrap.Thu.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Thu,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Thu'));
                }  
                if(timeWrap.Fri != null && timeWrap.Fri.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Fri,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Fri'));
                }  
                if(timeWrap.Sat != null && timeWrap.Sat.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Sat,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Sat'));
                }  
                if(timeWrap.Sun != null && timeWrap.Sun.hour !=null){
                    timeList.add(createTimeCardEntry(timeWrap.Sun,timeWrap.Project,timeWrap.TimesheetDate,timesheet.id,'Sun'));
                }
            }
            
        }
        upsert timeList;
        
    }
    
    private static Timecard__c createTimeCardEntry(ActivityWrapper aw,String project,string timesheet,String timesheetId,String day){
        Timecard__c timecard = new Timecard__c();
        timecard.Project__c= Project;
        timecard.Id= aw.timeCrardId;
        timecard.Description__c=aw.Description;
        timecard.Activity_Type__c=aw.ActivityType;
        timecard.Billable__c=aw.projectBillable ==  null?false:aw.projectBillable;
        timecard.Hours__c=aw.hour;        
        timecard.Timesheet__c=timesheetId;
        timecard.Day__c=day;
        return timecard;
    }
    
    @AuraEnabled
    public static Timecard__c getTimeCard(String projectName,String weekRange){
        Timecard__c timecard=[SELECT Id,Project__c,Description__c,Activity_Type__c,Billable__c,Hours__c FROM 
                              Timecard__c WHERE Project__c=:projectName LIMIT 1];
        return timecard;
    }
    
    @AuraEnabled(Cacheable=false)
    public static List<timecardWrapper> getTimesheet(String startDate,String endDate, String userEmail){
        List<timecardWrapper> timeWrapList=new List<timecardWrapper>();
        System.debug('inside startDate::'+startDate);
        System.debug('inside endDate::'+endDate);
        System.debug('inside userEmail::'+userEmail);

        Integer i=1;
        List<Timesheet__c> tsList=[SELECT Id, Name, Status__c, Week_Start_Date__c, Week_End_Date__c, Task__c, Editable__c, 
                                   Timesheet_Week__c, Billable__c, Contact__c, Project__c,
                                   (SELECT Id, Name, Project__c, Activity_Type__c, Description__c, Billable__c, Timesheet_Date__c, 
                                    Timesheet__c, Hours__c,Timecard__c.Day__c FROM Timecard__r) FROM Timesheet__c
                                   WHERE Week_Start_Date__c=:Date.valueOf(startDate) AND Week_End_Date__c=:Date.valueOf(endDate) AND Contact__r.Email=:userEmail ];
        System.debug('inside tsList::'+tsList);
        for(Timesheet__c timesheet: tsList){
            timecardWrapper tcWrap=new timecardWrapper();
            
            tcWrap.index=i;
            tcWrap.Project=timesheet.Project__c;
            tcWrap.timesheetId=timesheet.Id;
            tcWrap.task=timesheet.Task__c;
            tcWrap.WeekStartDate=String.valueOf(timesheet.Week_Start_Date__c);
            tcWrap.WeekEndDate=String.valueOf(timesheet.Week_End_Date__c);
            tcWrap.projectBillable=timesheet.Billable__c;
            tcWrap.popupBillable=timesheet.Billable__c;
            tcWrap.showRow=true;
            for(Timecard__c timecard: timesheet.Timecard__r){
                ActivityWrapper activityWrap=new ActivityWrapper();
                activityWrap.timeCrardId=timecard.Id;
                if(timecard.Day__c=='Mon'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Mon=activityWrap;
                }
                else if(timecard.Day__c=='Tue'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Tue=activityWrap;
                }
                else if(timecard.Day__c=='Wed'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Wed=activityWrap;
                }
                else if(timecard.Day__c=='Thu'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Thu=activityWrap;
                }
                else if(timecard.Day__c=='Fri'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Fri=activityWrap;
                }
                else if(timecard.Day__c=='Sat'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Sat=activityWrap;
                }
                else if(timecard.Day__c=='Sun'){
                    activityWrap.Description=timecard.Description__c;
                	activityWrap.ActivityType=timecard.Activity_Type__c;
                	activityWrap.Billable=timecard.Billable__c;
                	activityWrap.selectedDate=String.valueOf(timecard.Timesheet_Date__c);
                    activityWrap.hour=timecard.Hours__c;
                	activityWrap.projectBillable=timecard.Billable__c;
                    tcWrap.Sun=activityWrap;
                }
                
                
            }
            timeWrapList.add(tcWrap);
            i++;
        }
        
        return timeWrapList;
    }
    
    @AuraEnabled
    public static List<Timesheet__c> updateTimesheet(String status){
        
        
        List<Timesheet__c> tsList=[SELECT Id,Name,Timesheet_Week__c,Week_Start_Date__c,Week_End_Date__c FROM Timesheet__c  WITH SECURITY_ENFORCED Limit 1];
        return tsList;
    }
    
    @AuraEnabled
    public static void submitTimesheet(String listOfTimecards, String userEmail,string status,string WeekStartDate,string WeekEndDate){
        List<timecardWrapper> timeWrapList = (List<timecardWrapper>) JSON.deserialize(listOfTimecards, List<timecardWrapper>.class);        
        system.debug('timeWrapList'+JSON.serialize(timeWrapList));
        List<Timesheet__c> TimesheetToUpdate = new List<Timesheet__c>();
        for(timecardWrapper timeWrap:timeWrapList){
            Timesheet__c timesheet=new Timesheet__c();
            timesheet.id=timewrap.timesheetId;
            timesheet.Status__c=status;
            TimesheetToUpdate.add(timesheet);
        }
        update TimesheetToUpdate;
       
        String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
		System.debug('Base URL: ' + baseURL);
        baseURL=baseURL+'/lightning/n/View_Timesheet?c__email='+userEmail+'&c__startDate='+WeekStartDate+'&c__endDate='+WeekEndDate;
        System.debug('Base URL: ' + baseURL);
        Timet.sendEmailToManager(baseURL,'shivam.kumar@dazeworks.com');
    }
    
    @AuraEnabled
    public static void updateStatus(String listOfTimecards){
        List<timecardWrapper> timeWrapList = (List<timecardWrapper>) JSON.deserialize(listOfTimecards, List<timecardWrapper>.class);        
        system.debug('timeWrapList>>>8989'+JSON.serialize(timeWrapList));
        List<Timesheet__c> TimesheetToUpdate = new List<Timesheet__c>();
        for(timecardWrapper timeWrap:timeWrapList){
            Timesheet__c timesheet=new Timesheet__c();
            timesheet.id=timewrap.timesheetId;
            timesheet.Status__c=timewrap.status;
            //timesheet.Comment__c=timewrap.comment;
            timesheet.Comment__c=timewrap.commentTimesheet;
            
            TimesheetToUpdate.add(timesheet);
        }
        upsert TimesheetToUpdate;
    }
    
    @AuraEnabled(cacheable=false)
    public static boolean saveTimesheet(String timesheet,String mon,String sun){
        ResponseWrapper res=new ResponseWrapper();
        try{
            Timesheet__c ts=new Timesheet__c();
            ts.Timesheet_Week__c=timesheet;
            ts.Week_Start_Date__c=Date.valueOf(mon);
            ts.Week_End_Date__c=Date.valueOf(sun);
            insert ts;
            res.status=true;
            res.msg='Timesheet records inserted successfully!';
        }
        catch(Exception e){
            res.status=false;
            res.msg=e.getMessage();
        }
        System.debug('inside apex::'+res);
        return true;
    }
    
    @AuraEnabled(cacheable=true)  //get all the projects
    public static List<Project__c> getProjects(){
        return [select id,Name from Project__c];
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List < customValueWrapper > pickListValueDynamically(sObject customObjInfo, string selectPicklistApi) {
        Schema.DescribeSObjectResult objDescribe = customObjInfo.getSObjectType().getDescribe();     
        map < String, Schema.SObjectField > customFieldMap = objDescribe.fields.getMap();      
        list < Schema.PicklistEntry > custPickValues = customFieldMap.get(selectPicklistApi).getDescribe().getPickListValues();
        list < customValueWrapper > customObjWrapper = new list < customValueWrapper > ();
        for (Schema.PicklistEntry myCustPick: custPickValues) {
            customValueWrapper selectOptionValueWrapper = new customValueWrapper();
            selectOptionValueWrapper.label = myCustPick.getLabel();
            selectOptionValueWrapper.value = myCustPick.getValue();
            customObjWrapper.add(selectOptionValueWrapper);
        }
        
        return customObjWrapper;
        
    }
    // wrapper class 
    public class customValueWrapper {
        @auraEnabled public string label {get;set;}
        @auraEnabled public string value {get;set;}
    }
    public class timecardWrapper {
        @auraEnabled public Integer index {get;set;}
        @auraEnabled public string Project {get;set;}
        @auraEnabled public ActivityWrapper Mon {get;set;}
        @auraEnabled public ActivityWrapper Tue {get;set;}
        @auraEnabled public ActivityWrapper Wed {get;set;}
        @auraEnabled public ActivityWrapper Thu {get;set;}
        @auraEnabled public ActivityWrapper Fri {get;set;}
        @auraEnabled public ActivityWrapper Sat {get;set;}
        @auraEnabled public ActivityWrapper Sun {get;set;}
        @auraEnabled public string TimesheetDate {get;set;}
        @auraEnabled public string TotalHours {get;set;}
        @auraEnabled public string task {get;set;}
        @auraEnabled public string status {get;set;}
        @auraEnabled public string comment {get;set;}
        @auraEnabled public string commentTimesheet {get;set;}
        @auraEnabled public string WeekStartDate {get;set;}
        @auraEnabled public string WeekEndDate {get;set;}
        @auraEnabled public boolean projectBillable {get;set;}
        @auraEnabled public boolean popupBillable {get;set;}
        @auraEnabled public boolean showRow {get;set;}
        @auraEnabled public string timesheetId {get;set;}
    }
    
    public class ActivityWrapper {
        
        @auraEnabled public string Description {get;set;}
        @auraEnabled public string Day {get;set;}
        @auraEnabled public string ActivityType {get;set;}
        @auraEnabled public boolean Billable {get;set;}
        @auraEnabled public string selectedDate {get;set;}
        @auraEnabled public string StartTime {get;set;}
        @auraEnabled public string EndTime {get;set;}
        @auraEnabled public string hour {get;set;}
        @auraEnabled public boolean projectBillable {get;set;}
        @auraEnabled public string timeCrardId {get;set;}
    }


    public static void sendEmailToManager(string baseUrl,string emailId){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        list< Messaging.SingleEmailMessage> mailList = new list< Messaging.SingleEmailMessage>();
        List<String> sendTo = new List<String>();
        sendTo.add(emailId);
        mail.setSubject('Timesheet Approval Request');
        String body = 'Please approve the timecard for User: '+baseUrl;
        mail.setHtmlBody(body);
        mail.setToAddresses(sendTo);
        mailList.add(mail);
        Messaging.sendEmail(mailList);
  }
}