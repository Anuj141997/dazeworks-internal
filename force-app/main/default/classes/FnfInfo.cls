public with sharing class FnfInfo {
    @AuraEnabled(cacheable=true)
    public static List<FNF_Line_Items__c> fnfitem(){
        List<FNF_Line_Items__c> itemList = [Select id, Month__c,Year__c, Amount__c, FNF__c, Type__c, Comments__c from FNF_Line_Items__c];
        return itemList;
    }

    @AuraEnabled(cacheable=true)
    public static void deleteItems(list<Id> lstItemIds){
        try {
            list<FNF_Line_Items__c> lstItemToDelete = new list<FNF_Line_Items__c>();
            System.debug('lstItemIds ====> '+lstItemIds);
            for(Id idItem : lstItemIds) {
                lstItemToDelete.add(new FNF_Line_Items__c(Id = idItem));
            }
            if(!lstItemToDelete.isEmpty()) {
                delete lstItemToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

   
}