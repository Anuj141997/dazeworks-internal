({
    fetchSkillsPicklistValues : function(component, event, helper) {
        var action = component.get("c.getPiklistValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                var plValues = [];
                for (var i = 0; i < result.length; i++) {
                    plValues.push({
                        label: result[i],
                        value: result[i]
                    });
                }
                component.set("v.skillsList", plValues);
                console.log(component.get("v.skillsList"));
            }
        });
        $A.enqueueAction(action);
    },
    
    getEmpIdOnInit : function(component, event, helper) {
        var pageUrl = new URL(window.location.href);
        var empId = pageUrl.searchParams.get("empId");
        console.log(empId);
        component.set('v.empId', empId);
    },
    
    showToast : function(component, event, helper, title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type
        });
        toastEvent.fire();
    },
})