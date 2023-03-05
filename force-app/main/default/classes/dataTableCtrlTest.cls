@isTest
public with sharing class dataTableCtrlTest {
    @isTest
    static void fetchApplicationWrapperTest() {
        
        Contact c = new Contact();
        c.LastName = 'LastNameOfContact';
        c.CurrencyIsoCode = 'USD';
        c.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
        insert c;
        
        Contact emp = new Contact();
        emp.LastName = 'EmpName';
        emp.CurrencyIsoCode = 'USD';
        emp.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        insert emp;
        
        Position__c pos = new Position__c();
        pos.Name = 'Salesforce Developer';
        pos.Department__c = 'Development';
        pos.Active__c = true;
        insert pos;
        
        Application__c app1 = new Application__c();
        app1.Candidate__c = c.Id;
        app1.Position__c = pos.Id;
        app1.Application_Date__c = date.today();
        app1.Interview_Round__c = 'Not Scheduled';
        insert app1;
        
        
        Interview__c int1 = new Interview__c();
        int1.Application__c = app1.Id;
        int1.Comments__c = 'Candidate is rejected';
        int1.Language_on_10__c = '5';
        int1.Technical_on_10__c = '5';
        int1.Overall_on_10__c = '5';
        int1.Interview_Status__c = 'Interviewed';
        int1.Interviewer__c = emp.Id;
        int1.Interview_Date_and_Time__c = datetime.now().addDays(10);
        
        int1.Interview_Round__c = 'Round 1';
        insert int1;
        List<String> interviewStatus = new List<String>{'Scheduled', 'Interviewed', 'Rescheduled'};
            interviewScorecardTableCtrl.interviewListWrapper wrap = new interviewScorecardTableCtrl.interviewListWrapper(false, int1,interviewStatus );
        List<interviewScorecardTableCtrl.interviewListWrapper> listWrapper = new List<interviewScorecardTableCtrl.interviewListWrapper>{wrap};
            
            
            String wrapString = JSON.serialize(listWrapper);
            system.debug('interview' + int1);
        
        Test.startTest();
        dataTableCtrl.fetchApplicationWrapper();
        dataTableCtrl.fetchApplication(app1.Id, 'Round 1');
        dataTableCtrl.fetchCandidate('Last', 'Contact');
        dataTableCtrl.fetchCandidate('Sale', 'JobOpening');
        dataTableCtrl.fetchCandidate('option1', 'NotForSearchButton');
        dataTableCtrl.fetchCandidate('option2', 'NotForSearchButton');
        
        interviewScorecardTableCtrl.fetchInterviewWrapper(app1.Id, int1 ,'Interview_Status__c');
        interviewScorecardTableCtrl.updateInterviewWrapper(wrapString);
        Test.stopTest();
    }
}