({
    selectRecord : function(component, event, helper){      
        // get the selected record from list 
        //debugger;
     
        var getSelectRecord = component.get("v.oRecord");
        // call the event   
        var compEvent = component.getEvent("oSelectedRecordEvent");
        // set the Selected sObject Record to the event attribute.  
        compEvent.setParams({"recordByEvent" : getSelectRecord });
        console.log(getSelectRecord);
        console.log(component.getEvent("oSelectedRecordEvent"));
        // fire the event  
        compEvent.fire();
    },
})