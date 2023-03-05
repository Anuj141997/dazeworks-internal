({
	doInit : function(component, event, helper) {
        var recordId = component.get('v.recordId');
		var action = component.get("c.fetchRelatedInterviews");
        action.setParams({
            recId : recordId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var responseVal=response.getReturnValue();
            console.log(responseVal);
            if(state === "SUCCESS"){
                component.set('v.interview', responseVal);
                console.log(component.get('v.interview'));
            }else{
                console.log("error");
            }
        });
        $A.enqueueAction(action);
	}
})