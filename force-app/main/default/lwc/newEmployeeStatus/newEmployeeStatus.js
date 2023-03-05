import { LightningElement,track } from 'lwc';
import birthdaybg from '@salesforce/resourceUrl/birthdaybg';
import ninjaprofileImges from '@salesforce/resourceUrl/ninjaPic';
import newEmp from'@salesforce/apex/newEmployeeStatusClass.newEmployee';
import br from '@salesforce/resourceUrl/birthday1';
export default class newEmployeeStatus extends LightningElement {
		bdaybg=birthdaybg;
		ninjaImage = ninjaprofileImges;
		@track employeeData=[];
		@track val=[];
		editEnable=false;
		bData=false;
		@track loopVariable=0;
		br=br;
		connectedCallback(){
			
			newEmp({})
			.then(data =>{
				this.employeeData=data;
				var parentThis = this;
				if(this.employeeData!=null||this.employeeData!=''||this.employeeData!=undefined){
					//console.log('inside the if ');
					//console.log('the loop variable is==>',this.loopVariable);
					this.val=this.employeeData[this.loopVariable];
					//console.log('val :: ',JSON.stringify(this.val));
					setTimeout(loopMethod, 3000);
					function loopMethod(){
							parentThis.loopVariable=parentThis.loopVariable+1;
								if(parentThis.loopVariable==parentThis.employeeData.length){
									parentThis.loopVariable=0;
								}
								parentThis.val='';
								parentThis.val=parentThis.employeeData[parentThis.loopVariable];
							//console.log('inside loop val :: ',JSON.stringify(parentThis.val));
							setTimeout(loopMethod, 3000);
					}
				}
				if(this.employeeData==null||this.employeeData==''||this.employeeData==undefined){
					this.editEnable=true;
				}	
				//console.log('img Data :: ',JSON.stringify(data));
				//console.log('val :: ',JSON.stringify(this.val));
				//console.log('img Data in Birthday 2 :: ',JSON.stringify(this.employeeData));
				
			})
			.catch(error =>{
				//console.log('img Error :: ',error);
			})
			
		}
		
		isEmployeeModal=false;
		empModalHandler(){
			this.isEmployeeModal=true;
		}
		closeModal(){
			this.isEmployeeModal=false;
		}
		
}