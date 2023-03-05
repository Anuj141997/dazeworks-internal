public class updateResourceTemp {
	    public static void updateResourceTempMethod (){
        Decimal sum;
        Decimal billableSum;
        List<Resource__c> resourcesToBeUpdated = new List<Resource__c>();
        
        List<Resource__c> resourcesWithAllocationList = [Select Id, Name, Total_Current_Utilisation__c,Current_Billable_Utilization__c,(Select Id,Name,Billable__c,Utilisation__c,Start_Date__c,End_Date__c From Allocations__r where In_this_month__c = true) From Resource__c ];
        for(Resource__c res : resourcesWithAllocationList){
            sum = 0;
            billableSum = 0;
            for(Allocation__c allocation : res.Allocations__r ){
                sum += allocation.Utilisation__c;
                if(allocation.Billable__c){
                    billableSum += allocation.Utilisation__c;
                }
            }
            res.Total_Current_Utilisation__c = sum;
            res.Current_Billable_Utilization__c = billableSum;
            resourcesToBeUpdated.add(res);
        }
        update resourcesToBeUpdated;
    }
}