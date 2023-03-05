@isTest
public class LoginIpControllerTest {
    @isTest
    public static void firstMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.FirstName='T1';
        con.LastName ='Test1';
        con.Title='ABCD1';
        con.Company_Email__c='test1@test.com';
        con.Email='abcd1@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';        
        insert con;
        
        String tempIp='test';
        
        Session_Management__c sm=new Session_Management__c();
        sm.Name=tempIp;
        sm.Contact__c=con.Id;
        sm.Page_Name__c='Hiii';
        sm.IsActive__c=true;
        insert sm;
        
        Test.startTest();
        LoginIpController.checkIp('DW123','test');
        LoginIpController.resetPageName('DW123','test');
        LoginIpController.setPageName('DW123', 'pageName','test');
        LoginIpController.currentPage('DW123','test');
        LoginIpController.insertSession('DW123','1.1.1.1');
        LoginIpController.autoCheckIp('1.1.1.1');
        LoginIpController.logout('DW123','test');
        LoginIpController.checkIp('DW123','test');
        Test.stopTest();
    }
}