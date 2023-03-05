import { LightningElement,track } from 'lwc';
import birthdaybg from '@salesforce/resourceUrl/birthdaybg';
import ninjaprofileImges from '@salesforce/resourceUrl/ninjaPic';
import empImg from'@salesforce/apex/lastMonthSpotlightAward.empImageToDisplay';
import spotLite from '@salesforce/resourceUrl/spotLite';
import br from '@salesforce/resourceUrl/birthday1';
export default class LastMonthSpotLight extends LightningElement {
    bdaybg=birthdaybg;
	buttonSpotLight=spotLite;
		ninjaImage = ninjaprofileImges;
		@track awardData=[];
		@track val=[];
		editEnable=false;
		@track loopVariable=0;
		br=br;
        currentYear;
        sessionValue;
		connectedCallback(){
			this.currentYear=new Date().getFullYear();
            var nextYear =this.currentYear+1;
            var last2=String(nextYear).slice(-2);
            var CurrentYearSession = this.currentYear+'-'+last2;
            this.sessionValue=CurrentYearSession;
            //console.log('the session is ==>',this.sessionValue);
			empImg({session : this.sessionValue})
			.then(data =>{
				//console.log('data===>',JSON.stringify(data));
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
		spotLightLoop(){
			this.currentYear=new Date().getFullYear();
            var nextYear =this.currentYear+1;
            var last2=String(nextYear).slice(-2);
            var CurrentYearSession = this.currentYear+'-'+last2;
            this.sessionValue=CurrentYearSession;
            //console.log('the session is ==>',this.sessionValue);
			empImg({session : this.sessionValue})
			.then(data =>{
				this.awardData=data;
				var parentThis = this;
				if(this.awardData!=null||this.awardData!=''||this.awardData!=undefined){
					this.isAwardModal=true;
					this.val=this.awardData[this.loopVariable];
					//console.log('AWARD :: ',JSON.stringify(this.val));
					setTimeout(loopMethod, 3000);
					function loopMethod(){
						parentThis.val='';
							parentThis.loopVariable=parentThis.loopVariable+1;
								if(parentThis.loopVariable==parentThis.awardData.length){
									parentThis.loopVariable=0;
								}
								parentThis.val=parentThis.awardData[parentThis.loopVariable];
							//console.log('inside loop val :: ',JSON.stringify(parentThis.val));
							setTimeout(loopMethod, 3000);
					}
				}
				if(this.awardData==null||this.awardData==''||this.awardData==undefined){
                    //console.log('NO    AWARD ');
					this.editEnable=true;
				}	
				//console.log('img Data :: ',JSON.stringify(data));
				//console.log('val :: ',JSON.stringify(this.val));
				//console.log('img Data in Birthday 2 :: ',JSON.stringify(this.awardData));
				
			})
			.catch(error =>{
				//console.log('img Error :: ',error);
			})
		}
		
		isAwardModal=false;
		closeModal(){
			this.isAwardModal=false;
		}
}