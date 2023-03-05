public class PerformanceLeaveListViewController {
    
    @AuraEnabled
    public static List<Performance__c> getAllPerformance(String sessionType)
    {
        list<Performance__c> performanceList = new list<Performance__c>();
        
        String empPerformRecordId = Schema.SObjectType.Performance__c.getRecordTypeInfosByDeveloperName().get('Employee_Performance_Management').getRecordTypeId();
        
        try {      
            
            String perfQuery = 'Select id,Employee__c,Employee__r.name,Manager__c,Manager__r.name,Session__c,Overall_Summery_By_Manager__c, Employee_Rating_by_Manager__c, Final_Performance_Rating__c from Performance__c  where Session__c =:sessionType AND RecordTypeId =: empPerformRecordId';    
            
            System.debug('perfQuery'+perfQuery);
            performanceList = Database.query(perfQuery);             
            
        } catch (Exception e) {
            System.debug('Error>>>>>>'+e.getMessage());
        }
        
        return performanceList;
    }
    
}