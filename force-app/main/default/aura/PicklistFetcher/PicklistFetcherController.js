({
    
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
        var value   = event.getSource().get("v.value");
        var myEvent = component.getEvent("picklistChange");
        myEvent.setParams({"stepName": value,
                           "paramId": component.get('v.paramId')
                          });
        myEvent.fire();
        console.log();
    }
})