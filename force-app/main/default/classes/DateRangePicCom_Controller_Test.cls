@isTest
public class DateRangePicCom_Controller_Test {
    
    @isTest
    public static void DateRangePicCom_Controller_TestMethod(){
        test.startTest();
        Date startDate = date.newInstance(2019, 07, 02);
        Date endDate = startDate.addDays(2);
        
        List<Contact> conList = new List<Contact>();
        Contact con = new Contact(LastName = 'test', Interviewer__c = true, Professional_Consultant_Id__c='ICDW123',
                               Employee_ID__c='DW1234');
        insert con;
        conList.add(con);
        InterviewerSlots__c sList = new InterviewerSlots__c(Name='sample', Employee_Id__c = 'DW1234', Start_Time1__c = '12:00', End_Time1__c = '12:30',
                                                            Start_Time2__c = '12:30', End_Time2__c = '13:00',
                                                            Start_Time3__c = '13:00',  End_Time3__c = '13:30', 
                                                            Start_Time4__c = '14:00',  End_Time4__c = '14:30');
        insert sList;
        
        DateRangePicCom_Controller.returnAllInterviewers();
        DateRangePicCom_Controller.insertSlots(startDate, endDate, conList);
        test.stopTest();
   }
    
}