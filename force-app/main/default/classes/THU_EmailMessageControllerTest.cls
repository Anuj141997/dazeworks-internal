@isTest
    public class THU_EmailMessageControllerTest {   
        @isTest
        public static void THU_EmailMessageControllerTestMethod(){
            Id devRecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Candidate').getRecordTypeId();
            list<contact> ltcont= new list<contact>();
            Contact cont= new Contact();
             cont.FirstName='test';
            cont.LastName='example';
            cont.CurrencyIsoCode='USD';
            cont.email='example@gmail.com';
            cont.RecordTypeId= devRecordTypeId;
            insert cont;
            ltcont.add(cont);
            
             
            
            Application__c app = new Application__c();
            app.Candidate__c=cont.Id;
            insert app;
            
            Interview__c intv =new Interview__c();
             String inpputString = '2020-11-05T01:44:00.000Z';
            intv.Interview_Date_and_Time__c= DateTime.ValueofGmt(inpputString.replace('T', ' ')); 
            //intv.Candidate_Refer_Number__c='test';
            intv.Application__c= app.Id;
           
            
            insert intv;
            Messaging.EmailFileAttachment oAttachment = new  Messaging.EmailFileAttachment();
       
            oAttachment.contenttype ='application/pdf';
            oAttachment.filename='Testfilename';
           
            
            
            User thisUser = [select Id from User where Id = :UserInfo.getUserId()]; 
            
            // insert regular objects here 
            System.runAs ( thisUser ) {
                        
        Folder folderObj = new folder();
        string folderName =Label.Email_Folder_Name;
        folderObj= [SELECT Id,Name FROM Folder where Name=:folderName];

            EmailTemplate et  = new EmailTemplate(); 
            et.isActive = true; 
            et.Name = 'testTemplate'; 
            et.DeveloperName = 'testTemplate' + System.now().getTime(); 
            et.TemplateType = 'text'; 
             et.FolderId =folderObj.id;
           //  et.FolderId = UserInfo.getUserId(); 
            et.Body = ''; 
            insert et;
            test.startTest();
         THU_EmailMessageController.sendMailMethod('test@gmail.com','testSub','HiTest',et.FolderId,intv.id,et.id,system.Now(),ltcont,'testfile','testcontent',oAttachment.contenttype);
           THU_EmailMessageController.getEmailTempaltes(intv.Id);
           
                test.stopTest();
            }
            
            
            
            
        }
        
    }