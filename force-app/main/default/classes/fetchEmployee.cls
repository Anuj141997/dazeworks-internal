public without sharing class fetchEmployee {
   
    @AuraEnabled
    public static Contact getEmployee(String eid)
    {
        Contact c = [Select id,Name,Email,Employee_ID__c from contact where Employee_ID__c =: eid WITH SECURITY_ENFORCED];
        return c;
    }

    @AuraEnabled
    public static Contact getEmployeeDesignation(String id)
    {
        Contact c= [Select id,Name,Title,ReportsToId from contact where Id =: id WITH SECURITY_ENFORCED];
        return c;
    }

    @AuraEnabled
    public static string generateOtp(Contact con){
       
        final integer STRING_LENGTH = 5;

       String otp = String.valueOf(Math.Round(Math.Random() * ((Math.pow(10,STRING_LENGTH) - 1)-Math.pow(10,STRING_LENGTH -1)) + Math.pow(10,STRING_LENGTH -1)));

    list<string> eto=new list<string>();
    eto.add(con.Email);
    Messaging.SingleEmailMessage email=new Messaging.SingleEmailMessage();
    email.setSubject('OTP for Login');
    email.setHtmlbody('Hi '+con.Name+',<br><br><br> To resetting your password, here is your Verification Code: '+otp+'<br><br><br> Thanks' );
    email.setSenderDisplayName('Dazeworks Employee Portal');
    email.setToAddresses(eto);
    List<Messaging.SingleEmailMessage> emailList=new List<Messaging.SingleEmailMEssage>{email};
    
   
    try{            
        
        Messaging.sendEmail(emailList);
                       
    }catch(Exception ex){
        throw new System.EmailException(ex.getMessage());
   }  

       return otp;
    }
}