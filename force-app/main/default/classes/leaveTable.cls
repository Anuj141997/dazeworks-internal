public without sharing class leaveTable {
    @AuraEnabled
    public static leavePaginationWrapper getLeaveDetails(String filSession,String empId,String filStatus,String monthFilter,Integer pageSize, Integer pageNumber) {
        Map<Id,String> mapContact = new Map<Id,String>();
        List<Contact> conList = [Select Id,Name from Contact];
        if(conList.size()>0){
            for(Contact con:conList){
                mapContact.put(con.Id,con.Name);
            }
        }
        String query='Select Id,Name,From__c,Till__c,Employee__r.Employee__c,Employee__r.Session__c,Number_of_Buisness_Days__c,Status__c,Approver_Manager__c from Leave__c';
        if(empId!=null){
            String eId='\'' + String.escapeSingleQuotes(empId) + '\'';
            query=query+' WHERE Employee__r.Employee__c='+eId;
            if(filSession!=null && filSession!=''){
                String eSes='\'' + String.escapeSingleQuotes(filSession) + '\'';
                query=query+' AND Employee__r.Session__c='+eSes;       
            }
            if(filStatus!=null && filStatus!=''){
                String eSts='\'' + String.escapeSingleQuotes(filStatus) + '\'';
                query=query+' AND Status__c='+eSts;       
            }
            if(monthFilter!=null && monthFilter!=''){
                if(filSession!=null && filSession!=''){
                    String cldyear = filSession.substring(0, 4);
                    query=query+' AND CALENDAR_YEAR(From__c)='+cldyear+' AND CALENDAR_MONTH(From__c)='+monthFilter;
                }
                else{
                    query=query+' AND CALENDAR_MONTH(From__c)='+monthFilter;
                }
            }
        }
        else if(filSession!=null && filSession!=''){
            String eSes='\'' + String.escapeSingleQuotes(filSession) + '\'';
            query=query+' WHERE Employee__r.Session__c='+eSes;
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
            query=query+' WHERE Status__c='+eSts;
            if(monthFilter!=null && monthFilter!=''){
                    query=query+' AND CALENDAR_MONTH(From__c)='+monthFilter;
            }
        }
        else if(monthFilter!=null && monthFilter!=''){
                query=query+' WHERE CALENDAR_MONTH(From__c)='+monthFilter;
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
                    String nOB = String.valueOf(obj.Number_of_Buisness_Days__c.format());
                    wrap.noOfBsn = nOB;
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