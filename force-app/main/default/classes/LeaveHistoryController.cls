public without sharing class LeaveHistoryController {
    @AuraEnabled(cacheable=false)
    public static List<Leave__C> getLeaveDetails(string empId) {
        System.debug('check');
        
            list<Employee_Session__c> employeeSession = [Select id,Name,Employee__c From Employee_Session__c where (Employee__r.Employee_Id__c =: empId OR Employee__r.Professional_Consultant_Id__c =:empId ) AND Current_Session__c = TRUE LIMIT 1];

        return [Select id,Name,CreatedDate,From__c,Till__c,Type_of_Leave__c,Status__c, Manager_Approval_Status__c from Leave__c where Employee__c =: employeeSession[0].id];
    }
    @AuraEnabled(cacheable=false)
    public static List<Leave__C> getLeaveDetailsForMngr(string empId) {
        System.debug('check emp Id ::'+empId);
        Blob afterblob = EncodingUtil.base64Decode(empId);
        String emp_id = afterblob.toString();
        System.debug('afterblob====>'+afterblob);
        System.debug('emp_id::>>>'+emp_id );
            list<Employee_Session__c> employeeSession = [Select id,Name,Employee__c From Employee_Session__c where Employee__r.Employee_Id__c =: emp_id AND Current_Session__c = TRUE LIMIT 1];
        return [Select id,Name,CreatedDate,From__c,Till__c,Type_of_Leave__c,Status__c, Manager_Approval_Status__c, Description__c from Leave__c where Employee__c =: employeeSession[0].id  AND Manager_Approval_Status__c=:'Pending'];
    }
        
    
}