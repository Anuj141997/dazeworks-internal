({
    doInit: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        helper.doInitHelper(component, event);
    },
    saveCloseModel: function(component, event, helper) {
        console.log('close');
        var cmpEvent = component.getEvent("cmpEvent");        
        cmpEvent.fire();
       helper.handleRatingHelper(component, event);
       //$A.get('e.force:refreshView').fire();
    },
    updateInterviewScoreCard: function(component, event, helper) {
       
        helper.handleRatingHelper(component, event);
       
    },
    closeModel: function(component, event, helper) {
        console.log('close');
        var cmpEvent = component.getEvent("cmpEvent");        
        cmpEvent.fire();
        //$A.get('e.force:refreshView').fire();
    },
    modalInterviewClose:function(component, event, helper) {
        
        component.set('v.showInterviewModal', false);
        helper.handleRatingHelper(component, event);
        helper.doInitHelper(component, event);
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
    },
     handleSelect : function (component, event, helper) {
       
      
         var stepName = event.getParam("stepName");
        console.log('rating'+stepName);
        var record = event.getParam("paramId");
        console.log('ratingId'+record);
         
        var roundVal = ' ';
        var application =  ' ';
        var listOfAllAccounts = component.get("v.listOfAllAccounts");
        for (var i = 0; i < listOfAllAccounts.length; i++) {
            if (listOfAllAccounts[i].objInterview.Id == record) {
                listOfAllAccounts[i].objInterview.Interview_Status__c = stepName;
                roundVal = listOfAllAccounts[i].objInterview.Interview_Round__c;
            }             
        }
          component.set("v.listOfAllAccounts",listOfAllAccounts);
        if(stepName == "Rescheduled"){
            component.set('v.round', roundVal);
            component.set('v.enableButton', 1);   
            //component.set('v.readonly', true);
        }
        else{
            component.set('v.enableButton', 0);
        }
       
    },
    
    /* javaScript function for pagination */
    navigation: function(component, event, helper) {
        var sObjectList = component.get("v.listOfAllAccounts");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var whichBtn = event.getSource().get("v.name");
        // check if whichBtn value is 'next' then call 'next' helper method
        if (whichBtn == 'next') {
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.next(component, event, sObjectList, end, start, pageSize);
        }
        // check if whichBtn value is 'previous' then call 'previous' helper method
        else if (whichBtn == 'previous') {
            component.set("v.currentPage", component.get("v.currentPage") - 1);
            helper.previous(component, event, sObjectList, end, start, pageSize);
        }
    },
    
    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var updatedPaginationList = [];
        var listOfAllAccounts = component.get("v.listOfAllAccounts");
        var PaginationList = component.get("v.PaginationList");
        // play a for loop on all records list 
        for (var i = 0; i < listOfAllAccounts.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0  
            if (selectedHeaderCheck == true) {
                listOfAllAccounts[i].isChecked = true;
                component.set("v.selectedCount", listOfAllAccounts.length);
            } else {
                listOfAllAccounts[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            updatedAllRecords.push(listOfAllAccounts[i]);
        }
        // update the checkbox for 'PaginationList' based on header checbox 
        for (var i = 0; i < PaginationList.length; i++) {
            if (selectedHeaderCheck == true) {
                PaginationList[i].isChecked = true;
            } else {
                PaginationList[i].isChecked = false;
            }
            updatedPaginationList.push(PaginationList[i]);
        }
        component.set("v.listOfAllAccounts", updatedAllRecords);
        component.set("v.PaginationList", updatedPaginationList);
    },
    
    checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
            component.find("selectAllId").set("v.value", false);
        }
        component.set("v.selectedCount", getSelectedNumber);
        // if all checkboxes are checked then set header checkbox with true   
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("selectAllId").set("v.value", true);
        }
    },
    
    getSelectedRecords: function(component, event, helper) {
        var allRecords = component.get("v.listOfAllAccounts");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i].objAccount);
            }
        }
        alert(JSON.stringify(selectedRecords));
    },
    deleteInterview : function (component, event, helper) {
        //  var record = event.getSource().get("v.recordId");
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.value;
        console.log('recId' + recId);
        var listOfAllAccounts = component.get("v.listOfAllAccounts");
        for (var i = 0; i < listOfAllAccounts.length; i++) {
            if (listOfAllAccounts[i].objInterview.Id == recId) {
                console.log('listOfAllAccounts[i].objInterview.Id - ' + listOfAllAccounts[i].objInterview.Id );
                listOfAllAccounts[i].isChecked = true;
                
                
            }             
        }
        component.set("v.listOfAllAccounts",listOfAllAccounts);
        console.log('listOfAllAccounts - ' + JSON.stringify(listOfAllAccounts));
       helper.handleRatingHelper(component, event);
        helper.doInitHelper(component, event);
    },
     viewRecord : function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var applicationId = selectedItem.dataset.value;
        //  var applicationId = event.getSource().get("v.value");
        window.open('/' + applicationId,'_blank');
    },
    
   
    newInterviewfromButton: function (component, event, helper) {
        component.set('v.showInterviewModal', true);
    },
    showComments: function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.value;
        component.set('v.showComponent', true);
        component.set('v.commentId', recId );
        var initialComments = ' ';
        var listOfAllAccounts = component.get("v.listOfAllAccounts");
        for (var i = 0; i < listOfAllAccounts.length; i++) {
            if (listOfAllAccounts[i].objInterview.Id == recId) {
                initialComments = listOfAllAccounts[i].objInterview.Comments__c;
            }             
        }
        component.set('v.initialComments', initialComments);
        
    },
    closeComments : function (component, event, helper) {
        component.set('v.showComponent', false);
    }
})