@isTest
public class TotalUtilisationUpdateTriggerTest {
    public static String CRON_EXP = '0 0 0 15 3 ? 2022';
    @isTest
    public static void testFactory(){
        
        Contact c = new Contact();
        c.LastName = 'LastNameOfContact';
        c.CurrencyIsoCode = 'USD';
        c.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        insert c;
        
        Resource__c resource = new Resource__c();
        resource.Resource_Name__c=c.Id;
        resource.Role__c = 'Architect';
        insert resource;
        
        Project__c project = new Project__c();
        project.Name = 'test';
        project.Color__c = 'green';
        project.Type__c = 'T&M';
        project.Fixed_Billing__c = null;
        insert project;
        
        Allocation__c allocation1 = new Allocation__c();
        allocation1.Start_Date__c = Date.newInstance(2019, 08, 20);
        allocation1.End_Date__c = Date.newInstance(2019, 08, 30);
        allocation1.Utilisation__c = 20;
        allocation1.Resource__c = resource.Id;
        allocation1.Project__c = project.Id;
        insert allocation1;
        
        Resource__c recordResource1 = [Select Id, Total_Current_Utilisation__c From Resource__c Where Id=:resource.Id];
        
        Allocation__c allocation2 = new Allocation__c();
        allocation2.Start_Date__c = Date.newInstance(2019, 08, 20);
        allocation2.End_Date__c = Date.newInstance(2019, 08, 24);
        allocation2.Utilisation__c = 10;
        allocation2.Resource__c = resource.Id;
        allocation2.Project__c = project.Id;
        insert allocation2;
        
        
        
        Resource__c recordResource2 = [Select Id, Total_Current_Utilisation__c From Resource__c Where Id=:resource.Id];
        
        allocation1.Utilisation__c = 30;
        allocation2.End_Date__c = Date.newInstance(2019, 08, 28);
        update allocation1;
        update allocation2;
        
        Resource__c recordResource3 = [Select Id, Total_Current_Utilisation__c From Resource__c Where Id=:resource.Id];
        
        delete allocation1;
        delete allocation2;
        
        Resource__c recordResource4 = [Select Id, Total_Current_Utilisation__c From Resource__c Where Id=:resource.Id];
        String jobId = System.schedule('ScheduledApexTest',
                                       CRON_EXP ,
                                       new resourceUpdateScheduler());
        // Get the information from the CronTrigger API object
        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, 
                          NextFireTime
                          FROM CronTrigger WHERE id = :jobId];
        
        // Verify the expressions are the same
        System.assertEquals(CRON_EXP,ct.CronExpression);
        
        // Verify the job has not run
        System.assertEquals(0, ct.TimesTriggered);
        
        updateResourceTemp.updateResourceTempMethod();
    }
    
    @isTest
    public static void updateAllocatedProjectTests(){
        Contact c1 = new Contact();
        c1.Active__c = true;
        c1.LastName = 'Test';
        c1.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        insert c1;
        
        Contact c2 = new Contact();
        c2.Active__c = true;
        c2.LastName = 'Test1';
        c2.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Employee').getRecordTypeId();
        insert c2;
        
        Project__c project1 = new Project__c();
        project1.Name = 'test1';
        project1.Color__c = 'gold';
        project1.Fixed_Billing__c = null;
        insert project1;
        
        Resource__c resource1 = new Resource__c();
        resource1.Resource_Name__c=c1.Id;
        resource1.Role__c = 'Architect';
        resource1.Active__c = true;
        resource1.Projects_Aligned__c = 'Project1';
        insert resource1;
        
        Resource__c resource2 = new Resource__c();
        resource2.Resource_Name__c=c2.Id;
        resource2.Role__c = 'Architect';
        resource2.Active__c = true;
        resource2.Projects_Aligned__c = null;
        insert resource2;
        
        Allocation__c allocation3 = new Allocation__c();
        allocation3.Start_Date__c = Date.today();
        allocation3.End_Date__c = Date.today().addDays(1);
        allocation3.Utilisation__c = 10;
        allocation3.Resource__c = resource1.Id;
        allocation3.Project__c = project1.Id;
        insert allocation3;
        System.debug(allocation3);
        
        Allocation__c alloc = [SELECT Id, Name, resource__c, In_this_month__c FROM Allocation__c WHERE Project__c =: project1.Id];
        System.debug(alloc);
        
        allocation3.Utilisation__c = 20;
        update allocation3;
        
        List<Resource__c> res1 = [Select Id, Resource_Name__c, Projects_Aligned__c, (SELECT Project__r.Name, Utilisation__c FROM Allocations__r
                                                                                     WHERE In_this_month__c = True) FROM Resource__c  Where Id=:resource1.Id];
        System.debug(res1);
        
        
        Allocation__c allocation4 = new Allocation__c();
        allocation4.Start_Date__c = Date.today();
        allocation4.End_Date__c = Date.today().addDays(1);
        allocation4.Utilisation__c = 10;
        allocation4.Resource__c = resource2.Id;
        allocation4.Project__c = project1.Id;
        insert allocation4;
    }
}