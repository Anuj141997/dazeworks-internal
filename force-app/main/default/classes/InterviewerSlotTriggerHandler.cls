public class InterviewerSlotTriggerHandler {
    public static void beforeInsert_InterviewerSlot(List<Interviewer_Slot__c> newSlots){
        Set<Id> conSet = new Set<Id>();
        Set<Date> dateSet = new Set<Date>();
        Set<Time> startTimeSet = new Set<Time>();
        Set<Time> endTimeSet = new Set<Time>();
        
        Set<Id> dbConSet = new Set<Id>();
        Set<Date> dbDateSet = new Set<Date>();
        Set<Time> dbStartTimeSet = new Set<Time>();
        Set<Time> dbEndTimeSet = new Set<Time>();
        
        for(Interviewer_Slot__c slot : newSlots){
            conSet.add(slot.Contact__c);
            dateSet.add(slot.Date__c);
            startTimeSet.add(slot.Start_Time__c);
            endTimeSet.add(slot.End_Time__c);
        }
        
        for(Interviewer_Slot__c existingSlots : [SELECT Id, Contact__c, Date__c, Start_Time__c, End_Time__c
                                                 FROM Interviewer_Slot__c WHERE Contact__c IN: conSet AND 
                                                 Date__c IN: dateSet AND Start_Time__c IN:startTimeSet AND
                                                 End_Time__c IN: endTimeSet])
        {
            dbConSet.add(existingSlots.Contact__c);
            dbDateSet.add(existingSlots.Date__c);
            dbStartTimeSet.add(existingSlots.Start_Time__c);
            dbEndTimeSet.add(existingSlots.End_Time__c);
        }
        
        for(Interviewer_Slot__c newSlot : newSlots){
            if(dbConSet.contains(newSlot.Contact__c) && dbDateSet.Contains(newSlot.Date__c) && dbStartTimeSet.contains(newSlot.Start_Time__c) && dbEndTimeSet.contains(newSlot.End_Time__c))
                newSlot.addError('You cannot create Duplicate Interviewer Slots');
        }
    }
}