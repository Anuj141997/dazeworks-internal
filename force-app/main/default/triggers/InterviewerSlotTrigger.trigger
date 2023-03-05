trigger InterviewerSlotTrigger on Interviewer_Slot__c (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
    if(trigger.isBefore && trigger.isInsert){
        InterviewerSlotTriggerHandler.beforeInsert_InterviewerSlot(Trigger.New);
    }
}