@isTest
public class ProjectList_Controller_TestClass {
	@isTest
    public static void testProjectLists(){
        Id empRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        Contact con = new Contact(LastName = 'test', Interviewer__c = true, recordTypeId = empRecordTypeId);
        
        Resource__c res = new Resource__c(Resource_Name__c = con.Id,Active__c = true);
        insert res;
        
        Project__c pro = new Project__c(Name = 'Test Project',Color__c = 'Green');
        insert pro;
        
        Allocation__c allocat = new Allocation__c(Resource__c = res.ID,Project__c = pro.Id,Start_Date__c = date.parse('09/08/2020'),
                                             End_Date__c = date.parse('10/08/2020'),Effort__c = 'High',
                                             Status__c = 'Active');
        insert allocat;
        
        test.startTest();
        ProjectList_Controller.projectLists(con.Id);
        test.stopTest();
    }
}