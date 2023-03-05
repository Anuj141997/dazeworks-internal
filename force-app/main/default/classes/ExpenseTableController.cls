public class ExpenseTableController {	
    @AuraEnabled
    public static List<Expense__c> fetchData (String paramId){
        
        return [Select Id, Name, Resource__c,Resource_Name__c, Expense_Type__c,Start_Date_Time__c, Vendor_Name__c,Amount__c 
                From Expense__c 
                where Project__c =: paramId
               ];    
    }
}