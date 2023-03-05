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
        
        var language = component.get('v.testingFeedback.Language__c').toString();
        component.set('v.testingFeedback.Language__c', language);
        
        var funTest = component.get('v.testingFeedback.Functional_Testing__c').toString();
        component.set('v.testingFeedback.Functional_Testing__c', funTest);
        
        var crossBTest = component.get('v.testingFeedback.Cross_Browser_Testing__c').toString();
        component.set('v.testingFeedback.Cross_Browser_Testing__c', crossBTest);
        
        var loadTest = component.get('v.testingFeedback.Load_Testing_Data_Loader_or_Jmeter__c').toString();
        component.set('v.testingFeedback.Load_Testing_Data_Loader_or_Jmeter__c', loadTest);
        
        var regTest = component.get('v.testingFeedback.Regression_Testing__c').toString();
        component.set('v.testingFeedback.Regression_Testing__c', regTest);
        
        var smokeTest = component.get('v.testingFeedback.Smoke_Testing__c').toString();
        component.set('v.testingFeedback.Smoke_Testing__c', smokeTest);
        
        var performTest = component.get('v.testingFeedback.Performance_Testing__c').toString();
        component.set('v.testingFeedback.Performance_Testing__c', performTest);
        
        var testRail = component.get('v.testingFeedback.Test_Rail__c').toString();
        component.set('v.testingFeedback.Test_Rail__c', testRail);
        
        var tosca = component.get('v.testingFeedback.Tosca_Provar__c').toString();
        component.set('v.testingFeedback.Tosca_Provar__c', tosca);
        
        var overAll = component.get('v.testingFeedback.Overall_on_10__c').toString();
        component.set('v.testingFeedback.Overall_on_10__c', overAll);
        console.log(typeof(component.get('v.testingFeedback.Language__c')));
        
        var inputField = component.find('inputField');
        var value = inputField.get('v.value');
        if(value== 'undefined' || value == "" || value == null) {
            inputField.set('v.validity', {valid:false, badInput :true});
            inputField.showHelpMessageIfInvalid();
        }else{
            var action = component.get("c.updateTestingFeedback");
            action.setParams({
                interviewId : component.get('v.interviewId'),
                employeeId : component.get('v.empId'),
                intRec : component.get('v.testingFeedback'),
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
                    component.set('v.testingFeedback.Language__c', '0');
                    component.set('v.testingFeedback.Functional_Testing__c', '0');
                    component.set('v.testingFeedback.Regression_Testing__c', '0');
                    component.set('v.testingFeedback.Smoke_Testing__c', '0');
                    component.set('v.testingFeedback.Load_Testing_Data_Loader_or_Jmeter__c', '0');
                    component.set('v.testingFeedback.Performance_Testing__c', '0');
                    component.set('v.testingFeedback.Cross_Browser_Testing__c', '0');
                    component.set('v.testingFeedback.Tosca_Provar__c', '0');
                    component.set('v.testingFeedback.Test_Rail__c', '0');
                    component.set('v.testingFeedback.Overall_on_10__c', '0');
                    component.set('v.testingFeedback.Comments2__c', null);
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