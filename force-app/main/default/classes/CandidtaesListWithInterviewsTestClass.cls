@isTest(seeAllData = true)
public class CandidtaesListWithInterviewsTestClass {
    @isTest
    public static void candidatesListTestMethod(){
      
        Test.startTest();
        List<Interview__c> intList = [SELECT Id, Name FROM Interview__c LIMIT 1];
        CandidtaesListWithInterviews_Controller.fetchInteviewedRecords(intList[0].Name);
        Test.stopTest();
    }
}