/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 09-06-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-30-2022   Shivam Kumar   Initial Version
**/
import { LightningElement,track } from 'lwc';
import empbirthdayStatusorPortal from '@salesforce/resourceUrl/empbirthdayStatusorPortal';
import birthdaybg from '@salesforce/resourceUrl/birthdaybg';
import ninjaprofileImges from '@salesforce/resourceUrl/ninjaPic';
import empImg from'@salesforce/apex/birthdayStatusForEmpPortal.empEmageToDisplay';
import br from '@salesforce/resourceUrl/birthday1';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class BirthdayStatus extends LightningElement {
	    buttonBirthday=empbirthdayStatusorPortal;
		bdaybg=birthdaybg;
		ninjaImage = ninjaprofileImges;
		@track birthdayData=[];
		@track val=[];
		editEnable=false;
		bData=false;
		@track loopVariable=0;
		br=br;
		connectedCallback(){
			empImg({})
			.then(data =>{
				if(data!=null||data!=''||data!=undefined){
					this.editEnable=false;
				}
				if(data==null||data==''||data==undefined){
					this.editEnable=true;
				}
			})
			.catch(error =>{
				//console.log('img Error :: ',error);
			})
		}
		birthdayloop(){
			empImg({})
			.then(data =>{
				this.birthdayData=data;
				var parentThis = this;
				if(this.birthdayData!=null||this.birthdayData!=''||this.birthdayData!=undefined){
					this.isBirthdayModal=true;
					//console.log('inside the if ');
					//console.log('the loop variable is==>',this.loopVariable);
					this.val=this.birthdayData[this.loopVariable];
					//console.log('val :: ',JSON.stringify(this.val));
					setTimeout(loopMethod, 3000);
					function loopMethod(){
						parentThis.val='';
							parentThis.loopVariable=parentThis.loopVariable+1;
								if(parentThis.loopVariable==parentThis.birthdayData.length){
									parentThis.loopVariable=0;
								}
								
								parentThis.val=parentThis.birthdayData[parentThis.loopVariable];
							//console.log('inside loop val :: ',JSON.stringify(parentThis.val));
							setTimeout(loopMethod, 3000);
					}
				}
				if(this.birthdayData==null||this.birthdayData==''||this.birthdayData==undefined){
					this.editEnable=true;
				}	
				//console.log('img Data :: ',JSON.stringify(data));
				//console.log('val :: ',JSON.stringify(this.val));
				//console.log('img Data in Birthday 2 :: ',JSON.stringify(this.birthdayData));
				
			})
			.catch(error =>{
				//console.log('img Error :: ',error);
			})
		}
		
		isBirthdayModal=false;
		birthModalHandler(){
			this.birthdayloop();
		}
		closeModal(){
			this.isBirthdayModal=false;
		}
		
}