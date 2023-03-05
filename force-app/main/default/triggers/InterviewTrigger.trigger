trigger InterviewTrigger on Interview__c (before insert, before Update, after update, after insert, after delete, after undelete, before delete) {
    
    if(Trigger.isAfter  && Trigger.isUpdate){
        InterviewSlotsTriggerHandler.intSlotUpdateMethod(Trigger.old, Trigger.newMap);
        SendColdFeetEmailHandlerClass.sendColdFeetEmail(Trigger.oldMap, Trigger.newMap);
    }
    if(Trigger.isAfter && Trigger.isInsert){
        InterviewSlotsTriggerHandler.insertTriggerHandlerMethod(Trigger.new);
    }
    
    if(Trigger.isBefore && Trigger.isInsert){
         UpdateDateTimeTriggerHandler.updateDateTime(Trigger.new);
        InterviewSlotsTriggerHandler.beforeInsertMethod(Trigger.new);        
    }
    
}