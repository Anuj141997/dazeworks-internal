public without sharing class Certification {
    @AuraEnabled
    public static void createCertification(List<CertificateWrapper> certificate,String EmpId){
        
        List<Contact> ConList = [Select Id, Name, Employee_ID__c, Professional_Consultant_Id__c From Contact Where Employee_ID__c =: EmpId OR Professional_Consultant_Id__c =: EmpId];
        System.debug('certificate :' + certificate);
        List<Certification__c> certList = new List<Certification__c>();
        System.debug('certList :: > '+ConList);
        if(certificate.size()>0){
            for(CertificateWrapper c:certificate){
                Certification__c cer = new Certification__c();
                cer.Contact__c= ConList[0].Id;
                cer.Type_of_Certificate__c = c.Certication;
                cer.Other__c = c.Others;
                cer.Certification_Date__c = c.CertificateDate;
                certList.add(cer);
            }
        }
        if(certList.size()>0){
            insert certList;
        }
        
    }
  
    
    @AuraEnabled
    public static List<PicklistWrapper> getPicklist(String objectName,String fieldName){
        System.debug('Check objectName:: '+objectName);
        System.debug('Check fieldName:: '+fieldName);
        List<PicklistWrapper> wrapList=new List<PicklistWrapper>();
        Map<String, String> mapPickListValues = new Map<String, String>();
        Schema.SObjectType objSobjectType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();
        Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();
        List<Schema.PicklistEntry> lstPickListValues = mapFields.get(fieldName).getDescribe().getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
            PicklistWrapper picklist=new PicklistWrapper();
            picklist.label=objPickList.getLabel();
            picklist.value=objPickList.getValue();
            wrapList.add(picklist);
        }
        return wrapList;
    }
    
    public class PicklistWrapper{
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public String value {get;set;}
    }
    public class CertificateWrapper{
        @AuraEnabled 
        public Integer indexes {get;set;}
        @AuraEnabled
        public Date CertificateDate {get;set;}
        @AuraEnabled
        public String Certication {get;set;}
        @AuraEnabled
        public String Others {get;set;}
    }
    
    //Certification List
    @AuraEnabled
    public Static List<Certification__c> getCertificateList(String empId){
        System.debug('empId for List :: '+empId);
        return [Select Id, Type_of_Certificate__c, Other__c,Certification_Date__c From Certification__c where Contact__r.Employee_ID__c =: EmpId OR Contact__r.Professional_Consultant_Id__c =:EmpId];
    }
    
    //update certificate
    @AuraEnabled
    public static void updateCert(Date certDate, String certValue, String certOthers, String recId){
        System.debug('date:: '+certDate);
        System.debug('certValue:: '+certValue);
        System.debug('certOthers:: '+certOthers);
        System.debug('recId:: '+recId);
        Certification__c cert = [Select Id,Type_of_Certificate__c,Certification_Date__c,Other__c from Certification__c where Id=:recId];
        cert.Type_of_Certificate__c =certValue;
        cert.Certification_Date__c =certDate;
        cert.Other__c = certOthers;
        update cert;
    }
}