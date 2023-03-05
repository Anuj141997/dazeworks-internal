@isTest(seeAllData=true)
public class InterviewSlots_Controller_Test {
    @isTest
    public static void InterviewSlots_TestMethod(){
        Test.startTest();
        Contact con = new Contact(FirstName = 'Test', LastName='Contact', recordtypeId = '0122v000002N4RvAAK');
        insert con;
        Interviewer_Slot__c slot = new Interviewer_Slot__c(Date__c = Date.today(), Booked__c = false,
                                                           Contact__c = con.Id);
        insert slot;
        Interview__c interview = [SELECT Id, Interview_Date_and_Time__c, Interviewer__c FROM Interview__c 
                                  WHERE Interviewer__c !=null LIMIT 1];
        
        Contact con1 = new Contact(LastName = 'test1', recordTypeId = '0122v000002N4S0AAK');
        insert con1;
        
        Position__c pos = new Position__c(Name = 'salesforce', active__c = true);
        insert pos;
        
        Application__c appl = new Application__c(candidate__c = con1.id, POsition__c = pos.id);
        insert appl;
        
        Interviewer_Slot__c slot1 = new Interviewer_Slot__c(Date__c = date.today().adddays(1), start_time__c = time.newInstance(5, 15, 14, 00), contact__c = con.Id);
        insert slot1;
        
       // Interview__c inter = new Interview__c(Application__c = appl.id, Interviewer_Slot__c = slot1.id, Interview_Date_and_Time__c = datetime.now().addminutes(10), interviewer__c = con.Id);
      //  insert inter;
        
        InterviewSlots_Controller.getSlots(slot.Date__c);
        InterviewSlots_Controller.getBookedSlots(slot.Id);
        InterviewSlots_Controller.getDate(slot.Id, 'Interviewer_Slot__c', 'Date__c,Contact__c');
        InterviewSlots_Controller.getDate(interview.Id, 'Interview__c', 'Interview_Date_and_time__c,Interviewer__c');
        InterviewSlots_Controller.insertSlot(appl.Id, slot1.Id, 'Round 3');
       Test.stopTest();
    }
}