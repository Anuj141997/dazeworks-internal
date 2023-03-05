@isTest(seeAllData=true)
public class TestingFeedback_Controller_Test {
	@isTest
    public static void TestingFeedback_Controller_TestMethod(){
        Interview__c interv = [SELECT Name, Interviewer__r.Employee_ID__c, Functional_Testing__c, Regression_Testing__c,
                                     Smoke_Testing__c, Language__c, Overall_on_10__c, Load_Testing_Data_Loader_or_Jmeter__c, Performance_Testing__c,
                                     Cross_Browser_Testing__c, Tosca_Provar__c, Test_Rail__c, Comments2__c
                               FROM Interview__c WHERE Name='Interview- 0314'];
        test.startTest();
        TestingFeedback_Controller.updateTestingFeedback(interv.Name, interv.Interviewer__r.Employee_ID__c, interv, true);
        TestingFeedback_Controller.updateTestingFeedback(interv.Name, interv.Interviewer__r.Employee_ID__c, interv, false);
        TestingFeedback_Controller.updateInterviewRecord(interv.Name, interv.Interviewer__r.Employee_ID__c, false);
        test.stopTest();
    } 
}