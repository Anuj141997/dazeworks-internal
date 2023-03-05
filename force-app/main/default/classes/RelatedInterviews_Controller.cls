public without sharing class RelatedInterviews_Controller {
	@AuraEnabled
    public static List<Interview__c> fetchRelatedInterviews(Id recId){
        List<Interview__c> interview = [SELECT Id, Name, Application__r.Position__r.HR__c,
                                               Application__r.Position__r.Technical__c,
                                               Application__r.Position__r.QA__c,
                                        Attitude__c, Communication__c, Language__c, Listening_skills__c,
                                        Presentation_skills__c, Technical_skills__c,
                                        Apex__c, Aura_Components__c, Integration__c, Java_Script__c, LWC__c, SQL__C,
                                        Cross_Browser_Testing__c, Functional_Testing__c, Load_Testing_Data_Loader_or_Jmeter__c,
                                        Performance_Testing__c, Regression_Testing__c, Smoke_Testing__c,
                                        Tosca_Provar__c, Test_Rail__c, Comments__c, Comments1__c, Comments2__c FROM Interview__c
                                        WHERE Id=:recId LIMIT 1];
        return interview;
    }
}