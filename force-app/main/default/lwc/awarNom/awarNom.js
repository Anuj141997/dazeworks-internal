import { LightningElement,track,api,wire } from 'lwc';
import getContact from '@salesforce/apex/PerformanceController.getContacts';

import PerformanceLogin from '@salesforce/label/c.Performance_Login';
import Employee from '@salesforce/label/c.Employee';
import Manager from '@salesforce/label/c.Manager';
import FromDate from '@salesforce/label/c.From';
import TillDate from '@salesforce/label/c.Till';
import AwardType from '@salesforce/label/c.AwardType';
import NominatedBy from '@salesforce/label/c.NominatedBy';
import JustificationPoints from '@salesforce/label/c.JustificationPoints';

export default class AwarNom extends LightningElement {

    @track items=[];
    empValue


    label=
    {
        PerformanceLogin,Employee,Manager,FromDate,TillDate,AwardType,NominatedBy,JustificationPoints
    }

    handleValue(e)
    {
        alert(e.detail)
    }

    handleEmployeeChange(e)
    {
        this.value = e.target.value
    }

    @wire(getContact)wiredgetContact({ error, data }) {
        if (data) {
            //console.log('data',data)
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label:  data[i].Employee_ID__c}];
            }
            //console.log('this.items 2 ' + JSON.stringify(this.items));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
    }
}