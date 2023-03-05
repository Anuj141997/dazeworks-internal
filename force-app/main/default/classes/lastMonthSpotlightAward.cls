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
public without sharing class lastMonthSpotlightAward {
    @AuraEnabled
    public static List<Wrapper> empImageToDisplay(String session){
        List<Wrapper> wrap = new List<Wrapper>();
        Datetime t1 = Datetime.now();
       Datetime t2 = t1.addMonths(-1);
        String month = t2.format('MMMM');
        system.debug('month==>'+month);
        Id AwardRecordTypeId =Schema.SObjectType.Performance__c.getRecordTypeInfosByDeveloperName().get('Award_Nomination').getRecordTypeId();
        
        List<Performance__c> perf = [SELECT Id,Employee__c,RecordTypeId,Employee__r.Name,Award_Type__c,Session__c,Approved__c,Period__c
                                     FROM Performance__c WHERE Award_Type__c ='Spotlight Awards'  AND Approved__c =true AND
                                     RecordTypeId=:AwardRecordTypeId AND Session__c=:session AND Period__c=:month];
        for(Performance__c p : perf){ 
            Wrapper wrapObj = new Wrapper();
            wrapObj.conName = p.Employee__r.Name;
            wrapObj.url =accImageToDisplay(p.Employee__c);
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