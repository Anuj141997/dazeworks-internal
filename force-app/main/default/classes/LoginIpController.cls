/**
* @description       : 
* @author            : Shivam Kumar
* @group             : 
* @last modified on  : 06-24-2022
* @last modified by  : Shivam Kumar 
* Modifications Log
* Ver   Date         Author         Modification
* 1.0   06-24-2022   Shivam Kumar   Initial Version
**/

public without sharing class LoginIpController {
    @AuraEnabled
    public static Boolean checkIp(String empId, String ipAddress) { 
        Boolean status=false;
        //String tempIp=Auth.SessionManagement.getCurrentSession().get('SourceIp');
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,Contact__r.Employee_Id__c, Contact__r.Professional_Consultant_Id__c, Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c 
                                        WHERE Name=:ipAddress AND (Contact__r.Employee_Id__c=:empId OR Contact__r.Professional_Consultant_Id__c=:empId) LIMIT 1];
        System.debug('the list od session management'+sm);
        if(!sm.isEmpty() && sm[0].IsActive__c==true){
            status=true;
        }
        else if(!sm.isEmpty() && sm[0].IsActive__c!=true){
            status=true;
            sm[0].IsActive__c=true;
            update sm[0];
        }
        return status;
    }
    @AuraEnabled
    public static String resetPageName(String empId, String ipAddress) {
        //String tempIp=Auth.SessionManagement.getCurrentSession().get('SourceIp');
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,Page_Name__c,Contact__r.Employee_Id__c, Contact__r.Professional_Consultant_Id__c, Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c 
                                        WHERE IsActive__c=:true AND Name =: ipAddress AND (Contact__r.Employee_Id__c=:empId OR Contact__r.Professional_Consultant_Id__c=:empId) LIMIT 1];
        if(!sm.isEmpty() && sm[0].Page_Name__c!=null){
            sm[0].Page_Name__c='';
            update sm[0];
        }
        return sm[0].Page_Name__c;
    }
    @AuraEnabled
    public static String setPageName(String empId, String pageName, String ipAddress) {
        //String tempIp=Auth.SessionManagement.getCurrentSession().get('SourceIp');
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,Page_Name__c,Contact__r.Employee_Id__c, Contact__r.Professional_Consultant_Id__c, Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c 
                                        WHERE IsActive__c=:true AND Name =: ipAddress AND (Contact__r.Employee_Id__c=:empId OR Contact__r.Professional_Consultant_Id__c=:empId) LIMIT 1];
        if(!sm.isEmpty() && sm[0].Page_Name__c!=pageName){
            sm[0].Page_Name__c=pageName;
            update sm[0];
        }
        return sm[0].Page_Name__c;
    }
    
    @AuraEnabled
    public static String currentPage(String empId, String ipAddress){
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,Page_Name__c,Contact__r.Employee_Id__c, Contact__r.Professional_Consultant_Id__c, Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c 
                                        WHERE IsActive__c=:true AND Name =: ipAddress AND (Contact__r.Employee_Id__c=:empId OR Contact__r.Professional_Consultant_Id__c=:empId) LIMIT 1];
        return sm[0].Page_Name__c;
    }
    
    @AuraEnabled
    public static EmployeeWrapper autoCheckIp( String ipAddress) {
        EmployeeWrapper empWrap = new EmployeeWrapper();
        empWrap.status=false;
        
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,LastModifiedDate, Contact__r.Professional_Consultant_Id__c ,
                                        Contact__r.Employee_Id__c,Contact__r.Emp_Portal_Password__c,Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c WHERE Name=:ipAddress AND IsActive__c=TRUE ORDER BY LastModifiedDate DESC LIMIT 1];
        Contact conList = new Contact();
        if(!sm.isEmpty()){
            empWrap.emppass=sm[0].Contact__r.Emp_Portal_Password__c;
            if(sm[0].Contact__r.Employee_Id__c!=null){
                empWrap.empid=sm[0].Contact__r.Employee_Id__c;
                
            }
            else{
                empWrap.empid =sm[0].Contact__r.Professional_Consultant_Id__c;
            }
            empWrap.status=true;
        }
        return empWrap;
    }
    
    @AuraEnabled(cacheable=false)
    public static void insertSession(String empId,  String ipAddress) {
        
        Contact con=[SELECT id,LastName FROM Contact WHERE Employee_Id__c=:empId OR Professional_Consultant_Id__c =: empId LIMIT 1];
        Session_Management__c sm=new Session_Management__c();
        sm.Name=ipAddress;
        sm.Contact__c=con.id;
        insert sm;
    }
    
    @AuraEnabled
    public static void logout(String empId,  String ipAddress) {
        
        //Contact con=[SELECT id,LastName FROM Contact WHERE Employee_Id__c=:empId LIMIT 1];
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c, Contact__r.Professional_Consultant_Id__c ,Contact__r.Employee_Id__c,Contact__r.Company_Email__c,Contact__r.Name 
                                        FROM Session_Management__c 
                                        WHERE Name=:ipAddress AND (Contact__r.Employee_Id__c=:empId OR Contact__r.Professional_Consultant_Id__c=:empId) AND   IsActive__c=TRUE LIMIT 1];
        if(!sm.isEmpty()){
            sm[0].IsActive__c=false;
            update sm[0];
        }
        
        
    }
    
    public class EmployeeWrapper{
        @AuraEnabled
        public boolean status;
        @AuraEnabled
        public String emppass;
        @AuraEnabled
        public String empid;
        /*@AuraEnabled
        public String empname;
        @AuraEnabled
        public String empMngName;
        @AuraEnabled
        public Date joinDate;
        @AuraEnabled
        public String phone1;
        @AuraEnabled
        public String phone2;
        @AuraEnabled
        public String email;*/
    }
    
}