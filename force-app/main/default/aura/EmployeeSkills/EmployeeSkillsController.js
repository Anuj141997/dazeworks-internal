({
    doInit : function(component, event, helper) {
        helper.fetchSkillsPicklistValues(component, event, helper);
        helper.getEmpIdOnInit(component, event, helper);
        
    },
    
    handleSkillsChange: function (component, event, helper) {
        var selectedValues = event.getParam("value");
        component.set("v.selectedSkillsList", selectedValues);
    },
    
    updateEmployeeSkills : function(component, event, helper){
        var empId = component.get('v.empId');
        console.log('employee Id is : '+empId)
        var selectedValues = component.get('v.selectedSkillsList');
        var skillSet = selectedValues.toString();
        var others = component.get('v.otherSkills');
        //console.log('Selected Skills : ' + selectedValues);
        //console.log('String Value : '+skillSet);
        var action = component.get("c.updateSkills");
        if(skillSet == 'undefined' || skillSet == null || skillSet == ""){
            helper.showToast(component, event, helper, "Error!", "Please add skills", "error");
        }else{
            action.setParams({
            employeeId : empId,
            skillSet : skillSet,
            others : others
        });
        action.setCallback(this, function(response){
            var responseVal = response.getReturnValue();
            var state = response.getState();
            if(state === "SUCCESS"){
                if(responseVal){
                    helper.showToast(component, event, helper, "Success!", "Employee Skills has been updated successfully.", "success");
                }else{
                    helper.showToast(component, event, helper, "Error!", "Employee Id/ Professional Consultant Id entered doesn't match with the records.", "error");
                }
                component.set('v.selectedSkillsList', null);
                component.set('v.otherSkills', null);
            }else{
                console.log("error");
            }
        });
        $A.enqueueAction(action);
        }
    }
})