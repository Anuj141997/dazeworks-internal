public without sharing class interviewManagement {
    @AuraEnabled(cacheable=true)
    public static List<interviewWrapper> getInterviewList(String recId,String level,String name,String filterFromDate,String filterTillDate){
        List<interviewWrapper> wrapList = new List<interviewWrapper>();
        String empId1='\'' + String.escapeSingleQuotes(recId) + '\'';
        String query='SELECT Id,Name,Language_on_10__c,Technical_on_10__c,Average_of_Rating__c,Aura_Components__c,Lightning_Remarks__c,'+
            'Java_Script__c,JavaScript_Remarks__c,Visualforce__c,Visualforce_Remarks__c,SQL__c,SQL_Remarks__c,Admin__c,Admin_Remarks__c,'+
            'Apex__c,Apex_Remarks__c, Integration__c,Integration_Remarks__c,LWC__c,LWC_Remarks__c,MuleSoft__c,MuleSoft_Remarks__c,'+
            'Velocity_CPQ__c,Velocity_CPQ_Remarks__c,Comm_Skill__c,Comm_Skill_Remarks__c,Motivation__c,Motivation_Remarks__c,Management__c,'+
            'Management_Remarks__c,Attitude__c,Attitude_Remarks__c,Flexibility__c,Flexibility_Remarks__c,Project_Lead__c,'+
            'Project_Lead_Remarks__c,Candidate_Email__c,Candidate_Phone_number__c,Interview_Status__c,Interview_Date_and_Time__c,Comments1__c,'+
            'Comments__c,Comments2__c,Application__c,Interview_Round_Number__c,Interviewer__r.Name,Cross_Browser_Testing__c,'+
            'Regression_Testing__c,Functional_Testing__c,Smoke_Testing__c,Load_Testing_Data_Loader_or_Jmeter__c,Tosca_Provar__c,'+
            'Performance_Testing__c,Test_Rail__c,Interviewer__r.Employee_Id__c,Interviewer__r.Professional_Consultant_Id__c,Interviewee__c,'+
            'Next_Step__c,Overall_on_10__c,Application__r.Name,Application__r.Position_Name__c,Application__r.Interview_Round__c,'+
            'Suitable_for_which_Role__c,Employee_Id__c,Feedback_Submitted__c,Interviewee_didn_t_join__c FROM Interview__c where Interviewer__c='+empId1;
        //where Interviewer__r.Employee_Id__c=:empId OR Interviewer__r.Professional_Consultant_Id__c=:empId
        if(level!= null && level!=''){
            String filLevel='\'' + String.escapeSingleQuotes(level) + '\'';
            query = query + ' AND Interview_Round_Number__c='+filLevel;
            if(name!=null && name!=''){
                String filName='\'%' + String.escapeSingleQuotes(name) + '%\'';
                query = query + ' AND Interviewee__c LIKE '+filName;
            }
            if(filterFromDate!=null && filterFromDate!=''){
                String filFromDate = filterFromDate+'T00:00:00.000+0000';
                query = query + ' AND Interview_Date_and_Time__c > '+filFromDate;
            }
            if(filterTillDate!=null && filterTillDate!=''){
                String filTillDate = filterTillDate+'T00:00:00.000+0000';
                query = query + ' AND Interview_Date_and_Time__c < '+filTillDate;
            }
        }
        else if(name!=null && name!=''){
            String filName='\'%' + String.escapeSingleQuotes(name) + '%\'';
            query = query + ' AND Interviewee__c LIKE '+filName;
            if(filterFromDate!=null && filterFromDate!=''){
                String filFromDate = filterFromDate+'T00:00:00.000+0000';
                query = query + ' AND Interview_Date_and_Time__c > '+filFromDate;
            }
            if(filterTillDate!=null && filterTillDate!=''){
                String filTillDate = filterTillDate+'T00:00:00.000+0000';
                query = query + ' AND Interview_Date_and_Time__c < '+filTillDate;
            }
        }
        else if(filterFromDate!=null && filterFromDate!=''){
            String filFromDate = filterFromDate+'T00:00:00.000+0000';
            query = query + ' AND Interview_Date_and_Time__c > '+filFromDate;
            
            if(filterTillDate!=null && filterTillDate!=''){
                String filTillDate = filterTillDate+'T00:00:00.000+0000';
                query = query + ' AND Interview_Date_and_Time__c < '+filTillDate;
            }
        }
        else if(filterTillDate!=null && filterTillDate!=''){
            String filTillDate = filterTillDate+'T00:00:00.000+0000';
            query = query + ' AND Interview_Date_and_Time__c < '+filTillDate;
        }
        
        query = query + ' ORDER BY Interview_Round_Number__c ASC';
        system.debug(query);
        List<Interview__c> intvwList = Database.query(query);
        if(intvwList.size()>0){
            for(Interview__c i:intvwList){
                interviewWrapper wrap = new interviewWrapper();
                wrap.Id = i.Id;
                DateTime d = i.Interview_Date_and_Time__c;
                String dt ='';
                dt =d.format('yyyy/MM/dd hh:mm:ss');
                wrap.intTime = dt;
                wrap.button = 'utility:chevronright';
                wrap.interviewer = i.Interviewer__r.Name;
                wrap.application = i.Application__r.Name;
                wrap.position = i.Application__r.Position_Name__c;
                wrap.content = false;
                wrap.intObj = i;
                wrapList.add(wrap);
            }
        }
        return wrapList;
    }
    @AuraEnabled
    public static List<interviewWrapper> updateInterviewList(String recId,List<interviewWrapper> intList){
        for(interviewWrapper i: intList){
            if(i.Id == recId){
                if(i.button == 'utility:chevronright'){
                    i.button = 'utility:chevrondown';
                }
                else{
                    i.button ='utility:chevronright';
                }
                if(i.content == false){
                    i.content = true;
                }
                else{
                    i.content = false;
                }
            }
            else{
                i.button ='utility:chevronright';
                i.content = false;
            }
        }
        return intList;
    }
    @AuraEnabled
    public static Boolean updateInterviewOnSubmit(interviewWrapper iObj,String ratingName){
        Interview__c i=[SELECT Id,Name,Language_on_10__c,Technical_on_10__c,Average_of_Rating__c,Aura_Components__c,Lightning_Remarks__c,
                        Java_Script__c,JavaScript_Remarks__c,Visualforce__c,Visualforce_Remarks__c,SQL__c,SQL_Remarks__c,Admin__c,
                        Admin_Remarks__c,Apex__c,Apex_Remarks__c, Integration__c,Integration_Remarks__c,LWC__c,LWC_Remarks__c,
                        MuleSoft__c,MuleSoft_Remarks__c,Velocity_CPQ__c,Velocity_CPQ_Remarks__c,Comm_Skill__c,Comm_Skill_Remarks__c,
                        Motivation__c,Motivation_Remarks__c,Management__c,Management_Remarks__c,Attitude__c,Attitude_Remarks__c,
                        Flexibility__c,Flexibility_Remarks__c,Project_Lead__c,Project_Lead_Remarks__c,Candidate_Email__c,
                        Candidate_Phone_number__c,Interview_Status__c,Interview_Date_and_Time__c,Comments1__c,Comments__c,Comments2__c,
                        Application__c,Interview_Round_Number__c,Interviewer__r.Name,Cross_Browser_Testing__c,Regression_Testing__c,
                        Functional_Testing__c,Smoke_Testing__c,Load_Testing_Data_Loader_or_Jmeter__c,Tosca_Provar__c,Performance_Testing__c,
                        Test_Rail__c,Interviewer__r.Employee_Id__c,Interviewer__r.Professional_Consultant_Id__c,Interviewee__c,
                        Next_Step__c,Overall_on_10__c,Application__r.Name,Application__r.Position_Name__c,Application__r.Interview_Round__c,
                        Suitable_for_which_Role__c,Employee_Id__c,Feedback_Submitted__c,Interviewee_didn_t_join__c FROM Interview__c WHERE Id=:iObj.intObj.Id];
        if(ratingName=='Technical Initial Feedback'){
            i.Interviewee_didn_t_join__c =iObj.intObj.Interviewee_didn_t_join__c;
            i.Apex__c =iObj.intObj.Apex__c;
            i.Apex_Remarks__c =iObj.intObj.Apex_Remarks__c;
            i.Aura_Components__c =iObj.intObj.Aura_Components__c;
            i.Lightning_Remarks__c =iObj.intObj.Lightning_Remarks__c;
            i.Integration__c =iObj.intObj.Integration__c;
            i.Integration_Remarks__c =iObj.intObj.Integration_Remarks__c;
            i.Java_Script__c =iObj.intObj.Java_Script__c;
            i.JavaScript_Remarks__c =iObj.intObj.JavaScript_Remarks__c;
            i.LWC__c =iObj.intObj.LWC__c;
            i.LWC_Remarks__c =iObj.intObj.LWC_Remarks__c;
            i.Visualforce__c =iObj.intObj.Visualforce__c;
            i.Visualforce_Remarks__c =iObj.intObj.Visualforce_Remarks__c;
            i.MuleSoft__c =iObj.intObj.MuleSoft__c;
            i.MuleSoft_Remarks__c =iObj.intObj.MuleSoft_Remarks__c;
            i.SQL__c =iObj.intObj.SQL__c;
            i.SQL_Remarks__c =iObj.intObj.SQL_Remarks__c;
            i.Velocity_CPQ__c =iObj.intObj.Velocity_CPQ__c;
            i.Velocity_CPQ_Remarks__c =iObj.intObj.Velocity_CPQ_Remarks__c;
            i.Admin__c =iObj.intObj.Admin__c;
            i.Admin_Remarks__c =iObj.intObj.Admin_Remarks__c;
            i.Language_on_10__c =iObj.intObj.Language_on_10__c;
            i.Overall_on_10__c =iObj.intObj.Overall_on_10__c;
            i.Suitable_for_which_Role__c =iObj.intObj.Suitable_for_which_Role__c;
            i.Next_Step__c =iObj.intObj.Next_Step__c;
            i.Comments__c =iObj.intObj.Comments__c;
        }
        if(ratingName=='Feedback'){
            i.Interviewee_didn_t_join__c=iObj.intObj.Interviewee_didn_t_join__c;
            i.Comm_Skill__c =iObj.intObj.Comm_Skill__c;
            i.Comm_Skill_Remarks__c =iObj.intObj.Comm_Skill_Remarks__c;
            i.Attitude__c =iObj.intObj.Attitude__c;
            i.Attitude_Remarks__c =iObj.intObj.Attitude_Remarks__c;
            i.Motivation__c =iObj.intObj.Motivation__c;
            i.Motivation_Remarks__c =iObj.intObj.Motivation_Remarks__c;
            i.Flexibility__c =iObj.intObj.Flexibility__c;
            i.Flexibility_Remarks__c =iObj.intObj.Flexibility_Remarks__c;
            i.Management__c =iObj.intObj.Management__c;
            i.Management_Remarks__c =iObj.intObj.Management_Remarks__c;
            i.Project_Lead__c =iObj.intObj.Project_Lead__c;
            i.Project_Lead_Remarks__c =iObj.intObj.Project_Lead_Remarks__c;
            i.Overall_on_10__c =iObj.intObj.Overall_on_10__c;
            i.Comments__c =iObj.intObj.Comments__c;
        }
        if(ratingName=='QA Ratings'){
            i.Interviewee_didn_t_join__c =iObj.intObj.Interviewee_didn_t_join__c;
            i.Cross_Browser_Testing__c =iObj.intObj.Cross_Browser_Testing__c;
            i.Functional_Testing__c =iObj.intObj.Functional_Testing__c;
            i.Load_Testing_Data_Loader_or_Jmeter__c =iObj.intObj.Load_Testing_Data_Loader_or_Jmeter__c;
            i.Performance_Testing__c =iObj.intObj.Performance_Testing__c;
            i.Regression_Testing__c =iObj.intObj.Regression_Testing__c;
            i.Smoke_Testing__c =iObj.intObj.Smoke_Testing__c;
            i.Test_Rail__c =iObj.intObj.Test_Rail__c;
            i.Tosca_Provar__c =iObj.intObj.Tosca_Provar__c;
            i.Language_on_10__c =iObj.intObj.Language_on_10__c;
            i.Overall_on_10__c =iObj.intObj.Overall_on_10__c;
            i.Comments2__c =iObj.intObj.Comments2__c;
        }
        update i;
        return true;
    }
    public class interviewWrapper{
        @AuraEnabled
        public String Id {get;set;}
        @AuraEnabled
        public String button {get;set;}
        @AuraEnabled
        public String interviewer {get;set;}
        @AuraEnabled
        public String application {get;set;}
        @AuraEnabled
        public String position {get;set;}
        @AuraEnabled
        public Boolean content {get;set;}
        @AuraEnabled
        public String intTime {get;set;}
        @AuraEnabled
        public  Interview__c intObj {get;set;}
    }
}