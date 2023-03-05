public without sharing class createEmployeeFeedback {
    @AuraEnabled
    public static void submitfeedback(String meetRecId, String resource, String rating, Date dateOffeedback, String feedback){
        Employee_Feedback__c empfeed = new Employee_Feedback__c();
        empfeed.Feedback__c = feedback;
        empfeed.Meeting_Name__c = meetRecId;
        empfeed.Resource__c = resource;
        empfeed.Date__c=dateOffeedback;
        empfeed.Rating__c=rating;
        insert empfeed;
    }
    @AuraEnabled(cacheable=true)
    public static List < customValueWrapper > pickListValueDynamically(sObject customObjInfo, string selectPicklistApi) {
        Schema.DescribeSObjectResult objDescribe = customObjInfo.getSObjectType().getDescribe();     
        map < String, Schema.SObjectField > customFieldMap = objDescribe.fields.getMap();      
        list < Schema.PicklistEntry > custPickValues = customFieldMap.get(selectPicklistApi).getDescribe().getPickListValues();
        list < customValueWrapper > customObjWrapper = new list < customValueWrapper > ();
        for (Schema.PicklistEntry myCustPick: custPickValues) {
            customValueWrapper selectOptionValueWrapper = new customValueWrapper();
            selectOptionValueWrapper.custFldlabel = myCustPick.getLabel();
            selectOptionValueWrapper.custFldvalue = myCustPick.getValue();
            customObjWrapper.add(selectOptionValueWrapper);
        }
        return customObjWrapper;
    }
    // wrapper class 
    public without sharing class customValueWrapper {
        @auraEnabled public string custFldlabel {get;set;}
        @auraEnabled public string custFldvalue {get;set;}
        
    }
}