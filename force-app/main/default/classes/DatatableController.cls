public with sharing class DatatableController {
    
    public DatatableController() {

    }
  
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases( String searchKey,
    String sortBy, String sortDirection) {

       String query = 'SELECT Id, CaseNumber, Description, Subject, Status FROM Case';
       system.debug('query---'+query);
       if ( searchKey != null && searchKey != '' ) {
           String key =  searchKey;
           query += ' WHERE CaseNumber = :key';
       }
       if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
       }
       return Database.query( query );
   }

   @AuraEnabled
   public static void deleteCases(list<Id> lstCaseIds) {
        try {
           list<Case> lstCaseToDelete = new list<Case>();
           System.debug('lstConIds ====> '+lstCaseToDelete);
            for(Id idCon : lstCaseIds) {
                lstCaseToDelete.add(new Case(Id = idCon));
            }
            if(!lstCaseToDelete.isEmpty()) {
               delete lstCaseToDelete;
            }
        }
        catch(Exception ex) {
           throw new AuraHandledException(ex.getMessage());
        }
    }
}