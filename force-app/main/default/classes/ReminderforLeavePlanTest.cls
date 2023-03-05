/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-24-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-24-2022   Shivam Kumar   Initial Version
**/
@isTest
public class ReminderforLeavePlanTest {
    @isTest 
    public static void test(){
        Contact con = new Contact();
        con.FirstName='test';
        con.LastName='Test';
        con.Email='test@test.com';
        insert con; 
        
        Employee_Session__c emps = new Employee_Session__c();
        emps.Name='test';
        emps.Employee__c=con.Id;
        emps.Optout_For_Leave__c=true;
        insert emps;
        
        List<Employee_Session__c> empList =[Select Id, Name, Optout_For_Leave__c From Employee_Session__c Where Name!=Null];
        for(Employee_Session__c emp : empList){
            if(emp.Optout_For_Leave__c==true){
                emp.Optout_For_Leave__c=false;
            }
        }
        update empList;
        Test.startTest();
        ReminderforLeavePlan rem = new ReminderforLeavePlan();
        Id jobid = Database.executeBatch(rem);
        ReminderforLeavePlanScheduler sh1 = new ReminderforLeavePlanScheduler();
        String sch = '0 0 23 * * ?'; 
        system.schedule('Test Territory Check', sch, sh1);
        Test.stopTest();
       
        
        
        
    }
    
}