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
    },
    
    handleRating: function(component, event, helper) {
        var rating = event.getParam("rating");
        console.log('rating'+rating);
        var ratingId = event.getParam("paramId");
        console.log('ratingId'+ratingId);
        component.set('v.ratingP',rating);
        component.set('v.ratingRecId',ratingId);
        var listOfAllAccounts = component.get("v.listOfAllAccounts");
        for (var i = 0; i < listOfAllAccounts.length; i++) {
            if (listOfAllAccounts[i].objInterview.Id == ratingId) {
                listOfAllAccounts[i].objInterview.Technical_on_10__c = rating;
                console.log('listOfAllAccounts[i].objInterview.Technical_on_10__c ' + listOfAllAccounts[i].objInterview.Technical_on_10__c);
            }             
        }
        component.set("v.listOfAllAccounts",listOfAllAccounts);
    }
})