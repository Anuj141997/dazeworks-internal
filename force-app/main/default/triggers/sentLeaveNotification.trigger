trigger sentLeaveNotification on Leave__c (after update) {
    List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
    Id devRecordTypeId = Schema.SObjectType.Leave__c.getRecordTypeInfosByName().get('Leaves').getRecordTypeId();
    System.debug('sfcgvhbj====>'+devRecordTypeId);
    for(Leave__c lv: Trigger.new ){
        if(lv.RecordTypeId==devRecordTypeId){
            if(lv.Send_Notification__c == true){ 
                
                List<Leave__c> lvList =[Select Id, Send_Notification__c ,Employee__c from Leave__c where Id =:lv.Id];
                
                List<Employee_Session__c> empSession = [Select id, Employee__c from Employee_Session__c where id =: lvList[0].Employee__c];
                
                List<Contact> conList = [Select Id, Name, Email, ReportsToId,Employee_Id__c From Contact where id =: empSession[0].Employee__c];
                
                List<Contact> mngrId = [Select Id, Name,FirstName, LastName, Email From Contact Where Id =: conList[0].ReportsToId];
                string paramvalue = EncodingUtil.base64Encode(Blob.valueOf(conList[0].Employee_Id__c));
                System.debug('encode : ' + paramvalue);  
                String baseURL = 'https://dazeworks.force.com/s/leaveapprove?c__DwPort='+paramvalue; 
                
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage(); 
                List<String> sendTo = new List<String>(); 
                sendTo.add(String.valueOf(mngrId[0].Email));
                mail.setToAddresses(sendTo); 
                mail.setSubject('Leave Approval Request');
                String body = 'Dear '+ mngrId[0].Name +',</b><br><br>Please approve the Leave : '+baseUrl +'<br><br> Thank You';
                
                mail.setHtmlBody(body);
                mails.add(mail);
                Messaging.sendEmail(mails);
            }
            
        }
        if(Trigger.oldMap.get(lv.Id).Manager_Approval_Status__c != lv.Manager_Approval_Status__c &&(lv.Manager_Approval_Status__c=='Approved'||lv.Manager_Approval_Status__c=='Reject')){
            List<Leave__c> lvList =[Select Id, Send_Notification__c,Manager_Approval_Status__c ,Employee__c from Leave__c where Id =:lv.Id];
            
            List<Employee_Session__c> empSession = [Select id, Employee__c from Employee_Session__c where id =: lvList[0].Employee__c];
            
            List<Contact> conList = [Select Id, Name, Email, ReportsToId,Employee_Id__c From Contact where id =: empSession[0].Employee__c];
            String emId = string.valueOf(conList[0].Employee_Id__c);
            
            List<Contact> mngrCon = [Select id, Name, Email From Contact Where Id =:conList[0].ReportsToId ];
            //LeavePortal.sendEmailToEmployee(conList[0].Email,lv.Manager_Approval_Status__c,conList[0].Name);
            LeavePortal.sendEmailToEmployee(mngrCon[0].Email,lv.Manager_Approval_Status__c,lv.Id,emId);
        }
    }
}