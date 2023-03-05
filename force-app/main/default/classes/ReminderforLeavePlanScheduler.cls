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
global class ReminderforLeavePlanScheduler implements Schedulable{
    global void execute(SchedulableContext sc){
        ReminderforLeavePlan b = new ReminderforLeavePlan();
        database.executeBatch(b);
    }
}