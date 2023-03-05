@isTest
public class employeeFeedbackTest {
    @isTest
    public static void test1(){
         Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.LastName ='Test';
        con.Title='ABCD';
        con.Email='abcd@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';
        insert con;
        
        
        Internal_Meeting__c meet = new Internal_Meeting__c();
        meet.Name='test';
        meet.Delivered_By__c =con.Id;
        meet.Department__c='Test';
        meet.End_Date__c=Date.today();
        meet.Start_Date__c=Date.today();
        meet.Meeting_Type__c='Training';
        meet.Link__c='www.test.com';
        meet.Recorded_Session_drive_link__c='www.Test.com';
        insert meet;
        Employee_Feedback__c empfeed = new Employee_Feedback__c();
         Test.startTest();
        createEmployeeFeedback.submitfeedback(meet.Id, con.Id, '5', Date.today() , 'Test');
        createEmployeeFeedback.pickListValueDynamically(empfeed, 'Rating__c');
        Test.stopTest();
        
    }

}