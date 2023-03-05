@isTest
public class ticketManagementTest {
    @isTest
    public static void firstMethod(){
        Contact con = new Contact();
        con.FirstName='test';
        con.LastName='testing';
        con.Email='test@gmail.com';
        con.Employee_ID__c='DW123';
        con.Phone='132252';
        insert con;
        test.startTest();
        ticketManagement.createActionItem('DW123','HR Related','Leave','Hi');
        ticketManagement.getTickets('dw123');
        test.stopTest();
    }
}