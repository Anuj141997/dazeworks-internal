({
    getInterviewIdOnInit : function(component, event, helper){
        var pageUrl = new URL(window.location.href);
        var interviewId = pageUrl.searchParams.get("intId");
        console.log(interviewId);
        component.set("v.interviewId", interviewId);
        console.log(component.get("v.interviewId"));
    },
    
    fetchAllRelatedInterviewRecords : function(component, event, helper){
        var action = component.get("c.fetchInteviewedRecords");
        console.log(component.get('v.interviewId'));
        action.setParams({
            intId : component.get('v.interviewId')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var responseVal = response.getReturnValue();
            console.log(responseVal);
            if(state === "SUCCESS"){
                if(responseVal.length > 0){
                    component.set('v.interviewedList', responseVal);
                    component.set('v.noRecordsFound', fals);
                }else{
                    component.set('v.noRecordsFound', true);
                }
            }else{
                console.log("error");
            }
        });
        $A.enqueueAction(action);
    },
    
    
})