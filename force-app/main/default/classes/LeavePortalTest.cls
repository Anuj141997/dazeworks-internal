@isTest
public class LeavePortalTest {
    @isTest
    static void LeavePortalTestMethod(){
        Account acc= new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Contact con1 = new Contact();
        con1.FirstName='T1';
        con1.LastName ='Test';
        con1.Title='ABCD';
        con1.Company_Email__c='test@test.com';
        con1.Email='abcd@gmail.com';
        con1.AccountId = acc.Id;
        con1.Date_of_Joining__c=system.today();
        con1.Employee_ID__c='DW122';        
        insert con1;
        
        Contact con = new Contact();
        con.FirstName='T1';
        con.LastName ='Test1';
        con.Title='ABCD1';
        con.ReportsToId=con1.Id;
        con.Company_Email__c='test1@test.com';
        con.Email='abcd1@gmail.com';
        con.AccountId = acc.Id;
        con.Date_of_Joining__c=Date.parse('3/22/21');
        con.Probation_Duration__c='90';
        con.Job_Location__c='Remote - India';
        con.Posting_location__c='Kochi';
        con.Permanent__c=true;
        con.Employee_ID__c='DW123';
        con.Active__c =true;
        insert con;
        Employee_Session__c empSes = new Employee_Session__c();
        empSes.Name='Test';
        empSes.Employee__c=con.Id;
        empSes.Optout_For_Leave__c=true;
        empSes.Current_Session__c=true;
        insert empSes;
        Leave__c lvObj =new Leave__c();
        lvObj.Employee__c=empSes.Id;
        lvObj.Leave_Type__c='Leave';
        lvObj.From__c=System.today();
        lvObj.Till__c=System.today();
        lvObj.Type_of_Leave__c='Sick Leave (SL)';
        lvObj.Description__c='leave';
        insert lvObj;
         
        string paramvalue = EncodingUtil.base64Encode(Blob.valueOf(con.Employee_ID__c));
        
        Test.startTest();
        LeavePortal.getPicklist('Leave__c','Leave_Type__c'); 
        LeavePortal.updateLeave(true,false,lvObj.Id);
        LeavePortal.updateLeave(false,true,lvObj.Id);
        //LeavePortal.sendEmailToManager('baseUrl', 'xyz@gmail.com');
        //LeavePortal.sendEmailToEmployee(con.Email,'Approved',lvObj.Id,'DW123');
        //LeavePortal.sendEmailToEmployee(con.Email,'Reject',lvObj.Id,'DW123');
        LeavePortal.submitLeave(Date.parse('12/15/22'),Date.parse('12/16/22'),'fever','DW123',true,'Earned Leave (EL)','first');
        LeavePortal.submitLeave(Date.parse('12/16/22'),Date.parse('12/17/22'),'fever','DW123',true,'Casual Leave (CL)','first');
        LeavePortal.submitLeave(Date.parse('12/17/22'),Date.parse('12/18/22'),'fever','DW123',true,'Sick Leave (SL)','first');
        LeavePortal.submitLeave(Date.parse('12/18/22'),Date.parse('12/19/22'),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        LeavePortal.submitLeave(Date.parse('12/19/22'),Date.parse('12/20/22'),'fever','DW123',true,'Maternity Leave (ML)','first');
        LeavePortal.submitLeave(System.today(),System.today(),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        //LeavePortal.submitLeave(Date.parse('12/20/22'),Date.parse('12/21/22'),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        //LeavePortal.submitLeave(Date.parse('12/21/22'),Date.parse('12/22/22'),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        //LeavePortal.submitLeave(Date.parse('12/22/22'),Date.parse('12/23/22'),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        empSes.Optout_For_Leave__c=false;
        update empSes;
        LeavePortal.submitLeave(Date.parse('12/19/22'),Date.parse('12/20/22'),'fever','DW123',true,'Loss Of Pay (LOP)','first');
        
        LeavePortal.getLeaveDetails('2020-2021', paramvalue, 'Approved', '9', 15, 1, con.Employee_ID__c);
        LeavePortal.getLeaveDetails(null, paramvalue, 'Approved', '9', 15, 1, con.Employee_ID__c);
        LeavePortal.getLeaveDetails('2020-2021', paramvalue, 'Approved', '9', 15, 1, con.Employee_ID__c);
        LeavePortal.getLeaveDetails(null, paramvalue, 'Approved', '9', 15, 1, con.Employee_ID__c);
        LeavePortal.getLeaveDetails(null, paramvalue,null, '9', 15, 1, con.Employee_ID__c);
        LeavePortal.findRecordsforMeetingFeedback('T','Contact');
        Test.stopTest();
    }
    //
}