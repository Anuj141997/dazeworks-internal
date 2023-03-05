public class EmployeeBirthday {
    
    public static List<string> toMail;
    public static List<string> ccMail;
    public static List<Contact> birthDateContact;
    
    public static void getEmail(){
        List<contact> empContacts = [SELECT Id, Name, Birthdate, Email FROM Contact 
                                     WHERE Active__c = TRUE AND Birthdate != null];
        
        toMail = new List<String>();
        ccMail = new List<String>();
        List<Project__c> projectList = new List<Project__c>();
        Set<Id> emailSet = new Set<Id>();
        
        for(contact con : empContacts){
            if((con.Birthdate.day() == date.today().day()) && (con.Birthdate.month() == date.today().month())){
                emailSet.add(con.Id);
            }
        }
        List<contact> empContacts1 = [SELECT Id, Name, Birthdate,Email FROM Contact WHERE Id=:emailSet AND Active__c = True];
        EmailTemplate temp =[Select Id,Subject,Description,HtmlValue,DeveloperName,Body,Name from EmailTemplate WHERE Name='Employee Birthday Template'];
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();   
        for(contact sendEmails : empContacts1){
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