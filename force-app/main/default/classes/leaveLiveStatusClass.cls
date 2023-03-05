/**
* @description       : 
* @author            : Shivam Kumar
* @group             : 
* @last modified on  : 09-16-2022
* @last modified by  : Shivam Kumar 
* Modifications Log
* Ver   Date         Author         Modification
* 1.0   09-16-2022   Shivam Kumar   Initial Version
**/
public without sharing class leaveLiveStatusClass {
    @AuraEnabled(cacheable=true)
    public static List<Leave__c> getLeaveDataToday(){
        List <Leave__c> leaveList = [SELECT Id,From__c, Till__c, Number_of_Buisness_Days__c,Employee__r.Employee__r.Active__c,Employee__r.Employee__r.Name,Employee__r.Employee__r.Title,Employee__r.Active_Employee__c,Manager_Approval_Status__c,Status__c  FROM Leave__c WHERE From__c <= TODAY AND Till__c >= TODAY AND Employee__r.Active_Employee__c=TRUE AND Manager_Approval_Status__c='Approved'  AND Employee__r.Employee__r.Active__c=TRUE AND Employee__r.Current_Session__c=TRUE];
        return leaveList;
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Leave__c> getLeaveDataTomorrow(){
        List <Leave__c> leaveList = [SELECT Id,From__c, Till__c, Number_of_Buisness_Days__c,Employee__r.Employee__r.Active__c,Employee__r.Employee__r.Name,Employee__r.Employee__r.Title,Employee__r.Active_Employee__c,Manager_Approval_Status__c,Status__c  FROM Leave__c WHERE From__c <= TOMORROW AND Till__c >= TOMORROW AND Employee__r.Active_Employee__c=TRUE AND Manager_Approval_Status__c='Approved'  AND Employee__r.Employee__r.Active__c=TRUE AND Employee__r.Current_Session__c=TRUE];
        return leaveList;
    }
}