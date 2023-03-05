/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-02-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-02-2022   Shivam Kumar   Initial Version
**/
import { LightningElement,api } from 'lwc';

export default class LeaveContainer extends LightningElement {
    @api empid;
    connectedCallback(){
        //console.log('inside cb::'+this.empid);
    }
    handleCreateRecords(event){
        //console.log('inside parent');
        this.template.querySelector('c-leave-history-table').handleRefresh();
        this.template.querySelector('c-dashboard').refreshDashboard();
    }
}