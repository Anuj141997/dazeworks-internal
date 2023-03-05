public without sharing class certificationList {
    public Static List<Certification__c> getCertificateList(string EmpId){
        return [Select Id, Type_of_Certificate__c, Other__c,Certification_Date__c From Certification__c Where Contact__r.Employee_ID__c=:'DW11242'];
    }

}