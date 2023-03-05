public without sharing class EmployeeSkills_Controller {
    @AuraEnabled
    public static List <String> getPiklistValues() {
        List<String> plValues = new List<String>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Contact');
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Schema.DescribeFieldResult objFieldInfo = objDescribe.fields.getMap().get('Skills__c').getDescribe();
        
        List<Schema.PicklistEntry> picklistvalues = objFieldInfo.getPicklistValues();
        for(Schema.PicklistEntry plv: picklistvalues) {
            plValues.add(plv.getValue());
        }
        plValues.sort();
        System.debug(plValues);
        return plValues;
    }
    
    @AuraEnabled
    public static boolean updateSkills(String employeeId, String skillSet, String others){
        String selectedSkills = skillSet.replace(',', ';');
        String empId = '%'+employeeId;
        boolean isSuccess;
        List<Contact> employeeList = [SELECT Employee_ID__c, Professional_Consultant_Id__c, Skills__c FROM Contact
                                      WHERE Employee_ID__c LIKE:empId OR Professional_Consultant_Id__c LIKE:empId LIMIT 1];
        if(employeeList.size() > 0){
            isSuccess = true;
            employeeList[0].Skills__c = selectedSkills;
            employeeList[0].Other_Skills__c = others;
            system.debug('Skills : '+employeeList[0].Skills__c);
            update employeeList;
        }else{
            isSuccess = false;
        }
        return isSuccess;
    } 
}