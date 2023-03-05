public class DateRangePicCom_Controller {
    @AuraEnabled
    public static List<Contact> returnAllInterviewers(){
        return [SELECT Id, Name, Interviewer__c FROM Contact WHERE Interviewer__c = true];
    }
    @AuraEnabled
    public static boolean insertSlots(Date startDate, Date endDate, List<Contact> interviewersList){
      Boolean isSuccess;
        DateTime fromDate = startDate;
        Date fromDateOnly = date.newInstance(fromDate.year(), fromDate.month(), fromDate.day());
        DateTime toDate = endDate;
        Date toDateOnly = date.newInstance(toDate.year(), toDate.month(), toDate.day());
        Integer index = fromDateOnly.daysBetween(toDateOnly);
        String day; 
        
        
       List<Contact> conList = [SELECT Id, Name, Employee_ID__c,Professional_Consultant_Id__c, Interviewer__c FROM Contact WHERE Interviewer__c = true AND Id IN: interviewersList];
        Map<String, InterviewerSlots__c> intSlotsMap = InterviewerSlots__c.getAll();
        List<Interviewer_Slot__c> newSlots = new List<Interviewer_Slot__c>(); 
        
        for(String key : intSlotsMap.keySet()){
            system.debug('key');
            for(Contact con : conList){
                System.debug('for each contact');
                Time startTime_1, startTime_2, startTime_3, startTime_4, endTime_1, endTime_2, endTime_3, endTime_4;
                if((con.Employee_ID__c== intSlotsMap.get(key).Employee_ID__c) || (con.Professional_Consultant_Id__c == intSlotsMap.get(key).Employee_ID__c)){
                    if(intSlotsMap.get(key).Start_Time1__c != null && intSlotsMap.get(key).End_Time1__c != null){
                       String[] splitStartTime_1 = intSlotsMap.get(key).Start_Time1__c.split(':');
                        startTime_1 = Time.newInstance(Integer.valueOf(splitStartTime_1[0]),
                                                       Integer.valueOf(splitStartTime_1[1]),
                                                       0,
                                                       0);
                        String[] splitEndTime_1 = intSlotsMap.get(key).End_Time1__c.split(':');
                        endTime_1 = Time.newInstance(Integer.valueOf(splitEndTime_1[0]),
                                                     Integer.valueOf(splitEndTime_1[1]),
                                                     0,
                                                     0);
                    }
                    if(intSlotsMap.get(key).Start_Time2__c != null && intSlotsMap.get(key).End_Time2__c != null){
                        String[] splitStartTime_2 = intSlotsMap.get(key).Start_Time2__c.split(':');
                        startTime_2 = Time.newInstance(Integer.valueOf(splitStartTime_2[0]),
                                                       Integer.valueOf(splitStartTime_2[1]),
                                                       0,
                                                       0);
                        String[] splitEndTime_2 = intSlotsMap.get(key).End_Time2__c.split(':');
                        endTime_2 = Time.newInstance(Integer.valueOf(splitEndTime_2[0]),
                                                     Integer.valueOf(splitEndTime_2[1]),
                                                     0,
                                                     0);
                    }
                    if(intSlotsMap.get(key).Start_Time3__c != null && intSlotsMap.get(key).End_Time3__c != null){
                        String[] splitStartTime_3 = intSlotsMap.get(key).Start_Time3__c.split(':');
                        startTime_3 = Time.newInstance(Integer.valueOf(splitStartTime_3[0]),
                                                       Integer.valueOf(splitStartTime_3[1]),
                                                       0,
                                                       0);
                        String[] splitEndTime_3 = intSlotsMap.get(key).End_Time3__c.split(':');
                        endTime_3 = Time.newInstance(Integer.valueOf(splitEndTime_3[0]),
                                                     Integer.valueOf(splitEndTime_3[1]),
                                                     0,
                                                     0);
                    }
                    if(intSlotsMap.get(key).Start_Time4__c != null && intSlotsMap.get(key).End_Time4__c != null){
                        String[] splitStartTime_4 = intSlotsMap.get(key).Start_Time4__c.split(':');
                        startTime_4 = Time.newInstance(Integer.valueOf(splitStartTime_4[0]),
                                                       Integer.valueOf(splitStartTime_4[1]),
                                                       0,
                                                       0);
                        String[] splitEndTime_4 = intSlotsMap.get(key).End_Time4__c.split(':');
                        endTime_4 = Time.newInstance(Integer.valueOf(splitEndTime_4[0]),
                                                     Integer.valueOf(splitEndTime_4[1]),
                                                     0,
                                                     0);
                    }
                    System.debug('inside if loop');
                    
                    for(Integer i = 0; i <= index; i++){
                        date slotDate = date.newInstance(fromDate.year(), fromDate.month(), fromDate.day());
                        day = fromDate.addDays(i).format('E');
                        if(startTime_1 != null && endTime_1 != null && (day != 'Sat' && day != 'Sun')){
                            
                            Interviewer_Slot__c slot1 = new Interviewer_Slot__c(Date__c = slotDate.addDays(i),
                                                                                Contact__c = con.Id,
                                                                                Start_Time__c = startTime_1,
                                                                                End_Time__c = endTime_1);
                            newSlots.add(slot1);
                        }
                        if(startTime_2 != null && endTime_2 != null && (day != 'Sat' && day != 'Sun')){
                            Interviewer_Slot__c slot2 = new Interviewer_Slot__c(Date__c = slotDate.addDays(i),
                                                                                Contact__c = con.Id,
                                                                                Start_Time__c = startTime_2,
                                                                                End_Time__c = endTime_2);
                            newSlots.add(slot2);
                        }
                        if(startTime_3 != null && endTime_3 != null && (day != 'Sat' && day != 'Sun')){
                            Interviewer_Slot__c slot3 = new Interviewer_Slot__c(Date__c = slotDate.addDays(i),
                                                                                Contact__c = con.Id,
                                                                                Start_Time__c = startTime_3,
                                                                                End_Time__c = endTime_3);
                            newSlots.add(slot3);
                        }
                        if(startTime_4 != null && endTime_4 != null && (day != 'Sat' && day != 'Sun')){
                            Interviewer_Slot__c slot4 = new Interviewer_Slot__c(Date__c = slotDate.addDays(i),
                                                                                Contact__c = con.Id,
                                                                                Start_Time__c = startTime_4,
                                                                                End_Time__c = endTime_4);
                            newSlots.add(slot4);
                        }
                    }
                }
            }
        }
        Database.saveResult[] dsr =  database.insert(newSlots, false);
        for (Database.SaveResult sr : dsr) 
        {
           if (sr.isSuccess()) 
            {
                isSuccess = true;
            }
            else 
            {
                isSuccess = false;
            }
        }
       return isSuccess;
    } 
}