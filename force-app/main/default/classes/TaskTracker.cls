public with sharing class TaskTracker {

    
    @AuraEnabled(cacheable=true)
    public static List<Case> fetchTaskRecord(){
        List<Case> taskList = [Select id, Subject, Description, Steps_to_be_taken__c, Type, Assigned_To__c,Assigned_To__r.Name, ContactId, Contact.Name, Due_Date__c, Status, Priority from Case where status!='Closed'];
        return taskList;
    }
 
    @AuraEnabled()
    public static List<Case> updateMultipleTaskRecord(List<String> taskObj){
        List<Case> taskObjItem = new List<Case>();
      List<Case> taskObjList = [Select Id, Subject,Status  From Case Where Id IN:taskObj];
      
      for(Case a:taskObjList){
            a.Status ='Closed';  
        taskObjItem.add(a);
      }
      if(taskObjItem.size()>0){
          try{
            update taskObjItem;          
          }
          catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
      }
      return fetchTaskRecord();
    }


    @AuraEnabled()
    public static void deleteTasks(list<Id> lstTaskIds){
        try {
            list<Case> lstTasksToDelete = new list<Case>();
            System.debug('lstTaskIds ====> '+lstTaskIds);
            for(Id idTask : lstTaskIds) {
              lstTasksToDelete.add(new Case(Id = idTask));
            }
            if(!lstTasksToDelete.isEmpty()) {
                delete lstTasksToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
 
    
}