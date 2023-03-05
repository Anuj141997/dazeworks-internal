@isTest
public with sharing class TaskTrackerTest {
    
    static testMethod void testFetchTaskRecord() {
		List<Case> testtaskList = new list <Case>();
        Case a = new Case ();
       a.Subject = 'test';
        testtaskList.add(a);
        insert testtaskList;
        list<string> l = new List<string>();
        l.add(a.Id);

        Test.startTest();
        TaskTracker.fetchTaskRecord();
        TaskTracker.updateMultipleTaskRecord(l);
        TaskTracker.deleteTasks(l);
        Test.stopTest();
        
        
    }
}