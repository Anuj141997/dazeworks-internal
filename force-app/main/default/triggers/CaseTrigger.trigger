trigger CaseTrigger on Case (after insert) {

    // checks the trigger is working on after insert.
	if (trigger.isAfter && trigger.isInsert) {

        // list of case record which have customer ticket record type/
        list<Case> lstCase = new list<Case>();

        // caseRecordTypeId stores the id of customer ticket record type.
        String caseRecordTypeId 
            = Schema.SObjectType.case.getRecordTypeInfosByName().get('Customer Tickets').getRecordTypeId();
        
        // checks that new record's record type is Customer ticket and add it in lstCase.
        for (Case objCase : trigger.new) {
            if (caseRecordTypeId ==  objCase.RecordTypeId) {
                lstCase.add(objCase);
            }
        }

        // calls the caseTriggerhandler class and pass the lstCase.
        if (!lstCase.isEmpty()) {
            CaseTriggerHandler.SortCase(lstCase);
        }

    }
}