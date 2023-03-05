/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 06-30-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   06-30-2022   Shivam Kumar   Initial Version
**/
import { LightningElement,api } from 'lwc';

export default class PerformanceParentCmp extends LightningElement {


    //empLogin=true;
    selectPerformance=true;
    sessionList=false;
    newPerf=false;
    awardNomination=false;
    epm=false;
    pbt=false;
    tpt=false;
    depart=false;
    loading=false;
    data=false;
    showPerformance=true;
    

    @api session;
    ptype;
    dtype;

    viewMode=false;
    editMode=false;
    newMode=false;

    @api empId; //holds logged in employee Id
    @api employeeId;
    recId; //holds record Id 
    recordType;  //holds recordType selected by User

    connectedCallback(){
        //console.log('employee Id :: ', this.employeeId);
    }

   
    
    handleEmployeeId(event)
    {
        this.empId = event.detail.employeeId;
        this.empLogin = false;
        this.sessionList = false;
        this.selectPerformance=true;
        this.newPerf = false;
        
    }

    handleRecordType(e)
    {
        this.recordType = e.detail.type;

        if(this.recordType === 'awrd')
        {
            this.awardNomination = true;
            this.selectPerformance = false;
            this.epm=false;
            
        }
        else if(this.recordType === 'epm')
        {
            this.epm = true;
            this.selectPerformance = false;
            this.awardNomination = false;
        }
        else if(this.recordType === 'pbt')
        {
            this.ptype='pbt';
            this.pbt = true;
            this.selectPerformance = false;
        }
        else if(this.recordType === 'tpt')
        {
            this.ptype='tpt';
            this.tpt = true;
            this.selectPerformance = false;
        }
    }
    handleNewRecord(e)
    {
        this.depart=true;
        this.epm=false;
       
    }

    handleDepartmentType(e)
    {
        this.dtype = e.detail.type;

        this.newPerf = true;
        this.depart = false;
        this.editMode=false;
        this.viewMode=false;
        this.newMode=true;
        

        
    }

    handleBack(e)
    {
        this.newPerf=false;
        this.sessionList=false;
        this.empLogin=false;
        this.selectPerformance=true;
        this.newPerf=false;
        this.awardNomination=false;
        this.epm=false;
        this.pbt=false;
        this.tpt=false;
        this.depart=false;

    }

    handleEdit(e)
    {
        this.recId = e.detail.recid;
        this.newPerf = true;
        this.depart = false;
        this.editMode=true;
        this.viewMode=false;
        this.newMode=false;
        this.epm=false;
    }
    handleView(e)
    {
        this.recId = e.detail.recid;
        this.newPerf = true;
        this.depart = false;
        this.editMode=false;
        this.viewMode=true;
        this.newMode=false;
        this.epm=false;
    }

    handleBack2()
    {
        this.newPerf=false;
        this.empLogin=false;
        this.selectPerformance=false;
        this.sessionList=false;
        this.newPerf=false;
        this.awardNomination=false;
        this.epm=true;
        this.pbt=false;
        this.tpt=false;
        this.depart=false;
    }
}