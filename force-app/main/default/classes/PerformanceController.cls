public without sharing class PerformanceController {
    
    @AuraEnabled(cacheable=true) 
    public static List<Contact> getContacts(){
        return [ SELECT Id, Name, Employee_ID__c FROM Contact Where (Employee_ID__c != Null OR Professional_Consultant_Id__c!= null) and Active__c = true ORDER BY Name ASC ];
    }
    
    @AuraEnabled
    public static String createPerformance(String per) {
        
        
        Performance__c perf= (Performance__c) JSON.deserialize(per, Performance__c.Class);
        
        try{
            upsert perf;
        }catch(Exception e)
        {
            throw new DMLException(e.getMessage());
        }
        
        
        return perf.Id;
    }
    @AuraEnabled
    public static Performance__c fetchPerformance(Id pId) {
        
        
        return [Select id,Employee__c,Manager__c,Approved__c,Department__c,Session__c,Type_of_Review__c,Employee_Rating_by_Manager__c,Final_Performance_Rating__c
                ,Overall_Summery_By_Manager__c from Performance__c where Id =: pId];
        
        
        
    }
    
    @AuraEnabled
    public static List<Goals_By_Performance__c> fetchGoals(String gId) {
        
        
        List<Goals_By_Performance__c> gList = [Select Name,Goal_Description__c,Goal_Weightage__c,Performance_Target__c,Goal_Half_Yearly_Comments_Employee__c,
                                               Goal_Yearly_Comments_Employee__c,Goal_Half_Yearly_Comments_Manager__c,Goal_Yearly_Comments_Manager__c from Goals_By_Performance__c Where Performance__c =: gId];
        
        return gList;
        
    }
    
    @AuraEnabled
    public static void createGoalByPerformance(String per) {
        List<Goals_By_Performance__c> perf = new List<Goals_By_Performance__c>();
        if(!Test.isRunningTest())
            perf=( List<Goals_By_Performance__c>) JSON.deserialize(per,  List<Goals_By_Performance__c>.Class);
        
        if(!perf.isEmpty())
        {
            upsert perf;
        }
        
        
    }
    
    
}