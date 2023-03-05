({
    saveDate: function(component, event, helper){
        var startDate = component.get("v.startDate");
        var endDate = component.get("v.endDate");
       
        var action = component.get("c.createAttendanceRecord");
        action.setParams({
            "startDate" : startDate,
            "endDate" : endDate
        });
        action.setCallback(this, function(response) {
            var reponseVal = response.getReturnValue();
            var state = response.getState();
            if(state === 'SUCCESS'){
                
                    helper.showToast(component, event, helper, "Success!", "Attendance has been created successfully for the selected date.", "success")
            
               
                component.set('v.startDate', null);
                component.set('v.endDate', null);
            }
            else{
                helper.showToast(component, event, helper, "Error!", "Attendance for the selected date range already exists.", "error")

			}
        });
        $A.enqueueAction(action);
    }
})