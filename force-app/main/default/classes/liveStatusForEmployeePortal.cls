public class liveStatusForEmployeePortal {
    @AuraEnabled
    public static List<Leave__c> empWhoIsOnHolidayToday(){
        return [SELECT Id,Employee__r.Employee__r.Name, Number_of_Buisness_Days__c,Till__c, From__c
                FROM Leave__c where From__c <= TODAY AND Till__c >= TODAY]; 
    }
    @AuraEnabled
    public static List<Leave__c> empWhoIsOnHolidayThisWeek(){
        return [SELECT Id,Employee__r.Employee__r.Name, Number_of_Buisness_Days__c,Till__c, From__c
                FROM Leave__c where From__c <= THIS_WEEK AND Till__c >= THIS_WEEK]; 
    }
    @AuraEnabled
    public static List<Contact> birthdayStatus(){
       return [SELECT Id,Name,Date_of_Birth__c,Employee_ID__c FROM Contact where Active__c=:True] ;
      
    }
}