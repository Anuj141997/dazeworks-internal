({
    doInit: function (component, event, helper) {
        helper.getEmailTemplateHelper(component, event, helper);
    },
    sendMail: function (component, event, helper) {
        // when user click on Send button 
        var getEmail = component.get("v.email");
        var getSubject = component.get("v.subject");
        var getbody = component.get("v.emailbody");
        var emaillist =component.get("v.selectedLookUpRecords");
        var templateId = component.get("v.templateIDs");
        var datafileds = component.get("v.currentDate");
        var i=0;
        if (templateId == null || templateId =='') { 
            helper.toastMessage(component, event, 'Warning',$A.get("$Label.c.Email_Template_Error"), 'warning');
        }else {
            i = i+1;
        }
        if (datafileds == null || datafileds =='') { 
            helper.toastMessage(component, event, 'Warning',$A.get("$Label.c.Date_and_Time_Warning"), 'warning');
        }else {
            i = i+1;
        }
        
        if (emaillist.length <= 0) {
            
            helper.toastMessage(component, event, 'Warning',$A.get("$Label.c.Contact_selection_Warning"), 'warning');
        } else {
            i= i+1;
        }
        
        if(i>=3){
            helper.sendHelper(component, event, helper);
        }
        
    }, 
    closeMessage: function (component, event, helper) {
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
        
        $A.get('e.force:refreshView').fire();
    },
    onSelectEmailFolder: function (component, event, helper) {
       
        var folderId= component.find('selectFolder').get('v.value');
        
        component.set("v.folderId1", folderId);
        if (folderId != null && folderId != '' && folderId != 'undefined') {
            var emailfolderVSTemplateList = component.get("v.emailfolderVSTemplateList");
            emailfolderVSTemplateList.forEach(function (element) {
                if (element.folderId == folderId) {
                    component.set("v.emailTemplateList", element.emailtemplatelist);
                }
            });
        } else {
            var temp = [];
            component.set("v.emailTemplateList", temp);
        }
    },
    onSelectEmailTemplate: function (component, event, helper) {
        helper.onSelectEmailTemplateHelper(component, event, helper);
      },
    currentdateCall :function (component, event, helper) {
      helper.onSelectEmailTemplateHelper(component, event, helper);
 
    },
    closeModal: function (component, event, helper) {
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
        $A.get('e.force:refreshView').fire();
    },
     handleFilesChange: function(component, event, helper) {
      var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
             helper.uploadHelper(component, event);
        }else {
             helper.toastMessage(component, event, 'Warning','Please Select a Valid File', 'warning');
                
        }
        component.set("v.fileName", fileName);
    },
    
})