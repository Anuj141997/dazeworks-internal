public without sharing class LeavePortal {
    public static String MnName;
    public static String EmpSession;
    public static String EmpName_1;
    public Static String leaveId;
    
    @AuraEnabled(cacheable=false)
    public static String submitLeave(Date startDate, Date endDate, string reason,String employeeId,Boolean isHalfDay,String leaveType,String session){
        
        list<Employee_Session__c> employeeSession = [Select id,Name,Employee__c,Optout_For_Leave__c, Earned_Leave_Balance__c, CasualLeaveBalance__c, Sick_Leave_Balance__c  From Employee_Session__c where (Employee__r.Employee_Id__c =: EmployeeId OR Employee__r.Professional_Consultant_Id__c=:EmployeeId) AND Current_Session__c = TRUE LIMIT 1];
        System.debug(employeeSession);
        String leaveInsertStatus;
        List<Leave__c> lvList = [Select Id,From__c,Till__c,Employee__c from Leave__c where Employee__c=:employeeSession[0].id AND From__c=:startDate AND Till__c =:endDate];
        EmpSession = employeeSession[0].id;
        Boolean ernLeaveStatus = false;
        Leave__c leaveObj = new Leave__c();
        if(lvList.isEmpty()){
            system.debug('lvList is Empty');
            // this condition is for Earned Leave
            if( leaveType.equals('Earned Leave (EL)') && employeeSession[0].Earned_Leave_Balance__c >=1){
                system.debug('Inside leaveType.equals(Earned Leave (EL)) && employeeSession[0].Earned_Leave_Balance__c >=1');
                leaveObj.Employee__c = employeeSession[0].id;
                leaveObj.From__c=StartDate;
                leaveObj.Till__c=EndDate;
                leaveObj.Manager_Approval_Status__c='Pending';
                leaveObj.Description__c=Reason;
                if (isHalfDay) {
                    leaveObj.Half_Day__c = true;
                    leaveObj.Session__c=session;
                }
                leaveObj.Status__c = 'Submit for approval';
                leaveObj.Leave_Type__c = 'Leave';
                leaveObj.Type_of_Leave__c = leaveType;
            }
            
            //this condition is for Sick Leave
            else if( leaveType.equals('Sick Leave (SL)') && employeeSession[0].Sick_Leave_Balance__c >=1){
                system.debug('Inside leaveType.equals(Sick Leave (SL)) && employeeSession[0].Sick_Leave_Balance__c >=1');                
                leaveObj.Employee__c = employeeSession[0].id;
                leaveObj.From__c=StartDate;
                leaveObj.Till__c=EndDate;
                leaveObj.Manager_Approval_Status__c='Pending';
                leaveObj.Description__c=Reason;
                if (isHalfDay) {
                    leaveObj.Half_Day__c = true;
                    leaveObj.Session__c=session;
                }
                leaveObj.Status__c = 'Submit for approval';
                leaveObj.Leave_Type__c = 'Leave';
                leaveObj.Type_of_Leave__c = leaveType;
            }
            
            //this condition is for Sick Leave
            else if(leaveType.equals('Casual Leave (CL)') && employeeSession[0].CasualLeaveBalance__c >=1){
                system.debug('Inside leaveType.equals(Casual Leave (CL)) && employeeSession[0].CasualLeaveBalance__c >=1');
                leaveObj.Employee__c = employeeSession[0].id;
                leaveObj.From__c=StartDate;
                leaveObj.Till__c=EndDate;
                leaveObj.Manager_Approval_Status__c='Pending';
                leaveObj.Description__c=Reason;
                if (isHalfDay) {
                    leaveObj.Half_Day__c = true;
                    leaveObj.Session__c=session;
                }
                leaveObj.Status__c = 'Submit for approval';
                leaveObj.Leave_Type__c = 'Leave';
                leaveObj.Type_of_Leave__c = leaveType;
            }
            else if(leaveType.equals('Loss Of Pay (LOP)')||leaveType.equals('Maternity Leave (ML)')||leaveType.equals('Paternity Leaves (PL)')||leaveType.equals('Regional Holiday (RH)')||leaveType.equals('Bereavement Leave (BL)')){
                leaveObj.Employee__c = employeeSession[0].id;
                leaveObj.From__c=StartDate;
                leaveObj.Till__c=EndDate;
                leaveObj.Manager_Approval_Status__c='Pending';
                leaveObj.Description__c=Reason;
                if (isHalfDay) {
                    leaveObj.Half_Day__c = true;
                    leaveObj.Session__c=session;
                }
                leaveObj.Status__c = 'Submit for approval';
                
                if(leaveType.equals('Loss Of Pay (LOP)')){
                    leaveObj.Leave_Type__c = 'Leave without Pay';
                }
                else{
                    leaveObj.Leave_Type__c = 'Leave';
                }
                leaveObj.Type_of_Leave__c = leaveType;
            }
            if(employeeSession[0].Optout_For_Leave__c==true && (leaveObj.Type_of_Leave__c=='Loss Of Pay (LOP)'||leaveObj.Type_of_Leave__c=='Sick Leave (SL)'||leaveObj.Type_of_Leave__c=='Regional Holiday (RH)'||leaveObj.Type_of_Leave__c=='Bereavement Leave (BL)'||leaveObj.Type_of_Leave__c=='Earned Leave (EL)')){
                insert leaveObj;
                leaveInsertStatus='Success';
            }
            else if(employeeSession[0].Optout_For_Leave__c==false){
                insert leaveObj;
                leaveInsertStatus='Success';
            }
            leaveId = leaveObj.Id;//
        }
        else{
            leaveInsertStatus='Date Repeat';
        }
        String empSeesId = employeeSession[0].Id;
        List<Contact> conList =[Select Id, Name,Date_of_Joining__c,Fun_Fact_about_you__c, ReportsToId, Professional_Consultant_Id__c From Contact Where Employee_Id__c  =: employeeId OR Professional_Consultant_Id__c=:employeeId];
        List<Contact> mngrId = [Select Id, Name,FirstName, LastName, Email From Contact Where Id =: conList[0].ReportsToId];
        MnName = mngrId[0].Name;
        EmpName_1=conList[0].Name;
        String blobFun = conList[0].Fun_Fact_about_you__c; 
        Date blobDate = conList[0].Date_of_Joining__c;
        string paramvalue2 = EncodingUtil.base64Encode(Blob.valueOf(leaveType));
        string paramvalue3 = EncodingUtil.base64Encode(Blob.valueOf(reason));
        string paramvalue = EncodingUtil.base64Encode(Blob.valueOf(employeeId));
        //String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
        //baseURL=baseURL+'/lightning/n/Leave_Status?c__DwKochi='+paramvalue+'&O__DazeworksApproval='+paramvalue2+'&I__linkDigital='+paramvalue3;
        String baseURL ='https://dazeworks.force.com/s/leaveapprove?c__DwKochi='+paramvalue+'&O__DazeworksApproval='+paramvalue2+'&I__linkDigital='+paramvalue3;
        LeavePortal.sendEmailToManager(baseURL,mngrId[0].Email);    
        return leaveInsertStatus;  
    } 
    
    @AuraEnabled(cacheable=false)
    public static void updateLeave(boolean Approve, boolean Reject, String leaveId){
        System.debug('appr  '+ Approve);
        System.debug('lev id '+ leaveId);
        System.debug('rej  '+ Reject);
        list<leave__c> leaveList = [select id, Manager_Approval_Status__c from leave__c WHERE id =:leaveId];
        if(Approve == true){
            leaveList[0].Manager_Approval_Status__c = 'Approved';
        }
        if(Reject == true){
            leaveList[0].Manager_Approval_Status__c = 'Reject';
        } 
        
        update(leaveList[0]);
        
    }
    
    
    @AuraEnabled
    public static List<PicklistWrapper> getPicklist(String objectName,String fieldName){
        List<PicklistWrapper> wrapList=new List<PicklistWrapper>();
        Map<String, String> mapPickListValues = new Map<String, String>();
        Schema.SObjectType objSobjectType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();
        Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();
        List<Schema.PicklistEntry> lstPickListValues = mapFields.get(fieldName).getDescribe().getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
            PicklistWrapper picklist=new PicklistWrapper();
            picklist.label=objPickList.getLabel();
            picklist.value=objPickList.getValue();
            wrapList.add(picklist);
        }
        return wrapList;
    }
    
    public class PicklistWrapper{
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;
    }
    
    public static void sendEmailToManager(String baseUrl,String emailId){
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        list< Messaging.SingleEmailMessage> mailList = new list< Messaging.SingleEmailMessage>();
        List<String> sendTo = new List<String>();
        sendTo.add(emailId);
        mail.setSubject('Leave Approval Request');
        String body = 'Dear '+ MnName +',</br><br><br>'+ EmpName_1 +' has just sent the request for leave, please give your response on this given below mentioned link : <br><br>'+baseUrl +'<br><br> Thank You';
        mail.setHtmlBody(body);
        mail.setToAddresses(sendTo);
        mailList.add(mail);
        Messaging.sendEmail(mailList);
    }
    public static void sendEmailToEmployee(String Email,String approvalStatus,Id lvId, String emIdss){
        List<Leave__c> leaveDetails =[Select Id, From__c,Manager_Approver_Email__c, Till__c, Number_of_Buisness_Days__c from Leave__c Where Id =:lvId];
        Integer numOfBsnzDays = Integer.valueOf(leaveDetails[0].Number_of_Buisness_Days__c); //String.valueOf(leaveDetails[0].Number_of_Buisness_Days__c);
        String fromdate = String.valueOf(leaveDetails[0].From__c);
        String tillDate =  String.valueOf(leaveDetails[0].Till__c);
        
        List<Contact> conList =[Select Id, Name, Email, ReportsToId, Professional_Consultant_Id__c from Contact Where Employee_Id__c =: emIdss OR Professional_Consultant_Id__c =: emIdss];
        String empEmail = conList[0].Email;
        List<Contact> conList_2 =[Select Id, Name from Contact Where Id =: conList[0].ReportsToId];
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        list< Messaging.SingleEmailMessage> mailList = new list< Messaging.SingleEmailMessage>();
        List<String> sendTo = new List<String>();
        sendTo.add(empEmail);
        String body='';
        if(approvalStatus=='Approved'){
            mail.setSubject('Leave Approved');
            body = 'Dear '+ conList[0].Name +',</b><br><br>Your '+ numOfBsnzDays +' days leave was approved by '+ conList_2[0].Name +' from '+ fromdate +' to '+ tillDate +' .<br><br> Thank You';
        }
        if(approvalStatus=='Reject'){
            mail.setSubject('Leave Rejected');
            body = 'Dear '+ conList[0].Name +',</b><br><br>Your '+ numOfBsnzDays +' days leave was rejected by '+ conList_2[0].Name  +' from '+ fromdate +' to '+ tillDate +' .<br><br> Thank You';
        }
        mail.setHtmlBody(body);
        mail.setToAddresses(sendTo);
        mailList.add(mail);
        Messaging.sendEmail(mailList);
    }
    
    @AuraEnabled
    public static leavePaginationWrapper getLeaveDetails(String filSession,String empId,String filStatus,String monthFilter,Integer pageSize, Integer pageNumber,String currentEmployeeId) {
        Blob afterblob = EncodingUtil.base64Decode(empId);
        String emp_id = afterblob.toString();
        Contact currentCon = [Select Id,Employee_ID__c,Professional_Consultant_Id__c,Active__c from Contact Where (Employee_Id__c =: emp_id OR Professional_Consultant_Id__c =: emp_id) AND Active__c=true limit 1];
        Map<Id,String> mapContact = new Map<Id,String>();
        List<Contact> conList = [Select Id,Name from Contact];
        if(conList.size()>0){
            for(Contact con:conList){
                mapContact.put(con.Id,con.Name);
            }
        }
        String mngEmail='\'' + String.escapeSingleQuotes(currentCon.Id) + '\'';
        String query='Select Id,Name,From__c,Till__c,Employee__r.Employee__c,Employee__r.Session__c,Number_of_Buisness_Days__c,Status__c,Approver_Manager__c,Approver_Email_Id_Formula__c from Leave__c WHERE Employee__r.Employee__c ='+ mngEmail;
        if(filSession!=null && filSession!=''){
            String eSes='\'' + String.escapeSingleQuotes(filSession) + '\'';
            query=query+' AND Employee__r.Session__c='+eSes;
            if(filStatus!=null && filStatus!=''){
                String eSts='\'' + String.escapeSingleQuotes(filStatus) + '\'';
                query=query+' AND Status__c='+eSts;       
            }
            if(monthFilter!=null && monthFilter!=''){
                if(filSession!=null && filSession!=''){
                    String cldyear = filSession.substring(0, 4);
                    query=query+' AND CALENDAR_YEAR(From__c)='+cldyear+' AND CALENDAR_MONTH(From__c)='+monthFilter;
                }
            }
        }
        else if(filStatus!=null && filStatus!=''){
            String eSts='\'' + String.escapeSingleQuotes(filStatus) + '\'';
            query=query+' AND Status__c='+eSts;
            if(monthFilter!=null && monthFilter!=''){
                query=query+' AND CALENDAR_MONTH(From__c)='+monthFilter;
            }
        }
        else if(monthFilter!=null && monthFilter!=''){
            query=query+' AND CALENDAR_MONTH(From__c)='+monthFilter;
        }
        System.debug('the query is===>'+query);
        List<Leave__c> leaveList = Database.query(query);
        Integer offset = (pageNumber - 1) * pageSize;
        Integer totalRecords = leaveList.size();
        Integer recordEnd = pageSize * pageNumber;
        leavePaginationWrapper lvPagination =  new leavePaginationWrapper();
        lvPagination.pageNumber = pageNumber;
        lvPagination.pageSize = pageSize;        
        lvPagination.recordStart = offset + 1;
        lvPagination.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        lvPagination.totalRecords = totalRecords;
        query=query+' LIMIT '+pageSize+' OFFSET '+offset;
        System.debug('the query is===>'+query);
        List<leaveTableWrapper> wList = new List<leaveTableWrapper>();
        List<Leave__c> leaveForPaginationList = Database.query(query);
        if(leaveForPaginationList.size()>0){
            for(Leave__c obj:leaveForPaginationList){
                if(mapContact.containsKey(obj.Employee__r.Employee__c)){
                    leaveTableWrapper wrap = new leaveTableWrapper();
                    wrap.lvId = obj.Id;
                    wrap.lvName =obj.Name;
                    wrap.empName = mapContact.get(obj.Employee__r.Employee__c);
                    wrap.mngName = obj.Approver_Manager__c;
                    wrap.fromDate = obj.From__c;
                    wrap.tillDate = obj.Till__c;
                    if(obj.Number_of_Buisness_Days__c!=null){
                        String nOB = String.valueOf(obj.Number_of_Buisness_Days__c.format());
                        wrap.noOfBsn = nOB;
                    }else{
                         wrap.noOfBsn = null;
                    }
                    
                    wrap.Status = obj.Status__c;
                    wList.add(wrap);
                }
            }
        }
        lvPagination.lvData=wList;
        return lvPagination;
    }
    @AuraEnabled 
    public static List<sobject> findRecordsforMeetingFeedback(String searchKey, String objectName) {
        string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
        string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText;
        return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' AND Active__c=true ORDER BY Name'); 
    }
    public class leaveTableWrapper{
        @AuraEnabled
        public String lvId {get;set;}
        @AuraEnabled
        public String lvName {get;set;}
        @AuraEnabled
        public String empName {get;set;}
        @AuraEnabled
        public String mngName {get;set;}
        @AuraEnabled
        public Date fromDate {get;set;}
        @AuraEnabled
        public Date tillDate {get;set;}
        @AuraEnabled
        public String noOfBsn {get;set;}
        @AuraEnabled
        public String Status {get;set;}
    }
    public class leavePaginationWrapper {
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public List<leaveTableWrapper> lvData {get;set;}
    }
    
}