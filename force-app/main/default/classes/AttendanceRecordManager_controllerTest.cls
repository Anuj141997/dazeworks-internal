@isTest
public class AttendanceRecordManager_controllerTest {
@IsTest
    public static void AttendanceRecordManagerMethod(){
        Test.startTest();
        Date d = date.newInstance(2020, 08, 26);
        Date e = date.newInstance(2020, 09, 05).addDays(5);
        AttendanceRecordManager_controller.createAttendanceRecord(d,e);
        Test.stopTest();
    }
}