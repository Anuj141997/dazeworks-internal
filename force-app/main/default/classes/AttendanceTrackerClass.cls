public class AttendanceTrackerClass {
    public static void createAttendanceRecord (Date dateofAttendance){
        Date todaysDate = system.today();
        List<Employee_Session__c> employeSessionList = [Select Id, Name, Active_Employee__c, Current_Session__c, (Select Id,Half_Day__c,Till__c, From__c, Leave_Type__c from Leaves__r where Till__c >=: dateofAttendance and From__c <=:dateofAttendance ) from Employee_Session__c where 
                                                        Active_Employee__c = true and  Current_Session__c = true and doj__c <=: dateofAttendance	];
        system.debug('employeSessionList'+ employeSessionList);
        
        List<Attendance__c> AttendanceRecordList = new List<Attendance__c>();
        
        
        for(Employee_Session__c empSession : employeSessionList){
            String LeaveType;
            Leave__c leaveRecord = new Leave__c();
            Attendance__c attendRecord = new Attendance__c();
            if (!empSession.Leaves__r.isEmpty()){
                leaveRecord = empSession.Leaves__r;
                system.debug('leaveRecord'+ leaveRecord);
                if(leaveRecord.Leave_Type__c == 'Leave without Pay'){
                    if(leaveRecord.Half_Day__c){
                        LeaveType = 'Half Day';
                    }      
                    else
                        LeaveType = 'LOP';
                }
                else if(leaveRecord.Leave_Type__c == 'Leave'){
                    if(leaveRecord.Half_Day__c){
                        LeaveType = 'Half Day';
                    }      
                    else
                        LeaveType = 'Leave';
                }
                else if(leaveRecord.Leave_Type__c == 'WFH'){
                    if(leaveRecord.Half_Day__c){
                        LeaveType = 'Half Day';
                    }      
                    else
                        LeaveType = 'WFH';
                }
            }
            else{
                LeaveType = 'Present';
            }
            attendRecord.Status__c = LeaveType;
            attendRecord.Date__c = dateofAttendance;
            attendRecord.Employee__c = empSession.Id;
            AttendanceRecordList.add(attendRecord); 
            system.debug('attendRecord'+ attendRecord);
            
        }
        system.debug('AttendanceRecordList'+ AttendanceRecordList);
        
        insert AttendanceRecordList;
    } 
}