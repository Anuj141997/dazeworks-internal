public class createResources {
    public static void createResourceRecords (){
        Boolean noResources = true;
        List<Resource__c> resourceList = new List<Resource__c>();
        List<Contact> contactList = [SELECT Id,Active__c, (Select Id from Resources__r) FROM Contact where (RecordType.Name =:'Employee' AND Active__c = true ) OR ( RecordType.name =: 'ProfessionalConsultant' AND Active__c = true)];
        for (Contact conRecord : contactList){
            noResources = true;
            for(Resource__c resourceRecord : conRecord.Resources__r){
                noResources = false;
            }
            if(noResources){
                Resource__c newResource = new Resource__c();
                newResource.Active__c = conRecord.Active__c;
                newResource.Resource_Name__c = conRecord.Id;
                resourceList.add(newResource);
            }
            
        }
        insert resourceList;
    }

}