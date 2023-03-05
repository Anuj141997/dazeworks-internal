@isTest
public with sharing class EmpPerformanceControllerTest {
    
    
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
        con.Date_of_Joining__c= System.today();
        insert con;
        
        Performance__c pref = new Performance__c();
        pref.RecordtypeId = perfRecId;
        pref.Employee__c= con.Id;
        pref.Session__c='2021-22';
        insert pref;
        
        
    }
    @isTest static void testPerfData() {
        
        EmpPerformanceControllerTest.createData(); 
        contact c = [select id from contact limit 1];
        EmpPerformanceController.getPerformanceData('2021-22',c.id);
        PerformanceLeaveListViewController.getAllPerformance('2021-22');
        
    }
}