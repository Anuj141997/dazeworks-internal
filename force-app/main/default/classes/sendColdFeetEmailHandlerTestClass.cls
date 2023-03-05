@isTest (seeAllData = true)
public class sendColdFeetEmailHandlerTestClass {
    @isTest
    public static void sendColdFeetEmailHandlerTestMethod(){
        
        Id candRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
        Id empRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        
        Contact cand = new Contact(LastName = 'Prashant', recordTypeId = candRecordTypeId, Email='test@gmail.com');
        insert cand;
        
        Contact emp = new Contact(LastName = 'Interviewer', RecordTypeId = empRecordTypeId);
        insert emp;
        
        Position__c pos = new Position__c(Name = 'admin', active__c = true);
        insert pos;
        
        Application__c app = new Application__c(Application_Date__c = Date.newInstance(2020, 9, 22), Position__c = pos.Id, Candidate__c = cand.id);
        insert app;
        
        Interview__c interview = new Interview__c(Application__c=app.Id, 
                                                  Interview_Date_and_Time__c=DateTime.newInstance(2020, 09, 22, 13, 30, 0),
                                                 Interviewer__c=emp.Id, Interviewee_didn_t_join__c=false);
        insert interview;
        
        interview.Interviewee_didn_t_join__c=true;
        update interview;
        
         EmailTemplate emailTemp = [SELECT Id, Subject, Description, HtmlValue, DeveloperName, Body FROM EmailTemplate 
                                   WHERE Name = 'Cold Feet' LIMIT 1];
    }
}