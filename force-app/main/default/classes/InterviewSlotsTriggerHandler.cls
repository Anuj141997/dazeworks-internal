public class InterviewSlotsTriggerHandler {
    
    //To update date and time of an interviewer slot after updating interview date and time filed in interview record
    public static void intSlotUpdateMethod(List<Interview__c> inr, Map<Id,Interview__c> newIntMap){
        List<Interviewer_Slot__c> updateSlots = new List<Interviewer_Slot__c>();
        
        Set<Id> contactIds = new Set<Id>();
        Set<Date> intDates = new Set<Date>();
        for(Interview__c inter : inr){
            
            if(inter.Interviewer__c != null){
                contactIds.add(inter.Interviewer__c);
                DateTime dT = inter.Interview_Date_and_Time__c;
                intDates.add(date.newinstance(dT.year(), dT.month(), dT.day()));
            }
        }
        
        system.debug('Contact Id : '+contactIds);
        system.debug('intDates : '+intDates);
        
        List<Interviewer_Slot__c> slotList = [SELECT Id, Date__c, Contact__c, Start_Time__c, End_Time__c, Booked__c
                                              FROM Interviewer_Slot__c
                                              WHERE Contact__c IN:contactIds AND Date__c IN:intDates];
        system.debug(slotList);
        for(Interview__c intrec : inr){
            DateTime dT = intrec.Interview_Date_and_Time__c;
            Time interviewStartTime = Time.newInstance(dT.hour(), dT.minute(), dT.second(), dT.millisecond());
            for(Interviewer_Slot__c slots : slotList){
                if(slots.Contact__c == intrec.Interviewer__c &&
                   slots.Date__c ==  date.newinstance(dT.year(), dT.month(), dT.day()))
                {
                    if(slots.Start_Time__c <= interviewStartTime && slots.End_Time__c > interviewStartTime)
                    {
                        DateTime oldIntDt = intrec.Interview_Date_and_Time__c;
                        DateTime newIntDt = newIntMap.get(intrec.Id).Interview_Date_and_Time__c;
                        DateTime newDt = newIntDt;
                        Date newDate = date.newinstance(newDt.year(), newDt.month(), newDt.day());
                        Time newTime = Time.newInstance(newDt.hour(), newDt.minute(), newDt.second(), newDt.millisecond());
                        system.debug('newTime' +newTime);
                        Id oldContactId = intrec.Interviewer__c;
                        Id newContactId = newIntMap.get(intrec.Id).Interviewer__c;
                        if(oldIntDt != newIntDt){
                            system.debug('Inside loop');
                            slots.Date__c = newDate;
                            slots.Start_Time__c = newTime;
                            slots.End_Time__c = newTime.addMinutes(30);
                            if(slots.Booked__c == false){
                                slots.Booked__c = true;
                            }
                            updateSlots.add(slots);
                        }
                        if(oldContactId !=newContactId){
                            slots.Booked__c = false;
                            updateSlots.add(slots);
                        }
                    }
                }
                
                system.debug('inside for');
            }
            system.debug('outside for');
        }
        
        if(updateSlots.size() > 0){
            update updateSlots;
        }
    }
    
    //To update date and time of an interviewer slot after inserting interview date and time filed in interview record 
    public static void insertTriggerHandlerMethod(List<Interview__c> inr){
        List<Interviewer_Slot__c> updateSlots = new List<Interviewer_Slot__c>();
        Set<Id> contactIds = new Set<Id>();
        Set<Date> intDates = new Set<Date>();
        for(Interview__c inter : inr){
            
            if(inter.Interviewer__c != null){
                contactIds.add(inter.Interviewer__c);
                DateTime dT = inter.Interview_Date_and_Time__c;
                intDates.add(date.newinstance(dT.year(), dT.month(), dT.day()));
            }
        }
        
        system.debug('Contact Id : '+contactIds);
        system.debug('intDates : '+intDates);
        
        List<Interviewer_Slot__c> slotList = [SELECT Id, Date__c, Contact__c, Start_Time__c, End_Time__c
                                              FROM Interviewer_Slot__c
                                              WHERE Contact__c IN:contactIds AND Date__c IN:intDates];
        system.debug(slotList);
        for(Interview__c inter : inr){
            DateTime dT = inter.Interview_Date_and_Time__c;
            Time interviewStartTime = Time.newInstance(dT.hour(), dT.minute(), dT.second(), dT.millisecond());
            for(Interviewer_Slot__c slot : slotList){
                if(slot.Contact__c == inter.Interviewer__c &&
                   slot.Date__c ==  date.newinstance(dT.year(), dT.month(), dT.day()))
                {
                    if(slot.Start_Time__c <= interviewStartTime && slot.End_Time__c > interviewStartTime)
                    {
                        slot.Date__c = date.newinstance(dT.year(), dT.month(), dT.day());
                        slot.Start_Time__c = interviewStartTime;
                        slot.End_Time__c = interviewStartTime.addMinutes(30);
                        slot.Booked__c = true;
                        updateSlots.add(slot);
                    }
                }
                
                system.debug('inside for');
            }
            system.debug('outside for');
        }
        
        if(updateSlots.size() > 0){
            update updateSlots;
        }
        
    }
    
    
    //To relate an interview record with interviewer slot while inserting 
    public static void beforeInsertMethod(List<Interview__c> intList){
        Set<Id> contactIds = new Set<Id>();
        Set<Date> intDates = new Set<Date>();
        for(Interview__c inter : intList){
            
            if(inter.Interviewer_Slot__c == null && inter.Interviewer__c != null){
                contactIds.add(inter.Interviewer__c);
                DateTime dT = inter.Interview_Date_and_Time__c;
                intDates.add(date.newinstance(dT.year(), dT.month(), dT.day()));
            }
        }
        
        system.debug('Contact Id : '+contactIds);
        system.debug('intDates : '+intDates);
        
        List<Interviewer_Slot__c> slotList = [SELECT Id, Date__c, Contact__c, Start_Time__c, End_Time__c
                                              FROM Interviewer_Slot__c
                                              WHERE Contact__c IN:contactIds AND Date__c IN:intDates];
        system.debug(slotList);
        for(Interview__c inter : intList){
            DateTime dT = inter.Interview_Date_and_Time__c;
            Time interviewStartTime = Time.newInstance(dT.hour(), dT.minute(), dT.second(), dT.millisecond());
            for(Interviewer_Slot__c slot : slotList){
                if(slot.Contact__c == inter.Interviewer__c &&
                   slot.Date__c ==  date.newinstance(dT.year(), dT.month(), dT.day()))
                {
                    if(slot.Start_Time__c <= interviewStartTime && slot.End_Time__c > interviewStartTime)
                    {
                        inter.Interviewer_Slot__c = slot.Id;
                        system.debug('if');
                    }
                }
                
                system.debug('inside for');
            }
            system.debug('outside for');
        }
    }
}