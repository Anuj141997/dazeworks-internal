public without sharing class EmpPerformanceController {

    /*********************************************
     * To get list of Performance__c object based on session 
     ********************************************/
    @AuraEnabled(cacheable=true)
    public static list<Performance__c> getPerformanceData(String sessionType, string employeeId){
        list<Performance__c> performanceList = new list<Performance__c>();
        try {      
            String empPerformRecordId = System.label.empPerformRecordId;
             String perfQuery = 'select id,Employee__c,Employee__r.name,Manager__c,Approved__c,Manager__r.name,Session__c from Performance__c  where Session__c =:sessionType AND RecordTypeId =: empPerformRecordId';    
             if(!String.isBlank(employeeId)){
                perfQuery += ' AND (Employee__c=:employeeId OR Created_By_Contact__c=:employeeId OR Manager__c=:employeeId )';
             }

            System.debug('perfQuery'+perfQuery);
            performanceList = Database.query(perfQuery);             

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return performanceList;
    }
    
}