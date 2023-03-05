@isTest
public class AttendanceTrackerClassTest {
    public static String CRON_EXP = '0 0 23 21 08 ? 2020';
    @isTest
    public static void AttendanceTrackerClassTest_TestMethod(){
        Account accRec = new Account();
        accRec.Name = 'Dazeworks';
        insert accRec;
        
        Contact contRec = new Contact();
        contRec.LastName = 'Dazewo';
        contRec.AccountId = accRec.Id;
        contRec.Active__c = true;
        contRec.Date_of_Joining__c = system.today() - 2;
        contRec.RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        insert contRec;
        
        Employee_Session__c empSession = new Employee_Session__c();
        empSession.Current_Session__c = true;
        empSession.Employee__c = contRec.Id;
        empSession.Name = 'Dazewo 2020-2021';
        empSession.Session__c = '2020-2021';
        insert empSession;
        
                Employee_Session__c empSession1 = new Employee_Session__c();
        empSession1.Current_Session__c = true;
        empSession1.Employee__c = contRec.Id;
        empSession1.Name = 'Dazewo 2020-2021';
        empSession1.Session__c = '2020-2021';
        insert empSession1;
        
        Employee_Session__c empSession3 = new Employee_Session__c();
        empSession3.Current_Session__c = true;
        empSession3.Employee__c = contRec.Id;
        empSession3.Name = 'Dazewo 2020-2021';
        empSession3.Session__c = '2020-2021';
        insert empSession3;
        
        Leave__c leaveRec = new Leave__c();
        leaveRec.From__c = system.today();
        leaveRec.Till__c = system.today()+1;
        leaveRec.Employee__c = empSession.Id;
        leaveRec.Leave_Type__c = 'Leave';
        leaveRec.Description__c = 'leaveTest';
        insert leaveRec;
        Date todaysDate = system.today();
        
        Leave__c leaveRec1 = new Leave__c();
        leaveRec1.From__c = system.today();
        leaveRec1.Till__c = system.today()+3;
        leaveRec1.Employee__c = empSession1.Id;
        leaveRec1.Leave_Type__c = 'WFH';
        leaveRec1.Description__c = 'leaveTest';
        insert leaveRec1;
        
        Leave__c leaveRec2 = new Leave__c();
        leaveRec2.From__c = system.today();
        leaveRec2.Till__c = system.today()+3;
        leaveRec2.Employee__c = empSession3.Id;
        leaveRec2.Leave_Type__c = 'Leave without Pay';
        leaveRec2.Description__c = 'leaveTest';
        insert leaveRec2;
        
        test.startTest();
        AttendanceTrackerClass.createAttendanceRecord(todaysDate+2);
        AttendanceTrackerClass.createAttendanceRecord(todaysDate);
        AttendanceTrackerClass.createAttendanceRecord(todaysDate-2);
        test.stopTest();
        String jobId = System.schedule('ScheduledApexTest',
                                       CRON_EXP ,
                                       new schedulableAttendanceTracker());
        // Get the information from the CronTrigger API object
        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, 
                          NextFireTime
                          FROM CronTrigger WHERE id = :jobId];
        
        // Verify the expressions are the same
        System.assertEquals(CRON_EXP,ct.CronExpression);
        
        // Verify the job has not run
        System.assertEquals(0, ct.TimesTriggered);
        
        

    }
}