public class updateAllocationhandler {
    
    public static void get(List<Allocation__c> allList){
        Set<Id> resourceIds = new Set<Id>();
        Map<string, Access__c> imap = new Map<string, Access__c>();
        for(Allocation__c a: allList){
            resourceIds.add(a.Resource__c);
            System.debug('Resource current value is'+a.Resource__c);
        }
        if(resourceIds.isEmpty())
        {
            System.debug('Empty List');
        }
        else 
        {
            for (access__c b : [Select id, Project__c, Resource__c, Rate__c, Project__r.Id, Resource__r.Id from Access__c where Active__c = true And Resource__c IN: resourceIds])
        {
            imap.put(b.Resource__c+'-'+b.Project__c,b);
            System.debug('imap value is'+b.Id);
        }
        for( Allocation__c i : allList)
        {
            if(imap.containsKey(i.Resource__c +'-'+ i.Project__c))
            {
                i.CurrencyIsoCode = 'USD';
                i.Billing_Rate__c = imap.get(i.Resource__c+'-'+i.Project__c).Rate__c;
                System.debug('Billing Rate value is'+i.Id);
            }
        }
        }
        
    }
}