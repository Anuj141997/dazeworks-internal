@isTest
public class createResourceTest {
    @isTest static void reUsableTest(){
        List<Contact> conList = new List<Contact>();
        for(integer i=0;i<2;i++){
           Contact conObj = new Contact();
            conObj.lastName='test'+i;
            conObj.RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
            conObj.Active__c = true;
            conList.add(conObj);
        }
        insert conList;
        
        createResources.createResourceRecords();

}
}