import { LightningElement,track, wire } from 'lwc';
import getLeaveDataToday from '@salesforce/apex/leaveLiveStatusClass.getLeaveDataToday';
import getLeaveDataTomorrow from '@salesforce/apex/leaveLiveStatusClass.getLeaveDataTomorrow';
import leaveStatus from '@salesforce/resourceUrl/leaveStatus';
export default class LeaveLiveStatus extends LightningElement {
    @track leaveObj;
    @track leaveList = [];
    @track leaveListtemp =false;
    @track leaveList2temp =false;
    @track leaveList2 = [];
    @track editEnable=true;
    @track isleaveModal=false;
    buttonLeave=leaveStatus;
	connectedCallback(){
        getLeaveDataToday({})
        .then(result => {
            if(result[0].Id!=null){
                this.editEnable=false;
                //console.log('contains data one');
            }
        })
        .catch(error => {
            //console.log(error);
        });

		getLeaveDataTomorrow({})
        .then(result => {
            if(result[0].Id!=null){
                this.editEnable=false;
                //console.log('contains data two');
            }
        })
        .catch(error => {
            //console.log(error);
        });     
	}
    checkLeave(){
        getLeaveDataToday({})
        .then(result => {
            if(result[0].Id!=null){
                this.isleaveModal=true;
                this.leaveListtemp=true;
                this.leaveList= result;
            }
        })
        .catch(error => {
            //console.log(error);
        });

		getLeaveDataTomorrow({})
        .then(result => {
            if(result[0].Id!=null){
                this.isleaveModal=true;
                this.leaveList2temp=true;
                this.leaveList2= result;
            }
        })
        .catch(error => {
            //console.log(error);
        }); 
    }
	closeModal(){
		this.isleaveModal=false;
	}
}