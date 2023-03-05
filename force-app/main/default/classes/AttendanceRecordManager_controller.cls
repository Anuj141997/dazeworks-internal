public class AttendanceRecordManager_controller {
    @AuraEnabled
    public static void createAttendanceRecord(Date startDate, Date endDate){
        system.debug('endDate' + endDate + 'startDate' + startDate);
        Integer size = startDate.daysBetween(endDate);
        List<Date> dateRangeList = new List<Date>();
        for(Integer i=0; i<=size; i++){
            dateRangeList.add(startDate.addDays(i));
        }
        for(Date objDate : dateRangeList){
            
            AttendanceTracker.createAttendanceRecord(objDate);
            
            
        }
    }
}