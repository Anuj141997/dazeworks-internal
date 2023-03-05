@isTest
public class LeavedashboardTest {
@isTest
    static void LeavedashboardTestMethod(){
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
        
        Contact con_1 = new Contact();
        con_1.LastName ='Test';
        con_1.Title='ABCD';
        con_1.Active__c=true;
        con_1.ReportsToId=con.Id;
        con_1.Email='abcde@gmail.com';
        con_1.AccountId = acc.Id;
        con_1.Date_of_Joining__c=system.today();
        con_1.Employee_ID__c='DW1234';
        insert con_1;
        
        Employee_Session__c empSes = new Employee_Session__c();
        empSes.Name='Test';
        empSes.Session__c='2020-2021';
        empSes.Employee__c=con_1.Id;
        empSes.Current_Session__c=true;
        insert empSes;
        
        Leave__c lvObj =new Leave__c();
        lvObj.Employee__c=empSes.Id;
        lvObj.Leave_Type__c='Leave';
        lvObj.Type_of_Leave__c='Sick Leave (SL)';
        lvObj.Till__c=System.today();
        lvObj.From__c=System.today();
        lvObj.Description__c='leave';
        lvObj.Status__c='Approved';
        insert lvObj;
        
        string paramvalue = EncodingUtil.base64Encode(Blob.valueOf(con.Employee_ID__c));
        
        Test.startTest();
        Leavedashboard.LeaveDashboard_1('DW123');
        Leavedashboard.LeaveDashboard_2(paramvalue);
        Leavedashboard.LeaveMangerDetails(paramvalue);
        Leavedashboard.getLeaveDetails('2020-2021', con.Id, 'Approved', '9', 15, 1, con.Employee_ID__c);
        Leavedashboard.getLeaveDetails(null, con.Id, 'Approved', '9', 15, 1, con.Employee_ID__c);
        Leavedashboard.getLeaveDetails('2020-2021', null, 'Approved', '9', 15, 1, con.Employee_ID__c);
        Leavedashboard.getLeaveDetails(null, null, 'Approved', '9', 15, 1, con.Employee_ID__c);
        Leavedashboard.getLeaveDetails(null, null,null, '9', 15, 1, con.Employee_ID__c);
        Leavedashboard.findRecordsforMeetingFeedback('Test','Contact');
        Test.stopTest();
    }
}