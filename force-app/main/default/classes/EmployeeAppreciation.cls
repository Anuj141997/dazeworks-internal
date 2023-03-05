public without sharing class EmployeeAppreciation {
	@AuraEnabled
    public static void submitAppreciation(String memberId, Date appDate, String Appfrom, String appMassage, String projectName){
        Appreciation__c appr = new Appreciation__c();
        appr.Member__c = memberId;
        appr.Date__c = appDate;
        appr.From__c = Appfrom;
        appr.Message__c = appMassage;
        appr.Project__c =projectName;
        insert appr;
    }
    @AuraEnabled
    public static List<Appreciation__c> appreList(String empID){
        return[select Id, Member__c, Member__r.Employee_ID__c, Name, Date__c, From__c,  Member__r.Name,  Project__c, Message__c  from Appreciation__c Where Member__r.Employee_ID__c =: empID];
    }
}