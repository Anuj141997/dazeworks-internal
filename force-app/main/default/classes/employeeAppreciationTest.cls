@isTest
public class employeeAppreciationTest {
    @isTest
    public static void test1(){
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
        
        Test.startTest();
        EmployeeAppreciation.submitAppreciation(con.Id, Date.today(), 'test' , 'test', 'test');
       EmployeeAppreciation.appreList(con.Employee_ID__c);
        Test.stopTest();
    }

}