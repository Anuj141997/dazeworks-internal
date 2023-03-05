({
    doInit: function(component, event, helper) {
        helper.doInitHelper(component, event);
    },
    objectQuery : function(component, event, helper) {
        var picklistValue =  component.find('select').get('v.value');
        component.set("v.objectForQuery",picklistValue);   
        
    },
    showMoreFiltersModal : function(component, event, helper) {
        component.set("v.showMoreFiltersModal",true);
    },
    handleMoreFiltersModalClose : function(component, event, helper) {
        console.log('recieved');
        component.set("v.showMoreFiltersModal",false);
        var option = event.getParam("Option");
        console.log('option'+option);
        if(option == "option3")
            helper.doInitHelper(component, event);
        else if(option == "option2")
            helper.FilterCandidateHelper(component, event);
            else if(option == "option1")
                helper.FilterCandidateHelper(component, event);
        // helper.doInitHelper(component, event);
    },
    handleInterviewClose: function(component, event, helper) {
        console.log('recieved');
        component.set("v.showinterviewScorecardModal",false);
        
        //helper.doInitHelper(component, event);
        //$A.get('e.force:refreshView').fire();
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
    showRejectReason : function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var record = selectedItem.dataset.value;
        component.set("v.isRejected",true);
        component.set("v.rejectReasonId", record);
    },
    closeComments : function (component, event, helper) {
        component.set('v.statusValue', 'notScheduled');
        component.set("v.isRejected",false);
    },
    handleSelect : function (component, event, helper) {
        var stepName = event.getParam("stepName");
        
        component.set("v.interviewRecord", stepName);
        var record = event.getParam("paramId");
      
        component.set('v.paramId',record);
        var priorStatusValue = event.getParam("priorStatusValue");
        component.set('v.priorStatusValue',priorStatusValue);
        if (!stepName.includes('Round')){
            console.log('stepName ' + stepName);
            helper.updatePicklistValue(component, event,stepName,record);
        }
        else{
            component.set("v.showInterviewModal", true);
        }
        
    },
    modalInterviewClose: function (component, event, helper) {
        component.set('v.showInterviewModal', false);
         var record = event.getParam("paramId");
        var stepName = event.getParam("stageValue");
        console.log('record + stepName' + record + ' + ' + stepName);
        if(stepName != 'noUpdate'){
            helper.updatePicklistValue(component, event,stepName,record);
        }
        else{
           // priorStatusValue = component.get('v.priorStatusValue');
            //window.location.reload();
            
        }
    },
    viewRecord : function (component, event, helper) {
        var selectedItem = event.currentTarget;
        var applicationId = selectedItem.dataset.value;
        //  var applicationId = event.getSource().get("v.value");
        window.open('/' + applicationId,'_blank');
    },
    
    newApplication:function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Application__c"
        });
        createRecordEvent.fire();
    },
    newJobApplication:function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Position__c"
        });
        createRecordEvent.fire();
    },
    searchCandidateMethod:function (component, event, helper) {
        var searchField = component.find('searchCandidate');
        var isValueMissing = searchField.get('v.validity').valueMissing;
        var blankList = [];
        component.set('v.searchButton', true);
        // if value is missing show error message and focus on field
        if(isValueMissing) {
            helper.doInitHelper(component, event);
        }else{
            // else call helper function 
            helper.SearchCandidateHelper(component, event);
        }
    },
    openInterviewScorcard:function (component, event, helper) {
        // var record = event.getSource().get("v.value");   
        var selectedItem = event.currentTarget;
        var record = selectedItem.dataset.value;
        var candName = selectedItem.dataset.name;
        component.set('v.candidateName',candName);
        console.log('candName - ' + candName);
        component.set('v.paramId',record);
        component.set('v.showinterviewScorecardModal',true);
    },
    
    reloadPage : function (component, event, helper) {
        window.location.reload(true);
    }
})