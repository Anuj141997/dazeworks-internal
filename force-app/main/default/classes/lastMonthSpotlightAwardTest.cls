@isTest
public class lastMonthSpotlightAwardTest {
    @isTest
    static void lastMonthSpotlightAwardTestMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Id EmployeeRecordTypeId =Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Employee').getRecordTypeId();
        
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
        con.RecordTypeId= EmployeeRecordTypeId;
        con.Birthdate=system.today();
        insert con;
        
        Contact con1 = new Contact();
        con1.FirstName='T1';
        con1.LastName ='Test';
        con1.Title='ABCD';
        con1.ReportsToId=con.Id;
        con1.Company_Email__c='test@test.com';
        con1.Email='abcd@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW122'; 
        con1.Active__c = true;
        con1.RecordTypeId= EmployeeRecordTypeId;
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
        
        Id AwardRecordTypeId =Schema.SObjectType.Performance__c.getRecordTypeInfosByDeveloperName().get('Award_Nomination').getRecordTypeId();
        
        Performance__c p = new Performance__c();
        p.Award_Type__c = 'Spotlight Awards';
        p.Employee__c = con1.Id;
        p.Approved__c = true;
        p.Department__c ='Delivery';
        p.Period__c='August';
        p.Session__c='2022-23';
        p.Manager__c=con.Id;
        p.RecordTypeId =AwardRecordTypeId;
        p.Type_of_Review__c='Initial';
        insert p;
        
        Performance__c p1 = new Performance__c();
        p1.Award_Type__c = 'Spotlight Awards';
        p1.Employee__c = con.Id;
        p1.Approved__c = true;
        p1.Department__c ='Delivery';
        p1.Period__c='August';
        p1.Session__c='2022-23';
        p1.RecordTypeId =AwardRecordTypeId;
        p1.Type_of_Review__c='Initial';
        insert p1;
        
        Test.startTest();
        lastMonthSpotlightAward.empImageToDisplay('2022-23');
        Test.stopTest();
    }
}