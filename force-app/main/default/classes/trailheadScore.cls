public class trailheadScore {
    
    @AuraEnabled
    public static Profile__c getProfileValue(String pId)
    {  System.debug('pId:::'+pId);
     List<Profile__c> profile = [Select Id,About__c,Total_Years_of_Exp__c,Number_of_Projects_Completed__c,Number_Salesforce_Certification__c,
                                 Number_of_Trailhead_Badges__c from Profile__c where Id = 'a201s000002AHpnAAG'];
     
     if(profile.size() > 0) {
         return profile[0];
     }
     return null;
     
    }
    
    @AuraEnabled
    public static Contact getContact(String cId)
    {
        List<Contact> lstContact = [Select Id,Name,Title,LinkedIn_Link__c
                                    from Contact where Id = '0031s00000nuB2VAAU'];
        
        if(lstContact.size() > 0) {
            return lstContact[0];
        }
        return null;
        
    }
    
    @AuraEnabled
    public static List<trailheadScore.skillsWrap> getSkills()
    {
        List<trailheadScore.skillsWrap> listSkillWrap = new List<trailheadScore.skillsWrap>();
        
        List<AggregateResult> lstIESkill = [select Name,Count(id) num 
                                            from Skills__c 
                                            where RecordType.Name= 'INDUSTRY EXPERTISE' group by Name];
        
        if(lstIESkill.size() > 0) {
            for(AggregateResult obj : lstIESkill) {
                trailheadScore.skillsWrap objSkill = new trailheadScore.skillsWrap();
                objSkill.slillName = string.valueof(obj.get('Name'));
                objSkill.skillCount = integer.valueof(obj.get('num'));
                objSkill.recordTypeName = 'INDUSTRY EXPERTISE';
                listSkillWrap.add(objSkill);
            }
        }
        
        List<AggregateResult> lstSPSkill = [select Name,Count(id) num
                                            from Skills__c 
                                            where RecordType.Name= 'SALESFORCE PROFICIENCY' group by Name];
        
        if(lstSPSkill.size() > 0) {
            for(AggregateResult obj : lstSPSkill) {
                trailheadScore.skillsWrap objSkill = new trailheadScore.skillsWrap();
                objSkill.slillName = string.valueof(obj.get('Name'));
                objSkill.skillCount = integer.valueof(obj.get('num'));
                objSkill.recordTypeName = 'SALESFORCE PROFICIENCY';
                listSkillWrap.add(objSkill);
            }
        }
        
        List<AggregateResult> lstTPSkill = [select Name,Count(id) num
                                            from Skills__c 
                                            where RecordType.Name= 'TECHNICAL PROFICIENCY' group by Name];
        
        if(lstTPSkill.size() > 0) {
            for(AggregateResult obj : lstTPSkill) {
                trailheadScore.skillsWrap objSkill = new trailheadScore.skillsWrap();
                objSkill.slillName = string.valueof(obj.get('Name'));
                objSkill.skillCount = integer.valueof(obj.get('num'));
                objSkill.recordTypeName = 'TECHNICAL PROFICIENCY';
                listSkillWrap.add(objSkill);
            }
        }
        system.debug(listSkillWrap.size()+'-listSkillWrap--'+listSkillWrap);
        return listSkillWrap;
    }
    
    public class skillsWrap {
        @AuraEnabled
        public string slillName;
        @AuraEnabled
        public Integer skillCount;
        @AuraEnabled
        public string recordTypeName;
    }                                 
}