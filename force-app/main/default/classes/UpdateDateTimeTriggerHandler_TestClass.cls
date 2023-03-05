@isTest
public class UpdateDateTimeTriggerHandler_TestClass {
    @isTest
    public static void UpdateDateTimeTriggerHandler_TestMethod(){
       
        Contact con = new Contact(LastName = 'test', Interviewer__c = true, recordTypeId = '0122v000002N4RvAAK');
        insert con;
        Contact con1 = new Contact(LastName = 'candidate', recordTypeId = '0122v000002N4S0AAK');
        insert con1;
        
        Position__c pos = new Position__c(Name = 'developer', active__c = true);
        insert pos;
        
        Application__c app = new Application__c(Application_Date__c = Date.today(), POsition__c = pos.id);
        app.Candidate__c = con1.id;
        insert app;
        
        Interviewer_Slot__c intSlot = new Interviewer_Slot__c(Contact__c =con.Id, Date__c = date.today(), Start_Time__c = time.newInstance(7, 15, 16, 00));
        insert intSlot;
        
        Interview__c inter = new Interview__c(Interviewer_Slot__c = intSlot.id, Interview_Date_and_Time__c = datetime.now().addMinutes(10), Application__c = app.id);
        //inter.Application__c = app.Id;
        insert inter;
        
        List<Interview__c> interList = new List<Interview__c>();
        interList.add(inter);
        
        
        test.startTest();
        UpdateDateTimeTriggerHandler.updateDateTime(interList);
        test.stopTest();
    }
}