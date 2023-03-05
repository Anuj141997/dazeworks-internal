({
    handleSelect : function (component, event, helper) {
     var stepName = event.getParam("detail").value;
       
        var recordId = component.get('v.paramId');
     var pathEvent = component.getEvent("pathEvent");  
        pathEvent.setParams({"stepName": stepName,
                               "paramId": recordId,
                             "priorStatusValue":component.get('v.priorStatusValue')
                              });
        pathEvent.fire();
    }
})