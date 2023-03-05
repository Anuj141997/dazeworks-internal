public class AttendanceTracker {
    public static void createAttendanceRecord(Date objDate) {

        Date dateofAttendance = objDate;
        list<Attendance__c> AttendanceRecordList = new list<Attendance__c>();

        list<Employee_Session__c> employeSessionList = [SELECT Id,
                                                                Name,
                                                                Current_Session__c,
                                                                (SELECT Id,
                                                                        Till__c,
                                                                        Half_Day__c,
                                                                        From__c,
                                                                        Leave_Type__c
                                                                FROM Leaves__r
                                                                WHERE Till__c >=: dateofAttendance 
                                                                AND From__c <=:dateofAttendance )
                                                                FROM Employee_Session__c
                                                                WHERE Current_Session__c = true 
                                                                AND doj__c <=: dateofAttendance];

        
        
        
        for (Employee_Session__c empSession : employeSessionList) {
            string leaveType;
            list<Leave__c> leaveRecord = new list<Leave__c>();
            Attendance__c attendRecord = new Attendance__c();

            if (!empSession.Leaves__r.isEmpty()) {

                leaveRecord = empSession.Leaves__r;

                if (leaveRecord[0].Leave_Type__c == 'Leave without Pay') {
                    if (leaveRecord[0].Half_Day__c) {
                        leaveType = 'Half Day';
                    }      
                    else {
                        leaveType = 'LOP';
                    }
                    attendRecord.Leave__c = leaveRecord[0].Id;
                }
                else if (leaveRecord[0].Leave_Type__c == 'Leave') {
                    if (leaveRecord[0].Half_Day__c) {
                        leaveType = 'Half Day';
                    }      
                    else {
                        leaveType = 'Leave';
                    }
                    attendRecord.Leave__c = leaveRecord[0].Id;
                }
                else if (leaveRecord[0].Leave_Type__c == 'WFH') {
                    if (leaveRecord[0].Half_Day__c) {
                        leaveType = 'Half Day';
                        attendRecord.Leave__c = leaveRecord[0].Id;
                    }      
                    else
                        leaveType = 'WFH';
                    }
            }
            else {
                leaveType = 'Present';
            }
            attendRecord.Status__c = LeaveType;
            attendRecord.Date__c = dateofAttendance;
            attendRecord.Employee__c = empSession.Id;
            attendRecord.Hasleave__c = true;
            AttendanceRecordList.add(attendRecord); 
            
        }
        
        insert AttendanceRecordList;

    }
}