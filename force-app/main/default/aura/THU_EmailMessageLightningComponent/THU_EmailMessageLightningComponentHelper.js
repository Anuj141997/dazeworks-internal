({
    sendHelper: function (component, event, helper) {
        
        // call the server side controller method 	
        var action = component.get("c.sendMailMethod");
        component.set('v.loaded', !component.get('v.loaded'));
        
        // set the  params to sendMailMethod method   
        action.setParams({
            'mSubject': component.get("v.subject"),
            'mbody': component.get("v.emailbody"),
            'folderId': component.get("v.folderId1"),
            'templateId': component.get("v.templateIDs"),
            'emaillist':component.get("v.selectedLookUpRecords"),
            'dateField':component.get("v.currentDate"),
            'interviewid':component.get("v.recordId"),
            'fileName':component.get("v.fileNameValue"),
            'base64Data' :component.get("v.base64DataVsalue"),
            'contentType' :component.get("v.contentTypeValue")
        });
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if state of server response is comes "SUCCESS",
                // display the success message box by set mailStatus attribute to true
                
                component.set('v.loaded', !component.get('v.loaded'));
                this.toastMessage(component, event, 'SUCCESS',$A.get("$Label.c.success_message"), 'success');
                
            }else if(state === "ERROR"){
                
                this.toastMessage(component, event, 'Warning',$A.get("$Label.c.Email_Filed_Error"), 'warning');
                component.set('v.loaded', !component.get('v.loaded'));
            }
        });
        $A.enqueueAction(action);
    },
    
    getEmailTemplateHelper: function (component, event, helper) {
        var rcdID = component.get("v.recordId");
        var action = component.get("c.getEmailTempaltes");
        action.setParams({
            'RecdId':rcdID
        });
        
        // call the server side getEmailTempaltes controller method. 
        //var action = component.get("c.getEmailTempaltes");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS" && response.getReturnValue() != null) {
                component.set("v.emailfolderVSTemplateList", response.getReturnValue());
                component.set('v.loaded', !component.get('v.loaded'));
                var ivaule =component.get("v.emailfolderVSTemplateList");
                var ivauleda =component.get("v.emailfolderVSTemplateList[0].datetimeval");
                component.set("v.datetimeval",ivauleda);
            }
        });  
        $A.enqueueAction(action);
    },
    onSelectEmailTemplateHelper :function(component, event, helper){
        
        var emailTempId= component.find('selectTemplate').get('v.value');
        var emailbody = '';
        var emailSubject = '';
        component.set("v.templateIDs", emailTempId);
        if (emailTempId != null && emailTempId != '' && emailTempId != 'undefined') {
            var emailTemplateList = component.get("v.emailTemplateList");
            emailTemplateList.forEach(function (element) {
                if (element.emailTemplateId == emailTempId && element.emailbody != null) {
                    emailbody = element.emailbody;
                    
                    var datevalue = component.get("v.datetimeval");
                    var d = $A.localizationService.formatDate(datevalue, "yyyy-MM-dd hh:mm:ss");
                    var ctdatevalue = component.get("v.currentDate");
                    var dupdated = $A.localizationService.formatDate(ctdatevalue, "EEEE yyyy-MM-dd hh:mm:ss a");
                    //var res = emailbody.replace(/2020-07-30 02:00:00/g, dupdated);
                    var res = emailbody.replace(d, dupdated);
                    emailbody =res;
                    emailSubject = element.emailSubject;
                }
            }); 
        }
        component.set("v.emailbody", emailbody);
        component.set("v.subject", emailSubject);
    },
    toastMessage : function(component, event, title, errorMessage, errorType) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: errorMessage,
            type: errorType,
            mode: 'pester'
        });
        toastEvent.fire();
        if(errorType ==='success'&& errorMessage ===$A.get("$Label.c.success_message")){
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
        }
    },
    MAX_FILE_SIZE: 3000000, //Max file size 3 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
    uploadHelper: function(component, event) {
        component.set("v.showLoadingSpinner", true);
        var fileInput = component.find("fileId").get("v.files");
        var file = fileInput[0];
        var self = this;
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
            return;
        }
        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;
            fileContents = fileContents.substring(dataStart);
            self.uploadProcess(component, file, fileContents);
        });
        objFileReader.readAsDataURL(file);
    },
    
    uploadProcess: function(component, file, fileContents) {
        
        // set a default size or startpostiton as 0 
        var startPosition = 0;
        // calculate the end size or endPostion using Math.min() function which is return the min. value   
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        
        // start with the initial chunk, and set the attachId(last parameter)is null in begin
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },
    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        
        var getchunk = fileContents.substring(startPosition, endPosition);
        component.set("v.fileNameValue",  file.name);
        component.set("v.base64DataVsalue",encodeURIComponent(getchunk));
        component.set("v.contentTypeValue", file.type);
        component.set("v.showLoadingSpinner", false);
        var filevalue =component.get("v.fileNameValue");
        if(filevalue.length >= 0){
            this.toastMessage(component, event, 'SUCCESS','File Upload Successfully', 'success');
        }else{
            this.toastMessage(component, event, 'Warning','No File Attached', 'warning');
        }
    }
    
})