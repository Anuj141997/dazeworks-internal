public class ClockifyWorkspace {
    
    public static List<String> findWorkspaceIds(String Apikey){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.clockify.me/api/v1/workspaces');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setHeader('X-Api-Key', Apikey);        
        HttpResponse response = http.send(request);
        List<Object> results = (List<Object>)JSON.deserializeUntyped(response.getBody());        
        Map<String,Object> resultMap = new Map<String,Object>();
        List<String> workspaceIdList = new List<String>();
        if(!results.isEmpty()){
            for(Object result: results ){  
                resultMap = (Map<String,Object>)result;
                workspaceIdList.add((String)resultMap.get('id'));
            }
        }        
        return workspaceIdList;
    }
    
    public static String findWorkspaceId(String Apikey){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.clockify.me/api/v1/workspaces');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setHeader('X-Api-Key', Apikey);        
        HttpResponse response = http.send(request);
        List<Object> result = (List<Object>)JSON.deserializeUntyped(response.getBody());
        if(!Result.isEmpty()){
            Map<String,Object> resultMap = (Map<String,Object>)result.get(0);
            System.debug(resultMap.get('id'));
            String worksapceId = (String)resultMap.get('id');        
            return worksapceId;
        } else{
            return null;
        }
        
    }
}