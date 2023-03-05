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
    
    fetchRolePicklist : function(component){
        var action = component.get("c.getPicklistvalues");
        action.setParams({
            'objectName': component.get("v.objectName"),
            'field_apiname': component.get("v.role"),
            'nullRequired': true
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.rolePicklist", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchNextStepPicklist : function(component){
        var action = component.get("c.getPicklistvalues");
        action.setParams({
            'objectName': component.get("v.objectName"),
            'field_apiname': component.get("v.nextStep"),
            'nullRequired': true
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.nextStepPicklist", response.getReturnValue());
            } 
        });
        $A.enqueueAction(action);
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
        var role = component.find("role").get('v.value');
        console.log(role);
        var nextStep = component.find("next").get('v.value');
        console.log(nextStep);
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        var isFieldsRequired = component.get('v.isFieldRequired');
        console.log('req : '+isFieldsRequired);
        
        var language = component.get('v.technicalFeedback.Language__c').toString();
        component.set('v.technicalFeedback.Language__c', language);
        
        var apex = component.get('v.technicalFeedback.Apex__c').toString();
        component.set('v.technicalFeedback.Apex__c', apex);
        
        var auraCmp = component.get('v.technicalFeedback.Aura_Components__c').toString();
        component.set('v.technicalFeedback.Aura_Components__c', auraCmp);
        
        var integration = component.get('v.technicalFeedback.Integration__c').toString();
        component.set('v.technicalFeedback.Integration__c', integration);
        
        var javaScript = component.get('v.technicalFeedback.Java_Script__c').toString();
        component.set('v.technicalFeedback.Java_Script__c', javaScript);
        
        var lwc = component.get('v.technicalFeedback.LWC__c').toString();
        component.set('v.technicalFeedback.LWC__c', lwc);
        
        var soql = component.get('v.technicalFeedback.SQL__c').toString();
        component.set('v.technicalFeedback.SQL__c', soql);
        
        var admin = component.get('v.technicalFeedback.Admin__c').toString();
        component.set('v.technicalFeedback.Admin__c', admin);
        
        var mulesoft = component.get('v.technicalFeedback.MuleSoft__c').toString();
        component.set('v.technicalFeedback.MuleSoft__c', mulesoft);
        
        var visualforce = component.get('v.technicalFeedback.Visualforce__c').toString();
        component.set('v.technicalFeedback.SQL__c', visualforce);
        
        var velocity = component.get('v.technicalFeedback.Velocity_CPQ__c').toString();
        component.set('v.technicalFeedback.Velocity_CPQ__c', velocity);
        
        var overAll = component.get('v.technicalFeedback.Overall_on_10__c').toString();
        component.set('v.technicalFeedback.Overall_on_10__c', overAll);
        console.log(typeof(component.get('v.technicalFeedback.Language__c')));
        
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
                role : role,
                next : nextStep,
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
                    component.set('v.technicalFeedback.Language__c', '0');
                    component.set('v.technicalFeedback.Apex__c', '0');
                    component.set('v.technicalFeedback.Aura_Components__c', '0');
                    component.set('v.technicalFeedback.Integration__c', '0');
                    component.set('v.technicalFeedback.Java_Script__c', '0');
                    component.set('v.technicalFeedback.LWC__c', '0');
                    component.set('v.technicalFeedback.SQL__c', '0');
                    component.set('v.technicalFeedback.Overall_on_10__c', '0');
                    component.set('v.technicalFeedback.Comments__c', null);
                    component.set('v.technicalFeedback.Admin__c', '0');
                    component.set('v.technicalFeedback.Visualforce__c', '0');
                    component.set('v.technicalFeedback.MuleSoft__c', '0');
                    component.set('v.technicalFeedback.Velocity_CPQ__c', '0');
                    component.set('v.technicalFeedback.Admin_Remarks__c', null);
                    component.set('v.technicalFeedback.Visualforce_Remarks__c', null);
                    component.set('v.technicalFeedback.MuleSoft_Remarks__c', null);
                    component.set('v.technicalFeedback.Velocity_CPQ_Remarks__c', null);
                    component.set('v.technicalFeedback.Apex_Remarks__c', null);
                    component.set('v.technicalFeedback.Lightning_Remarks__c', null);
                    component.set('v.technicalFeedback.Integration_Remarks__c', null);
                    component.set('v.technicalFeedback.LWC_Remarks__c', null);
                    component.set('v.technicalFeedback.SQL_Remarks__c', null);
                    component.set('v.technicalFeedback.JavaScript_Remarks__c', null);
                    component.find("role").set('v.value', '--None--');
                    component.find("next").set('v.value', '--None--');
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