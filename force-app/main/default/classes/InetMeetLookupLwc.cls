public without sharing class InetMeetLookupLwc {
    @AuraEnabled(cacheable=true)  
    public static sobject findRecords(String recordId, String objectName) {  
        string searchText = '\'' + String.escapeSingleQuotes(recordId) + '\'';  
        string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Id ='+searchText;  
        return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Id ='+searchText); 
    }  
    @AuraEnabled 
    public static List<sobject> findRecordsforMeetingFeedback(String searchKey, String objectName) {  
        string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
        string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText;
        return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' AND Active__c=true ORDER BY Name'); 
    }  
    @AuraEnabled 
    public static List<sobject> findingReordsNewOne(String searchKey, String objectName) {  
        string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
        string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText;
        return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' ORDER BY Name'); 
    }  
}