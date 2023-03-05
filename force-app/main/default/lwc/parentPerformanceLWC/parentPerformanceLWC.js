import { LightningElement, track } from 'lwc';

export default class ParentPerformanceLWC extends LightningElement {
    @track evtName;
    handleUpload(event){
    this.evtName= event.name;
    }
}