@isTest
public class EmployeeBirthday_TestClass {
    @isTest
    public static void getEmail_TestMethod(){
        Id empRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        Contact con = new Contact(LastName = 'test', Interviewer__c = true, recordTypeId = empRecordTypeId,
                                  Email = 'test@gmail.com', Active__c = true,
                                  Birthdate=Date.newInstance(1995, Date.today().month(), Date.today().day()));
        insert con;
        Resource__c res = new Resource__c(Resource_Name__c = con.Id,Active__c = true);
        
        insert res;
        Project__c pro = new Project__c(Name = 'Test Project',Color__c = 'Green');
        
        insert pro;
        Allocation__c allocat = new Allocation__c(Resource__c = res.ID,Project__c = pro.Id,Start_Date__c = date.parse('09/08/2020'),
                                                  End_Date__c = date.parse('10/08/2020'),Effort__c = 'High',
                                                  Status__c = 'Active');
        
        insert allocat;
        
        List<CCEmails__c> acv = new List<CCEmails__c>();
        acv.add(new CCEmails__c(Name = 'Tst',ccEmail__c  = 'test@gmail.com'));
        acv.add(new CCEmails__c(Name = 'Tst1',ccEmail__c  = 'test1@gmail.com'));
        acv.add(new CCEmails__c(Name = 'Tst2',ccEmail__c  = 'test2@gmail.com'));
        acv.add(new CCEmails__c(Name = 'Tst3',ccEmail__c  = 'test3@gmail.com'));
        acv.add(new CCEmails__c(Name = 'Tst4',ccEmail__c  = 'test4@gmail.com'));
        
        insert acv;
        
        List<Greetings__c> pics = new List<Greetings__c>();
        pics.add(new Greetings__c(Name = 'Pics1'));
        pics.add(new Greetings__c(Name = 'Pics2'));
        insert pics;
        test.startTest();
        EmployeeBirthday.getEmail();
        test.stopTest();
    }
}