/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 07-02-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   07-01-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track, api } from 'lwc';
import getPicklist from '@salesforce/apex/Certification.getPicklist';
import createCertification from '@salesforce/apex/Certification.createCertification';
import CertificationList from '@salesforce/apex/Certification.getCertificateList';
import updateCertificate from '@salesforce/apex/Certification.updateCert';

const columns = [
    { label: 'Certification Date', fieldName: 'Certification_Date__c',},
    { label: 'Type of Certificate', fieldName: 'Type_of_Certificate__c'},
    { label: 'Other', fieldName: 'Other__c', type: 'Date',},
    {   label: 'Edit',
        type: "button-icon",
        fixedWidth: 100,
        typeAttributes: {
            iconName: 'action:edit',
            disabled: { fieldName: 'isEdit' },
            label: 'Edit',
            name: 'Edit',
            variant: 'Success',
            title:'Edit',
            
        }
    }
];
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CertificationDWEMP extends LightningElement {

    @api employID;
    @track CertList = [{
        EmpName: this.emName,
        EmployeIds: this.EmployeeId,
        CertificateDate: '',
        Certication: '',
        Others: '',
        key: this.index,
        indexes:1
    }];
    @track index = 0;
    @api recordId;
    @track Empname = '';
    @track EmployeeId = this.empid;
    @track certDate = '';
    @track Certificate;
    @track other = '';
    @track CertType;
    @track certValue;
    @api empId;
    @api emName;
    @api empName;
    certModal = false;
    closeCertModal=false
    certCloseModal=false;

    isLoaded = false;

    @track certificationList;
    columns =columns;
    certcRec = {
        EmpName: this.emName,
        EmployeIds: this.EmployeeId,
        CertificateDate: '',
        Certication: '',
        Others: '',
        key: ''
    }

    closeCreateModal(){
        this.certModal=false;
    }    
    openCreateModal(){
        this.certModal=true;
        
    }

    addRow() {
        //console.log('index:::', this.index);
        
        this.certcRec.key = this.CertList.length;
        this.CertList.push(JSON.parse(JSON.stringify(this.certcRec)));
        //console.log('Enter ', this.CertList);
        //console.log('Shivam:::>>>>' + this.empId);
        //console.log('emp Name ::: ', this.emName);
        for (let i = 0; i < this.CertList.length; i++) {
            this.CertList[i].indexes = i + 1;
            this.CertList[i].disableText = true;
        }


    }

    removeRow(event) {

        //console.log('empId:: ', this.EmployeeId);
        this.isLoaded = true;
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        if (this.CertList.length > 1) {
            this.CertList.splice(key, 1);
            this.index--;
            this.isLoaded = false;
        } else if (this.CertList.length == 1) {
            this.CertList = [];
            this.index = 0;
            this.isLoaded = false;
        }

    }



    handleCerticationChange(event) {
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.CertList[key];
        this.CertList[key].Certication = event.target.value;
        this.CertList[key].disableText = true;
        this.Certificate = this.CertList[key].Certication;
        if (this.Certificate == "Other") {
            this.CertList[key].disableText = false;
        }
        //console.log('key certificate:: ' + this.CertList[key].Certication);
        //console.log(' certi :: ' + this.Certificate);
        //console.log(' this.certcRec.key:: ' + this.certcRec.key);
        //console.log(' this.index:: ' + this.index);
        //console.log('the list is ==>' + JSON.stringify(this.CertList));

    }

    handlecertDateChange(event) {

        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.CertList[key];
        this.CertList[key].CertificateDate = event.target.value;
        this.certDate = this.CertList[key].CertificateDate
        //console.log('key cert date:: ' + this.CertList[key].CertificateDate);
        //console.log(' cert date :: ' + this.certDate);
        //console.log(' this.certcRec.key:: ' + this.certcRec.key);
        //console.log(' this.index:: ' + this.index);
    }

    handletOthersChange(event) {
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.CertList[key];
        this.CertList[key].Others = event.target.value;
        this.other = this.CertList[key].Others;
        //console.log('key cert date:: ' + this.CertList[key].Others);
        //console.log(' cert date :: ' + this.other);
        //console.log(' this.certcRec.key:: ' + this.certcRec.key);
        //console.log(' this.index:: ' + this.index);
    }

    /*saveRecord() {
        
            
    }*/
    connectedCallback() {

        //console.log('inside cb LT child ::' + this.empId);
        //console.log('emp Name cb ::: ', this.emName);
        getPicklist({ objectName: 'Certification__c', fieldName: 'Type_of_Certificate__c' })
            .then(result => {
                this.CertType = result;
                //console.log('certype::', this.CertType);
            })
            .catch(error => {
                //console.log(error);
            });


        //console.log('emp Id for list 1 ::' + this.empId);
        CertificationList({ empId: this.empId})
       
            .then(result => {
                //console.log('data::',JSON.stringify(this.result));
                //console.log('emp Id for list 1 : ', this.empId);
                this.certificationList = result;
                
                // console.log(this.LeaveList[0]);
            })
            .catch(error => {
                //console.log('check error::' + error);
                //console.log('check error::' + error.message);
                //this.errorMsg=error.message;
            });


    }

    saveCertificate() {
      
        //console.log('cert list data ::: ', this.CertList);
        createCertification({ certificate: this.CertList, EmpId: this.empId })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.certcRec.CertificateDate = '';
                    this.certcRec.Certication = '';
                    this.certcRec.Others = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Your Crtificate is Submitted Successfully',
                            variant: 'success',
                        }),
                    );
                    this.connectedCallback();
                    this.certModal=false;
                }
                this.CertList = [];
                //console.log(JSON.stringify(result));
                //console.log("result", this.message);
              
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Something went wrong!!! pelase try again',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                //console.log("error", JSON.stringify(this.error));
            });

    }
    
    @track certDateForEdit=[];
    @track certpickForEdit;
    @track certOtherForEdit;
    @track isModal=false;
    @track recId;
    @track otherDisable=true;
   

    onRowUpdate(event){
        const recordId = event.detail.row;
        //console.log('rec Id >>', JSON.parse(JSON.stringify(recordId)));
        //console.log('rec Id >>', JSON.parse(JSON.stringify(recordId.Id)));
        //console.log('type of recordId::', typeof recordId);
        //console.log('Date ::', recordId.Type_of_Certificate__c);
        const action = event.detail.action;
        //console.log('action >>', action.name);
        this.certDateForEdit = recordId.Certification_Date__c;
        this.certOtherForEdit = recordId.Other__c;
        this.certpickForEdit = recordId.Type_of_Certificate__c;
        this.recId = recordId.Id;
        //console.log('Date for edit:::',this.certDateForEdit);
        //console.log('pick for edit:::',this.certpickForEdit);
        //console.log('other for edit:::',this.certOtherForEdit);

        if(action.name=='Edit'){
            this.isModal=true;
        }
       
        
        
    }
    closeModal(){
        this.isModal=false;
    }

    handleDateEditChange(event){
        this.certDateForEdit=event.target.value;
        //console.log('cert edit new date::',this.certDateForEdit);
    }
    handleCerticationEditChange(event){
        this.certpickForEdit=event.target.value;
        //console.log('cert edit new Value::',this.certpickForEdit);
        if(this.certpickForEdit=="Other"){
            this.otherDisable=false;
        }else{
            this.otherDisable=true;
        }
    }
    handletOthersEditChange(event){
        this.certOtherForEdit=event.target.value;
        //console.log('cert edit new others::',this.certOtherForEdit);
    }
    resultData;
    updateRecord(){
        
        updateCertificate({recId: this.recId, certDate: this.certDateForEdit, certValue: this.certpickForEdit, certOthers: this.certOtherForEdit })
        .then(result => {
            this.resultData = result;
            //console.log('record :: ', this.resultData);
            //console.log('submitted updated record')
            this.connectedCallback();
            this.isModal=false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Your Certificate is Updated successfully',
                    variant: 'success',
                }),
            );

        }).catch(error => {
            let errormssg=error;
            //console.log('error message::', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Something Went Wrong!!! Please try again',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        })

    }


    


}