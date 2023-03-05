({
    getInterviewerSlots : function(component, event, helper) {      
        var action = component.get("c.getBookedSlots");
        console.log('Slot Id From getInterviewerSlots Helper Method'+component.get('v.recId'))
        action.setParams({
            slotId : component.get('v.recId')
        });
        action.setCallback(this, function(response){
            var state=response.getState();
            if(state === "SUCCESS"){
                var responseVal = response.getReturnValue();
                component.set('v.isBooked', responseVal);
                console.log('booked? : '+component.get('v.isBooked'));
                var isHomePage = component.get('v.isHomePage');
                if(!isHomePage){
                    $A.get('e.force:refreshView').fire();
                }
            }
        });
        var cmpTarget = component.find('isBooked');
        $A.util.addClass(cmpTarget, 'bgColor');
        $A.enqueueAction(action);
        component.set("v.isModalOpen", false);
    },
    
    showToast : function(component, event, helper, title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type
        });
        toastEvent.fire();
    },
    
    onInit : function(component, event, helper){
        var sObjName = component.get('v.sObjName');
        var fieldsToQuery = component.get('v.fields');
        var action = component.get("c.getDate");
        action.setParams({
            recId : component.get('v.recordId'),
            objName : sObjName,
            fieldNames : fieldsToQuery
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var responseVal = response.getReturnValue();
                console.log('response from apex : '+responseVal);
                if(sObjName == 'Interview__c'){
                    var date = responseVal[0];
                    console.log('Date is : '+date);
                    component.set('v.availableDate', date);
                    var conId = responseVal[1];
                    component.set('v.conId', conId);
                }else{
                    if(responseVal[0].length == 18){
                        var field1 = responseVal[0];
                        var field2 = responseVal[1];
                        component.set('v.availableDate', field2);
                        component.set('v.conId', field1);
                    }else if(responseVal[1].length == 18){
                        var field1 = responseVal[0];
                        var field2 = responseVal[1];
                        component.set('v.availableDate', field1);
                        component.set('v.conId', field2);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getAllRelatedSlots : function(component, event, helper){
        var action = component.get("c.getSlots");
        action.setParams({
            dt : component.get('v.availableDate')
        });
        
        action.setCallback(this, function(response){
            var state=response.getState();
            if(state === "SUCCESS"){
                helper.hideSpinner(component);
                var slotRec = response.getReturnValue();
                var interviewSlots = [];
                if(slotRec != null){
                    for(var key in slotRec){
                        interviewSlots.push({
                            Id: slotRec[key].Id,
                            key: slotRec[key].Name,
                            value: slotRec[key].Interviewer_Slots__r
                        });
                    }
                }
                component.set('v.interviewSlots', interviewSlots);
                
                console.log(JSON.stringify(interviewSlots));
                console.log(JSON.stringify(interviewSlots));
                console.log('====='+JSON.stringify(slotRec));
                
            }
        });
        var isBooked = component.get('v.isBooked');
        if(isBooked){
            component.set('v.bgColor', true);
            console.log(component.get('v.bgColor'));
        }
        $A.enqueueAction(action);
        component.set('v.isBooked', false);
    },
    
    getSlotsOnHomePage : function(component, event, helper){
        var currentPageURL = window.location.pathname;
        console.log(currentPageURL);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy =today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
        if(currentPageURL === '/lightning/page/home' || currentPageURL === 'lightning/n/Interview_Slot'){
            component.set('v.availableDate', today);
            component.set('v.isHomePage', true);
            console.log('Date from component attribute : '+component.get('v.availableDate'));
        }
    },
    
    showSpinner: function (component, event, helper) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    
    hideSpinner: function (component, event, helper) {
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
    },
    
    insertInterviewSlot : function(component, event, helper){
        var app = component.find("app").get("v.value");
        console.log(app);
        
        var round = component.find("round").get('v.value');
        console.log(round);
        var action = component.get("c.insertSlot");
        action.setParams({
            app : app,
            slots: component.get('v.recId'),
            round : round
        });
        /*  action.setCallback(this, function(response){
           var state = response.getState(); 
            if(state === "SUCCESS"){
                var responsevalue = response.getReturnValue();
                component.set('v.InterviewId', responsevalue);
            }
        }); */
        console.log('Slot Id From insertInterviewSlot Helper Method '+component.get("v.recId"));
        $A.enqueueAction(action);
    },
    
    RedirectToInterviewHelper : function(component, event, helper){
        console.log(component.get('v.InterviewId'));
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get('v.InterviewId'),
            "slideDevName": "detail"
        });
        navEvt.fire();  
        
    }
})