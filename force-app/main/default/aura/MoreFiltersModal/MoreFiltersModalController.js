({
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false 
        var cmpEvent = component.getEvent("cmpMoreFiltersEvent");        
        cmpEvent.fire(); 
        
    },
    radioButtonChange: function(component, event, helper) {
        // Set isModalOpen attribute to false 
        var changeValue = event.getParam("value");
        console.log('changeValue - ' + changeValue);
        window.setTimeout(
            $A.getCallback(function() {
                var cmpEvent = component.getEvent("cmpMoreFiltersEvent");   
                cmpEvent.setParams({
                    "Option":changeValue
                });
                cmpEvent.fire(); 
            }), 500
        );
        
        
    },
})