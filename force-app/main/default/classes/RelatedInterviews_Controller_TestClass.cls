@isTest
public class RelatedInterviews_Controller_TestClass {
    @isTest
    public static void RelatedInterviews_TestMethod(){
        Id candRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
        Id empRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        
        Test.startTest();
        Contact con = new Contact(LastName = 'test1', recordTypeId = candRecordTypeId);
        insert con;
        
        Position__c pos = new Position__c(Name = 'salesforce', active__c = true);
        insert pos;
        
        Application__c appl = new Application__c(candidate__c = con.id, POsition__c = pos.id);
        insert appl;
        
        Interview__c inter = new Interview__c(Application__c = appl.Id, Interview_Date_and_Time__c = datetime.now());
        insert inter;
        
        RelatedInterviews_Controller.fetchRelatedInterviews(inter.Id);
        Test.stopTest();
    }
}