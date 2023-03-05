@isTest
public class CertificationTest {
    @isTest
    static void CertificationTestMethod(){
         Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con1 = new Contact();
        con1.LastName ='Test';
        con1.Title='ABCD';
        con1.Company_Email__c='test@test.com';
        con1.Email='abcd@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW122';        
        insert con1;
        
        Contact con = new Contact();
        con.LastName ='Test1';
        con.Title='ABCD1';
        con.ReportsToId=con1.Id;
        con.Company_Email__c='test1@test.com';
        con.Email='abcd1@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';        
        insert con;
        
        Certification__c cert = new Certification__c();
        cert.Certification_Date__c=system.today();
        cert.Type_of_Certificate__c='Salesforce Platform Developer I';
        cert.Contact__c=con.Id;
        insert cert;
        
        List<Certification.CertificateWrapper> wrapList= new List<Certification.CertificateWrapper>();
        Certification.CertificateWrapper wrap= new Certification.CertificateWrapper();
        wrap.Certication='Salesforce Advanced Administrator';
        wrap.CertificateDate= system.today();
        wrap.indexes=1;
        wrapList.add(wrap);
        
        Test.startTest();
        Certification.createCertification(wrapList,'DW123');
        Certification.getPicklist('Certification__c', 'Type_of_Certificate__c');
        Certification.getCertificateList('DW123');
        Certification.updateCert(system.today(), 'Salesforce Advanced Administrator', null,cert.Id );
        Test.stopTest();
    }

}