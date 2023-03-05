public without sharing class ProjectList_Controller {
    
    /*  @AuraEnabled
public List<Project__c> projectMemeberListdata; */
    
    @AuraEnabled
    public static List<Project__c> projectLists(String contactId){
        System.debug(contactId);
        String projectName;
        List<String> projectList = new List<String>();
        List<Resource__c> allocatedProjects = [SELECT Resource_Name__c, (SELECT Project__r.Name FROM Allocations__r
                                                                         WHERE In_this_month__c = True) FROM Resource__c 
                                               WHERE Resource_Name__c =: contactId AND Active__c = True LIMIT 1];
        
        Integer Size = allocatedProjects[0].Allocations__r.Size();
        for(Integer i = 0; i < Size; i++ ){
            projectName = allocatedProjects[0].Allocations__r[i].Project__r.Name;
            System.debug(projectName);
            projectList.add(projectName);
        }
        
       // Map< Id, List <Allocation__c>> projectResourceMap = new Map < Id, List <Allocation__c>>();
        
        List<Project__c> projectAllocations = [SELECT Name, (SELECT Resource__r.Resource_Name_Formula__c, Resource_Email__c,
                                                             Resource__r.Resource_Name__r.Birthdate
                                                             FROM Allocations__r
                                                         WHERE Resource__r.Active__c = true AND In_this_month__c = True)
                                           FROM Project__c WHERE  Name IN: projectList AND Active__c = True];
        
      /*  for(Project__c proj : projectAllocations){
           projectResourceMap.put(proj.Id, proj.Allocations__r);
                } */
        System.debug(projectAllocations);
         return projectAllocations;
    }
   
}