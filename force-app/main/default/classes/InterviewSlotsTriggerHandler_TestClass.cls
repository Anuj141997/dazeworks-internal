@isTest
public class InterviewSlotsTriggerHandler_TestClass {
    @isTest
    public static void InterviewSlotsTriggerHandler_TestMethod(){
        Id candRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
        Id empRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        test.startTest();
        List<Contact> listCon = new List<Contact>();
        Contact con = new Contact(LastName = 'test', Interviewer__c = true, recordTypeId = empRecordTypeId);
        Contact con1 = new Contact(LastName = 'candidate', recordTypeId = candRecordTypeId);
        listCon.add(con);
        listCon.add(con1);
        insert listCon;
        
        Position__c pos = new Position__c(Name = 'admin', active__c = true);
        insert pos;
        
        Application__c app = new Application__c(Application_Date__c = Date.newInstance(2020, 7, 14), Position__c = pos.Id);
        app.Candidate__c = listCon[1].id;
        insert app;
        Date d = Date.today().addDays(1);
        Time t = Time.newInstance(3, 3, 3, 0);
        Time t1 = Time.newInstance(3, 4, 0, 0);
        
        List<Interviewer_Slot__c> slots = new List<Interviewer_Slot__c>();
        Interviewer_Slot__c intSlot = new Interviewer_Slot__c(Date__c = d, Start_Time__c = t.addMinutes(-2),
                                                              End_Time__c = t.addMinutes(5), Booked__c = false,
                                                              Contact__c = listCon[0].Id);
        
        slots.add(intSlot);
        insert slots;
        
        
        
        
        
        List<Interview__c> intList = new List<Interview__c>();
        Interview__c inter = new Interview__c();
        inter.Interviewer_Slot__c = intSlot.id;
        inter.Application__c = app.Id;
        intList.add(inter);
        insert intList;
        intList[0].Interview_Date_and_Time__c = DateTime.newInstance(d, t1) ;
        update intList;
        
        dateTime dt = datetime.now();
        List<Interviewer_Slot__c> interviewerSlotsList = new List<Interviewer_Slot__c>();
        Interviewer_Slot__c interviewerSlots = new Interviewer_Slot__c(Date__c = dt.date(), Start_Time__c = dt.time().addMinutes(-10),
                                                                       End_Time__c = dt.time().addMinutes(10), Booked__c = false,
                                                                       Contact__c = listCon[0].Id);
        
        interviewerSlotsList.add(interviewerSlots);
        insert interviewerSlotsList;
        
        List<Interview__c> intList1 = new List<Interview__c>();
        Interview__c inter1 = new Interview__c();
        inter1.Interviewer_Slot__c = interviewerSlotsList[0].id;
        inter1.Application__c = app.Id;
        inter1.Interview_Date_and_Time__c = DateTime.now();
        inter1.Interviewer__c = listCon[0].id;
        inter1.Interview_Round__c = 'Round 3';
        intList1.add(inter1);
        insert intList1;
        
        Map<id,Interview__c> intMap = new Map<id, Interview__c>();
        intMap.put(intList[0].id, intList[0]);
        
        InterviewSlotsTriggerHandler.intSlotUpdateMethod(intList, intMap);
        InterviewSlotsTriggerHandler.insertTriggerHandlerMethod(intList1);
        test.stopTest();
    }
    
    
}