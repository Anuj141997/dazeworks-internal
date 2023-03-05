@isTest
public class interviewManagementTest {
    @isTest
    static void interviewManagementTestMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con = new Contact();
        con.LastName ='Test';
        con.Title='ABCD';
        con.Email='abcd@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=system.today();
        con.Employee_ID__c='DW123';
        con.Active__c= true;
        insert con;
        
        Id CandidateRecordTypeId =Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Candidate').getRecordTypeId();
        
        Contact con_1 = new Contact();
        con_1.LastName ='Test';
        con_1.Title='ABCD';
        con_1.Active__c=true;
        con_1.RecordTypeId=CandidateRecordTypeId;
        con_1.ReportsToId=con.Id;
        con_1.Email='abcde@gmail.com';
        con_1.AccountId = acc.Id;
        con_1.Date_of_Joining__c=system.today();
        con_1.Active__c= true;
        insert con_1;
        
        Position__c p = new Position__c();
        p.Name='Developer Expert';
        p.Department__c='Development';
        p.Active__c = true;
        insert p;
        
        Application__c app = new Application__c();
        app.Candidate__c = con_1.Id;
        app.Position__c =p.Id;
        insert app;
        
        Interview__c inter = new Interview__c();
        inter.Application__c = app.Id;
        inter.Interview_Round_Number__c='L1';
        inter.Interview_Date_and_Time__c= system.now();
        insert inter;
        
        List<interviewManagement.interviewWrapper> wrapList = new List<interviewManagement.interviewWrapper>();
        interviewManagement.interviewWrapper wrap = new interviewManagement.interviewWrapper();
        wrap.Id = inter.Id;
        DateTime d = inter.Interview_Date_and_Time__c;
        String dt ='';
        dt =d.format('yyyy/MM/dd hh:mm:ss');
        wrap.intTime = dt;
        wrap.button = 'utility:chevronright';
        wrap.interviewer = inter.Interviewer__r.Name;
        wrap.application = inter.Application__r.Name;
        wrap.position = inter.Application__r.Position_Name__c;
        wrap.content = false;
        wrap.intObj = inter;
        wrapList.add(wrap);
        
        List<interviewManagement.interviewWrapper> wrapList1 = new List<interviewManagement.interviewWrapper>();
        interviewManagement.interviewWrapper wrap1 = new interviewManagement.interviewWrapper();
        wrap1.Id = inter.Id;
        wrap1.intTime = dt;
        wrap1.button = 'utility:chevrondown';
        wrap1.interviewer = inter.Interviewer__r.Name;
        wrap1.application = inter.Application__r.Name;
        wrap1.position = inter.Application__r.Position_Name__c;
        wrap1.content = true;
        wrap1.intObj = inter;
        wrapList1.add(wrap1);
        interviewManagement.interviewWrapper wrap2 = new interviewManagement.interviewWrapper();
        wrap2.Id = con.Id;
        wrap2.intTime = dt;
        wrap2.button = 'utility:chevrondown';
        wrap2.interviewer = inter.Interviewer__r.Name;
        wrap2.application = inter.Application__r.Name;
        wrap2.position = inter.Application__r.Position_Name__c;
        wrap2.content = true;
        wrap2.intObj = inter;
        wrapList1.add(wrap2);
        
        interviewManagement.getInterviewList(con.Id,'L1','e','2022-09-04','2022-09-10');
        interviewManagement.getInterviewList(con.Id,null,'e','2022-09-04','2022-09-10');
        interviewManagement.getInterviewList(con.Id,null,null,'2022-09-04','2022-09-10');
        interviewManagement.getInterviewList(con.Id,null,null,null,'2022-09-10');
        interviewManagement.getInterviewList(con.Id,null,null,null,null);
        interviewManagement.updateInterviewList(inter.Id,wrapList );
        interviewManagement.updateInterviewList(inter.Id,wrapList1 );
        interviewManagement.updateInterviewOnSubmit(wrap, 'Technical Initial Feedback');
        interviewManagement.updateInterviewOnSubmit(wrap, 'Feedback');
        interviewManagement.updateInterviewOnSubmit(wrap, 'QA Ratings');
    }
}