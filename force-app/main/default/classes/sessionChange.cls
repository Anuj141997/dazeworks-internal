public without sharing class sessionChange {
    @AuraEnabled
    public static void respectivePage(String pageName,String ipAddress){
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,LastModifiedDate, Contact__r.Professional_Consultant_Id__c ,
                                        Page_Name__c,Contact__r.Employee_Id__c,Contact__r.Emp_Portal_Password__c,Contact__r.Company_Email__c,
                                        Contact__r.Name FROM Session_Management__c WHERE Name=:ipAddress AND IsActive__c=TRUE 
                                        ORDER BY LastModifiedDate DESC LIMIT 1];
        if(!sm.isEmpty()){
            sm[0].Page_Name__c=pageName;
            update sm[0];
        }
    }
    @AuraEnabled
    public static void resetPage(String ipAddress){
        List<Session_Management__c> sm=[SELECT Id,Name,IsActive__c,Contact__c,LastModifiedDate, Contact__r.Professional_Consultant_Id__c ,
                                        Page_Name__c,Contact__r.Employee_Id__c,Contact__r.Emp_Portal_Password__c,Contact__r.Company_Email__c,
                                        Contact__r.Name FROM Session_Management__c WHERE Name=:ipAddress AND IsActive__c=TRUE 
                                        ORDER BY LastModifiedDate DESC LIMIT 1];
        if(!sm.isEmpty()){
            sm[0].Page_Name__c='';
            update sm[0];
        }
    }
}