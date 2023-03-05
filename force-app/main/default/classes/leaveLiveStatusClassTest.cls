@isTest
public class leaveLiveStatusClassTest {
	@isTest
    static void leaveLiveStatusTestMethod(){
         Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.FirstName='T123';
        con.LastName ='Test123';
        con.Title='ABCD123';
        con.Company_Email__c='test123@test.com';
        con.Email='abcd123@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW122123'; 
        con.Active__c = true;
        con.Birthdate=system.today();
        insert con;
        
        
        
        Employee_Session__c empSes = new Employee_Session__c();
        empSes.Name='Test';
        empSes.Employee__c=con.Id;
        empSes.Optout_For_Leave__c=true;
        empSes.Current_Session__c=true;
        insert empSes;
        
        Date d = System.today();
        Date d1 = d.addDays(1);
        
        
        Leave__c lvObj =new Leave__c();
        lvObj.Employee__c=empSes.Id;
        lvObj.Leave_Type__c='Leave';
        lvObj.From__c=System.today();
        lvObj.Manager_Approval_Status__c='Approved';
        lvObj.Status__c='Approved';
        lvObj.Till__c=d1;
        lvObj.Type_of_Leave__c='Sick Leave (SL)';
        lvObj.Description__c='leave';
        insert lvObj;
        
        
        Test.startTest();
        leaveLiveStatusClass.getLeaveDataToday();
        leaveLiveStatusClass.getLeaveDataTomorrow();
        Test.stopTest();
            
		        
    }
}