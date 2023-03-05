@isTest
public class EmployeeBirthdayScheduler_TestClass {
    @isTest
    public static void testschedule(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.LastName ='Test';
        con.Title='ABCD';
        con.Email='abcd@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Birthdate=system.today();
        con.Employee_ID__c='DW123';
        con.Active__c= true;
        insert con;
        
        Test.StartTest();
        EmployeeBirthdayScheduler sh1 = new EmployeeBirthdayScheduler();
        String sch = '0 0 23 * * ?';
        system.schedule('Test Territory Check', sch, sh1);
        Test.stopTest();
    }
}