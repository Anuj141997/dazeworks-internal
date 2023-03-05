({
    /* doInitHelper funcation to fetch all records, and set attributes value on component load */
    doInitHelper : function(component,event){ 
        var action = component.get("c.fetchApplicationWrapper");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){
                    component.set("v.bNoRecordsFound", false);
                    component.set('v.listOfAllAccounts', oRes);
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = oRes;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.listOfAllAccounts").length > i){
                            PaginationLst.push(oRes[i]);    
                        } 
                    }
                    component.set('v.PaginationList', PaginationLst);
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));    
                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                } 
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);  
    },
    // navigate to next pagination record set   
    next : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        console.log('before loop' + end + "- " + start + "-" + pageSize);
        console.log('sObjectList' + sObjectList);

        for(var i = end + 1; i < end + pageSize + 1; i++){
            
            if(sObjectList.length > i){ 
                if(component.find("selectAllId").get("v.value")){
                    Paginationlist.push(sObjectList[i]);
                }else{
                    Paginationlist.push(sObjectList[i]);  
                }
            }
            counter ++ ;
        }
        console.log('Paginationlist' + JSON.stringify(Paginationlist));
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
        
    },
    // navigate to previous pagination record set   
    previous : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                if(component.find("selectAllId").get("v.value")){
                    Paginationlist.push(sObjectList[i]);
                }else{
                    Paginationlist.push(sObjectList[i]); 
                }
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    SearchCandidateHelper:function(component, event){
        // show spinner message
        component.find("Id_spinner").set("v.class" , 'slds-show');
        var action = component.get("c.fetchCandidate");
        var blankList = [];
        action.setParams({
            'searchKeyWord': component.get("v.searchKeyword"),
            'objectName' : component.get("v.objectForQuery")
        });
        action.setCallback(this, function(response) {
            // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                
                // if storeResponse size is 0 ,display no record found message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.bNoRecordsFound", true);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Alert!",
                        "type": "Error",
                        "message": "No Record found" 
                    });
                    toastEvent.fire();
                } else {
                    component.set("v.bNoRecordsFound", false);
                    // set numberOfRecord attribute value with length of return value from server
                    component.set("v.totalRecordsCount", storeResponse.length);
                    console.log('storeResponse.length' + storeResponse.length);
                    // set searchResult list with return value from server.
                    //component.set("v.listOfAllAccounts", blankList);
                    component.set('v.listOfAllAccounts', storeResponse);
                    console.log('listOfAllAccounts', JSON.stringify(component.get('v.listOfAllAccounts')));
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = storeResponse;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.listOfAllAccounts").length > i){
                            PaginationLst.push(storeResponse[i]);    
                        } 
                    }
                    component.set('v.PaginationList', JSON.parse(JSON.stringify(PaginationLst)));
                    console.log('PaginationList', JSON.stringify(component.get('v.PaginationList')));
                    
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));  
                }
                
                
                
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                              errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    updatePicklistValue:function(component, event, stepName, record){
        /*  var stepName = event.getParam("detail").value;
		      
        var record = event.getSource().get("v.recordId");
       */
        console.log('stepname - ' + stepName);
        var action = component.get("c.fetchApplication");
        action.setParams({ "applicationId" : record,
                          "status" : stepName});
        action.setCallback(this, function(response) {
            //  component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS"){
                var listOfAllAccounts = component.get("v.listOfAllAccounts");
                for (var i = 0; i < listOfAllAccounts.length; i++) {
                    if (listOfAllAccounts[i].objApplication.Id == record) {
                        listOfAllAccounts[i].objApplication.Interview_Round__c = stepName;
                        
                    }             
                }
                component.set("v.listOfAllAccounts",listOfAllAccounts);
                if (stepName == 'Rejected'){
                    component.set('v.statusValue', stepName);
                    //window.location.reload();
                }
                else{
                    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "type": "success",
                        "message": "Interview Status is changed to "+stepName+"."
                    });
                    toastEvent.fire();
                }
              //  $A.get('e.force:refreshView').fire();
                
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);  
        
    },
    
    FilterCandidateHelper:function(component, event){
        // show spinner message
        component.find("Id_spinner").set("v.class" , 'slds-show');
        console.log('Option in APEX - ' + event.getParam("Option")); 
        var action = component.get("c.fetchCandidate");
        var blankList = [];
        action.setParams({
            'searchKeyWord': event.getParam("Option"),
            'objectName' : 'NotForSearchButton'
        });
        action.setCallback(this, function(response) {
            // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                
                // if storeResponse size is 0 ,display no record found message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.bNoRecordsFound", true);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Alert!",
                        "type": "Error",
                        "message": "No Record found" 
                    });
                    toastEvent.fire();
                } else {
                    component.set("v.bNoRecordsFound", false);
                    // set numberOfRecord attribute value with length of return value from server
                    component.set("v.totalRecordsCount", storeResponse.length);
                    console.log('storeResponse.length' + storeResponse.length);
                    // set searchResult list with return value from server.
                    //component.set("v.listOfAllAccounts", blankList);
                    component.set('v.listOfAllAccounts', storeResponse);
                    console.log('listOfAllAccounts', JSON.stringify(component.get('v.listOfAllAccounts')));
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = storeResponse;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.listOfAllAccounts").length > i){
                            PaginationLst.push(storeResponse[i]);    
                        } 
                    }
                    component.set('v.PaginationList', JSON.parse(JSON.stringify(PaginationLst)));
                    console.log('PaginationList', JSON.stringify(component.get('v.PaginationList')));
                    
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));  
                }
                
                
                
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                              errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
})