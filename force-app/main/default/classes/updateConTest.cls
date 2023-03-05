@isTest
public class updateConTest {
    @isTest
    public static void test1(){
        Contact con = new Contact();
        con.FirstName='test';
        con.LastName='testing';
        con.Email='test@gmail.com';
        con.Employee_ID__c='Dw112';
        con.Update_By_Employee__c=true;
        con.Phone='132252';
        insert con;
        Contact con1 = new Contact();
        con1.FirstName='test1';
        con1.LastName='testing1';
        con1.Email='test1@gmail.com';
        con1.Employee_ID__c='Dw1121';
        con1.Update_By_Employee__c=false;
        con1.Phone='1322521';
        insert con1;
        test.startTest();
        updateContact.getContact(con.Employee_ID__c);
        updateContact.updateContactMethod(con);
        updateContact.updateContactMethod(con1);
        updateContact.getPicklist('Contact','Blood_Group__c');
        test.stopTest();
    }

}