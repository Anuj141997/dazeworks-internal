trigger InterviewSlotsTrigger on Interview__c (before insert, before Update, after update) {
    
    if(Trigger.isAfter  && Trigger.isUpdate ){
        InterviewSlotsTriggerHandler.intSlotUpdateMethod(Trigger.old, Trigger.newMap);
    }
    
    if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)){
        UpdateDateTimeTriggerHandler.updateDateTime(Trigger.new);
    }
 
}