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
global class ReminderforLeavePlan implements Database.Batchable<sObject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('Select Id, Name, Optout_For_Leave__c From Employee_Session__c Where Name!=Null');
    }
    global void execute(Database.BatchableContext bc, List<Employee_Session__c> empList){
        for(Employee_Session__c Emp: empList){
            if(Emp.Optout_For_Leave__c==true){
                Emp.Optout_For_Leave__c=false;
            }
        }
       update empList; 
    }
    
    global void finish(Database.BatchableContext bc ){
        List<Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddress = new String[]{'everyone@dazeworks.com'};
        email.setSubject('Leave Reminder');
        email.setHtmlBody('<p><b>Hello Team</b>,<br><br><br> <b>A gentle reminder to update your planned leaves by 25th.</b><br><br><br>Regard,<br>Team HR </p>');
        email.setReplyTo('no-reply@dazeworks.com');
        email.setSenderDisplayName('Reminder for leave plan');
        email.setToAddresses(toAddress);
       // mailList.add(email);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
        
    }
   
}