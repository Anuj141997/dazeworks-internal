public class ClockifyProject {

    public static HttpResponse findProjectsOnWorkspace(String Apikey){
        String workspaceId = ClockifyWorkspace.findWorkspaceId(Apikey);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.clockify.me/api/v1/workspaces/'+workspaceId+'/projects/');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setHeader('X-Api-Key', ApiKey);
        HttpResponse response = http.send(request);
        List<Object> Projects = (List<Object>) JSON.deserializeUntyped(response.getBody());
        Set<String> projectNames = new Set<String>();
        Map<String,Object> projectMap = new Map<String,Object>();
        if(!Projects.isEmpty()){
            for(Object project: projects){
              projectMap = (Map<String,Object>)project;
              SYstem.debug((String)projectMap.get('name'));
            }
        }
        System.debug(Projects.size());
        System.debug(Projects);        
        return response;
    }    
}