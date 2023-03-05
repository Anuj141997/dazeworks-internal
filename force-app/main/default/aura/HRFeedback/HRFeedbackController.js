({
    doInit : function(component, event, helper){
        helper.getValuesOnInit(component, event, helper);
    },
    
    doSave : function(component, event, helper) {
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        if(intervieweeDidntJoin){
            helper.intervieweeNotJoined(component, event, helper);
        }else{
            helper.intervieweeJoined(component, event, helper);
        }
    },
    
    setIsRequired : function(component, event, helper){
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        console.log(intervieweeDidntJoin);
        if(intervieweeDidntJoin){
            component.set('v.isFieldRequired', false);
            console.log('is Required : '+component.get('v.isFieldRequired'));
        }else{
            component.set('v.isFieldRequired', true);
            console.log('is Required : '+component.get('v.isFieldRequired'));
        }
    }
})