import { LightningElement, track } from 'lwc';

export default class inductionFormContainer extends LightningElement {
    @track showCertification = false;
    @track showLogin=true;

    empid;
    emplName;
    connectedCallback(){
        //console.log('inside cb::'+this.empid);
    }
    hendleNext(event){
        this.empid = event.detail.empId;
        this.emplName = event.detail.emName;
        this.showLogin=false;
        this.showCertification=true;
    }
}