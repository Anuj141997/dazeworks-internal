@isTest(seeAllData=true)
public class HRFeedback_Controller_Test {
   @isTest
    public static void HRFeedback_Controller_TestMethod(){
        Interview__c interv = [SELECT Name, Interviewer__r.Employee_ID__c, Attitude__c, Communication__c, Overall_on_10__c,
                                        Language__c, Listening_skills__c, Technical_skills__c, Presentation_skills__c, Comments1__c
                               FROM Interview__c WHERE Name='Interview- 0314'];
        test.startTest();
        HRFeedback_Controller.updateHRFeedback(interv.Name, interv.Interviewer__r.Employee_ID__c, interv, true);
        HRFeedback_Controller.updateHRFeedback(interv.Name, interv.Interviewer__r.Employee_ID__c, interv, false);
        HRFeedback_Controller.updateInterviewRecord(interv.Name, interv.Interviewer__r.Employee_ID__c, false);
        test.stopTest();
    } 
}