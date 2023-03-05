public without sharing class TestingFeedback_Controller {
	@AuraEnabled
    public static boolean updateTestingFeedback(String interviewId, String employeeId, Interview__c intRec, Boolean isJoined){
        String intId = '%'+interviewId;
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Interview__c> intRecord = [SELECT Name, Interviewer__r.Employee_ID__c, Language__c, Functional_Testing__c, Regression_Testing__c,
                                     Smoke_Testing__c, Load_Testing_Data_Loader_or_Jmeter__c, Performance_Testing__c,
                                     Cross_Browser_Testing__c, Tosca_Provar__c, Test_Rail__c, Overall_on_10__c, Comments2__c FROM Interview__c
                                     WHERE Name LIKE:intId AND (Interviewer__r.Employee_ID__c LIKE:empId OR Interviewer__r.Professional_Consultant_Id__c LIKE:empId) LIMIT 1];
        system.debug('intRecord = '+ intRecord);
        if(intRecord.size() > 0){
            isSuccess = true;
            intRecord[0].Language__c = intRec.Language__c;
            intRecord[0].Functional_Testing__c = intRec.Functional_Testing__c;
            intRecord[0].Regression_Testing__c = intRec.Regression_Testing__c;
            intRecord[0].Smoke_Testing__c = intRec.Smoke_Testing__c;
            intRecord[0].Load_Testing_Data_Loader_or_Jmeter__c = intRec.Load_Testing_Data_Loader_or_Jmeter__c;
            intRecord[0].Performance_Testing__c = intRec.Performance_Testing__c;
            intRecord[0].Cross_Browser_Testing__c = intRec.Cross_Browser_Testing__c;
            intRecord[0].Tosca_Provar__c = intRec.Tosca_Provar__c;
            intRecord[0].Test_Rail__c = intRec.Test_Rail__c;
            intRecord[0].Language_on_10__c = intRec.Language__c;
            intRecord[0].Overall_on_10__c = intRec.Overall_on_10__c;
            intRecord[0].Comments2__c = intRec.Comments2__c;
            intRecord[0].Interview_Feedback__c = true;
            intRecord[0].Interviewee_didn_t_join__c = isJoined;
            intRecord[0].Interview_Status__c = 'Interviewed';
            intRecord[0].Feedback_Submitted__c =true;
            update intRecord;
        }else{
            isSuccess = false;
        }
        return isSuccess;
    }
    
    @AuraEnabled
    public static boolean updateInterviewRecord(String interviewId, String employeeId, Boolean isJoined){
        String intId = '%'+interviewId;
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Interview__c> intRecord = [SELECT Name, Interviewer__r.Employee_ID__c, Interviewer__r.Professional_Consultant_Id__c
                                        FROM Interview__c WHERE Name LIKE:intId AND 
                                        (Interviewer__r.Employee_ID__c LIKE:empId OR 
                                         Interviewer__r.Professional_Consultant_Id__c LIKE:empId) LIMIT 1];
        if(intRecord.size() > 0){
            isSuccess = true;
            intRecord[0].Interviewee_didn_t_join__c = isJoined;
            intRecord[0].Interview_Status__c = 'Rescheduled';
            update intRecord;
        }else{
            isSuccess = false;
        }
        return isSuccess;
    } 
}