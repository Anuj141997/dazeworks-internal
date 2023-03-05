({
    fetchData: function (cmp, event, numberOfRecords) {
        console.log('inFetchData');
        var action = cmp.get("c.fetchData");
        action.setParams({
            "paramId" : cmp.get('v.paramId')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            var results = response.getReturnValue();
            if (state === "SUCCESS"){
                console.log('results - ' +results );
                cmp.set('v.data', results);
            }
            else{
                console.log('error...');
            }
        });
        $A.enqueueAction(action);  
        
    },
    removeBook: function (cmp, row) {
        var rows = cmp.get('v.data');
        var rowIndex = rows.indexOf(row);
        
        rows.splice(rowIndex, 1);
        cmp.set('v.data', rows);
    }
});