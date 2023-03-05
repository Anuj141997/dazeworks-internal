import { LightningElement, track } from 'lwc';

export default class ParentDepartmentPage extends LightningElement {
    @track evtName;
    handleUpload(event){
        this.evtName= event.detail;
    }
}