public class dataTableCtrl{
    @AuraEnabled 
    public static List<applicationListWrapper> fetchApplicationWrapper(){     
        List<applicationListWrapper> lstapplicationListWrapper = new List<applicationListWrapper>();
        // query Application records and create 'applicationListWrapper' class instance for each record. 
        for(Application__c app : [select Candidate__r.Name, Position__r.Name, Id, Name, Last_Interview_Date__c,Overall_Ratingm__c, Application_Date__c,Candidate__c,Number_of_Scheduled_Interviews__c, Position__c,Interview_Round__c from Application__c ORDER BY Application_Date__c DESC  ]){
            // by default checkbox should be false 
            lstapplicationListWrapper.add(new applicationListWrapper(false,app));
        } 
        // return the 'lstapplicationListWrapper' list 
        return lstapplicationListWrapper; 
    }
    
    /* wrapper class */  
    public class applicationListWrapper {
        @AuraEnabled public boolean isChecked {get;set;}
        @AuraEnabled public  Application__c objApplication{get;set;}
        public applicationListWrapper(boolean isChecked, Application__c objApplication){
            this.isChecked = isChecked;
            this.objApplication = objApplication;
        }
    }
    
    @AuraEnabled
    public static void fetchApplication(ID applicationId, String status) {
        Application__c lstOfAccount = [select Id, Interview_Round__c from Application__c
                                       where Id =: applicationId];
        lstOfAccount.Interview_Round__c = status;
        update lstOfAccount;  
    }
    
    @AuraEnabled
    public static List<applicationListWrapper> fetchCandidate(String searchKeyWord, String objectName) {
        String searchKey = searchKeyWord + '%';
        List < Application__c > lstOfApplication = new List < Application__c >();
        if(objectName == 'Contact'){
            List <Contact> contactList = [SELECT Id from Contact where Name LIKE: searchKey LIMIT 500];
            Set<String> contactId = new Set<String>();
            for (Contact con: contactList){
                contactId.add(con.Id);
            }
            lstOfApplication = [select Name, Candidate__r.Name, Position__r.Name, Id, Application_Date__c,Overall_Ratingm__c,Last_Interview_Date__c,Candidate__c,Number_of_Scheduled_Interviews__c, Position__c, Interview_Round__c from Application__c WHERE Candidate__c IN : contactId];
            
        }
        else if (objectName == 'JobOpening'){
            List <Position__c> jobOpeningList = [SELECT Id from Position__c where Name LIKE: searchKey LIMIT 500];
            Set<String> jobOpeningSet = new Set<String>();
            for (Position__c jobOpening: jobOpeningList){
                jobOpeningSet.add(jobOpening.Id);
            }
            lstOfApplication = [select Name, Candidate__r.Name, Position__r.Name, Id, Application_Date__c,Overall_Ratingm__c,Candidate__c,Last_Interview_Date__c,Number_of_Scheduled_Interviews__c, Position__c, Interview_Round__c from Application__c WHERE Position__c IN : jobOpeningSet];
            
        }
        else if (searchKeyWord == 'option1' && (objectName == 'NotForSearchButton')){
            lstOfApplication = [select Name, Candidate__r.Name, Position__r.Name, Id, Application_Date__c,Overall_Ratingm__c,Last_Interview_Date__c,Candidate__c,Number_of_Scheduled_Interviews__c, Position__c, Interview_Round__c from Application__c WHERE Number_of_Scheduled_Interviews__c = 0];
        }
        else if (searchKeyWord == 'option2' && (objectName == 'NotForSearchButton')){
            lstOfApplication = [select Name, Candidate__r.Name, Position__r.Name, Id, Application_Date__c,Overall_Ratingm__c,Last_Interview_Date__c,Candidate__c,Number_of_Scheduled_Interviews__c, Position__c, Interview_Round__c from Application__c WHERE Number_of_Scheduled_Interviews__c != 0 ORDER BY Last_Interview_Date__c DESC ];
        }
        List<applicationListWrapper> lstapplicationListWrapper = new List<applicationListWrapper>();
        // query Application records and create 'applicationListWrapper' class instance for each record. 
        for(Application__c app : lstOfApplication){
            // by default checkbox should be false 
            lstapplicationListWrapper.add(new applicationListWrapper(false,app));
        } 
        // return the 'lstapplicationListWrapper' list 
        return lstapplicationListWrapper; 
    }
}