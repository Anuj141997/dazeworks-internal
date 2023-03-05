({
    init: function (cmp, event, helper) {
        var actions = [
            { label: 'Upload Reciepts', name: 'show_details' }
           // { label: 'Delete', name: 'delete' }
        ];
        


        cmp.set('v.columns', [
            {label: 'Expense Id', fieldName: 'Name', type: 'text', editable: false, typeAttributes: { required: true }, cellAttributes: { alignment: 'left' }},
            {label: 'Resource', fieldName: 'Resource_Name__c', type: 'text', editable: false, typeAttributes: { required: true },cellAttributes: { alignment: 'left' }},
            {label: 'Expense Type', fieldName: 'Expense_Type__c', type: 'text', editable: true, typeAttributes: { required: true },cellAttributes: { alignment: 'left' }},
           
            {label: 'Amount', fieldName: 'Amount__c', type: 'currency', editable: true, cellAttributes: { alignment: 'left' }},
            { type: 'action', typeAttributes: { rowActions: actions }}
        ]);


        helper.fetchData(cmp, event, 20);
    },
    handleUpload : function (cmp, event, helper) {
        cmp.set('v.showUploadModal',false);
    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'show_details':
               // alert('Showing Details: ' + JSON.stringify(row));
               //console.log('JSON.stringify(row)' + JSON.stringify(row));
               cmp.set('v.expenseItemId', row.Id);
               cmp.set('v.showUploadModal',true);
                break;
         /*   case 'delete':
                helper.removeBook(cmp, row);
                break; */
        }
    }
});