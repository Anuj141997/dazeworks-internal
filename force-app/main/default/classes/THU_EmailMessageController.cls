public class THU_EmailMessageController {
       @AuraEnabled 
    //sending the email method 
    public static void sendMailMethod(String mMail ,String mSubject ,String mbody,String folderId,string interviewid ,String templateId,DateTime dateField,list<contact> emaillist, String fileName, String base64Data, String contentType){
        list<EmailTemplate> em = new list<EmailTemplate>();
        em = [SELECT Id,Subject,Body,HtmlValue From EmailTemplate where id =: templateId limit 1];
        
        String[] ccAddresses = new String[] {label.CC_Email};
        List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>(); 
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> sendTo = new List<String>();
        
        for(contact sobj :emaillist)
        {
            string emailst = sobj.email; 
            sendTo.add(emailst);
        }
        mail.setToAddresses(sendTo);
        mail.setCcAddresses(ccAddresses);
        mail.setSenderDisplayName(label.Sender_display_name);  
        mail.setSubject(mSubject);
        mail.setWhatId(interviewid);
        mail.setHtmlBody(mbody);
        mail.setTreatTargetObjectAsRecipient(true);
        mail.setTreatBodiesAsTemplate(true);
        mail.setTemplateId(em.get(0).id);
        Messaging.EmailFileAttachment FileAttachment = new  Messaging.EmailFileAttachment();
        if(fileName != null && contentType != null){
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            FileAttachment.Body = EncodingUtil.base64Decode(base64Data);
            FileAttachment.filename = fileName;
            FileAttachment.ContentType = contentType;
        }
        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.filename = 'reminder.ics';
        attach.ContentType = 'text/calendar';
        attach.inline = true;
        attach.body = invite(dateField);
        if(FileAttachment.filename !='' && FileAttachment.filename != null ){
            mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attach,FileAttachment});
           }else{
            mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attach}); 
           }
        mails.add(mail);
        Messaging.SendEmailResult[] er = Messaging.sendEmail( mails);
    }         
    
    //Attaching the Google invitation calender
    private static Blob invite(datetime datefiled) {
        String Summaryvalue =label.Summary_value;
        DateTime todayDate = DateTime.now();
        String startdatetime=datefiled.formatGMT('yyyyMMdd\'T\'HHmmssSSS\'Z\''); 
        
        String enddatetime =datefiled.addMinutes(30).formatGMT('yyyyMMdd\'T\'HHmmssSSS\'Z\'');
        String txtInvite = '';
        txtInvite += 'BEGIN:VCALENDAR\n';
        txtInvite += 'PRODID::-//Google Inc//Google Calendar 70.9054//EN\n';
        txtInvite += 'VERSION:2.0\n';
        txtInvite += 'CALSCALE:GREGORIAN\n';
        txtInvite += 'METHOD:REQUEST\n';
        txtInvite += 'X-MS-OLK-FORCEINSPECTOROPEN:TRUE\n';
        txtInvite += 'BEGIN:VEVENT\n';
        txtInvite += 'CLASS:PUBLIC\n';
        txtInvite += 'CREATED:'+todayDate+'\n';
        txtInvite += 'DTEND:'+enddatetime+'\n';
        txtInvite += 'DTSTAMP:'+todayDate+'\n';
        txtInvite += 'DTSTART:'+startdatetime+'\n';
        txtInvite += 'DESCRIPTION:India\n';
        txtInvite += 'LAST-MODIFIED:'+todayDate+'\n';
        txtInvite += 'LOCATION:India\n';
        txtInvite += 'SEQUENCE:0\n';
        txtInvite += 'STATUS:CONFIRMED\n';
        txtInvite += 'SUMMARY:'+Summaryvalue+'\n';
        txtInvite += 'LANGUAGE=en-us:Meeting\n';
        txtInvite += 'TRANSP:OPAQUE\n';
        txtInvite += 'X-ALT-DESC;FMTTYPE=text/html:<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN"><HTML><HEAD><META NAME="Generator" CONTENT="MS Exchange Server version 08.00.0681.000"><TITLE></TITLE></HEAD><BODY><!-- Converted from text/plain format --></BODY></HTML>\n';
        txtInvite += 'X-MICROSOFT-CDO-BUSYSTATUS:BUSY\n';
        txtInvite += 'X-MICROSOFT-CDO-IMPORTANCE:1\n';
        txtInvite += 'END:VEVENT\n';
        txtInvite += 'END:VCALENDAR';
        return Blob.valueOf(txtInvite);
    }
    
    
    @AuraEnabled
    //sending the folder and template list to servicer side controller 
    public static list<emailTemplateWrapper> getEmailTempaltes(string RecdId){
        string  Interviewee= '';
        Datetime Interview_Date_and_Time;
        string Candidate_Phone_number;
        string Meeting_URL = '';
        string htmlReplace = '' ;
        string subjectReplace='';
        string CandidateReferNumber ='';
        Interview__c Interviewlist;
        
        if(RecdId != null ){ 
            Interviewlist = [SELECT Id, Name, Interviewee__c, Interviewer__c, Candidate_Refer_Number_Emp__c, Meeting_URL_Formula__c, Interview_Date_and_Time__c, Candidate_Phone_number__c FROM Interview__c where id=:RecdId];
            
            if(Interviewlist.Interviewee__c != null){
                Interviewee =Interviewlist.Interviewee__c;
            }
            if(Interviewlist.Interview_Date_and_Time__c != null){
                Interview_Date_and_Time = Interviewlist.Interview_Date_and_Time__c;
            }
            if(Interviewlist.Candidate_Phone_number__c != null){
                Candidate_Phone_number =String.ValueOf(Interviewlist.Candidate_Phone_number__c);
            }
            if(Interviewlist.Meeting_URL_Formula__c != null){
                Meeting_URL =Interviewlist.Meeting_URL_Formula__c;
            }
            if(Interviewlist.Candidate_Refer_Number_Emp__c != null){
                CandidateReferNumber = Interviewlist.Candidate_Refer_Number_Emp__c; 
            }
        } 
        list<emailTemplateWrapper> emailTemplateWrapperlist = new list<emailTemplateWrapper>();
        map<String,emailTemplateWrapper> folderIdVsTemplateMap = new map<String,emailTemplateWrapper>();
        Folder folderObj = new folder();
        string folderName =Label.Email_Folder_Name;
        folderObj= [SELECT Id,Name FROM Folder where Name=:folderName];
        
        for(sobject emailtemp : [ SELECT Id, FolderId, HtmlValue, FolderName, isActive, body,Name,subject FROM EmailTemplate where isActive= true and FolderId =: folderObj.Id ]){ 
            
            // Replacing the template body values with records values.
            
            if(String.valueOf(emailtemp.get('subject')) != '' && String.valueOf(emailtemp.get('subject')) != Null){
                subjectReplace =String.valueOf(emailtemp.get('subject'));
               } 
            if(subjectReplace != null &&  subjectReplace.containsIgnoreCase('{!Interview__c.Interviewee__c}')){
                subjectReplace = subjectReplace.replace('{!Interview__c.Interviewee__c}',Interviewee); 
                 } 
            
            if(String.valueOf(emailtemp.get('body')) != '' && String.valueOf(emailtemp.get('body')) != Null){
                htmlReplace =String.valueOf(emailtemp.get('body'));
            }   
            if(htmlReplace != null &&  htmlReplace.containsIgnoreCase('{!Interview__c.Interviewee__c}') && Interviewee != null){
                htmlReplace = htmlReplace.replace('{!Interview__c.Interviewee__c}',Interviewee)+'<br/>'; 
            }
            if(htmlReplace != null &&  htmlReplace.containsIgnoreCase('{!Interview__c.Interview_Date_and_Time__c}') && String.ValueOf(Interview_Date_and_Time) != null){
                htmlReplace = htmlReplace.replace('{!Interview__c.Interview_Date_and_Time__c}',String.ValueOf(Interview_Date_and_Time))+'<br/>'; 
            }
            if(htmlReplace != null &&  htmlReplace.containsIgnoreCase('{!Interview__c.Candidate_Phone_number__c}') && Candidate_Phone_number != null){
                htmlReplace = htmlReplace.replace('{!Interview__c.Candidate_Phone_number__c}',Candidate_Phone_number)+'<br/>'; 
            }
            if(htmlReplace != null &&  htmlReplace.containsIgnoreCase('{!Interview__c.Meeting_URL__c}') && Meeting_URL != null){
                htmlReplace = htmlReplace.replace('{!Interview__c.Meeting_URL__c}',Meeting_URL)+'<br/>'; 
            }
            if(htmlReplace != null &&  htmlReplace.containsIgnoreCase('{!Interview__c.Candidate_Refer_Number_Emp__c}') && CandidateReferNumber != null){
                htmlReplace = htmlReplace.replace('{!Interview__c.Candidate_Refer_Number_Emp__c}',CandidateReferNumber)+'<br/>'; 
            }
            
            
            if( folderIdVsTemplateMap.containskey( String.valueof(emailtemp.get('FolderId'))) ){
                EmailTemplates template = new EmailTemplates();
                template.emailTemplateId = String.valueOf(emailtemp.get('Id'));
                template.emailTemplatename = String.valueOf(emailtemp.get('Name'));
                template.emailbody = htmlReplace ;
                template.emailSubject = subjectReplace;
                folderIdVsTemplateMap.get( String.valueof(emailtemp.get('FolderId')) ).emailtemplatelist.add( template );
                
            }else{
                emailTemplateWrapper tempWrap = new emailTemplateWrapper();
                tempWrap.folderId = String.valueOf(emailtemp.get('FolderId'));
                tempWrap.folderName = String.valueOf(emailtemp.get('FolderName'));
                tempWrap.datetimeval =Interviewlist.Interview_Date_and_Time__c;
                emailTemplates template = new emailTemplates();
                template.emailTemplateId = String.valueOf(emailtemp.get('Id'));
                template.emailTemplatename = String.valueOf(emailtemp.get('Name'));
                template.emailbody = htmlReplace ;
                template.emailSubject = subjectReplace;
                tempWrap.emailtemplatelist = new list<emailTemplates>{ template };
                    folderIdVsTemplateMap.put( String.valueof(emailtemp.get('FolderId'))  , tempWrap );
            }   
        }
        
        if( !folderIdVsTemplateMap.isEmpty() ){
            emailTemplateWrapperlist.addAll( folderIdVsTemplateMap.values() );
            
            return emailTemplateWrapperlist;
        }
        return null;
    }
    
    public class emailTemplateWrapper{
        
        @AuraEnabled 
        public String folderName{get;set;}
        
        @AuraEnabled 
        public String folderId{get;set;}
        
        @AuraEnabled
        public datetime datetimeval{get;set;}
        
        @AuraEnabled
        public list<emailTemplates> emailtemplatelist{get;set;}
        
    }
    
    public class emailTemplates{
        
        @AuraEnabled 
        public String emailTemplateId{get;set;}
        
        @AuraEnabled 
        public String emailbody{get;set;}
        
        @AuraEnabled
        public String emailSubject {get;set;}
        
        @AuraEnabled 
        public String emailTemplatename{get;set;}
        
        
    }
    
}