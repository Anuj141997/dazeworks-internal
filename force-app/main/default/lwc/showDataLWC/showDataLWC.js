import { LightningElement } from 'lwc';
import TimesheetImage from '@salesforce/resourceUrl/TimesheetImage';
import empImages from '@salesforce/resourceUrl/EmployeeImage';
import rewardsImages from '@salesforce/resourceUrl/RewardsImage';
import policyImages from '@salesforce/resourceUrl/CompanyPolicyImage';
import payslipImages from '@salesforce/resourceUrl/payslipImage';
import RaiseTicketImage from '@salesforce/resourceUrl/RaiseTicketImage';


export default class ShowDataLWC extends LightningElement { 
    
    image1 = empImages;
    image2 = rewardsImages;
    image3 = policyImages;
    image4 = payslipImages;
    image5 = TimesheetImage;
    image6 = RaiseTicketImage;
    
}