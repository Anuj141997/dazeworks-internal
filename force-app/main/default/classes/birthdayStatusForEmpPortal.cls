/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-16-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-16-2022   Shivam Kumar   Initial Version
**/
public without sharing class birthdayStatusForEmpPortal {
    @AuraEnabled
    public static List<Wrapper> empEmageToDisplay(){ 
        List<Wrapper> wrap = new List<Wrapper>();
        Date t = System.today();
        String SOQL = 'SELECT Id, Name, Birthdate, Email FROM Contact WHERE Active__c =TRUE AND DAY_IN_MONTH(Birthdate) = ' + 
                      t.day() +  ' AND CALENDAR_MONTH(Birthdate) = ' + t.month();
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