({
	doInit : function(component, event, helper) {
		helper.getInterviewIdOnInit(component, event, helper);
        helper.fetchAllRelatedInterviewRecords(component, event, helper);
	},
    
    toggle : function(component, event, helper) {
        
        var items = component.get("v.interviewedList"), index = event.getSource().get("v.value");  
        items[index].expanded = !items[index].expanded;
        component.set("v.interviewedList", items);
    },
    
})