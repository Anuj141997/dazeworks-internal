public class SendColdFeetEmailHandlerClass {
    public static void sendColdFeetEmail(Map<Id, Interview__c> oldIntMap, Map<Id, Interview__c> newIntMap){
        
        EmailTemplate emailTemp = [SELECT Id, Subject, Description, HtmlValue, DeveloperName, Body FROM EmailTemplate 
                                   WHERE Name = 'Cold Feet' LIMIT 1];   
        
        for(Interview__c inter : oldIntMap.Values()){
            Interview__c newInt = newIntMap.get(inter.Id);
            if(!inter.Interviewee_didn_t_join__c){
                if(inter.Interviewee_didn_t_join__c != newInt.Interviewee_didn_t_join__c ){
                    Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
                    message.setTargetObjectId(inter.Candidate_Id__c);
                    message.setUseSignature(false); 
                    message.setBccSender(false); 
                    message.setSaveAsActivity(false); 
                    message.setWhatId(inter.Id);
                    message.setTemplateID(emailTemp.Id);
                    message.toAddresses = new String[] { inter.Candidate_Email__c};
                        System.debug('toAddresses '+message.toAddresses);
                    Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
                        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
                    System.debug('results '+results);
                    if (results[0].success) 
                    {
                        System.debug('The email was sent successfully.');
                    } else {
                        System.debug('The email failed to send: ' +  results[0].errors[0].message);
                    }
                }
            } 
        }
    }
}