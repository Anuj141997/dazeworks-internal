global class closeLeaveApplyForm implements Database.Batchable<sObject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('Select Id, Name, Optout_For_Leave__c From Employee_Session__c Where Name!=Null');
    }
    global void execute(Database.BatchableContext bc, List<Employee_Session__c> empList){
        for(Employee_Session__c Emp: empList){
            if(Emp.Optout_For_Leave__c==false){
                Emp.Optout_For_Leave__c=true;
            }
        }
       update empList;
    }
    
    global void finish(Database.BatchableContext bc ){
       
        
    }
   
}