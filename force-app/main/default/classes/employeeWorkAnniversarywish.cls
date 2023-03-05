public class employeeWorkAnniversarywish {
    
    public static List<string> toMail;
    public static List<string> ccMail;
    
    public static void getEmail(){
        List<contact> empContacts = [SELECT Id, Name, Date_of_Joining__c,Years_at_DW__c, Email FROM Contact 
                                     WHERE Active__c = TRUE AND Date_of_Joining__c != null];
        	
        
        toMail = new List<String>();
        ccMail = new List<String>();
        List<Project__c> projectList = new List<Project__c>();
        Set<Id> emailSet = new Set<Id>();
        
        for(contact con : empContacts){
            if((con.Date_of_Joining__c.day() == date.today().day()) && (con.Date_of_Joining__c.month() == date.today().month())){
                emailSet.add(con.Id);
            }
        }
        List<contact> empContacts1 = [SELECT Id, Name, Date_of_Joining__c,Email FROM Contact WHERE Id=:emailSet AND Active__c = True];
        EmailTemplate temp =[Select Id,Subject,Description,HtmlValue,DeveloperName,Body,Name from EmailTemplate WHERE Name='Employee Work Anniversary'];
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();   
        for(contact sendEmails : empContacts1){
            system.debug(sendEmails);
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setTargetObjectId(sendEmails.Id);
            email.setSenderDisplayName('Dazeworks');
            email.setToAddresses(new String[]{sendEmails.Email});
            email.setCcAddresses(new String[]{'everyone@dazeworks.com'});
            //email.setToAddresses(toadd1);
            email.setUseSignature(false);
            email.setSaveAsActivity(false);
            email.setBccSender(false);
            email.setTemplateId(temp.Id);
         //   string body = 'Reporting Manager ' + sendEmails.Reporting_Manager__r.Name + ' And Reporting Lead ' + sendEmails.ReportsTo.Name;
            /*string body = 'Hi ' + sendEmails.Name;
            email.setToAddresses(toadd1);
          //email.setCcAddresses(ccMail);
            email.setSubject('Birthday Greetings');
            email.setHtmlBody(''+body+', <br/><br/> <img src="'+instanceUrl+'/servlet/servlet.ImageServer?id='+randomString.Image_Id__c+'&oid='+OrgId+'" width="600" height="600"/>');*/
            mails.add(email);
        }
        if(mails.size()>0){
            Messaging.sendEmail(mails);
        }
    }

}