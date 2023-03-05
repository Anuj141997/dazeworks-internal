global class schedulableAttendanceTracker implements Schedulable{
    global void execute(SchedulableContext ctx){
        Date dateofAttendance = system.today();
        List<Employee_Session__c> employeSessionList = [Select Id, Name, Active_Employee__c, Current_Session__c, (Select Id,Till__c,Half_Day__c, From__c, Leave_Type__c from Leaves__r where Till__c >=: dateofAttendance and From__c <=:dateofAttendance ) from Employee_Session__c where 
                                                        Active_Employee__c = true and  Current_Session__c = true and doj__c <=: dateofAttendance];
        system.debug('employeSessionList'+ employeSessionList);
        
        List<Attendance__c> AttendanceRecordList = new List<Attendance__c>();
        
        
        for(Employee_Session__c empSession : employeSessionList){
            String LeaveType;
            list<Leave__c> lstLeaveRecord = new list<Leave__c>();
            Attendance__c attendRecord = new Attendance__c();
            
            if (!empSession.Leaves__r.isEmpty()){
                lstLeaveRecord = empSession.Leaves__r;
                if(lstLeaveRecord[0].Leave_Type__c == 'Leave without Pay'){
                    if(lstLeaveRecord[0].Half_Day__c){
                        LeaveType = 'Half Day';
                    }      
                    else{
                        LeaveType = 'LOP';
                    }
                    attendRecord.Leave__c = lstLeaveRecord[0].Id;
                }
                else if(lstLeaveRecord[0].Leave_Type__c == 'Leave'){
                    if(lstLeaveRecord[0].Half_Day__c){
                        LeaveType = 'Half Day';
                    }      
                    else{
                        LeaveType = 'Leave';
                    }
                    attendRecord.Leave__c = lstLeaveRecord[0].Id;
                }
                else if(lstLeaveRecord[0].Leave_Type__c == 'WFH'){
                    if(lstLeaveRecord[0].Half_Day__c){
                        LeaveType = 'Half Day';
                        attendRecord.Leave__c = lstLeaveRecord[0].Id;
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