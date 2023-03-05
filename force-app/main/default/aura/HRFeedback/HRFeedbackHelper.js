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
    
    intervieweeJoined : function(component, event, helper){
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        var isFieldsRequired = component.get('v.isFieldRequired');
        
        var language = component.get('v.hrFeedback.Language__c').toString();
        component.set('v.hrFeedback.Language__c', language);
        
        var attitude = component.get('v.hrFeedback.Attitude__c').toString();
        component.set('v.hrFeedback.Attitude__c', attitude);
        
        var communication = component.get('v.hrFeedback.Communication__c').toString();
        component.set('v.hrFeedback.Communication__c', communication);
        
        var listeningSkills = component.get('v.hrFeedback.Listening_skills__c').toString();
        component.set('v.hrFeedback.Listening_skills__c', listeningSkills);
        
        var presentationSkills = component.get('v.hrFeedback.Presentation_skills__c').toString();
        component.set('v.hrFeedback.Presentation_skills__c', presentationSkills);
        
        var techSkills = component.get('v.hrFeedback.Technical_skills__c').toString();
        component.set('v.hrFeedback.Technical_skills__c', techSkills);
        
        var overAll = component.get('v.hrFeedback.Overall_on_10__c').toString();
        component.set('v.hrFeedback.Overall_on_10__c', overAll);
        console.log(typeof(component.get('v.hrFeedback.Language__c')));
        
        var inputField = component.find('inputField');
        var value = inputField.get('v.value');
        if(value== 'undefined' || value == "" || value == null) {
            inputField.set('v.validity', {valid:false, badInput :true});
            inputField.showHelpMessageIfInvalid();
        }else{
        
        
            var action = component.get("c.updateHRFeedback");
            action.setParams({
                interviewId : component.get('v.interviewId'),
                employeeId : component.get('v.empId'),
                intRec : component.get('v.hrFeedback'),
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
                    component.set('v.hrFeedback.Attitude__c', '0');
                    component.set('v.hrFeedback.Communication__c', '0');
                    component.set('v.hrFeedback.Language__c', '0');
                    component.set('v.hrFeedback.Listening_skills__c', '0');
                    component.set('v.hrFeedback.Technical_skills__c', '0');
                    component.set('v.hrFeedback.Presentation_skills__c', '0');
                    component.set('v.hrFeedback.Overall_on_10__c', '0');
                    component.set('v.hrFeedback.Comments1__c', null);
                }else{
                    console.log("error");
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    intervieweeNotJoined : function(component, event, helper){
        var action = component.get("c.updateInterviewRecord");
        action.setParams({
            interviewId : component.get('v.interviewId'),
            employeeId : component.get('v.empId'),
            isJoined : component.get('v.intervieweeDidntJoin')
        });
        
        action.setCallback(this, function(response){
            var responseVal = response.getReturnValue();
            var state = response.getState();
            if(state === "SUCCESS"){
                if(responseVal){
                    helper.showToast(component, event, helper, "Success!", "Interview has been Rescheduled.", "success");
                }else{
                    helper.showToast(component, event, helper, "Error!", "Employee Id/ Professional Consultant Id entered doesn't match with the records.", "error");
                }
                component.set('v.interviewId', null);
                component.set('v.empId', null);
            }
        });
        $A.enqueueAction(action);
    }
})