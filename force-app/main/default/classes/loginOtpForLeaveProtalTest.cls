@isTest
public class loginOtpForLeaveProtalTest {
    @isTest
    public static void getOtptestMethod(){
        
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
        
        Test.startTest();
        loginOtpForLeavePortal.getEmployee(con.Employee_ID__c);
        loginOtpForLeavePortal.getEmployeeDesignation(con.Id);
        loginOtpForLeavePortal.generateOtp(con);
        Test.stopTest();
    }
}