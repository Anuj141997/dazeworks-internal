({
    doInit : function(component, event, helper) {
        helper.fetchRolePicklist(component);
        helper.fetchNextStepPicklist(component);
        helper.getValuesOnInit(component, event, helper);
    },
    
    doSave : function(component, event, helper) {
        var intervieweeDidntJoin = component.get('v.intervieweeDidntJoin');
        var isFieldsRequired = component.get('v.isFieldRequired');
        
        console.log(typeof(component.get('v.technicalFeedback.Language__c')));
        console.log(component.get('v.technicalFeedback.Apex__c'));
        console.log(component.get('v.technicalFeedback.Aura_Components__c'));
        console.log(component.get('v.technicalFeedback.Integration__c'));
        console.log(component.get('v.technicalFeedback.Java_Script__c'));
        
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