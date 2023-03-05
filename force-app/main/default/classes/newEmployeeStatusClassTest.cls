@isTest
public class newEmployeeStatusClassTest {
	@isTest
    static void newEmployeeStatusTestMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.FirstName='FirstTest';
        con.LastName ='LastTest';
        con.Email='test1@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW112233'; 
        con.Active__c = true;
        insert con;
        
        Contact con1 = new Contact();
        con1.FirstName='F';
        con1.LastName ='L';
        con1.Email='test@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW112255'; 
        con1.Active__c = true;
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
        newEmployeeStatusClass.newEmployee();
        Test.stopTest();
    }
}