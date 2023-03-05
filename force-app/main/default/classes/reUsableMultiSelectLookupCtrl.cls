public class reUsableMultiSelectLookupCtrl {
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String ObjectName, List<sObject> ExcludeitemsList) {
        String searchKey = '%' + searchKeyWord + '%';
        string Employee ='Employee';
        string candidate ='candidate';
        string ProfessionalConsultant ='Professional Consultant';
        
        List < sObject > returnList = new List < sObject > ();
 
        List<string> lstExcludeitems = new List<string>();
        for(sObject item : ExcludeitemsList ){
            lstExcludeitems.add(item.id);
        }
        
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5 and exclude already selected records  
        String sQuery =  'select id, Name, email, RecordTypeId, RecordType.name from ' +ObjectName + ' where (Name LIKE: searchKey AND Id NOT IN : lstExcludeitems) AND( (RecordType.Name =:Employee and Active__c =true ) OR (RecordType.name =: ProfessionalConsultant))';
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }

}