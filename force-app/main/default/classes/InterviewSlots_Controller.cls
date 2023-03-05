public class InterviewSlots_Controller {
    @AuraEnabled
    public static List<Contact> getSlots(Date dt){
        System.debug('1st method');
        return [SELECT Id, Name, Interviewer__c, (SELECT Id, Booked__c, Contact_Name__c, Contact__c, Start_Time__c, End_Time__c, Date__c, Time_String__c
                                                  FROM Interviewer_Slots__r WHERE Date__c=:dt ORDER BY Start_Time__c)
                FROM Contact WHERE Id IN (Select Contact__c FROM Interviewer_Slot__c) AND Interviewer__c = true ORDER BY Name];
        
    }
    
    @AuraEnabled
    public static boolean getBookedSlots(Id slotId){
        System.debug('Slot Id from getBookedSlots Method : '+slotId);
        Interviewer_Slot__c slotrecord = [SELECT Id, Booked__c FROM Interviewer_Slot__c WHERE Id=:slotId LIMIT 1];
        if(slotrecord.Booked__c == false){
            slotrecord.Booked__c = true;
            update slotrecord;
            System.debug('isBooked : '+slotrecord.Booked__c);
        }
        return slotrecord.Booked__c;
    }
    
    @AuraEnabled
    public static List<Object> getDate(Id recId, String objName, String fieldNames){
        String str = fieldNames;
        List<String> fieldList = str.split(',');
        System.debug('Field List : '+fieldList);
        String field1 = fieldList.get(0);
        String field2 = fieldList.get(1);
        List<Object> objList = new List<Object>();
        if(objName == 'Interview__c'){
            Interview__c interviewRec = [SELECT Id, Interview_Date_and_Time__c, Interviewer__c FROM Interview__c WHERE Id=:recId LIMIT 1];
            DateTime dt = interviewRec.Interview_Date_and_Time__c;
            Date retDate = Date.newInstance(dt.year(), dt.month(), dt.day());
            objList.add(retDate);
            objList.add(interviewRec.Interviewer__c);
        }/*else if(objName == 'Interviewer_Slot__c'){
Interviewer_Slot__c slotRec = [SELECT Id, Date__c, Contact__c FROM Interviewer_Slot__c WHERE Id=:recId LIMIT 1];
objList.add(slotRec.Date__c);
objList.add(slotRec.Contact__c);
}*/
        else{
            String query = 'SELECT Id, '+field1+', '+field2+' FROM '+objName+' WHERE Id=:recId LIMIT 1';
            sObject result = Database.query(query);
            objList.add(result.get(field1));
            objList.add(result.get(field2));
        }
        return objList;
    }
    
    /* @AuraEnabled
public static id returnApplicationId(id slotId){
Interviewer_Slot__c slotRecord = [SELECT id, (SELECT id, Application__r.Name FROM Interviews__r) FROM Interviewer_Slot__c WHERE id=: slotId];
System.debug(slotRecord.interviews__r[0].id);
return slotRecord.interviews__r[0].id;
}

@AuraEnabled
public static void updateIntRound(id intId, String app, String round){
Interview__c inter =  [Select id, Interview_Round1__c, Application__c FROM Interview__c WHERE id =: intId];
inter.Interviewer_Slot__c = app;
inter.Interview_Round1__c = round;
System.debug(round);
update inter;
System.debug(inter.Interview_Round1__c);
} */
    
    @AuraEnabled
    public static void insertSlot(String app, String slots, String round){
     //   Interview__c inter =  [Select id, Interview_Round1__c, Application__c, Interviewer_Slot__c FROM Interview__c];
      interview__c inter = new  interview__c();
        inter.Application__c = app;
        inter.Interviewer_Slot__c = slots;
        inter.Interview_Round1__c = round;
        System.debug(inter);
        INSERT inter;
     System.debug('Slot Is From Apex in Insert Slot Method'+slots);
    }
    
   @AuraEnabled
    public static id getChildRecordId(id slotId){
        Interviewer_Slot__c intRec = [SELECT id, (SELECt id FROM Interviews__r) FROM Interviewer_Slot__c WHERE id =: slotId];
        System.debug(intRec.Interviews__r[0].id);
        return intRec.Interviews__r[0].id;
    } 
}