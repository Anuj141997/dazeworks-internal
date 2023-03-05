public without sharing class CandidtaesListWithInterviews_Controller {
	@AuraEnabled
    public static List<Interview__c> fetchInteviewedRecords(String intId){
        String interviewId = '%'+intId;
        
        List<Application__c> relatedInterviews = [SELECT Id, (SELECT Interview_Round__c, Application__r.Candidate__r.Name,
                                                 Interviewer__r.Name, Language_on_10__c, Technical_on_10__c, Overall_on_10__c
                                                 FROM Interviews__r
                                                 WHERE Interview_Status__c='Interviewed' OR Interview_Feedback__c=true)
                                                 FROM Application__c
                                                 WHERE Id IN (SELECT Application__c FROM Interview__c WHERE Name LIKE:interviewId)];
        List<Interview__c> allRelatedInterviews = relatedInterviews[0].Interviews__r;
        system.debug('All Interview Records : '+allRelatedInterviews);
        return allRelatedInterviews;
    }
}