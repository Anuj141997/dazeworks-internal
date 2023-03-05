trigger TotalUtilisationUpdateTrigger on Allocation__c (after insert,after update,after delete) {
    
    if(Trigger.isAfter && Trigger.isInsert){
        TotalUtilisationUpdateTriggerHandler.updateTotalUtilisation(Trigger.new);
       TotalUtilisationUpdateTriggerHandler.updateAllocatedProjects(Trigger.new);
    }
    if(Trigger.isAfter && Trigger.isUpdate){
        TotalUtilisationUpdateTriggerHandler.updateTotalUtilisation(Trigger.new);
        TotalUtilisationUpdateTriggerHandler.updateAllocatedProjects(Trigger.new);
        
    }
    if(Trigger.isAfter && Trigger.isDelete){
        TotalUtilisationUpdateTriggerHandler.updateTotalUtilisation(Trigger.Old);
        TotalUtilisationUpdateTriggerHandler.updateAllocatedProjects(Trigger.old);
    }
    
}