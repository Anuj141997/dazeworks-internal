/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-24-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-24-2022   Shivam Kumar   Initial Version
**/
public without sharing class ticketManagement {
    @AuraEnabled
    public static String createActionItem(string empId,String tickType,String tickSubType,String tickDesc){
        list<Contact> conList = [Select Employee_ID__c, Professional_Consultant_Id__c, Id from Contact where Employee_ID__c=:empId OR Professional_Consultant_Id__c =: empId];
        Id devRecordTypeId = Schema.SObjectType.Action_Items__c.getRecordTypeInfosByName().get('Ticket').getRecordTypeId();
        System.debug('empId ::'+empId);
        System.debug('tickType'+tickType);
        System.debug('tickSubType'+tickSubType);
        System.debug('tickDesc'+tickDesc);
        Action_Items__c action = new Action_Items__c();
        action.Asked_By__c = conList[0].Id;
        action.RecordTypeId = devRecordTypeId;
        action.Ticket_Type__c = tickType;
        if(tickType=='HR Related'){
            action.Ticket_SubType__c = tickSubType;  
        } 
        action.Description__c = tickDesc; 
        insert action;
        
        Action_Items__c ac = [Select Id,Name from Action_Items__c where Id=:action.Id];
        return ac.Name;
    }
    @AuraEnabled
    public static List<Action_Items__c> getTickets(string empId){
        List<Contact> conList = [Select Employee_ID__c, Professional_Consultant_Id__c, Id from Contact where Employee_ID__c=:empId OR Professional_Consultant_Id__c =: empId];
        List<Action_Items__c> ticketList =[Select Asked_By__c,Comments__c,Assigned_To__c,Date_Time_Closed__c,Date_Time_Opened__c,Status__c,
                                           Ticket_Type__c,Ticket_SubType__c,Description__c from Action_Items__c where Asked_By__c=:conList[0].Id];
        return ticketList;
    }
}