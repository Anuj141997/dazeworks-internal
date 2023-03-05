public class CaseTriggerHandler {
    
    // sortCase function is used to record which has project associated with it and the it send the record accordingly  
	Public static void SortCase (list<Case> lstCase) {
        map<Id, Case> mapCaseWithProject = new map<Id, Case>();
        map<Id, Case> mapCaseWithOutProject = new map<Id, Case>();
        list<Id> lstProject = new list<Id>();
        list<Id> lstAccountId = new list<Id>();
        
        // for loop is used to sort the record which have project record associated with or not.
        for (Case objcase : lstCase) {

            // checks that case record is associated with project or not.
            if (objCase.Project__c != null) {
                mapCaseWithProject.put(objCase.Id, objCase);
                lstProject.add(objCase.Project__c);
            } else {
                if (objCase.AccountId != null) {
                	mapCaseWithOutProject.put(objCase.AccountId, objCase);
                	lstAccountId.add(objCase.AccountId);
                }
            }   
        }
        
        // checks that map has records or not then it calls the another function 'caseWithProject'.
        if (!mapCaseWithProject.isEmpty()) {
        	caseWithProject(mapCaseWithProject,lstProject);   
        }

        // checks that map has records or not then it calls the another function 'caseWithProject'.
        if (!mapCaseWithOutProject.isEmpty()) {
            caseWithOutProject(mapCaseWithOutProject, lstAccountId);
        }
    }

    // caseWithProject checks the project record in ORG and creates the list to send the email to project manager with case details
    Public static void caseWithProject (map<Id, Case> mapCaseWithProject, list<Id> lstProject) {

		// mapOfCaseId_EmailWithProject map store the case object with email address on which we are sending email.
    	Map<case,String> mapOfCaseId_EmailWithProject = new Map<Case,String>();

        Map<Id, Project__c>  mapOfProject = new Map<Id, Project__c>([SELECT Id, 
                                         	                			Project_Manager__c,
                                         								Project_Manager__r.Email 
                                        							FROM Project__c
                                        							WHERE Id In : lstProject]);
        for (Case objcase : mapCaseWithProject.values()) {
        	mapOfCaseId_EmailWithProject.put(objcase, mapOfProject.get(objcase.Project__c).Project_Manager__r.Email);
        }

		// calling sendCaseEmail function to send email to project manager. 
        sendCaseEmail(null, mapOfCaseId_EmailWithProject);
    }

	// caseWithOutProject checks the project record in ORG using accountId and 
	// creates the list to send the email to project manager with case details
    Public static void caseWithOutProject(map<Id, Case> mapCaseWithOutProject, list<Id> lstAccountId) {
        Map<case,Set<String>> mapOfCaseId_Email = new Map<Case,Set<String>>();
        Map<Id, Project__c>  mapOfProject = new Map<Id, Project__c> ([SELECT Id,
																			Customer_Name__c,
																			Project_Manager__c,
																			Project_Manager__r.Email
																	FROM Project__c 
																	WHERE Customer_Name__c IN :lstAccountId]);

		// for loop is used to create a map of case with list of email address.
        for (Project__c objProject : mapOfProject.values()) {
        	if (!mapOfCaseId_Email.containsKey(mapCaseWithOutProject.get(objProject.Customer_Name__c))) {
            	mapOfCaseId_Email.put(mapCaseWithOutProject.get(objProject.Customer_Name__c),
                                      new Set<String>{objProject.Project_Manager__r.Email});
            } else {
            	mapOfCaseId_Email.get(mapCaseWithOutProject.get(objProject.Customer_Name__c)).
                    add(objProject.Project_Manager__r.Email);
            }
        }

		// calling sendCaseEmail function to send email to project manager.
        sendCaseEmail(mapOfCaseId_Email, null);
    }

	// sendCaseEmail function is used to send email to project manager.
    Public static void sendCaseEmail(Map<case,Set<String>> mapOfCaseId_Email,
                                     Map<case,String> mapOfCaseId_EmailWithProject) {
        
        list<Messaging.SingleEmailMessage> mails = new list<Messaging.SingleEmailMessage>();
        Set<case> setOfCase = new Set<case>();
        Map<Id, String> mapOfCase_AccountName = new Map<Id, String>();
        if (mapOfCaseId_Email != null) {
        	if (!mapOfCaseId_Email.isEmpty()) {
                for (case objcase : mapOfCaseId_Email.keyset()) {
            		setOfCase.add(objcase);
                    system.debug('setOfCase '+setOfCase);

            	}
            	for (case objcase : [Select Id, 
                                     		Contact.Account.Name 
                                     FROM Case 
                                     WHERE Id In: mapOfCaseId_Email.keyset()]) {
                    mapOfCase_AccountName.put(objcase.Id, objcase.Contact.Account.Name);
            	}
            }
        } else {
            
        	setOfCase =  mapOfCaseId_EmailWithProject.keyset();
            for (case objcase : [Select Id, 
                                     		Project__r.Customer_Name__r.Name
                                     FROM Case 
                                     WHERE Id In: mapOfCaseId_EmailWithProject.keyset()]) {
                    mapOfCase_AccountName.put(objcase.Id, objcase.Project__r.Customer_Name__r.Name);
            	}
        }                               

    	//Send Email
        for(case objCase : setOfCase) {
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            Set<String> toAddresses=new set<string>();
            if (mapOfCaseId_Email != null) {
            	if (!mapOfCaseId_Email.isEmpty()) {
                    system.debug('objCase '+objCase);
            		for (String strEmail : mapOfCaseId_Email.get(objCase)) {
						toAddresses.add((strEmail));   
            		}
                	message.setToAddresses(new list<string> (toAddresses));
                }
            } else {
               message.setToAddresses(new list<string> (mapOfCaseId_EmailWithProject.values()));
            }
    		
    		message.setSubject('New Case Created : ' +objCase.CaseNumber);   
    		message.setBccSender(false);
    		message.setUseSignature(false);   
    		//message.setPlainTextBody('Your Case: ' + objCase.Id +' has been created.');
    		message.setHtmlBody('You have a case assigned. Use ' + objCase.CaseNumber +' </b> as case reference id.<p> Please find Case details below:<p>'+
     							 'Case Name :'+ objCase.CaseNumber+ '<p> Description:'+objCase.Description +
                                 '<p> Case Priority : '+ objCase.Priority	 + '<p>'+
                                 '<p> Customer Name : '+ mapOfCase_AccountName.get(objCase.Id)  +
                                '.<p> Thank You');
			mails.add(message);
        }
            Messaging.sendEmail(mails);
        }

    }