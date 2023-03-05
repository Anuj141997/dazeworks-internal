@isTest
public with sharing class PerformanceControllerTest {
    public static void createData(){
        Id accRecId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Customers').getRecordTypeId();
        Id contRecId = Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Employee').getRecordTypeId();
        Id perfRecId = Schema.SObjectType.Performance__c.getRecordTypeInfosByDeveloperName().get('Employee_Performance_Management').getRecordTypeId();
        
        account acc = new account();
        acc.name = 'perfAcc';
        acc.RecordtypeId = accRecId;
        insert acc;
        
        Contact con = new Contact();
        con.RecordtypeId = contRecId;
        con.AccountId= acc.Id;
        con.CurrencyIsoCode= 'INR';
        con.LastName='perfCon';
        con.Active__c = true;
        con.Date_of_Joining__c= System.today();
        insert con;
        
        Performance__c pref = new Performance__c();
        pref.RecordtypeId = perfRecId;
        pref.Employee__c= con.Id;
        pref.Session__c='2021-22';
        insert pref;
        
        Goals_By_Performance__c gBp = new Goals_By_Performance__c();
        gBp.Name='testgoal';
        gBp.Performance__c= pref.id;
        insert gBp;
        
    }
    @isTest static void testPerfData(){
        
        PerformanceControllerTest.createData(); 
        PerformanceController.getContacts();
        // PerformanceController.createPerformance('');
        Performance__c p = [select id from Performance__c limit 1];
        Goals_By_Performance__c g = [select id from Goals_By_Performance__c limit 1];
        system.debug('p.id'+p.id);
        system.debug('g.id'+g.id);
        PerformanceController.fetchPerformance(p.id);
        //PerformanceController.createGoalByPerformance('');
        PerformanceController.fetchGoals(g.id);
        
    }
    @isTest static void testgoalData(){
        
        
         PerformanceControllerTest.createData();
        Performance__c p = [select id from Performance__c];
        contact c = [select id from contact];
        
        p.Created_By_Contact__c= c.id;
        p.Department__c= 'Delivery';
        p.Employee_Rating_by_Manager__c= '6';
        //p.Employee__c= c.id;
        p.Final_Performance_Rating__c= 'PME';
        p.Last_Modified_By__c= c.id;
        p.Manager__c = c.id;
        p.Overall_Summery_By_Manager__c= 'test';
      //  p.RecordTypeId= perfRecId;
        p.Session__c= '2020-21';
        p.Type_of_Review__c= 'Mid';
        String myJSON = JSON.serialize(p);
        PerformanceController.createPerformance(myJSON);
         PerformanceController.createGoalByPerformance(myJSON);
    }
}