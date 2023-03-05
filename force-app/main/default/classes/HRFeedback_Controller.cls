public without sharing class HRFeedback_Controller {
    @AuraEnabled
    public static boolean updateHRFeedback(String interviewId, String employeeId, Interview__c intRec, Boolean isJoined){
        String intId = '%'+interviewId;
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Interview__c> intRecord = [SELECT Name, Interviewer__r.Employee_ID__c, Attitude__c, Communication__c,
                                        Language__c, Listening_skills__c, Technical_skills__c, Presentation_skills__c, Overall_on_10__c, Comments1__c
                                        FROM Interview__c WHERE Name LIKE:intId AND (Interviewer__r.Employee_ID__c LIKE:empId OR Interviewer__r.Professional_Consultant_Id__c LIKE:empId) LIMIT 1];
        if(intRecord.size() > 0){
            isSuccess = true;
            
            intRecord[0].Attitude__c = intRec.Attitude__c;
            intRecord[0].Communication__c = intRec.Communication__c;
            intRecord[0].Language__c = intRec.Language__c;
            intRecord[0].Listening_skills__c = intRec.Listening_skills__c;
            intRecord[0].Technical_skills__c = intRec.Technical_skills__c;
            intRecord[0].Presentation_skills__c = intRec.Presentation_skills__c;
            intRecord[0].Comments1__c = intRec.Comments1__c;
            intRecord[0].Interview_Feedback__c = true;
            intRecord[0].Interviewee_didn_t_join__c = isJoined;
            intRecord[0].Language_on_10__c = intRec.Language__c;
            intRecord[0].Overall_on_10__c = intRec.Overall_on_10__c;
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