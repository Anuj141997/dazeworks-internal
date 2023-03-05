({
   doInit: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isOpen", true);
       if(component.get("v.ObjectNameToCreate") == 'noRefresh'){
           component.set("v.closeWithoutRefresh", true);
       }
   },
 
   closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      //   console.log(component.get('v.ApplicationId'));
        
      var cmpEvent = component.getEvent("compEvent");  
        cmpEvent.setParams({"stageValue": 'noUpdate',
                               "paramId": component.get('v.ApplicationId')
                              });
        cmpEvent.fire();
   },
    createCloseModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
 
      var cmpEvent = component.getEvent("compEvent");  
        cmpEvent.setParams({"stageValue": component.get('v.roundVal'),
                               "paramId": component.get('v.ApplicationId')
                              });
        cmpEvent.fire();
   },
    closeFromModal:function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
     var cmpEvent = component.getEvent("rescheduleEvent");        
        cmpEvent.fire();
      }
 
   
})