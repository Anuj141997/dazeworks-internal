({
    doInit : function(component, event, helper) {        
        helper.getValuesOnInit(component, event, helper);
    },
    
    doSave : function(component, event, helper) {
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        var isFieldsRequired = component.get('v.isFieldRequired');
        
        console.log(component.get('v.technicalFeedback.Comm_Skill__c'));
        console.log(component.get('v.technicalFeedback.Attitude__c'));
        console.log(component.get('v.technicalFeedback.Motivation__c'));
        console.log(component.get('v.technicalFeedback.Flexibility__c'));
        console.log(component.get('v.technicalFeedback.Management__c'));
        console.log(component.get('v.technicalFeedback.Project_Lead__c'));
        
        if(intervieweeDidntJoin){
            helper.interviweeNotJoined(component, event, helper);
        }else{
            console.log("interviewee Joined?"+intervieweeDidntJoin);
            helper.interviweeJoined(component, event, helper);
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