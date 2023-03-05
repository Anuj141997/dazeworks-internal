({
    handleUploadFinished: function (cmp, event) {
        // This will contain the List of File uploaded data and status
        var uploadedFiles = event.getParam("files");
        // alert("Files uploaded : " + uploadedFiles.length);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": uploadedFiles.length  + " file(s) has been successfully uploaded.",
            "type" : "success"
        });
        toastEvent.fire();
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        var cmpEvent = component.getEvent("uploadExpense");        
        cmpEvent.fire(); 
    },
    
    submitDetails: function(component, event, helper) {
        // Set isModalOpen attribute to false
        //Add your code to call apex method or do some processing
         var cmpEvent = component.getEvent("uploadExpense");        
        cmpEvent.fire(); 
    }
});