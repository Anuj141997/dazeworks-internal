public without sharing class newEmployeeStatusClass {
    @AuraEnabled
    public static List<Wrapper> newEmployee() {

        List<Wrapper> wrap = new List<Wrapper>();
        Date t = System.today();
        String SOQL = 'SELECT Id, Name, Employee_ID__c, Date_of_Joining__c, Email FROM Contact Where  Date_of_Joining__c <= THIS_MONTH and Date_of_Joining__c >= THIS_MONTH order by Date_of_Joining__c DESC Limit 5';
                      
        List<Contact> con = Database.query(SOQL);
        System.debug('id  : '+ con);
        for(Contact c : con){
            Wrapper wrapObj = new Wrapper();
            wrapObj.conName = c.Name;
            wrapObj.url =accImageToDisplay(c.Id);
            wrap.add(wrapObj);
        }
        return wrap;
    }
    @AuraEnabled
    public static String accImageToDisplay(Id conId){
        StaticResource docs = [SELECT Id, Name,SystemModStamp, body FROM StaticResource WHERE Name = 'ninjaPic']; 
        String url = '';
        String img='/sfc/servlet.shepherd/version/download/';
        List<ContentDocumentLink> contFiles =[SELECT ContentDocumentId, LinkedEntityId  FROM ContentDocumentLink where LinkedEntityId =:conId];
        System.debug('doc pic :: '+contFiles);
        Set<Id> setofId = new Set<Id>();
        if(contFiles.size()>0){
            for(ContentDocumentLink cId :contFiles){
                setofId.add(cId.ContentDocumentId);
            }
            System.debug('set of ID : '+setofId );
            ContentVersion documents = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :setofId order by LastModifiedDate desc Limit 1];
            System.debug('doc 2 pic :: '+documents);
            if(documents.Id != null){
                url =img+documents.Id;
            }
        }
        else{
          url ='/resource/'+ String.valueOf(((DateTime)docs.get('SystemModStamp')).getTime())+ '/' +docs.Name;
        }
        return url;
    }
    public class Wrapper{
        @AuraEnabled
        public String conName {get;set;}
        @AuraEnabled
        public String url {get;set;}

    }
}