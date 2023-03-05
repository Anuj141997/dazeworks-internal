({
    showToast : function(component, event, helper, title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type
        });
        toastEvent.fire();
    },
   
    getValuesOnInit : function(component, event, helper) {
        var intId = helper.getJsonFromUrl().intId;
        var empId = helper.getJsonFromUrl().empId;
        component.set('v.interviewId', intId);
        component.set('v.empId', empId);
    },
    
    getJsonFromUrl : function () {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    },
    
    interviweeJoined : function(component, event, helper){
        
      
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        var isFieldsRequired = component.get('v.isFieldRequired');
        console.log('req : '+isFieldsRequired);
        
        var Comm_Skill = component.get('v.technicalFeedback.Comm_Skill__c').toString();
        component.set('v.technicalFeedback.Comm_Skill__c', Comm_Skill);
        
        var Attitude = component.get('v.technicalFeedback.Attitude__c').toString();
        component.set('v.technicalFeedback.Attitude__c', Attitude);
        
        var Motivation = component.get('v.technicalFeedback.Motivation__c').toString();
        component.set('v.technicalFeedback.Motivation__c', Motivation);
        
        var Flexibility = component.get('v.technicalFeedback.Flexibility__c').toString();
        component.set('v.technicalFeedback.Flexibility__c', Flexibility);
        
        var Management = component.get('v.technicalFeedback.Management__c').toString();
        component.set('v.technicalFeedback.Management__c', Management);
        
        var Project_Lead = component.get('v.technicalFeedback.Project_Lead__c').toString();
        component.set('v.technicalFeedback.Project_Lead__c', Project_Lead);
        
        var overAll = component.get('v.technicalFeedback.Overall_on_10__c').toString();
        component.set('v.technicalFeedback.Overall_on_10__c', overAll);
        
        
        var inputField = component.find('inputField');
        var value = inputField.get('v.value');
        if(value== 'undefined' || value == "" || value == null) {
            inputField.set('v.validity', {valid:false, badInput :true});
            inputField.showHelpMessageIfInvalid();
        }else{
            
            var action = component.get("c.updateInterviewRating");
            action.setParams({
                interviewId : component.get('v.interviewId'),
                employeeId : component.get('v.empId'),
                inter : component.get('v.technicalFeedback'),
                isJoined : component.get('v.intervieweeDidntJoin')
            });
            
            action.setCallback(this, function(response){
                var responseVal = response.getReturnValue();
                var state = response.getState();
                if(state === "SUCCESS"){
                    if(responseVal){
                        helper.showToast(component, event, helper, "Success!", "Interview feedback has been submitted successfully.", "success");
                    }else{
                        helper.showToast(component, event, helper, "Error!", "Employee Id/ Professional Consultant Id entered doesn't match with the records.", "error");
                    }
                    component.set('v.interviewId', null);
                    component.set('v.empId', null);
                    component.set('v.technicalFeedback.Comm_Skill__c', '0');
                    component.set('v.technicalFeedback.Attitude__c', '0');
                    component.set('v.technicalFeedback.Motivation__c', '0');
                    component.set('v.technicalFeedback.Flexibility__c', '0');
                    component.set('v.technicalFeedback.Management__c', '0');
                    component.set('v.technicalFeedback.Project_Lead__c', '0');
                    component.set('v.technicalFeedback.Overall_on_10__c', '0');
                    component.set('v.technicalFeedback.Comments__c', null);
                    component.set('v.technicalFeedback.Comm Skill_Remarks__c', null);
                    component.set('v.technicalFeedback.Attitude_Remarks__c', null);
                    component.set('v.technicalFeedback.Motivation_Remarks__c', null);
                    component.set('v.technicalFeedback.Flexibility_Remarks__c', null);
                    component.set('v.technicalFeedback.Management_Remarks__c', null);
                    component.set('v.technicalFeedback.Project_Lead_Remarks__c', null);
                   
                }else{
                    console.log(response.getState());
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    interviweeNotJoined : function(component, event, helper){
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        
        var action = component.get("c.updateInterviewRecord");
        action.setParams({
            interviewId : component.get('v.interviewId'),
            employeeId : component.get('v.empId'),
            isJoined : component.get('v.intervieweeDidntJoin')
        });
        
        action.setCallback(this, function(response){
            var responseVal = response.getReturnValue();
            console.log(responseVal);
            var state = response.getState();
            if(state === "SUCCESS"){
                if(responseVal){
                    helper.showToast(component, event, helper, "Success!", "Interview has been Rescheduled.", "success");
                }else{
                    helper.showToast(component, event, helper, "Error!", "Employee Id/ Professional Consultant Id entered doesn't match with the records.", "error");
                }
                component.set('v.interviewId', null);
                component.set('v.empId', null);
            }else{
                console.log("error");
            }
        });
        $A.enqueueAction(action);
    }
    
})