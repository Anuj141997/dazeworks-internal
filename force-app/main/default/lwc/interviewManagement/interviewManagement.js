import { LightningElement,track,api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getInterviewList from '@salesforce/apex/interviewManagement.getInterviewList';
import updateInterviewList from '@salesforce/apex/interviewManagement.updateInterviewList';
import updateInterviewOnSubmit from '@salesforce/apex/interviewManagement.updateInterviewOnSubmit';
import onRecord from '@salesforce/resourceUrl/noRecords';
import selectRecordForRating from '@salesforce/resourceUrl/selectRecordForRating';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const options = [
    {label:'---None---', value:''},
    { label:'L1', value:'L1' },
    { label:'L2', value:'L2' },
    { label:'L3', value:'L3' },
    { label:'L4', value:'L4' }
];
export default class InterviewManagement extends LightningElement {
    @track editableField=true;
    @track noRecords =false;
    norec =onRecord;
    isModal=false;
    selectImg = selectRecordForRating;
    ratingDisplay =true;
    //Testing Interview Feedback
    @track star35=false;
    @track star34=false;
    @track star33=false;
    @track star32=false;
    @track star31=false;

    @track star65=false;
    @track star64=false;
    @track star63=false;
    @track star62=false;
    @track star61=false;

    @track star55=false;
    @track star54=false;
    @track star53=false;
    @track star52=false;
    @track star51=false;

    @track star45=false;
    @track star44=false;
    @track star43=false;
    @track star42=false;
    @track star41=false;

    @track star30=false;
    @track star29=false;
    @track star28=false;
    @track star27=false;
    @track star26=false;

    @track star25=false;
    @track star24=false;
    @track star23=false;
    @track star22=false;
    @track star21=false;

    @track star20=false;
    @track star19=false;
    @track star18=false;
    @track star17=false;
    @track star16=false;

    @track star15=false;
    @track star14=false;
    @track star13=false;
    @track star12=false;
    @track star11=false;

    @track star10=false;
    @track star9=false;
    @track star8=false;
    @track star7=false;
    @track star6=false;

    @track star101=false;
    @track star91=false;
    @track star81=false;
    @track star71=false;
    @track star67=false;
    
    //Technical Interview Feedback
    @track star235=false;
    @track star234=false;
    @track star233=false;
    @track star232=false;
    @track star231=false;

    @track star265=false;
    @track star264=false;
    @track star263=false;
    @track star262=false;
    @track star261=false;

    @track star255=false;
    @track star254=false;
    @track star253=false;
    @track star252=false;
    @track star251=false;

    @track star245=false;
    @track star244=false;
    @track star243=false;
    @track star242=false;
    @track star241=false;

    @track star230=false;
    @track star229=false;
    @track star228=false;
    @track star227=false;
    @track star226=false;

    @track star225=false;
    @track star224=false;
    @track star223=false;
    @track star222=false;
    @track star221=false;

    @track star220=false;
    @track star219=false;
    @track star218=false;
    @track star217=false;
    @track star216=false;

    @track star215=false;
    @track star214=false;
    @track star213=false;
    @track star212=false;
    @track star211=false;

    @track star210=false;
    @track star2229=false;
    @track star2228=false;
    @track star2227=false;
    @track star2226=false;

    @track star2101=false;
    @track star291=false;
    @track star281=false;
    @track star271=false;
    @track star267=false;

    @track star310=false;
    @track star3229=false;
    @track star3228=false;
    @track star3227=false;
    @track star3226=false;

    @track star3101=false;
    @track star391=false;
    @track star381=false;
    @track star371=false;
    @track star367=false;

    //Interview Feedback
    @track star135=false;
    @track star134=false;
    @track star133=false;
    @track star132=false;
    @track star131=false;

    @track star165=false;
    @track star164=false;
    @track star163=false;
    @track star162=false;
    @track star161=false;

    @track star155=false;
    @track star154=false;
    @track star153=false;
    @track star152=false;
    @track star151=false;

    @track star145=false;
    @track star144=false;
    @track star143=false;
    @track star142=false;
    @track star141=false;

    @track star130=false;
    @track star129=false;
    @track star128=false;
    @track star127=false;
    @track star126=false;

    @track star125=false;
    @track star124=false;
    @track star123=false;
    @track star122=false;
    @track star121=false;

    @track star110=false;
    @track star1219=false;
    @track star1218=false;
    @track star1217=false;
    @track star1216=false;

    levelOptions=options;
    isModal=false;
    intRecordId='';
    recordDetails='';
    nameFilter='';
    filFromDate='';
    filTillDate='';
    @api recid;
    levelValue='';
    TechRating =false;
    TechInitRating=false;
    QARating=false;
    @track interviewList=[];
    handleLevelChange(event){
        this.levelValue=event.target.value;
        this.getData();
    }
    handleNameSearch(event){
        this.nameFilter=event.target.value;
        //console.log('the name for filter===>',this.nameFilter);
        this.getData();
    }
    handleFromDateChange(event){
        this.filFromDate=event.target.value;
        //console.log('the name for filter===>',this.filFromDate);
        this.getData();
    }
    handleTillDateChange(event){
        this.filTillDate=event.target.value;
        //console.log('the name for filter===>',this.filTillDate);
        this.getData();
    }
    connectedCallback(){
        this.TechRating =false;
        this.TechInitRating=false;
        this.QARating=false;
        this.getData();
    }
    getData(){
        //console.log('the level is==>',this.levelValue);
        getInterviewList({recId: this.recid, level: this.levelValue, name: this.nameFilter,filterFromDate : this.filFromDate,filterTillDate : this.filTillDate})
        .then(result => {
            if(result!=null||result!=''||result!=undefined){
                this.noRecords=false;
                this.interviewList = result;
            }
            if(this.interviewList==null||this.interviewList==''||this.interviewList==undefined){
                this.noRecords=true;
            }
            //console.log('interviewList::',JSON.stringify(result));
        })
        .catch(error => {
            //console.log(error);
        });
    }
    showDetails(event){
        const itemIndex = event.currentTarget.dataset.index;
        var rowData = this.interviewList[itemIndex].Id;
        if(this.ratingDisplay){
            this.ratingDisplay=false;
        }
        else{
            this.ratingDisplay=true;
        }
        this.TechRating =false;
        this.TechInitRating=false;
        this.QARating=false;
        this.recordDetails='';
        this.recordDetails=this.interviewList[itemIndex];
        //console.log('the Id is===>',rowData);
        updateInterviewList({recId: rowData,intList: this.interviewList})
        .then(result => {
            this.interviewList = result;
            //console.log('interviewList::',JSON.stringify(this.interviewList));
        })
        .catch(error => {
            //console.log(error);
        });
        this.refreshData();
    }
    refreshData() {
        //console.log('in refresh');
        return refreshApex(this.interviewList);
    }
    submitHandler(){
        updateInterviewOnSubmit({iObj : this.recordDetails, ratingName : this.activeSectionMessage})
        .then(result => {
        const event = new ShowToastEvent({
            title: 'Interview Updated',
            message: 'Interview details has been updated Successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.isModal = false;
        this.connectedCallback();
        window.location.reload();
        })
        .catch(error => {
            //console.log(error);
        });
        
    }
    activeSectionMessage = '';
	handleToggleSection(event) {
        this.activeSectionMessage = event.detail.openSections;
		//console.log('Open section name:  ' + event.detail.openSections);
        this.editableField=true;
    }
    closeModal(){
        this.isModal=false;
    }
    suitFor(event){
        this.recordDetails.intObj.Suitable_for_which_Role__c = event.target.value;
    }
    nextStep(event){
        this.recordDetails.intObj.Next_Step__c = event.target.value;
    }
    rating(event) {
        if(event.target.name === "checkbox-toggle-17"){
            //console.log('checkbox-toggle-17===>',event.target.checked);
            this.recordDetails.intObj.Interviewee_didn_t_join__c = event.target.checked;
            //console.log('Interviewee_didn_t_join__c===>',this.recordDetails.intObj.Interviewee_didn_t_join__c);
        }
        if(event.target.name === "checkbox-toggle-19"){
            //console.log('checkbox-toggle-19===>',event.target.checked);
            this.recordDetails.intObj.Interviewee_didn_t_join__c = event.target.checked;
            //console.log('Interviewee_didn_t_join__c===>',this.recordDetails.intObj.Interviewee_didn_t_join__c);
        }
        if(event.target.name === "checkbox-toggle-20"){
            //console.log('checkbox-toggle-20===>',event.target.checked);
            this.recordDetails.intObj.Interviewee_didn_t_join__c = event.target.checked;
            //console.log('Interviewee_didn_t_join__c===>',this.recordDetails.intObj.Interviewee_didn_t_join__c);
        }
        if(event.target.name === "comment2"){
            this.recordDetails.intObj.Comments__c = event.target.value;
        }
        if(event.target.name === "comment3"){
            this.recordDetails.intObj.Comments2__c = event.target.value;
        }
        if(event.target.name === "comment1"){
            this.recordDetails.intObj.Comments__c = event.target.value;
        }
        if (event.target.name === "Cross browser") {        
          this.recordDetails.intObj.Cross_Browser_Testing__c = event.target.value;
          this.crossBrowser();
        }
        if (event.target.name === "Functional") {
            this.recordDetails.intObj.Functional_Testing__c = event.target.value;
            this.functional();
        }
        if (event.target.name === "Data Loader") {
            this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c = event.target.value;
            this.dataLoader();
        }
        if (event.target.name === "Performance") {
            this.recordDetails.intObj.Performance_Testing__c = event.target.value;
            this.performance();
        }
        if (event.target.name === "Regression") {        
            this.recordDetails.intObj.Regression_Testing__c = event.target.value;
            this.regression();
        }
        if (event.target.name === "Smoke") {
            this.recordDetails.intObj.Smoke_Testing__c = event.target.value;
            this.smoke();
        }
        if (event.target.name === "Test") {
            this.recordDetails.intObj.Test_Rail__c = event.target.value; 
            this.testRail();
        }
        if (event.target.name === "Tosca") {
            this.recordDetails.intObj.Tosca_Provar__c = event.target.value;
            this.toscaProvar();
        }
        if (event.target.name === "Language3") {        
            this.recordDetails.intObj.Language_on_10__c = event.target.value;
            this.language3();
        }
        if (event.target.name === "Overall3") {
            this.recordDetails.intObj.Overall_on_10__c = event.target.value;
            this.overall3();
        }
        if (event.target.name === "Apex") {
            this.recordDetails.intObj.Apex__c = event.target.value;
            this.apex();
        }
        if (event.target.name === "Aura") {
            this.recordDetails.intObj.Aura_Components__c = event.target.value;
            this.aura();
        }
        if (event.target.name === "Integration") {        
            this.recordDetails.intObj.Integration__c = event.target.value;
            this.integration();
        }
        if (event.target.name === "JavaScript") {
            this.recordDetails.intObj.Java_Script__c = event.target.value;
            this.java();
        }
        if (event.target.name === "LWC") {
            this.recordDetails.intObj.LWC__c = event.target.value; 
            this.lwc();
        }
        if (event.target.name === "Visualforce") {
            this.recordDetails.intObj.Visualforce__c = event.target.value;
            this.visualforce();
        }
        if (event.target.name === "MuleSoft") {        
            this.recordDetails.intObj.MuleSoft__c = event.target.value;
            this.mulesoft();
        }
        if (event.target.name === "SOQL") {
            this.recordDetails.intObj.SQL__c = event.target.value;
            this.soql();
        }
        if (event.target.name === "Velocity") {
            this.recordDetails.intObj.Velocity_CPQ__c = event.target.value;
            this.velocity(); 
        }
        if (event.target.name === "Admin") {
            this.recordDetails.intObj.Admin__c = event.target.value;
            this.admin();
        }
        if (event.target.name === "ApexR") {
            this.recordDetails.intObj.Apex_Remarks__c = event.target.value;
        }
        if (event.target.name === "AuraR") {
            this.recordDetails.intObj.Lightning_Remarks__c = event.target.value;
        }
        if (event.target.name === "IntegrationR") {        
            this.recordDetails.intObj.Integration_Remarks__c = event.target.value;
        }
        if (event.target.name === "JavaScriptR") {
            this.recordDetails.intObj.JavaScript_Remarks__c = event.target.value;
        }
        if (event.target.name === "LWCR") {
            this.recordDetails.intObj.LWC_Remarks__c = event.target.value;
        }
        if (event.target.name === "VisualforceR") {
            this.recordDetails.intObj.Visualforce_Remarks__c = event.target.value;
        }
        if (event.target.name === "MuleSoftR") {        
            this.recordDetails.intObj.MuleSoft_Remarks__c = event.target.value;
        }
        if (event.target.name === "SOQLR") {
            this.recordDetails.intObj.SQL_Remarks__c = event.target.value;
        }
        if (event.target.name === "VelocityR") {
            this.recordDetails.intObj.Velocity_CPQ_Remarks__c = event.target.value;
        }
        if (event.target.name === "AdminR") {
            this.recordDetails.intObj.Admin_Remarks__c = event.target.value;
        }
        if (event.target.name === "Language1") {
            //console.log('clicked');
            this.recordDetails.intObj.Language_on_10__c = event.target.value;
            //console.log('clicked');
            this.language1();
        }
        if (event.target.name === "Overall1") {
            //console.log('clicked');
            this.recordDetails.intObj.Overall_on_10__c = event.target.value;
            this.overall1();
        }
        if (event.target.name === "Comm Skill") {
            this.recordDetails.intObj.Comm_Skill__c = event.target.value;
            this.commSkill(); 
        }
        if (event.target.name === "Attitude") {
            this.recordDetails.intObj.Attitude__c = event.target.value;
            this.attitude();
        }
        if (event.target.name === "Motivation") {        
            this.recordDetails.intObj.Motivation__c = event.target.value;
            this.motivation();
        }
        if (event.target.name === "Flexibility") {
            this.recordDetails.intObj.Flexibility__c = event.target.value;
            this.flexibility();
        }
        if (event.target.name === "Management") {
            this.recordDetails.intObj.Management__c = event.target.value; 
            this.management();
        }
        if (event.target.name === "Project") {
            this.recordDetails.intObj.Project_Lead__c = event.target.value;
            this.project();
        }
        if (event.target.name === "Comm SkillR") {
            this.recordDetails.intObj.Comm_Skill_Remarks__c = event.target.value
        }
        if (event.target.name === "AttitudeR") {
            this.recordDetails.intObj.Attitude_Remarks__c = event.target.value
        }
        if (event.target.name === "MotivationR") {        
            this.recordDetails.intObj.Motivation_Remarks__c = event.target.value;
        }
        if (event.target.name === "FlexibilityR") {
            this.recordDetails.intObj.Flexibility_Remarks__c = event.target.value;
        }
        if (event.target.name === "ManagementR") {
            this.recordDetails.intObj.Management_Remarks__c = event.target.value;
        }
        if (event.target.name === "ProjectR") {
            this.recordDetails.intObj.Project_Lead_Remarks__c = event.target.value;
        }
        if (event.target.name === "Overall2") {        
            this.recordDetails.intObj.Overall_on_10__c = event.target.value;
            this.overall2();
        }
      }
    getRecordToEdit1(event){
        //console.log('in edit 1');
        const itemIndex = event.currentTarget.dataset.index;
        this.recordDetails='';
        this.isModal=true;
        this.recordDetails=this.interviewList[itemIndex];
        if(this.recordDetails.intObj.Feedback_Submitted__c){
            this.editableField=true;
            this.techInitialChanges();
        }
        else{
            this.ratingDisplay=false;
            this.editableField=false;
            this.techInitialChanges();
        }
    }
    techInitialChanges(){
        this.TechRating =false;
        this.TechInitRating=true;
        this.QARating=false;
        this.apex();
        this.aura();
        this.integration();
        this.java();
        this.lwc();
        this.visualforce();
        this.mulesoft();
        this.soql();
        this.velocity();
        this.admin();
        this.language1();
        this.overall1();
    }
    apex(){
        this.star235=false;
        this.star234=false;
        this.star233=false;
        this.star232=false;
        this.star231=false;

        if(this.recordDetails.intObj.Apex__c=='5'){
            this.star235=true;
        }
        else if(this.recordDetails.intObj.Apex__c=='4'){
            this.star234=true;
        }
        else if(this.recordDetails.intObj.Apex__c=='3'){
            this.star233=true;
        }
        else if(this.recordDetails.intObj.Apex__c=='2'){
            this.star232=true;
        }
        else if(this.recordDetails.intObj.Apex__c=='1'){
            this.star231=true;
        }
    }
    aura(){
        this.star265=false;
        this.star264=false;
        this.star263=false;
        this.star262=false;
        this.star261=false;
        if(this.recordDetails.intObj.Aura_Components__c=='5'){
            this.star265=true;
        }
        else if(this.recordDetails.intObj.Aura_Components__c=='4'){
            this.star264=true;
        }
        else if(this.recordDetails.intObj.Aura_Components__c=='3'){
            this.star263=true;
        }
        else if(this.recordDetails.intObj.Aura_Components__c=='2'){
            this.star262=true;
        }
        else if(this.recordDetails.intObj.Aura_Components__c=='1'){
            this.star261=true;
        }
    }
    integration(){
        this.star255=false;
        this.star254=false;
        this.star253=false;
        this.star252=false;
        this.star251=false;
        if(this.recordDetails.intObj.Integration__c=='5'){
            this.star255=true;
        }
        else if(this.recordDetails.intObj.Integration__c=='4'){
            this.star254=true;
        }
        else if(this.recordDetails.intObj.Integration__c=='3'){
            this.star253=true;
        }
        else if(this.recordDetails.intObj.Integration__c=='2'){
            this.star252=true;
        }
        else if(this.recordDetails.intObj.Integration__c=='1'){
            this.star251=true;
        }
    }
    java(){
        this.star245=false;
        this.star244=false;
        this.star243=false;
        this.star242=false;
        this.star241=false;
        if(this.recordDetails.intObj.Java_Script__c=='5'){
            this.star245=true;
        }
        else if(this.recordDetails.intObj.Java_Script__c=='4'){
            this.star244=true;
        }
        else if(this.recordDetails.intObj.Java_Script__c=='3'){
            this.star243=true;
        }
        else if(this.recordDetails.intObj.Java_Script__c=='2'){
            this.star242=true;
        }
        else if(this.recordDetails.intObj.Java_Script__c=='1'){
            this.star241=true;
        }
    }
    lwc(){
        this.star230=false;
        this.star229=false;
        this.star228=false;
        this.star227=false;
        this.star226=false;
        if(this.recordDetails.intObj.LWC__c=='5'){
            this.star230=true;
        }
        else if(this.recordDetails.intObj.LWC__c=='4'){
            this.star229=true;
        }
        else if(this.recordDetails.intObj.LWC__c=='3'){
            this.star228=true;
        }
        else if(this.recordDetails.intObj.LWC__c=='2'){
            this.star227=true;
        }
        else if(this.recordDetails.intObj.LWC__c=='1'){
            this.star226=true;
        }
    }
    visualforce(){
        this.star225=false;
        this.star224=false;
        this.star223=false;
        this.star222=false;
        this.star221=false;
        if(this.recordDetails.intObj.Visualforce__c=='5'){
            this.star225=true;
        }
        else if(this.recordDetails.intObj.Visualforce__c=='4'){
            this.star224=true;
        }
        else if(this.recordDetails.intObj.Visualforce__c=='3'){
            this.star223=true;
        }
        else if(this.recordDetails.intObj.Visualforce__c=='2'){
            this.star222=true;
        }
        else if(this.recordDetails.intObj.Visualforce__c=='1'){
            this.star221=true;
        }
    }
    mulesoft(){
        this.star220=false;
        this.star219=false;
        this.star218=false;
        this.star217=false;
        this.star216=false;
        if(this.recordDetails.intObj.MuleSoft__c=='5'){
            this.star220=true;
        }
        else if(this.recordDetails.intObj.MuleSoft__c=='4'){
            this.star219=true;
        }
        else if(this.recordDetails.intObj.MuleSoft__c=='3'){
            this.star218=true;
        }
        else if(this.recordDetails.intObj.MuleSoft__c=='2'){
            this.star217=true;
        }
        else if(this.recordDetails.intObj.MuleSoft__c=='1'){
            this.star216=true;
        }
    }
    soql(){
        this.star215=false;
        this.star214=false;
        this.star213=false;
        this.star212=false;
        this.star211=false;
        if(this.recordDetails.intObj.SQL__c=='5'){
            this.star215=true;
        }
        else if(this.recordDetails.intObj.SQL__c=='4'){
            this.star214=true;
        }
        else if(this.recordDetails.intObj.SQL__c=='3'){
            this.star213=true;
        }
        else if(this.recordDetails.intObj.SQL__c=='2'){
            this.star212=true;
        }
        else if(this.recordDetails.intObj.SQL__c=='1'){
            this.star211=true;
        }
    }
    velocity(){
        this.star210=false;
        this.star2229=false;
        this.star2228=false;
        this.star2227=false;
        this.star2226=false;
        if(this.recordDetails.intObj.Velocity_CPQ__c=='5'){
            this.star210=true;
        }
        else if(this.recordDetails.intObj.Velocity_CPQ__c=='4'){
            this.star2229=true;
        }
        else if(this.recordDetails.intObj.Velocity_CPQ__c=='3'){
            this.star2228=true;
        }
        else if(this.recordDetails.intObj.Velocity_CPQ__c=='2'){
            this.star2227=true;
        }
        else if(this.recordDetails.intObj.Velocity_CPQ__c=='1'){
            this.star2226=true;
        }
    }
    admin(){
        this.star2101=false;
        this.star291=false;
        this.star281=false;
        this.star271=false;
        this.star267=false;
        if(this.recordDetails.intObj.Admin__c=='5'){
            this.star2101=true;
        }
        else if(this.recordDetails.intObj.Admin__c=='4'){
            this.star291=true;
        }
        else if(this.recordDetails.intObj.Admin__c=='3'){
            this.star281=true;
        }
        else if(this.recordDetails.intObj.Admin__c=='2'){
            this.star271=true;
        }
        else if(this.recordDetails.intObj.Admin__c=='1'){
            this.star267=true;
        }
    }
    language1(){
        this.star310=false;
        this.star3229=false;
        this.star3228=false;
        this.star3227=false;
        this.star3226=false;
        if(this.recordDetails.intObj.Language_on_10__c=='5'){
            this.star310=true;
        }
        else if(this.recordDetails.intObj.Language_on_10__c=='4'){
            this.star3229=true;
        }
        else if(this.recordDetails.intObj.Language_on_10__c=='3'){
            this.star3228=true;
        }
        else if(this.recordDetails.intObj.Language_on_10__c=='2'){
            this.star3227=true;
        }
        else if(this.recordDetails.intObj.Language_on_10__c=='1'){
            this.star3226=true;
        }
    }
    overall1(){
        this.star3101=false;
        this.star391=false;
        this.star381=false;
        this.star371=false;
        this.star367=false;
        if(this.recordDetails.intObj.Overall_on_10__c=='5'){
            this.star3101=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='4'){
            this.star391=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='3'){
            this.star381=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='2'){
            this.star371=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='1'){
            this.star367=true;
        }
        //console.log('the record in edit 1===>',JSON.stringify(this.recordDetails));

    }
    getRecordToEdit2(event){
        //console.log('in edit 2');
        const itemIndex = event.currentTarget.dataset.index;
        this.recordDetails='';
        this.isModal=true;
        this.recordDetails=this.interviewList[itemIndex];
        //console.log('in edit 2==>',JSON.stringify(this.recordDetails));
        if(this.recordDetails.intObj.Feedback_Submitted__c){
            this.editableField=true;
            this.FeedBackChanges();
        }
        else{
            this.ratingDisplay=false;
            this.editableField=false;
            this.FeedBackChanges();
        }
        
    }
    FeedBackChanges(){
        this.TechRating =true;
        this.TechInitRating=false;
        this.QARating=false;
        this.commSkill();
        this.attitude();
        this.motivation();
        this.flexibility();
        this.management();
        this.project();
        this.overall2();
    }
    commSkill(){
        this.star135=false;
        this.star134=false;
        this.star133=false;
        this.star132=false;
        this.star131=false;
        if(this.recordDetails.intObj.Comm_Skill__c=='5'){
            this.star135=true;
        }
        else if(this.recordDetails.intObj.Comm_Skill__c=='4'){
            this.star134=true;
        }
        else if(this.recordDetails.intObj.Comm_Skill__c=='3'){
            this.star133=true;
        }
        else if(this.recordDetails.intObj.Comm_Skill__c=='2'){
            this.star132=true;
        }
        else if(this.recordDetails.intObj.Comm_Skill__c=='1'){
            this.star131=true;
        }
    }
    attitude(){
        this.star165=false;
        this.star164=false;
        this.star163=false;
        this.star162=false;
        this.star161=false;
        if(this.recordDetails.intObj.Attitude__c=='5'){
            this.star165=true;
        }
        else if(this.recordDetails.intObj.Attitude__c=='4'){
            this.star164=true;
        }
        else if(this.recordDetails.intObj.Attitude__c=='3'){
            this.star163=true;
        }
        else if(this.recordDetails.intObj.Attitude__c=='2'){
            this.star162=true;
        }
        else if(this.recordDetails.intObj.Attitude__c=='1'){
            this.star161=true;
        }
    }
    motivation(){
        this.star155=false;
        this.star154=false;
        this.star153=false;
        this.star152=false;
        this.star151=false;
        if(this.recordDetails.intObj.Motivation__c=='5'){
            this.star155=true;
        }
        else if(this.recordDetails.intObj.Motivation__c=='4'){
            this.star154=true;
        }
        else if(this.recordDetails.intObj.Motivation__c=='3'){
            this.star153=true;
        }
        else if(this.recordDetails.intObj.Motivation__c=='2'){
            this.star152=true;
        }
        else if(this.recordDetails.intObj.Motivation__c=='1'){
            this.star151=true;
        }
    }
    flexibility(){
        this.star145=false;
        this.star144=false;
        this.star143=false;
        this.star142=false;
        this.star141=false;
        if(this.recordDetails.intObj.Flexibility__c=='5'){
            this.star145=true;
        }
        else if(this.recordDetails.intObj.Flexibility__c=='4'){
            this.star144=true;
        }
        else if(this.recordDetails.intObj.Flexibility__c=='3'){
            this.star143=true;
        }
        else if(this.recordDetails.intObj.Flexibility__c=='2'){
            this.star142=true;
        }
        else if(this.recordDetails.intObj.Flexibility__c=='1'){
            this.star141=true;
        }
    }
    management(){
        this.star130=false;
        this.star129=false;
        this.star128=false;
        this.star127=false;
        this.star126=false;
        if(this.recordDetails.intObj.Management__c=='5'){
            this.star130=true;
        }
        else if(this.recordDetails.intObj.Management__c=='4'){
            this.star129=true;
        }
        else if(this.recordDetails.intObj.Management__c=='3'){
            this.star128=true;
        }
        else if(this.recordDetails.intObj.Management__c=='2'){
            this.star127=true;
        }
        else if(this.recordDetails.intObj.Management__c=='1'){
            this.star126=true;
        }
    }
    project(){
        this.star125=false;
        this.star124=false;
        this.star123=false;
        this.star122=false;
        this.star121=false;
        if(this.recordDetails.intObj.Project_Lead__c=='5'){
            this.star125=true;
        }
        else if(this.recordDetails.intObj.Project_Lead__c=='4'){
            this.star124=true;
        }
        else if(this.recordDetails.intObj.Project_Lead__c=='3'){
            this.star123=true;
        }
        else if(this.recordDetails.intObj.Project_Lead__c=='2'){
            this.star122=true;
        }
        else if(this.recordDetails.intObj.Project_Lead__c=='1'){
            this.star121=true;
        }
    }
    overall2(){
        this.star110=false;
        this.star1219=false;
        this.star1218=false;
        this.star1217=false;
        this.sstar1216=false;
        if(this.recordDetails.intObj.Overall_on_10__c=='5'){
            this.star110=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='4'){
            this.star1219=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='3'){
            this.star1218=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='2'){
            this.star1217=true;
        }
        else if(this.recordDetails.intObj.Overall_on_10__c=='1'){
            this.star1216=true;
        }
        //console.log('the record in edit 2===>',JSON.stringify(this.recordDetails));
    }
    getRecordToEdit3(event){
        //console.log('in edit 3');
        const itemIndex = event.currentTarget.dataset.index;
        this.recordDetails='';
        this.isModal=true;
        this.recordDetails=this.interviewList[itemIndex];
        if(this.recordDetails.intObj.Feedback_Submitted__c){
            this.editableField=true;
            this.QAChanges();
        }
        else{
            this.ratingDisplay=false;
            this.editableField=false;
        this.QAChanges();
        }
    }
    QAChanges(){
        this.ratingDisplay=false;
        this.TechRating =false;
        this.TechInitRating=false;
        this.QARating=true;
        this.crossBrowser();
        this.functional();
        this.dataLoader();
        this.performance();
        this.regression();
        this.smoke();
        this.testRail();
        this.toscaProvar();
        this.language3();
        this.overall3();
    }
    crossBrowser(){
        this.star35=false;
        this.star34=false;
        this.star33=false;
        this.star32=false;
        this.star31=false;
        if(this.recordDetails.intObj.Cross_Browser_Testing__c=='5'){
            this.star35=true;
        }
        if(this.recordDetails.intObj.Cross_Browser_Testing__c=='4'){
            this.star34=true;
        }
        if(this.recordDetails.intObj.Cross_Browser_Testing__c=='3'){
            this.star33=true;
        }
        if(this.recordDetails.intObj.Cross_Browser_Testing__c=='2'){
            this.star32=true;
        }
        if(this.recordDetails.intObj.Cross_Browser_Testing__c=='1'){
            this.star31=true;
        }
    }
    functional(){
        this.star65=false;
        this.star64=false;
        this.star63=false;
        this.star62=false;
        this.star61=false;
        if(this.recordDetails.intObj.Functional_Testing__c=='5'){
            this.star65=true;
        }
        if(this.recordDetails.intObj.Functional_Testing__c=='4'){
            this.star64=true;
        }
        if(this.recordDetails.intObj.Functional_Testing__c=='3'){
            this.star63=true;
        }
        if(this.recordDetails.intObj.Functional_Testing__c=='2'){
            this.star62=true;
        }
       if(this.recordDetails.intObj.Functional_Testing__c=='1'){
            this.star61=true;
        }
    }
    dataLoader(){
        this.star55=false;
        this.star54=false;
        this.star53=false;
        this.star52=false;
        this.star51=false;
        if(this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c=='5'){
            this.star55=true;
        }
        if(this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c=='4'){
            this.star54=true;
        }
        if(this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c=='3'){
            this.star53=true;
        }
        if(this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c=='2'){
            this.star52=true;
        }
        if(this.recordDetails.intObj.Load_Testing_Data_Loader_or_Jmeter__c=='1'){
            this.star51=true;
        }
    }
    performance(){
        this.star45=false;
        this.star44=false;
        this.star43=false;
        this.star42=false;
        this.star41=false;
        if(this.recordDetails.intObj.Performance_Testing__c=='5'){
            this.star45=true;
        }
        if(this.recordDetails.intObj.Performance_Testing__c=='4'){
            this.star44=true;
        }
        if(this.recordDetails.intObj.Performance_Testing__c=='3'){
            this.star43=true;
        }
        if(this.recordDetails.intObj.Performance_Testing__c=='2'){
            this.star42=true;
        }
        if(this.recordDetails.intObj.Performance_Testing__c=='1'){
            this.star41=true;
        }
    }
    regression(){
        this.star30=false;
        this.star29=false;
        this.star28=false;
        this.star27=false;
        this.star26=false;
         if(this.recordDetails.intObj.Regression_Testing__c=='5'){
            this.star30=true;
        }
         if(this.recordDetails.intObj.Regression_Testing__c=='4'){
            this.star29=true;
        }
         if(this.recordDetails.intObj.Regression_Testing__c=='3'){
            this.star28=true;
        }
         if(this.recordDetails.intObj.Regression_Testing__c=='2'){
            this.star27=true;
        }
         if(this.recordDetails.intObj.Regression_Testing__c=='1'){
            this.star26=true;
        }
    }
    smoke(){
        this.star25=false;
        this.star24=false;
        this.star23=false;
        this.star22=false;
        this.star21=false;
         if(this.recordDetails.intObj.Smoke_Testing__c=='5'){
            this.star25=true;
        }
         if(this.recordDetails.intObj.Smoke_Testing__c=='4'){
            this.star24=true;
        }
         if(this.recordDetails.intObj.Smoke_Testing__c=='3'){
            this.star23=true;
        }
         if(this.recordDetails.intObj.Smoke_Testing__c=='2'){
            this.star22=true;
        }
         if(this.recordDetails.intObj.Smoke_Testing__c=='1'){
            this.star21=true;
        }
    }
    testRail(){
        this.star20=false;
        this.star19=false;
        this.star18=false;
        this.star17=false;
        this.star16=false;
         if(this.recordDetails.intObj.Test_Rail__c=='5'){
            this.star20=true;
        }
         if(this.recordDetails.intObj.Test_Rail__c=='4'){
            this.star19=true;
        }
         if(this.recordDetails.intObj.Test_Rail__c=='3'){
            this.star18=true;
        }
         if(this.recordDetails.intObj.Test_Rail__c=='2'){
            this.star17=true;
        }
         if(this.recordDetails.intObj.Test_Rail__c=='1'){
            this.star16=true;
        }
    }
    toscaProvar(){
        this.star15=false;
        this.star14=false;
        this.star13=false;
        this.star12=false;
        this.star11=false;
         if(this.recordDetails.intObj.Tosca_Provar__c=='5'){
            this.star15=true;
        }
         if(this.recordDetails.intObj.Tosca_Provar__c=='4'){
            this.star14=true;
        }
         if(this.recordDetails.intObj.Tosca_Provar__c=='3'){
            this.star13=true;
        }
         if(this.recordDetails.intObj.Tosca_Provar__c=='2'){
            this.star12=true;
        }
        if(this.recordDetails.intObj.Tosca_Provar__c=='1'){
            this.star11=true;
        }
    }
    language3(){
        this.star10=false;
        this.star9=false;
        this.star8=false;
        this.star7=false;
        this.star6=false;
         if(this.recordDetails.intObj.Language_on_10__c=='5'){
            this.star10=true;
        }
         if(this.recordDetails.intObj.Language_on_10__c=='4'){
            this.star9=true;
        }
         if(this.recordDetails.intObj.Language_on_10__c=='3'){
            this.star8=true;
        }
         if(this.recordDetails.intObj.Language_on_10__c=='2'){
            this.star7=true;
        }
         if(this.recordDetails.intObj.Language_on_10__c=='1'){
            this.star6=true;
        }
    }
    overall3(){
        this.star101=false;
        this.star101=false;
        this.star101=false;
        this.star101=false;
        this.star101=false;
        if(this.recordDetails.intObj.Overall_on_10__c=='5'){
            this.star101=true;
        }
         if(this.recordDetails.intObj.Overall_on_10__c=='4'){
            this.star91=true;
        }
         if(this.recordDetails.intObj.Overall_on_10__c=='3'){
            this.star81=true;
        }
         if(this.recordDetails.intObj.Overall_on_10__c=='2'){
            this.star71=true;
        }
         if(this.recordDetails.intObj.Overall_on_10__c7u =='1'){
            this.star67=true;
        }
        //console.log('the record in edit 3===>',JSON.stringify(this.recordDetails));
    }
}