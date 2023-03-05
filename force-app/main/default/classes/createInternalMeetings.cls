public without sharing class createInternalMeetings {
    @AuraEnabled
    public static void createMeetingDetails(String meetName,String recDriveLink, String dept, String link, Date startDate, Date endDate, String meetingType,String conID){
        Internal_Meeting__c intMeet = new Internal_Meeting__c();
        intMeet.Name=meetName;
        intMeet.Department__c=dept;
        intMeet.Link__c=link;
        intMeet.Start_Date__c=startDate;
        intMeet.End_Date__c=endDate;
        intMeet.Meeting_Type__c=meetingType;
        intMeet.Delivered_By__c=conID;
        intMeet.Recorded_Session_drive_link__c=recDriveLink;
        System.debug('con id'+conId);
        insert intMeet;
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