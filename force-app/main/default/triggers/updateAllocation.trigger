trigger updateAllocation on Allocation__c (before insert) {
    if(trigger.isBefore && trigger.isInsert){
        updateAllocationHandler.get(trigger.new);
    }

}