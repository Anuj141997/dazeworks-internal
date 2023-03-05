@isTest
public class birthdayStatusForEmpPortalTest {
    @isTest
    static void birthdayStatusForEmpPortalTestMethod(){
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
        
        Contact con1 = new Contact();
        con1.FirstName='T1';
        con1.LastName ='Test';
        con1.Title='ABCD';
        con1.Company_Email__c='test@test.com';
        con1.Email='abcd@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW122'; 
        con1.Active__c = true;
        con1.Birthdate=system.today();
        insert con1;
        
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode('base64');
        cv.Title = 'filename';
        cv.PathOnClient = 'filename';
        insert cv;
        
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [
            SELECT ContentDocumentId
            FROM ContentVersion
            WHERE Id =: cv.Id
        ].ContentDocumentId;
        cdl.LinkedEntityId = con1.Id;
        cdl.ShareType = 'V';
        insert cdl;
        
        Test.startTest();
        birthdayStatusForEmpPortal.empEmageToDisplay();
        Test.stopTest();
    }
}