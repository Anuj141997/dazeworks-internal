public without sharing class InterviewRating_Controller {
    @AuraEnabled
    public static boolean updateInterviewRating(String interviewId, String employeeId, Interview__c inter, String role, String next, Boolean isJoined)
    {
        String intId = '%'+interviewId;
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Interview__c> intRec = [SELECT Name, Interviewer__r.Employee_ID__c, Language__c, Apex__c, Aura_Components__c,
                                     Integration__c, Java_Script__c, LWC__c, SQL__c, Overall_on_10__c, Comments__c,Admin__c,Admin_Remarks__c,
                                     Visualforce__c,Visualforce_Remarks__c,MuleSoft__c,
                                     MuleSoft_Remarks__c,Velocity_CPQ__c,Velocity_CPQ_Remarks__c,Apex_Remarks__c,
                                     Lightning_Remarks__c,Integration_Remarks__c,LWC_Remarks__c,SQL_Remarks__c,JavaScript_Remarks__c FROM Interview__c
                                     WHERE Name LIKE:intId AND (Interviewer__r.Employee_ID__c  LIKE:empId OR Interviewer__r.Professional_Consultant_Id__c LIKE:empId) LIMIT 1];
        
        
        if(intRec.size() > 0){
            isSuccess = true;
            
            intRec[0].Language__c = inter.Language__c;
            intRec[0].Apex__c = inter.Apex__c;
            intRec[0].Aura_Components__c = inter.Aura_Components__c;
            intRec[0].Integration__c = inter.Integration__c;
            intRec[0].Java_Script__c = inter.Java_Script__c;
            intRec[0].LWC__c = inter.LWC__c;
            intRec[0].SQL__c = inter.SQL__c;
            intRec[0].Language_on_10__c = inter.Language__c;
            intRec[0].Overall_on_10__c = inter.Overall_on_10__c;
            intRec[0].Comments__c = inter.Comments__c;
            intRec[0].Suitable_for_which_Role__c = role;
            intRec[0].Next_Step__c = next;
            intRec[0].Interview_Feedback__c = true;
            intRec[0].Interview_Status__c = 'Interviewed';
            intRec[0].Interviewee_didn_t_join__c = isJoined;
            intRec[0].Admin__c = inter.Admin__c;
            intRec[0].Visualforce__c = String.valueof(inter.Visualforce__c);
            intRec[0].MuleSoft__c = inter.MuleSoft__c;
            intRec[0].Velocity_CPQ__c = inter.Velocity_CPQ__c;
            intRec[0].Admin_Remarks__c = inter.Admin_Remarks__c;
            intRec[0].Visualforce_Remarks__c = inter.Visualforce_Remarks__c;
            intRec[0].MuleSoft_Remarks__c = inter.MuleSoft_Remarks__c;
            intRec[0].Velocity_CPQ_Remarks__c = inter.Velocity_CPQ_Remarks__c;
            intRec[0].Apex_Remarks__c = inter.Apex_Remarks__c;
            intRec[0].Lightning_Remarks__c = inter.Lightning_Remarks__c;
            intRec[0].Integration_Remarks__c = inter.Integration_Remarks__c;
            intRec[0].LWC_Remarks__c = inter.LWC_Remarks__c;
            intRec[0].SQL_Remarks__c = inter.SQL_Remarks__c;
            intRec[0].JavaScript_Remarks__c = inter.JavaScript_Remarks__c;
            
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