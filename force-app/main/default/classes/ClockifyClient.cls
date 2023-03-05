public class ClockifyClient {
    
    public static HttpResponse findClientsOnWorkspace(String WorkspaceId){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.clockify.me/api/v1/workspaces/'+workspaceId+'/clients/');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setHeader('X-Api-Key', 'MThmNmNkYmQtZjhmMy00M2VhLTg4MjEtOTJmMDJjZDliYWI1');
        HttpResponse response = http.send(request);
        List<Object> results = (List<Object>) JSON.deserializeUntyped(response.getBody());
        System.debug(results);        
        return response;
    }    
}