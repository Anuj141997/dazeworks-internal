@isTest
public class InterviewerSlotTriggerHandler_Test {
	@isTest
    public static void beforeInsert_InterviewerSlot_TestMethod(){
        test.startTest();
        Contact con = new Contact(LastName = 'Test', Interviewer__c = true);
        insert con;
        List<Interviewer_Slot__c> slotList = new List<Interviewer_Slot__c>();
        Interviewer_Slot__c slot1 = new Interviewer_Slot__c(Contact__c = con.Id, Date__c = Date.today(),
                                                           Start_Time__c = Time.newInstance(14, 30, 0, 0),
                                                           End_Time__c = Time.newInstance(15, 0, 0, 0)
                                                          );
        slotList.add(slot1);
        Interviewer_Slot__c slot2 = new Interviewer_Slot__c(Contact__c = con.Id, Date__c = Date.today(),
                                                           Start_Time__c = Time.newInstance(15, 0, 0, 0),
                                                           End_Time__c = Time.newInstance(15, 30, 0, 0)
                                                          );
        slotList.add(slot2);
        insert slotList;
        
        List<Interviewer_Slot__c> newSlots = new List<Interviewer_Slot__c>();
        Interviewer_Slot__c newSlot1 = new Interviewer_Slot__c(Contact__c = con.Id, Date__c = Date.today(),
                                                           Start_Time__c = Time.newInstance(11, 30, 0, 0),
                                                           End_Time__c = Time.newInstance(12, 0, 0, 0)
                                                          );
        newSlots.add(slot1);
        Interviewer_Slot__c newSlot2 = new Interviewer_Slot__c(Contact__c = con.Id, Date__c = Date.today(),
                                                           Start_Time__c = Time.newInstance(15, 0, 0, 0),
                                                           End_Time__c = Time.newInstance(15, 30, 0, 0)
                                                          );
        newSlots.add(slot2);
        InterviewerSlotTriggerHandler.beforeInsert_InterviewerSlot(newSlots);
        test.stopTest();
    }
}