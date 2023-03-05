@isTest
public class CaseTriggerHandlerTest {
	
    // creates the data for test methods
	@testSetup static void setup() {

        // Create common test accounts
        list<Account> testAccts = new list<Account>();
        for(Integer i=0;i<2;i++) {
            testAccts.add(new Account(Name = 'TestAcct'+i));
        }
        insert testAccts;									
        
        // Creates a common test contact
        list<Contact> testContact = new list<Contact>();
        Integer i = 0;
        for(Account objAccount : testAccts) {
			contact objContact = new contact();
			objContact.Account = testAccts[0];
        	objContact.Email = 'test@email'+i+'.com';
        	objContact.FirstName = 'Test First';
        	objContact.LastName = 'Test Last';
            testContact.add(objContact);
            i++;
        }
        insert testContact;

        // Creates a common test Project
        list<Project__c> lstProject = new list<Project__c>();
        for (Account objAccount : testAccts) {
        	Project__c objProject = new Project__c();
        	objProject.Customer_Name__c = objAccount.Id;
        	objProject.Name = 'Test Project';
        	objProject.Active__c = True;
			objProject.Project_Stage__c = 'Not Started';
			objProject.Project_Manager__c = testContact[0].Id;
        	objProject.Color__c = 'Green';
            lstProject.add(objProject);
        }
        insert lstProject;
            
    }

    // Checks the Case Email has been sent or not to Project Manager
    static testMethod void caseWithProjectTest () {
    	
        list<Case> lstCase = new list<Case>();
        for (Project__c objProject : [SELECT Id FROM Project__c]) {
        	case objCase = new case();
        	objCase.Project__c = objProject.Id;
        	objCase.Subject = 'Test';
        	objCase.Description = 'Test';
        	objCase.Priority = 'Medium';
        	objCase.RecordTypeId =
            	Schema.SObjectType.case.getRecordTypeInfosByName().get('Customer Tickets').getRecordTypeId();
         	lstCase.add(objCase);
        }

        insert lstCase;
        
        Integer beforeInvocations = Limits.getEmailInvocations();
        System.assertEquals(1,beforeInvocations,'email sent');

    }

    // Checks the Email has been sent or not to Case Accounts realated Project(Project Manager)
    static testMethod void caseWithOutProjectTest () {
        list<Case> lstCase = new list<Case>();
        list<Account> lstAccount = [SELECT Id FROM Account];
        for (Contact objContact : [SELECT Id FROM Contact]) {
        	case objCase = new case();
        	objCase.ContactId = objContact.Id;
            objCase.AccountId = lstAccount[0].id;
        	objCase.Subject = 'Test';
        	objCase.Description = 'Test';
        	objCase.Priority = 'Medium';
        	objCase.RecordTypeId =
            	Schema.SObjectType.case.getRecordTypeInfosByName().get('Customer Tickets').getRecordTypeId();
         	lstCase.add(objCase);
        }
        insert lstCase;
        
        Integer beforeInvocations = Limits.getEmailInvocations();
        System.assertEquals(1,beforeInvocations,'email sent');

    }

    // Checks the nO Email has been sent when Case is created with no Accounts and Project
    static testMethod void caseWithProjectAndAccountTest() {
    	
        	case objCase = new case();
        	objCase.Subject = 'Test';
        	objCase.Description = 'Test';
        	objCase.Priority = 'Medium';
        	objCase.RecordTypeId =
            	Schema.SObjectType.case.getRecordTypeInfosByName().get('Customer Tickets').getRecordTypeId();
        insert objCase;
        
      Integer beforeInvocations = Limits.getEmailInvocations();
      System.assertEquals(0,beforeInvocations,'no email sent');

    }
}