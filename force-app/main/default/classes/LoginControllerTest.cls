@isTest
public class LoginControllerTest {
    @isTest
    public static void firstTest(){
        Contact con = new Contact();
        con.FirstName='test';
        con.LastName='testing';
        con.Email='test@gmail.com';
        con.Employee_ID__c='DW123';
        con.Phone='132252';
        con.Emp_Portal_Password__c='Test@12';
        con.Security_Answer__c='dog';
        insert con;
        Test.startTest();
        LoginController.checkUser('DW123', 'Test@12');
        LoginController.getAppReset('DW123', 'dog');
        LoginController.getPasswordReset('DW123', 'Test@1');
        LoginController.getEmployeeInfo('DW123');
        LoginController.sendEmail(con.Email, 'subject');
        LoginController.uploadFile('base64','filename',con.Id);
        LoginController.createContentVersion('base64', 'filename');
        LoginController.empEmageToDisplay(con.Id);
        //LoginController.createContentLink('contentVersionId', con.Id);
        Test.stopTest();
    }
}