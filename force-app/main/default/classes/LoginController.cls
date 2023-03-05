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
public without sharing class LoginController {
    @AuraEnabled(cacheable=true)
    
    public static Contact checkUser(String username,String userpassw ){
        Contact userPresent= new Contact();
        try{ 
            if(username != null && userpassw != null){
                Contact appList=[select Id,Employee_Id__c, Email,Professional_Consultant_Id__c, Emp_Portal_Password__c, Name, Title, Date_of_Joining__c,
                                 Phone, MobilePhone,ReportsTo.Name from Contact 
                                 where (Employee_Id__c=:username OR Professional_Consultant_Id__c=:username) AND Emp_Portal_Password__c =: userpassw  Limit 1];
                
                if(appList!=null){
                    userPresent=appList;
                }
                
            }
        } catch(AuraHandledException ex){
            system.debug('ex'+ex); 
        }
        return userPresent;
    }
    
    @AuraEnabled
    public static Boolean getAppReset(String username,  String yourAnswer ){
        Boolean resetPassword= false;
        try{
            Contact  alist=[select Id,Employee_Id__c, Email, Security_Question__c,Security_Answer__c, Name from Contact 
                            where Employee_Id__c=:username and Security_Answer__c=:yourAnswer
                            Limit 1];
            
            if(alist != null){
                resetPassword= true;
            }  
        }
        catch(AuraHandledException ex){
            system.debug('ex'+ex); 
        }     
        return resetPassword;
    } 
    
    @AuraEnabled
    public static Boolean getPasswordReset(String username, String password){
        Boolean rePassword= false;
        try{
            Contact listReset=[select Id,Employee_Id__c, Email, Name from Contact 
                               where Employee_Id__c=:username Limit 1];
            
            if(listReset != null){
                rePassword= true;
                listReset.Emp_Portal_Password__c=password;
                
                update listReset;
            }  
        }  
        catch(AuraHandledException ex){
            system.debug('ex'+ex); 
        }     
        return rePassword;
    } 
    
    @AuraEnabled(cacheable=false)
    public static Contact getEmployeeInfo(String username) {  
        Contact con=new Contact();
        try{
            con=[select Id,Email,Name, Security_Answer__c,Employee_Id__c,Emp_Portal_Password__c,Security_Question__c from Contact 
                 where Employee_Id__c=:username Limit 1];
            
        }
        catch (exception e){
            throw new AuraHandledException(e.getMessage());
            
        }
        return  con;
    }
    
    @AuraEnabled(cacheable=false)
    public static Boolean sendEmail(String empEmail, String subject) {  
        System.debug('check email::'+empEmail);
        Boolean userPresent= false; 
        //String emailBody = body;   
        List<String> toAddress=new List<String>{empEmail};
            Messaging.reserveSingleEmailCapacity(1);
        try{
            Contact  appList=[select Id, Name,Email,Security_Answer__c,Employee_Id__c,Emp_Portal_Password__c,Security_Question__c from Contact 
                              where Email=:empEmail Limit 1];
            String employeeName = String.valueOf(appList.Name);
            String employeeEmail = String.valueOf(appList.Email);
            if(appList!=null){
                userPresent=true;
                
                String urlBody='https://dazeworks.force.com/s/resetPassword?c__username='+appList.Employee_Id__c;
                //String urlBody='https://dazeworks--partial.lightning.force.com/lightning/n/Reset_Password?c__username='+appList.Employee_Id__c;
                //String emailBody=urlBody+ '?c__username='+appList.Employee_Id__c;
                String emailBody = 'Dear '+ employeeName+',<br><br><br> Dazeworks Connect recently received a request to reset the password for the username '+employeeEmail+'. To finish resetting your password, go to the following link. <br><br>'+urlBody +'<br><br> If you did not ask for your password to be reset, then please contact HR. <br><br> Thank You';
                
                messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
                
                mail.setToAddresses(toAddress);
                mail.setReplyTo('no-reply@dazeworks.com');
                mail.setSenderDisplayName(' Dazeworks Employee Portal ');
                mail.setSubject(subject);
                mail.setHtmlBody(emailBody);
                Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
            }
        }
        catch (exception e){
            throw new AuraHandledException(e.getMessage());
            
        }
        return  userPresent;
    }
    
    /// Image pic   
    @AuraEnabled
    public static String uploadFile(String base64, String filename, String recordId) {
        ContentVersion cv = createContentVersion(base64, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        return cdl.Id;
    }
    @TestVisible
    private static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    @TestVisible
    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [
            SELECT ContentDocumentId
            FROM ContentVersion
            WHERE Id =: contentVersionId
        ].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        cdl.ShareType = 'V';
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    
    @AuraEnabled
    public static List<ContentVersion> empEmageToDisplay(String empId){
        //List<Contact> con = [Select Id From Contact Where Employee_Id__c =:empId ];
        //System.debug('id  : '+ empId);
        List<ContentDocumentLink> contFiles =[SELECT ContentDocumentId, LinkedEntityId  FROM ContentDocumentLink where LinkedEntityId =:empId];
        System.debug('doc pic :: '+contFiles);
        Set<Id> setofId = new Set<Id>();
        for(ContentDocumentLink cId :contFiles){
            setofId.add(cId.ContentDocumentId);
        }
        List<ContentVersion> documents = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :setofId order by LastModifiedDate desc Limit 1];
        System.debug('doc 2 pic :: '+documents); 
        return documents;
    }
    
    
    
}