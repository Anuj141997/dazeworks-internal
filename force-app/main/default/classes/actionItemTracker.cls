public with sharing class actionItemTracker { 
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [Select id,Subject, Description, Status, Steps_to_be_taken__c, Type__c, OwnerId, Owner.Name, WhoId, Who.Name, ActivityDate from Task];
    } 
                       
}