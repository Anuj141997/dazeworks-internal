@isTest
public class SchedulableUpdateAttendanceTrackerTest {
	
        @testSetup static void setup() {
        
        // Create common test data
        Account objAccount = new Account();
        objAccount.Name= 'DazeWorks';
        insert objAccount;
        
        contact objContact = new contact();
        objContact.FirstName = 'Test';
        objContact.LastName = 'Emp';
        objContact.Active__c = true;
        objContact.Date_of_Joining__c = date.newInstance(2019, 7, 15);
        objContact.AccountId = objAccount.Id;
        insert objContact;
        
    	Employee_Session__c objEmployeeSession = new Employee_Session__c();
        objEmployeeSession.Name = 'Test Emp 2021-2022';
        objEmployeeSession.Current_Session__c = true;
        objEmployeeSession.Employee__c = objContact.Id;
        insert objEmployeeSession;
        
        Leave__c objLeave = new Leave__c();
        objLeave.Till__c = system.today() + 1;
        objLeave.From__c = system.today() - 1;
        objLeave.Leave_Type__c = 'Leave';
        objLeave.Half_Day__c = true;
        objLeave.Employee__c = objEmployeeSession.Id;
        insert objLeave;
		
        Attendance__c objAttendance = new Attendance__c();
        objAttendance.Employee__c = objEmployeeSession.Id;
        objAttendance.Status__c = 'Leave';
        insert objAttendance;   
    }
	
   	@isTest
    public static void AttendanceTrackerTestCase(){
        
        list<date> lstAttendanceDate = new list<date>();
        lstAttendanceDate.add(system.today());
        lstAttendanceDate.add(system.today() - 1);
        
        Test.StartTest();
        SchedulableUpdateAttendanceTracker sheduleUpdateTracker = 
            new SchedulableUpdateAttendanceTracker(lstAttendanceDate);
        Database.executeBatch(sheduleUpdateTracker);
        Test.stopTest();
    }

}