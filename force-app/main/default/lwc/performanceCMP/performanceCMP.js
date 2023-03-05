/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 07-29-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   07-05-2022   Anuj Panwar   Initial Version
**/
import { LightningElement, track, wire, api } from 'lwc';
import getContact from '@salesforce/apex/PerformanceController.getContacts';
import getTitle from '@salesforce/apex/fetchEmployee.getEmployeeDesignation';
import createPerformance from '@salesforce/apex/PerformanceController.createPerformance';
import createGoalByPerformance from '@salesforce/apex/PerformanceController.createGoalByPerformance';
import fetchPerformance from '@salesforce/apex/PerformanceController.fetchPerformance';
import fetchGoals from '@salesforce/apex/PerformanceController.fetchGoals';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import performanceObj from '@salesforce/schema/Performance__c';
import SESSION_FIELD from '@salesforce/schema/Performance__c.Session__c';
import FINAL_FIELD from '@salesforce/schema/Performance__c.Final_Performance_Rating__c';
import REVIEW_FIELD from '@salesforce/schema/Performance__c.Type_of_Review__c';
import EMP_RATING from '@salesforce/schema/Performance__c.Employee_Rating_by_Manager__c';
import { ShowToastEvent } from "lightning/platformShowToastEvent";



import PerformanceEndDate from '@salesforce/label/c.PerformanceEndDate';
import PerformanceLogin from '@salesforce/label/c.empPerfManagment'; 
import Employee from '@salesforce/label/c.Employee';
import Manager from '@salesforce/label/c.Manager';
import FromDate from '@salesforce/label/c.From';
import TillDate from '@salesforce/label/c.Till';
import KRAGoalsName from '@salesforce/label/c.KRA_Goals_Name';
import Weightage from '@salesforce/label/c.Weightage';
import EmployeeComment from '@salesforce/label/c.Employee_Comment';
import ManagerComment from '@salesforce/label/c.Manager_Comment';
import OperationalExcellence from '@salesforce/label/c.Operational_Excellence';
import SustainableGrowth from '@salesforce/label/c.Sustainable_Growth';
import EaseEngagement from '@salesforce/label/c.Ease_of_Engagement';
import EmployeeConnect from '@salesforce/label/c.Employee_Connect';
import ProactiveSkillUpgradation from '@salesforce/label/c.Proactive_Skill_Upgradation';
import FinancialPerformance from '@salesforce/label/c.Financial_Performance';
import EmployeeRatingManager from '@salesforce/label/c.Employee_Rating_by_Manager';
import FinalPerformanceRating from '@salesforce/label/c.Final_Performance_Rating';
import OverallSummaryManager from '@salesforce/label/c.Overall_Summary_By_Manager';
import GoalsDescription from '@salesforce/label/c.Goals_Description';
import Type from '@salesforce/schema/Account.Type';

export default class PerformanceCMP extends LightningElement {

    label = {
        PerformanceLogin, Employee, Manager, FromDate, TillDate, KRAGoalsName, Weightage, EmployeeComment,
        ManagerComment, OperationalExcellence, SustainableGrowth, EaseEngagement, EmployeeConnect, ProactiveSkillUpgradation,
        FinancialPerformance, EmployeeRatingManager, FinalPerformanceRating, OverallSummaryManager, GoalsDescription
    };

    managerDisabled = false;

    @track editEndDate = PerformanceEndDate;
    isManager = true;
    isEmployee = false;
    @api recid;
    @api empid;
    @api new;
    @api view;
    @api edit;
    @api department;
    @api session;
    hideEmpComm =false;
    notInitial=true;
    isEditMode = false;
    isNewMode = false;
    isViewMode = false;

    targetValue = 'UP - PME - SME - EE - OSP -';

    isLoading = false;
    readOnly = true;
    showFinalYear = true
    showMidYear = true
    midWidth = '10%'
    finalWidht = '10%'
    colSpan = '2'
    empTitle = ''
    @track managerValue;
    pick;
    @track items = [];
    @track value = '';
    @track error;
    @track employeeSelectionVal = '';
    @track reviewTypes = []
    @track finalTypes = []
    @track sessionTypes = []
    @track ratingOptions = []
    @track readOnlyEmployeeMidComment = false;
    loading = false;
    @track empCanEdit = true;
    @track name;
    @track disbaleForMan = false;
    @track from;
    @track till;

    @track performanceData =
        {
            Employee__c: '', Manager__c: '', Session__c: '', Type_of_Review__c: '', Employee_Rating_by_Manager__c: '',
            Final_Performance_Rating__c: '', Overall_Summery_By_Manager__c: ''
        }

    @track data = [
        { id: 1, Name: '', Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },
        { id: 2, Name: '', Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },
        { id: 3, Name: '', Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },
        { id: 4, Name: '', Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },
        { id: 5, Name: '', Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },
       // { id: 6, Name: FinancialPerformance, Goal_Description__c: '', Goal_Weightage__c: '', Performance_Target__c: this.targetValue, Goal_Half_Yearly_Comments_Employee__c: '', Goal_Yearly_Comments_Employee__c: '', Goal_Half_Yearly_Comments_Manager__c: '', Goal_Yearly_Comments_Manager__c: '' },

    ];

    checkWeightage() {
        const n = this.data.reduce((value, obj) => +(obj.Goal_Weightage__c) + value, 0)
        //console.log('n :>> ', n);
        if (n == 100) {
            this.savePerformance();
        }
        else {
            this.displayMessage('Invalid Weightage', 'error', 'Please set Weightage sum as 100');
        }
    }



    @track rating = [];
    @track overallSummaryManagerVal;
    @track employeeRatingManagerVal;
    @track finalPerformanceRatingVal;

    @wire(getObjectInfo, { objectApiName: performanceObj })
    objectInfo({ data, error }) {
        if (data) {
            const rtInfos = data.recordTypeInfos;
            let rtValues = Object.values(rtInfos);
            for (let i = 0; i < rtValues.length; i++) {


                if (rtValues[i].name === 'Employee Performance Management') {

                    this.performanceData.RecordTypeId = rtValues[i].recordTypeId;

                    this.pick = rtValues[i].recordTypeId;
                    //  console.log('recType :>> ', this.performanceData.RecordTypeId);

                }

            }
        }
        else if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValues, { recordTypeId: "$pick", fieldApiName: SESSION_FIELD })
    sessionField({ data, error }) {
        this.sessionTypes = undefined
        if (data) {
            this.sessionTypes = data.values

        }
        else if (error) {
            this.error = error;
        }
    }
    @wire(getPicklistValues, { recordTypeId: "$pick", fieldApiName: FINAL_FIELD })
    finalField({ data, error }) {
        this.finalTypes = undefined
        if (data) {
            this.finalTypes = data.values

        }
        else if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValues, { recordTypeId: "$pick", fieldApiName: REVIEW_FIELD })
    reviewField({ data, error }) {

        if (data) {
            this.reviewTypes = data.values
            // console.log('viewmodeisemp',this.isEmployee);
            if (this.isEmployee) {
                this.reviewTypes = this.reviewTypes.filter(value => value.label !== 'Initial')
                // console.log(this.reviewTypes);
            }

        }
        else if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$pick', fieldApiName: EMP_RATING })
    empRating({ data, error }) {
        this.ratingOptions = undefined
        if (data) {
            this.ratingOptions = JSON.parse(JSON.stringify(data.values));
            //console.log('this.ratingOptions :>> ', this.ratingOptions);
            let i =1
            this.ratingOptions.forEach(element => {
               
                element.label = i+' - '+element.label
                i++
            });

        }
        else if (error) {
            this.error = error;
        }
    }




    connectedCallback() {

    
        const ses = this.session;
        this.performanceData.Session__c = ses;

        var today1 = new Date();
       
        var dd = String(today1.getDate()).padStart(2, '0');
        var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today1.getFullYear();

        today1 = mm + '/' + dd + '/' + yyyy;
       
        let myDate = new Date(this.editEndDate);
        let curDate = new Date(today1);

       //console.log('myDate :>> ', myDate);
       //console.log('curDate :>> ', curDate);
        if(myDate >= curDate)
        {

            this.empCanEdit = true;
        }
        else
        {
            this.empCanEdit = false;
        }
      

        if (this.new) {
            this.isNewMode = true;
            this.readOnly = false;
            this.managerValue = this.empid;
            this.performanceData.Manager__c = this.managerValue;

        }
        else if (this.edit) {
            this.loading = true;
            this.isEditMode = true;
            this.fetchData();
        }
        else if (this.view) {
            this.isViewMode = true;
            this.readOnlyEmployeeMidComment = true;
            this.managerDisabled = true;
            
            this.loading = true;
            this.fetchData();
            this.readOnly = true;
        }


        if (this.department === 'hr') {

            this.departmentType = 'Human Resource';
        }
        if (this.department === 'sales') {

            this.departmentType = 'Sales';
        }
        if (this.department === 'market') {

            this.departmentType = 'Marketing';
        }
        if (this.department === 'del') {

            this.departmentType = 'Delivery';
        }


    }

    disconnectedCallback() {
        // console.log('disc');
    }

    fetchData() {
        // console.log('id',this.empid)
        fetchPerformance({ pId: this.recid })
            .then(res => {

                let pdata = JSON.parse(JSON.stringify(res));
               
                this.performanceData = pdata;
                this.managerValue = this.performanceData.Manager__c;
                let rvType = this.performanceData.Type_of_Review__c;
                let rid = this.performanceData.Employee__c;
                let approve = this.performanceData.Approved__c;


                if (approve) {
                    if (this.isEditMode) {
                        this.isEditMode = false;
                        this.isViewMode = true;
                        this.readOnlyEmployeeMidComment = true;
                        this.managerDisabled = true;

                        this.displayMessage('Can not edit this record', 'error', 'already approved by manager');
                    }
                    else if (this.isViewMode) {
                        this.displayMessage('Approved', 'success', 'already approved by manager');

                    }

                }


                if (this.empid === this.managerValue) {
                    this.isManager = true;
                    this.isEmployee = false;
                    this.disbaleForMan = true;
                    this.managerDisabled = true;
                    this.handleReviewType(rvType);

                }
                else if (this.empid === rid) {
                    this.isEmployee = true;
                    this.isManager = false;
                    //this.showMidYear=false;
                    if (this.isEditMode) {
                        if (!this.empCanEdit) {
                            this.isEditMode = false;
                            this.isViewMode = true;
                            this.readOnlyEmployeeMidComment = true;

                            this.displayMessage('Submission time Over', 'warning', 'Last date to submit your review is over');

                        }
                       
                    }
                    if (this.reviewTypes) {
                        this.reviewTypes = this.reviewTypes.filter(value => value.label !== 'Initial')
                       /* if (rvType == 'Initial') {
                            rvType = 'Mid';
                        }*/
                        this.handleReviewType(rvType);

                    }


                }

                // console.log('managermode',this.isManager);
                // console.log('empMode',this.isEmployee);


                this.getDesignation(rid);
                //   console.log('pd',this.performanceData)

            })

        fetchGoals({ gId: this.recid })
            .then(res => {

                // console.log(JSON.parse(JSON.stringify(res)));

                this.data = JSON.parse(JSON.stringify(res));

                this.loading = false;
            })
    }

    addRow(e) {
        if (this.new) {
            this.data.push({
                // id: Math.floor(Math.random() * 90 + 10),
                id: this.data.length + 1,
                Name: '',
                Goal_Description__c: '',
                Goal_Weightage__c: '',
                Performance_Target__c: this.targetValue,
                Goal_Half_Yearly_Comments_Employee__c: '',
                Goal_Yearly_Comments_Employee__c: '',
                Goal_Half_Yearly_Comments_Manager__c: '',
                Goal_Yearly_Comments_Manager__c: ''



            })

        }

    }



    @wire(getContact) wiredgetContact({ error, data }) {
        if (data) {
            // console.log('this.items 1 ' + JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label: data[i].Name + "  - " + data[i].Employee_ID__c }];
            }
            //   console.log('this.items 2 ' + JSON.stringify(this.items));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
    }


    get employeeOptions() {
        return this.items;
    }



    handleEmployeeSelectionChange(event) {

        let empId = event.target.value;
        this.performanceData.Employee__c = empId;

        this.getDesignation(empId)
    }


    handlePerformanceChange(e) {

        this.performanceData[e.target.name] = e.target.value;


        if (e.target.name === 'Type_of_Review__c') {
            this.isLoading = true
            this.handleReviewType(e.target.value);

        }




    }

    handleManagerValue(e) {
        let managerId = JSON.parse(JSON.stringify(e.detail));
        //  this.empid = managerId[0];
        this.performanceData.Manager__c = managerId[0];
    }

    getDesignation(i) {
        getTitle({ id: i })
            .then(res => {

                this.empTitle = res.Title;
                this.managerValue = res.ReportsToId;
                if (this.managerValue) {

                    this.performanceData.Manager__c = this.managerValue
                }
               
                // console.log('manager :>> ', this.performanceData.Manager__c);

            })
            .catch(error => {
                //console.log('error', error)
                this.error = error
            })
    }

    // handleUpdate()
    // {
    //     const allCBValid = [...this.template.querySelectorAll("lightning-combobox")].reduce((validSoFar, inputCmp) => {
    //         inputCmp.reportValidity();
    //         return validSoFar && inputCmp.checkValidity();
    //     }, true);
    //     if ( allCBValid) {
    //        console.log('pdata',this.performanceData);
    //        console.log('gdata',this.data);
    //     }
    //     else {
    //         this.isLoading = false;
    //         this.displayMessage("Please check your entries.", "error", "You may have missed a required field.");
    //     }
    // }

    handleSave(e) {
        this.Loading = true;

        const allCBValid = [...this.template.querySelectorAll("lightning-combobox")].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if (allCBValid) {
            // this.savePerformance();

            //   console.log('data',JSON.parse(JSON.stringify(this.data)));
            this.checkWeightage();
        }
        else {
            this.isLoading = false;
            this.displayMessage("Please check your entries.", "error", "You may have missed a required field.");
        }

    }

    removeid() {
        this.data = this.data.map(obj => {

            delete obj.id
            return obj
        })
    }

    savePerformance() {
        if (this.isNewMode) {
            this.performanceData.Created_By_Contact__c = this.empid;
            this.performanceData.Last_Modified_By__c = this.empid;
            this.performanceData.Department__c = this.departmentType;

        }
        else if (this.isEditMode) {
            this.performanceData.Last_Modified_By__c = this.empid;
        }

        // console.log('pd',this.performanceData);

        createPerformance({ per: JSON.stringify(this.performanceData) })
            .then(res => {
                if (this.isNewMode) {
                    // console.log('this.isNewMode :>> ', this.isNewMode);
                    this.performanceData.Created_By_Contact__c = this.empid;
                    this.saveGoal(res);

                }
                else if (this.isEditMode) {
                    // console.log('this.isEditMode :>> ', this.isEditMode);
                    this.updateGoal();
                }

            })
            .catch(error => {
                //console.log('e', error)
                this.displayMessage('error', 'error', 'Some error Occured');
            })
    }

    saveGoal(pId) {
        this.data = this.data.filter(o => { return o.Name !== '' || undefined || null })

        this.removeid();

        var dataTemp = this.data;
        for (let i = 0; i < dataTemp.length; i++) {

            dataTemp[i].Performance__c = pId;
        }
        this.data = dataTemp;

        // console.log('data',this.data);
        createGoalByPerformance({ per: JSON.stringify(this.data) })
            .then(res => {
                // console.log('Created');
                this.displayMessage("Success", "success", "Record Created Succesfully");
                this.isLoading = false;
                this.handleBack();
            })
            .catch(error => {
                //console.log('e', error)
                this.displayMessage('error', 'error', 'Some error Occured');
            })
    }

    updateGoal() {
        this.data = this.data.filter(o => { return o.Name !== '' || undefined || null })

        //this.removeid();
        //console.log('upd',JSON.parse(JSON.stringify(this.data)));
        createGoalByPerformance({ per: JSON.stringify(this.data) })
            .then(res => {

                this.displayMessage("Success", "success", "Record Updated Succesfully");
                this.loading = false;
                this.handleBack();

            })
            .catch(error => {
                //console.log('e', error)
                this.displayMessage('error', 'error', error.body.message);
            })
    }

    handleReviewType(e) {
        let val = e


        if (this.isEditMode || this.isNewMode) {
            if (val === 'Initial') {
                this.readOnly = false
                this.showFinalYear = false
                this.showMidYear = false
                this.midWidth = '10%'
                this.finalWidht = '10%'
                this.colSpan = '2'
                this.notInitial=false
            }



            if (val === 'Mid') {
                this.showFinalYear = false
                this.showMidYear = true;
                this.midWidth = '15%'
                this.colSpan = '1'
                this.readOnly = true;
                this.notInitial=true;
                    this.readOnlyEmployeeMidComment = false;
                    this.hideEmpComm=true;
                

            }
            else if (val === 'Final') {
                if(this.isEditMode)
                {
                    this.readOnlyEmployeeMidComment = true;
                }
                   
                this.notInitial=true;
                this.showFinalYear = true
                this.showMidYear = false;
                // this.midWidth = '10%'
                this.finalWidht = '15%'
                this.colSpan = '1'
                this.readOnly = true;
                this.hideEmpComm=true;
            }
        }
        if (this.isViewMode) {

            if (val === 'Initial') {
                this.readOnly = true
                this.showFinalYear = false
                this.showMidYear = false
                this.midWidth = '10%'
                this.finalWidht = '10%'
                this.colSpan = '2'
                this.notInitial=false
            }



            if (val === 'Mid') {
                this.showFinalYear = false
                this.showMidYear = true;
                this.midWidth = '15%'
                this.colSpan = '1'
                this.readOnly = true;
                this.notInitial=true
                this.hideEmpComm=true;

            }
            else if (val === 'Final') {

                this.showFinalYear = true
                this.showMidYear = false;
                // this.midWidth = '10%'
                this.finalWidht = '15%'
                this.colSpan = '1'
                this.readOnly = true;
                this.notInitial=true
                this.hideEmpComm=true;
            }
        }

        this.isLoading = false
    }

    hanldeText(event) {
        //   console.log('name',e.target.dataset.name);

        this.data[event.currentTarget.dataset.index][event.target.name] = event.target.value;
        // var dataTemp = this.data;
        // for(let i=0;i<dataTemp.length;i++){
        //     if(dataTemp[i].Name == e.target.dataset.name)
        //     {
        //         dataTemp[i][e.target.name] = e.target.value;
        //     }
        // }
        // this.data = dataTemp ;
        // console.log('data', JSON.stringify(this.data));
    }

    displayMessage(title, type, message) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: type,
            mode: 'dismissable'
        }));
    }

    handleBack() {
        const backEvent = new CustomEvent('backevent', {

        });
        //dispatching the custom event
        this.dispatchEvent(backEvent);
    }

}