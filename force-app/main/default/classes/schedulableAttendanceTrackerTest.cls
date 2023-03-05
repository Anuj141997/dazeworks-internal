@isTest
public class schedulableAttendanceTrackerTest {
    
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

    }
    
	@isTest
    public static void AttendanceTrackerTestCase(){
                        
        Test.StartTest();
        schedulableAttendanceTracker sheduleTracker = new schedulableAttendanceTracker();
        String scheduleTime = '0 0 2 * * ?'; 
        system.schedule('Test Check', scheduleTime, sheduleTracker); 
        Test.stopTest();
        
        list<Attendance__c> lstAttendance = [SELECT Id FROM Attendance__c];
        System.assertEquals(lstAttendance.size(),1);
    }
    
    @isTest
    public static void AttendanceTrackerLOPTestCase(){
          
        Leave__c objLeave = [SELECT Id, Leave_Type__c FROM Leave__c];
        objLeave.Leave_Type__c = 'Leave without Pay';
        update objLeave;
        
        Test.StartTest();
        schedulableAttendanceTracker sheduleTracker = new schedulableAttendanceTracker();
        String scheduleTime = '0 0 2 * * ?'; 
        system.schedule('Test Check', scheduleTime, sheduleTracker); 
        Test.stopTest();
        
        list<Attendance__c> lstAttendance = [SELECT Id FROM Attendance__c];
        System.assertEquals(lstAttendance.size(),1);
    }
    
    @isTest
    public static void AttendanceTrackerWFHTestCase(){
          
        Leave__c objLeave = [SELECT Id, Leave_Type__c FROM Leave__c];
        objLeave.Leave_Type__c = 'WFH';
        update objLeave;
        
        Test.StartTest();
        schedulableAttendanceTracker sheduleTracker = new schedulableAttendanceTracker();
        String scheduleTime = '0 0 2 * * ?'; 
        system.schedule('Test Check', scheduleTime, sheduleTracker); 
        Test.stopTest();
        
        list<Attendance__c> lstAttendance = [SELECT Id FROM Attendance__c];
        System.assertEquals(lstAttendance.size(),1);
    }
    
    @isTest
    public static void AttendanceTrackerWFHHalfDayFalseTestCase(){
          
        Leave__c objLeave = [SELECT Id, Leave_Type__c, Half_Day__c FROM Leave__c];
        objLeave.Half_Day__c = false;
        objLeave.Leave_Type__c = 'WFH';
        update objLeave;
        
        Test.StartTest();
        schedulableAttendanceTracker sh1 = new schedulableAttendanceTracker();
        String sch = '0 0 2 * * ?';
        system.schedule('Test Check', sch, sh1); 
        Test.stopTest();
        
        list<Attendance__c> lstAttendance = [SELECT Id FROM Attendance__c];
        System.assertEquals(lstAttendance.size(),1);
    }
}