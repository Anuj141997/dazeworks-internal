/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-24-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-24-2022   Shivam Kumar   Initial Version
**/
@isTest
public class SentLeaveNotificationTest {
    @isTest
   public static void test1(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
       
       Contact con = new Contact();
        con.LastName ='Test1';
        con.Title='ABCD1';
        con.Company_Email__c='test1@test.com';
        con.Email='abcd1@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';
        insert con; 
        
        Contact con1 = new Contact();
        con1.LastName ='Test';
        con1.Title='ABCD';
        con1.Company_Email__c='test@test.com';
        con1.Email='abcd@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW122';
       con1.ReportsToId= con.Id;
        insert con1;
      
        Employee_Session__c emp = new Employee_Session__c();
        emp.Employee__c =con1.Id;
        emp.Name='20-22';
        insert emp;
        
        Leave__c lv = new Leave__c ();
        lv.Employee__c= emp.Id;
        lv.From__c= Date.today();
        lv.Description__c='test';
        lv.Leave_Type__c='Leave';
        lv.Send_Notification__c=false;
        lv.RecordTypeId='0122v000002BAayAAG';
        insert lv;
       
       //Test.startTest();
        lv.Send_Notification__c=true;
       lv.Manager_Approval_Status__c='Approved';
        update lv;
       lv.Send_Notification__c=true;
       lv.Manager_Approval_Status__c='Reject';
       update lv;
        //Test.stopTest();
    }
    
    
}