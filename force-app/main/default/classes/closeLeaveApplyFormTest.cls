@isTest
public class closeLeaveApplyFormTest {
    @isTest 
    public static void tests(){
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
            if(emp.Optout_For_Leave__c==false){
                emp.Optout_For_Leave__c=true;
            }
        }
        update empList;
        Test.startTest();
        closeLeaveApplyForm cls = new closeLeaveApplyForm();
        Id jobid = Database.executeBatch(cls);
        closeLeaveApplyFormScheduler sh1 = new closeLeaveApplyFormScheduler();
        String sch = '0 0 23 * * ?'; 
        system.schedule('Test Territory Check', sch, sh1); 
        Test.stopTest();
        
    }
    
}