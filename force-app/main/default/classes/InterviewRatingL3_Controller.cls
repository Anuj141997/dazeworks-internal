public without sharing class InterviewRatingL3_Controller {
    @AuraEnabled
    public static boolean updateInterviewRating(String interviewId, String employeeId, Interview__c inter, String role, String next, Boolean isJoined)
    {
        String intId = '%'+interviewId;
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Interview__c> intRec = [SELECT Name, Interviewer__r.Employee_ID__c, Comm_Skill__c, Attitude__c, Motivation__c,
                                     Flexibility__c,Management__c, Project_Lead__c, Comm_Skill_Remarks__c,
                                     Attitude_Remarks__c,Motivation_Remarks__c,Flexibility_Remarks__c,Management_Remarks__c,
                                     Project_Lead_Remarks__c FROM Interview__c
                                     WHERE Name LIKE:intId AND (Interviewer__r.Employee_ID__c  LIKE:empId OR Interviewer__r.Professional_Consultant_Id__c LIKE:empId) LIMIT 1];
        
        
        if(intRec.size() > 0){
            isSuccess = true;
            
            intRec[0].Comm_Skill__c = inter.Comm_Skill__c;
            intRec[0].Attitude__c = inter.Attitude__c;
            intRec[0].Motivation__c = inter.Motivation__c;
            intRec[0].Flexibility__c = inter.Flexibility__c;
            intRec[0].Management__c = inter.Management__c;
            intRec[0].Project_Lead__c = inter.Project_Lead__c;
            intRec[0].Overall_on_10__c = inter.Overall_on_10__c;
            intRec[0].Comments__c = inter.Comments__c;
            intRec[0].Suitable_for_which_Role__c = role;
            intRec[0].Next_Step__c = next;
            intRec[0].Interview_Feedback__c = true;
            intRec[0].Interview_Status__c = 'Interviewed';
            intRec[0].Interviewee_didn_t_join__c = isJoined;
            intRec[0].Comm_Skill_Remarks__c = inter.Comm_Skill_Remarks__c;
            intRec[0].Attitude_Remarks__c = inter.Attitude_Remarks__c;
            intRec[0].Motivation_Remarks__c = inter.Motivation_Remarks__c;
            intRec[0].Flexibility_Remarks__c = inter.Flexibility_Remarks__c;
            intRec[0].Management_Remarks__c = inter.Management_Remarks__c;
            intRec[0].Project_Lead_Remarks__c = inter.Project_Lead_Remarks__c;
            intRec[0].Feedback_Submitted__c=true;
            System.debug(intRec);
            update intRec;
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
                                       (Interviewer__r.Employee_ID__c  LIKE:empId OR 
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
    
    @AuraEnabled
    public static List<String> getPicklistvalues(String objectName, String field_apiname, Boolean nullRequired){
        List<String> optionlist = new List<String>();       
        Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Map<String, Schema.SObjectField> field_map = gd.get(objectName.toLowerCase()).getDescribe().fields.getMap();        
        List<Schema.PicklistEntry> picklistValues = field_map.get(field_apiname).getDescribe().getPickListValues();       
        if(nullRequired == true){
            optionlist.add('--None--');
        }       
        for (Schema.PicklistEntry pv : picklistValues) {
            optionlist.add(pv.getValue());
        }
       return optionlist;
    } 
}