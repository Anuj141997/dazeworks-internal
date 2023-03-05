global class SchedulableUpdateAttendanceTracker implements Database.Batchable<date>, Database.Stateful {
    
	list<date> lstdate = new list<date>();
    
    global SchedulableUpdateAttendanceTracker(List<date> lstDate) {
    	this.lstdate = lstDate; 
    }

    global Iterable<date> start(Database.BatchableContext bc) {
    	return lstdate;
    }
    global void execute(Database.BatchableContext BC, List<Date> reqDates){
        for(Date objDate : lstdate) {
        	AttendanceTracker.createAttendanceRecord(objDate);    
        }
    }
    
    global void finish(Database.BatchableContext BC)
    {
        System.debug('Finish');
    }    

}