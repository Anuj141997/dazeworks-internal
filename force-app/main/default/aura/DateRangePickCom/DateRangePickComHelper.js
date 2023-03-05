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
    
    getAllInterviewers : function(component, event, helper){
        var action = component.get("c.returnAllInterviewers");
        action.setCallback(this, function(response){
            var state = response.getState();
            var responseVal = response.getReturnValue();
            if(state === "SUCCESS"){
                component.set("v.allInterviewers", responseVal);
            }
        });
        $A.enqueueAction(action);
    }
})