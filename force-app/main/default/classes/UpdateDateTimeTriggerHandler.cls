public class UpdateDateTimeTriggerHandler {
    public static void updateDateTime(List<Interview__c> interList){
     //   List<Interviewer_Slot__c> listSlot = [SELECT Id ,Date__c, Start_Time__c, End_Time__c, Booked__c, Contact__c FROM Interviewer_Slot__c];
        Set<Id> slotId = new Set<Id>();
        boolean interviewRun = False;
        for(Interview__c inter : interList)
        {
            if(inter.Interviewer_Slot__c != null){
                interviewRun = true;
                slotId.add(inter.Interviewer_Slot__c);
            } 
        }
        
        if(interviewRun){
            Map<Id,Interviewer_Slot__c> intMap = new Map<Id,Interviewer_Slot__c>([SELECT Id, Date__c, Start_Time__c, End_Time__c,Contact__c FROM Interviewer_Slot__c WHERE
                                                                                  id in: slotId]);
            for(Interview__c inter : interList)
            {
                if(inter.Interviewer_Slot__c != null){
                    Date dd = intMap.get(inter.Interviewer_Slot__c).Date__c;
                    Time tt = intMap.get(inter.Interviewer_Slot__c).Start_Time__c;
                    
                    DateTime dt = Datetime.newInstance(dd, tt);
                    inter.Interview_Date_and_Time__c = dt;
                    inter.Interviewer__c = intMap.get(inter.Interviewer_Slot__c).Contact__c;
                    // inter.Interviewer_Slot__c = intMap.get(inter.Interviewer_Slot__c).id;
                    //  System.debug('*ParentId*** '+intMap.get(inter.Interviewer_Slot__c).id);
                    System.debug(inter);
                }
            }
        } /*else {
             
        for(Interview__c inter : interList){
            DateTime dT = inter.Interview_Date_and_Time__c;
            Date interviewDate = date.newinstance(dT.year(), dT.month(), dT.day());
            Time startTime = Time.newInstance(dT.hour(), dT.minute(), dT.second(), dT.millisecond());
            if(inter.Interviewer_Slot__c == null){
                for(Interviewer_Slot__c slot : listSlot){
                    if(slot.Date__c == interviewDate && (slot.Start_Time__c <= startTime) && (slot.End_Time__c > startTime)){
                        inter.Interviewer_Slot__c = slot.Id;
                    }
                    
                }
            }
        } 
        } */
        
        
    }  
}