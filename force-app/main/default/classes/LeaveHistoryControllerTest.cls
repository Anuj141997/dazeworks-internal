@isTest
public class LeaveHistoryControllerTest {
@isTest
    static void LeaveHistoryControllerTestMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.LastName ='Test';
        con.Title='ABCD';
        con.Email='abcd@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW000';
        insert con;
        
        
        Employee_Session__c empSes = new Employee_Session__c();
        empSes.Name='Test';
        empSes.Employee__c=con.Id;
        empSes.Current_Session__c=TRUE;
        insert empSes;
        
      Leave__c lvObj =new Leave__c();
        lvObj.Employee__c=empSes.Id;
        lvObj.Leave_Type__c='Leave';
        lvObj.Manager_Approval_Status__c='Pending';
        lvObj.From__c=System.today();
        lvObj.Description__c='leave';
        insert lvObj;
        string paramvalue = EncodingUtil.base64Encode(Blob.valueOf(con.Employee_ID__c));
        
        
        Test.startTest();
        LeaveHistoryController.getLeaveDetails(con.Employee_ID__c);
        LeaveHistoryController.getLeaveDetailsForMngr(paramvalue);
        Test.stopTest();
    }
}