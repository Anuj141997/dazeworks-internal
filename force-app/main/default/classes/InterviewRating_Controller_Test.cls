@isTest
public class InterviewRating_Controller_Test {
    @testSetup
    public static void testSetup(){
        Id CandidateRecordTypeId =Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Candidate').getRecordTypeId();
        Id InterviewerRecordTypeId =Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Employee').getRecordTypeId();
        
        List<Contact> contacts = new List<Contact>();
        contacts.add(new Contact(FirstName = 'Interviewer 1', LastName = 'Record',Employee_ID__c = 't123',RecordTypeId = InterviewerRecordTypeId));
        contacts.add(new Contact(FirstName = 'Candidate 1', LastName = 'Record',Email='test@test.com',Employee_ID__c = 't124',RecordTypeId = CandidateRecordTypeId));
        
        insert contacts;
        
        Application__c app = new Application__c();
        app.Candidate__c = contacts[1].Id;
        app.Interview_Round__c = 'New';
        insert app;
        
        Interview__c interview = new Interview__c();
        interview.Interviewer__c = contacts[0].Id;
        interview.Application__c = app.Id;
        interview.Interview_Round_Number__c = 'L1';
        interview.Interview_Date_and_Time__c = DateTime.now();
        
        insert interview;
        
    }
    
    @isTest
    public static void InterviewRating_Controller_TestMethod(){
        Interview__c interv = [SELECT Name, Interviewer__r.Employee_ID__c,Language__c, Apex__c, Aura_Components__c,
                               Integration__c, Java_Script__c, LWC__c, SQL__c, Overall_on_10__c, Comments__c,Admin__c,Admin_Remarks__c,
                               Visualforce__c,Visualforce_Remarks__c,MuleSoft__c,
                               MuleSoft_Remarks__c,Velocity_CPQ__c,Velocity_CPQ_Remarks__c,Apex_Remarks__c,
                               Lightning_Remarks__c,Integration_Remarks__c,LWC_Remarks__c,SQL_Remarks__c,JavaScript_Remarks__c
                               FROM Interview__c Limit 1];
        test.startTest();
        InterviewRating_Controller.updateInterviewRating(interv.Name, interv.Interviewer__r.Employee_ID__c, interv, 'developer', 'next round', true);
        InterviewRating_Controller.getPicklistvalues('Interview__c', 'Suitable_for_which_Role__c', true);
        InterviewRating_Controller.updateInterviewRecord(interv.Name, interv.Interviewer__r.Employee_ID__c, false);
        test.stopTest();        
    }
}