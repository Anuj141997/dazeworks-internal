@isTest
public with sharing class fetchEmployeeTest {
    
    @testSetup
    public static void createData(){
        Id accRecId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Customers').getRecordTypeId();
        Id contRecId = Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Employee').getRecordTypeId();
       // Id perfRecId = Schema.SObjectType.Performance__c.getRecordTypeInfosByDeveloperName().get('Employee_Performance_Management').getRecordTypeId();
        
        account acc = new account();
        acc.name = 'perfAcc';
        acc.RecordtypeId = accRecId;
        insert acc;
        
        Contact con = new Contact();
        con.RecordtypeId = contRecId;
        con.AccountId= acc.Id;
        con.Employee_ID__c = 'dw111';
        con.Email = 'test@test.com';
        con.CurrencyIsoCode= 'INR';
        con.Title='Developer';
        con.LastName='perfCon';
        con.Date_of_Joining__c= System.today();
        insert con;
        
        
        
       
        
    }
    @isTest static void testPerfData(){
          
        
        contact c = [select id,Name,Employee_ID__c,Email from contact limit 1];
        fetchEmployee.getEmployeeDesignation(c.id);
        fetchEmployee.getEmployee(c.Employee_ID__c);
        fetchEmployee.generateOtp(c);
        
        
    }
    
}