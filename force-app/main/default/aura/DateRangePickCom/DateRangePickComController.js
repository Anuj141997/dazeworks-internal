({
    
    doInit : function(component, event, helper) {
        helper.getAllInterviewers(component, event, helper);
    },
    
    
    goToDetail : function(component, event, helper) {
       
        let urlString = window.location.href;
        let baseURL = urlString.substring(0, urlString.indexOf("/lightning"));
        console.log(baseURL);
        var customSettingUrl = baseURL + '/lightning/setup/CustomSettings/page?address=%2Fsetup%2Fui%2FlistCustomSettingsData.apexp%3Fid%3Da0T';
         component.set('v.url', customSettingUrl);
        console.log('customSettingUrl '+customSettingUrl);
    },
    
    saveDate: function(component, event, helper){
        var startDate = component.get("v.startDate");
        var endDate = component.get("v.endDate");
        
        if(endDate == 'undefined' || endDate == null || endDate == " "){
            component.set("v.endDate", startDate);
            endDate = startDate;
        }
        
        var selectedRecords = component.get("v.lstSelectedRecords");
        var allInterviewers = component.get("v.allInterviewers");
        if(selectedRecords.length == 0){
            //component.set("v.lstSelectedRecords", allInterviewers);
            component.set("v.interviewersNotSelected", true);
        }
        console.log(component.get("v.allInterviewers"));
        console.log(component.get("v.lstSelectedRecords"));
        if (endDate < startDate){
            helper.showToast(component, event, helper, "Error!", "Start date must be less than End date", "error");
        }else if((startDate == 'undefined' || startDate == null || startDate == " ") &&
                 (endDate == 'undefined' || endDate == null || endDate == " ")
                ){
                 	helper.showToast(component, event, helper, "Error!", "Please select Start Date and End Date", "error");
                 }else{
            var notSelected = component.get("v.interviewersNotSelected");
            if(notSelected){
                component.set("v.slectedInterviewers", allInterviewers);
            }else{
                component.set("v.slectedInterviewers", selectedRecords);
            }
            var action = component.get("c.insertSlots");
            action.setParams({
                "startDate" : startDate,
                "endDate" : endDate,
                "interviewersList" : component.get("v.slectedInterviewers")
            });
            action.setCallback(this, function(response) {
                var reponseVal = response.getReturnValue();
                var state = response.getState();
                if(state === 'SUCCESS'){
                    if(reponseVal){
                        helper.showToast(component, event, helper, "Success!", "Slots has been created successfully for the selected range of date.", "success");
                    	window.location.reload();
                    } else{
                        helper.showToast(component, event, helper, "Error!", "Interviewer Slots for the selected date range already exists.", "error");
                    }
                    component.set('v.startDate', null);
                    component.set('v.endDate', null);
                    component.set('v.lstSelectedRecords', null);
                    
                }else{
                    console.log("error");
                }
            });
            $A.enqueueAction(action);
        }
    }
})