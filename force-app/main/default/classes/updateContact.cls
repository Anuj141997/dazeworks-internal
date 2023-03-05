/**
* @description       : 
* @author            : Shivam Kumar
* @group             : 
* @last modified on  : 06-24-2022
* @last modified by  : Shivam Kumar 
* Modifications Log
* Ver   Date         Author         Modification
* 1.0   06-24-2022   Shivam Kumar   Initial Version
**/
public without sharing class updateContact {
    @AuraEnabled
    public static Contact getContact(String empId){
        return [Select Id,Name,AADHAR_ID__c,PAN_Card__c,PF_UAN_Number__c,Employee_ID__c,Email,Date_of_Joining__c,Birthdate,Blood_Group__c,Certifications_if_any__c,Gender__c,
                Job_Location__c,MobilePhone,Fathers_Name__c,Mother_s_Name__c,Spouse_Name__c,Spouse_Gender__c,
                Shirt_Size__c,Spouse_DOB__c,Mother_s_DOB__c,Father_s_DOB__c,Child_1_Name__c,Child_1_Gender__c,Child_1_DOB__c,Child_2_Name__c,
                Child_2_Gender__c,Child_2_DOB__c,Bank_Account_Number__c,Bank_Name__c,IFSC_Code__c,Emergency_contact_name__c,Emergency_Contact_Number__c,
                Medical_History_If_any__c,Fun_Fact_about_you__c,Keywords_that_best_describe_you__c,Hates__c,Hobbies__c,Likes__c,Twitter_Link__c,
                LinkedIn_Link__c,Facebook_Link__c,Success_community_profile_link__c,Professional_Consultant_Id__c,Update_By_Employee__c,Permanent_Address__c from Contact where Employee_ID__c=:empId OR Professional_Consultant_Id__c=:empId];
    }
    
    @AuraEnabled
    public static Boolean updateContactMethod(Contact uCon){
        Contact con = [Select Id,Name,AADHAR_ID__c,PAN_Card__c,PF_UAN_Number__c,Employee_ID__c,Email,Date_of_Joining__c,Birthdate,Blood_Group__c,Certifications_if_any__c,Gender__c,
                Job_Location__c,MobilePhone,Fathers_Name__c,Mother_s_Name__c,Spouse_Name__c,Spouse_Gender__c,
                Shirt_Size__c,Spouse_DOB__c,Mother_s_DOB__c,Father_s_DOB__c,Child_1_Name__c,Child_1_Gender__c,Child_1_DOB__c,Child_2_Name__c,
                Child_2_Gender__c,Child_2_DOB__c,Bank_Account_Number__c,Bank_Name__c,IFSC_Code__c,Emergency_contact_name__c,Emergency_Contact_Number__c,
                Medical_History_If_any__c,Fun_Fact_about_you__c,Keywords_that_best_describe_you__c,Hates__c,Hobbies__c,Likes__c,Twitter_Link__c,
                LinkedIn_Link__c,Facebook_Link__c,Success_community_profile_link__c,Professional_Consultant_Id__c,Update_By_Employee__c,Permanent_Address__c from Contact where Id =: uCon.Id ];
        
        if(con.Update_By_Employee__c){
            
            con.Birthdate  = uCon.Birthdate;
            con.Permanent_Address__c = uCon.Permanent_Address__c;
            con.MobilePhone = uCon.MobilePhone;
            con.Blood_Group__c = uCon.Blood_Group__c;
            con.Email = uCon.Email;
            con.Shirt_Size__c = uCon.Shirt_Size__c;
            con.Fathers_Name__c = uCon.Fathers_Name__c;
            con.Father_s_DOB__c = uCon.Father_s_DOB__c;
            con.Mother_s_Name__c = uCon.Mother_s_Name__c;
            con.Mother_s_DOB__c = uCon.Mother_s_DOB__c;
            con.Spouse_Name__c = uCon.Spouse_Name__c;
            con.Spouse_DOB__c = uCon.Spouse_DOB__c;
            con.Spouse_Gender__c = uCon.Spouse_Gender__c;
            con.Child_1_Name__c = uCon.Child_1_Name__c;
            con.Child_1_DOB__c = uCon.Child_1_DOB__c;
            con.Child_1_Gender__c = uCon.Child_1_Gender__c;
            con.Child_2_Name__c = uCon.Child_2_Name__c;
            con.Child_2_DOB__c = uCon.Child_2_DOB__c;
            con.Child_2_Gender__c = uCon.Child_2_Gender__c;
            con.Bank_Account_Number__c = uCon.Bank_Account_Number__c;
            con.Certifications_if_any__c = uCon.Certifications_if_any__c;
            con.IFSC_Code__c = uCon.IFSC_Code__c;
            con.Emergency_contact_name__c = uCon.Emergency_contact_name__c;
            con.Bank_Name__c = uCon.Bank_Name__c;
            con.Emergency_Contact_Number__c = uCon.Emergency_Contact_Number__c;
            con.Medical_History_If_any__c = uCon.Medical_History_If_any__c;
            con.Fun_Fact_about_you__c = uCon.Fun_Fact_about_you__c;
            con.Success_community_profile_link__c = uCon.Success_community_profile_link__c;
            con.Keywords_that_best_describe_you__c = uCon.Keywords_that_best_describe_you__c;
            con.Facebook_Link__c = uCon.Facebook_Link__c;
            con.Hates__c = uCon.Hates__c;
           con.LinkedIn_Link__c = uCon.LinkedIn_Link__c;
            con.Hobbies__c  = uCon.Hobbies__c;
            con.Twitter_Link__c = uCon.Twitter_Link__c;
            con.Likes__c = uCon.Likes__c;
            
            update con;
            return true;
            
        }
        else{
            return false;
        }
    }
    @AuraEnabled
    public static List<PicklistWrapper> getPicklist(String objectName,String fieldName){
        System.debug('Check objectName:: '+objectName);
        System.debug('Check fieldName:: '+fieldName);
        List<PicklistWrapper> wrapList=new List<PicklistWrapper>();
        Map<String, String> mapPickListValues = new Map<String, String>();
        Schema.SObjectType objSobjectType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();
        Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();
        List<Schema.PicklistEntry> lstPickListValues = mapFields.get(fieldName).getDescribe().getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
            PicklistWrapper picklist=new PicklistWrapper();
            picklist.label=objPickList.getLabel();
            picklist.value=objPickList.getValue();
            wrapList.add(picklist);
        }
        return wrapList;
    }
    public class PicklistWrapper{
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public String value {get;set;}
    }
}