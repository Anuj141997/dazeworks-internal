@isTest
public class internalMeetingTest {
    @isTest
    public static void test1(){
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
        Internal_Meeting__c meet = new Internal_Meeting__c();
       
        Test.startTest();
      
        createInternalMeetings.createMeetingDetails('meetName', 'recDriveLink', 'dept', 'link', Date.today(), Date.today() , 'Training', con.Id);
        
        createInternalMeetings.pickListValueDynamically(meet, 'Meeting_Type__c');
        
        Test.stopTest();
        
    } 
    

}