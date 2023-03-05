@isTest
public class leaveTableTest {
    @isTest
    Public static void test1(){
         Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con1 = new Contact();
        con1.LastName ='Test1';
        con1.Active__c=true;
        con1.Title='ABCD1';
        con1.Email='abcd1@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW124';
        insert con1;
        
        Contact con = new Contact();
        con.LastName ='Test';
        con.Title='ABCD';
        con.Active__c=true;
        con.ReportsToId=con1.Id;
        con.Email='abcd@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';
        insert con;
        
        Employee_Session__c empSes = new Employee_Session__c();
        empSes.Name='Test';
        empSes.Session__c='2020-2021';
        empSes.Employee__c=con.Id;
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
        Test.startTest();
        leaveTable.getLeaveDetails(null,null,null,null,15,1);
        leaveTable.getLeaveDetails('2020-2021',con.Id,'Approved','7',15,1);
        leaveTable.getLeaveDetails('2020-2021',null,'Approved','7',15,1);
        leaveTable.getLeaveDetails(null,con.Id,'Approved','7',15,1);
        leaveTable.getLeaveDetails(null,null,'Approved','7',15,1);
        leaveTable.getLeaveDetails(null,null,'Approved','7',15,1);
        leaveTable.getLeaveDetails(null,null,null,'7',15,1);
        leaveTable.getLeaveDetails('2020-2021',null,null,'7',15,1);
        leaveTable.findRecordsforMeetingFeedback('Test','Contact');
        Test.stopTest();
    }

}