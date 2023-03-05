public class interviewScorecardTableCtrl{
    @AuraEnabled 
    public static List<interviewListWrapper> fetchInterviewWrapper(String paramId, sObject objObject, string fld){     
        List<interviewListWrapper> lstInterviewListWrapper = new List<interviewListWrapper>();
        List < String > allOpts = new list < String > ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType(); 
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values =
            fieldMap.get(fld).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        
        system.debug('allOpts ---->' + allOpts);
        //allOpts.sort();
        // query account records and create 'interviewListWrapper' class instance for each record. 
        for(Interview__c acc : [Select Id, Application__c, Application__r.Candidate__r.Name, Comments__c, Improvements__c,Technical_on_10__c,Interview_Status__c, Interview_Date_and_Time__c, Interview_Round__c, Interviewer__r.Name, Language_on_10__c, Overall_on_10__c 
                                From Interview__c 
                                where Application__c =: paramId
                                ORDER BY Interview_Date_and_Time__c DESC ]){
                                    // by default checkbox should be false 
                                    lstInterviewListWrapper.add(new interviewListWrapper(false,acc,allOpts));
                                } 
        // return the 'lstInterviewListWrapper' list 
        return lstInterviewListWrapper; 
    }
    @AuraEnabled 
    public static void updateInterviewWrapper(String wrapperString){   
        List<interviewListWrapper> listWrapper = (List<interviewListWrapper>)JSON.deserialize(wrapperString, List<interviewListWrapper>.class);
        List<Interview__c> interviewList = new List<Interview__c>();
        
        for(Integer i=0; i<listWrapper.size(); i++) {
            
           
                interviewList.add(listWrapper[i].objInterview);
           
        }
        update interviewList;
        
    }
    
    /* wrapper class */  
    public class interviewListWrapper {
        @AuraEnabled public boolean isChecked {get;set;}
        @AuraEnabled public  Interview__c objInterview{get;set;}
        @AuraEnabled public  List<String> listStatus{get;set;}
        public interviewListWrapper(boolean isChecked, Interview__c objInterview, list<String> listStatus){
            this.isChecked = isChecked;
            this.objInterview = objInterview;
            this.listStatus = listStatus;
        }
    }
}