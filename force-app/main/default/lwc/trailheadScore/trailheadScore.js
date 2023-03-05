import { LightningElement , track} from 'lwc';
import emplogo from '@salesforce/resourceUrl/testImages';
import dazeworkslogo from '@salesforce/resourceUrl/Score_dazeworks';
import getProfileValue  from '@salesforce/apex/trailheadScore.getProfileValue';
import getContact  from '@salesforce/apex/trailheadScore.getContact'; 
import getSkills  from '@salesforce/apex/trailheadScore.getSkills';

const columns = [
    { label: 'Label', fieldName: 'name', type: 'text' },
    { label: 'col2', fieldName: 'col2', type: 'text'},
];

export default class TrailheadScore extends LightningElement {
emp_logo = emplogo;
dazeworks_logo = dazeworkslogo;
experience;
project;
certifications;
trailheadBadges;
Name;
Title;
linkedInLink;

salesCloudSP = 0;
experienceCloudSP = 0;
serviceCloudSP = 0;
apexSP = 0;
lightningPSP = 0;
integrationSP = 0;

soqlTP = 0;
vfTP = 0;
soslTP = 0;
jsTP = 0;
restTP = 0;
auraTP = 0;
apexTP = 0;
lwcTP = 0;
htmlTP = 0;
soapTP = 0;

//@track

connectedCallback() { 
    //console.log('-InHi-');
    
    getProfileValue({ pId : 'a201s000002AHpnAAG' } )
        .then(result => {
            
            this.experience = result.Total_Years_of_Exp__c;
            this.project = result.Number_of_Projects_Completed__c;
            this.certifications = result.Number_Salesforce_Certification__c;
            this.trailheadBadges = result.Number_of_Trailhead_Badges__c;
            this.about = result.About__c;
        })
        .catch(error => {
            
            this.error = error;
        });

        getContact()
        .then(result => {
            //console.log('results-'+JSON.stringify(result));
            this.Name = result.Name;
            this.Title = result.Title;
            this.linkedInLink = result.LinkedIn_Link__c;
        })
        .catch(error => {
            //console.log('-error-',JSON.stringify(error));
            this.error = error;
        });

            getSkills()
        .then(result => {
            //console.log('res--',JSON.stringify(result));
            for(let obj in result) {
                 //console.log('hi--'+result[obj].recordTypeName);
                if(result[obj].recordTypeName == 'SALESFORCE PROFICIENCY') {
                    //console.log('resIN--',JSON.stringify(result));
                    //console.log('obj.slillName--'+obj.slillName);  
                    if(result[obj].slillName == 'Sales Cloud'){
                       this.salesCloudSP = result[obj].skillCount;
                       
                    } else if(result[obj].slillName == 'Experience Cloud') {
                        this.experienceCloudSP = result[obj].skillCount;
                    } else if(result[obj].slillName == 'Service Cloud') {
                       this.serviceCloudSP = result[obj].skillCount;
                    } else if(result[obj].slillName == 'Apex') {
                       this.apexSP = result[obj].skillCount;
                    } else if(result[obj].slillName == 'Lightning Platform') {
                       this.lightningPSP = result[obj].skillCount;
                    } else if(result[obj].slillName  == 'Integration') {
                       this.integrationSP = result[obj].skillCount;
                    } 
                }
                //console.log(this.salesCloudSP+'-salesCloudSP-'+this.experienceCloudSP);
                if(result[obj].recordTypeName == 'TECHNICAL PROFICIENCY') { 
                    if(result[obj].slillName == 'SOQL'){
                        this.soqlTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'Visualforce') {
                            this.vfTP =result[obj].skillCount;
                        } else if(result[obj].slillName == 'SOSL') {
                            this.soslTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'Javascript') {
                            this.jsTP =result[obj].skillCount;
                        } else if(result[obj].slillName == 'REST') {
                            this.restTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'AURA') {
                            this.auraTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'APEX') {
                            this.apexTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'LWC') {
                            this.lwcTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'HTML') {
                            this.htmlTP = result[obj].skillCount;
                        } else if(result[obj].slillName == 'SOAP') {
                            this.soapTP = result[obj].skillCount;
                        }
                                        }
                
            }
            
        })
        .catch(error => {
            //console.log('-error-',JSON.stringify(error));
            this.error = error;
        });
}

pslist = [
    {
            Id: 1, 
        Title: 'Total 18+ year’s experience in IT Industry',
    },
    {
        Id: 2,
        Title: '7+ years in Salesforce Development & Architecture',
    },
    {
        Id: 3,
        Title: 'Proficient in Solutioning and Application Designing',
    },
        {
        Id: 4,
        Title: 'Handled more than 25 sprint demos from a project',
    },
    {
            Id: 5, 
        Title: 'Very good working experience on offshore and onsite model',
    },
    {
        Id: 6,
        Title: '7+ years in Salesforce Development & Architecture',
    },
    {
        Id: 7,
        Title: 'Experience in implementation, customization and integration',
    },
];

sclist = [
    {
            Id: 1, 
        Title: 'Salesforce Certified Platform Developer II',
    },
    {
        Id: 2,
        Title: 'Salesforce Certified Platform Developer I',
    },
    {
        Id: 3,
        Title: 'Salesforce Certified Sales Cloud Consultant',
    },
        {
        Id: 4,
        Title: 'Salesforce Certified Platform App Builder',
    },
    {
            Id: 5, 
        Title: 'Very good working experience on offshore and onsite model',
    },
    
];
}