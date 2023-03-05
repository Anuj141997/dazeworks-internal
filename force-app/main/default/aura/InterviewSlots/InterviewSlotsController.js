({
    doInit : function(component, event, helper) {
        helper.getSlotsOnHomePage(component, event, helper);
        helper.onInit(component, event, helper);
        helper.getAllRelatedSlots(component, event, helper);
        
    },
    
    getRelatedSlots : function(component, event, helper) {
        helper.getAllRelatedSlots(component, event, helper);
    },
    
    goToDetail : function(component, event, helper) {
        var conId = event.currentTarget.dataset.value;
        console.log(conId);
        /*  var url = '/lightning/r/Contact/'+conId+'/view';
        component.set('v.goToURL', url); */
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": conId,
            "slideDevName": "detail"
        });
        navEvt.fire();  
        
    },
    
    openModel: function(component, event, helper) {
        var recId = event.getSource().get("v.name");
      //  console.log('Id from js Controller : '+recId);
        component.set('v.recId', recId);
        console.log('Clicked on this Interview Slot Id '+component.get('v.recId'))
        component.set("v.isModalOpen", true);
        //  helper.getApplicationId(component, event, helper);
    },
    
    closeModel: function(component, event, helper) {
        component.set("v.isModalOpen", false);
    },
    
    redirectToInterview : function(component, event, helper){         
        console.log('**********hello');
        var slotRecId = event.getSource().get("v.name");
        console.log(slotRecId);
        var action = component.get("c.getChildRecordId");
        
        action.setParams({
            slotId : slotRecId
        });
        
        action.setCallback(this, function(response){
            var state=response.getState();
            var responseVal = response.getReturnValue();
            console.log(responseVal);
            if(state === "SUCCESS"){
                component.set('v.InterviewId', responseVal);
                var interviewId = component.get('v.InterviewId');
                console.log('Response '+responseVal);
                console.log('Interview Id '+component.get('v.InterviewId'));
                helper.RedirectToInterviewHelper(component, event, helper);
            } else{
                console.log("error");
            }
        });
        $A.enqueueAction(action);
        
    },
    
    submitDetails: function(component, event, helper) {
        helper.showToast(component, event, helper, "Success!", "Interview Slot has been booked successfully.", "success");
       
        helper.insertInterviewSlot(component, event, helper);
        
         helper.getInterviewerSlots(component, event, helper);
        //   helper.updateInterviewRound(component, event, helper);
        helper.getAllRelatedSlots(component, event, helper);

    },
    
    handleSpinner : function(component, event, helper){
        helper.showSpinner(component);
        helper.onInit(component, event, helper);
        helper.getAllRelatedSlots(component, event, helper);
    }
})