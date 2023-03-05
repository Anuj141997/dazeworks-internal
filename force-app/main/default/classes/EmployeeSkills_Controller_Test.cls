@isTest
public class EmployeeSkills_Controller_Test {
    @isTest
    public static void EmployeeSkills_Controller_TestMethod(){
        Contact con = new Contact(LastName = 'Test', Employee_Id__c='DW1234', Skills__c = 'Apex;Visualforce');
        insert con;
        Test.startTest();
        EmployeeSkills_Controller.getPiklistValues();
        EmployeeSkills_Controller.updateSkills('1234', 'Apex,Visualforce,Lightning Development,COmmunity Cloud', 'Education Cloud');
        Test.stopTest();
    } 
}