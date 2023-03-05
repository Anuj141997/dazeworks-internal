public class TotalUtilisationUpdateTriggerHandler {
    public static Boolean isFirstTime = true;
    
    public static void updateTotalUtilisation(List<Allocation__c> listAllocations){
        Decimal sum;
        Decimal billableSum;
        List<Resource__c> resourcesToBeUpdated = new List<Resource__c>();
        Set<Id> resourceIds = new Set<Id>();
        for(Allocation__c allocation : listAllocations ){
            resourceIds.add(allocation.Resource__c);
        }
        List<Resource__c> resourcesWithAllocationList = [Select Id, Name, Total_Current_Utilisation__c,Current_Billable_Utilization__c,(Select Id,Name,Billable__c,Utilisation__c,Start_Date__c,End_Date__c From Allocations__r) From Resource__c Where Id In:resourceIds];
        for(Resource__c res : resourcesWithAllocationList){
            sum = 0;
            billableSum = 0;            
            for(Allocation__c allocation : res.Allocations__r ){
                if(allocation.End_Date__c >= Date.today() && allocation.Start_Date__c <= Date.today()){
                    sum += allocation.Utilisation__c;
                    if(allocation.Billable__c){
                        billableSum += allocation.Utilisation__c;
                    }
                }
            }
            res.Total_Current_Utilisation__c = sum;
            res.Current_Billable_Utilization__c = billableSum;
            resourcesToBeUpdated.add(res);
        }
        update resourcesToBeUpdated;
    }
    
    
    public static void updateAllocatedProjects(List<Allocation__c> allocationList){
        String projects;
        Set<Id> resourceIds = new   Set<Id>();
        Set<Id> allocationIds = new Set<Id>();
        List<Resource__c> resourcesTobeUpdated = new List<Resource__c>();
        
        if(isFirstTime){
            isFirstTime = false;
            
            for(Allocation__c alloc : allocationList){
                if(alloc.In_this_month__c == true){
                    resourceIds.add(alloc.Resource__c);
                    allocationIds.add(alloc.Id);
                    System.debug('New Allocation List ');
                }
            }
            
            List<Resource__c> allocatedProjects = [SELECT Resource_Name__c, Projects_Aligned__c, (SELECT Project__r.Name, Utilisation__c FROM Allocations__r
                                                                                                  WHERE In_this_month__c = True) FROM Resource__c 
                                                   WHERE Active__c = True AND Id IN: resourceIds];
            
            for(Resource__c res : allocatedProjects){
                System.debug('Resource List ');
                projects = '';
                for(Allocation__c allocation : res.Allocations__r){
                    
                    if(res.Projects_Aligned__c != null && !res.Projects_Aligned__c.contains(allocation.Project__r.Name)){
                        projects +=  allocation.Project__r.Name + ' (Utilization - '+ allocation.Utilisation__c +'%), '; 
                        res.Projects_Aligned__c = projects;
                        System.debug('Related Allocation List '); 
                    } else{
                        projects +=  allocation.Project__r.Name + ' (Utilization - '+ allocation.Utilisation__c +'%), '; 
                        res.Projects_Aligned__c = projects;
                    }
                }
                resourcesTobeUpdated.add(res);
            }
            update resourcesTobeUpdated;
        }
        
        
    }
    
}