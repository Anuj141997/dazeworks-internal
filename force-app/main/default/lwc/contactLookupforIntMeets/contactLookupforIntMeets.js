/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 07-06-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   07-06-2022   Shivam Kumar   Initial Version
**/
import { LightningElement, track, wire, api } from "lwc";  
import findRecords from '@salesforce/apex/InetMeetLookupLwc.findRecords';  
export default class contactLookupforIntMeets extends LightningElement {  
		@api recId;
		@track recordsList;  
		@track searchKey = "";  
		@api selectedValue;  
		@api selectedRecordId;  
		@api objectApiName;  
		@api iconName;  
		@api lookupLabel;  
		@track message;  

		onLeave(event) {  
				setTimeout(() => {  
						this.searchKey = "";  
						this.recordsList = null;  
				}, 300);  
		}  
		connectedCallback(){
				this.getLookupResult();
		}

		onRecordSelection(event) {  
				this.searchKey = "";  
				this.onSeletedRecordUpdate();  
		}  

		handleKeyChange(event) {  
				const searchKey = event.target.value;  
				this.searchKey = searchKey;  
				this.getLookupResult();  
		}  

		removeRecordOnLookup(event) {  
				this.searchKey = "";  
				this.selectedValue = null;  
				this.selectedRecordId = null;  
				this.recordsList = null;  
				this.onSeletedRecordUpdate();  
		}
		getLookupResult() {  
				findRecords({ recordId: this.recId, objectName : this.objectApiName })  
						.then((result) => {  
						if (result.length===0) {  
								this.recordsList = [];  
								this.message = "No Records Found";  
						} else {  
								this.recordsList = result;
								this.selectedRecordId=this.recordsList.Id;
								this.selectedValue=this.recordsList.Name;
								this.message = "";  
						}  
						this.error = undefined;  
				})  
						.catch((error) => {  
						this.error = error;  
						this.recordsList = undefined;  
				});  
		}
		onSeletedRecordUpdate(){  
				const passEventr = new CustomEvent('recordselection', {  
						detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }  
				});  
				this.dispatchEvent(passEventr);  
		}  
}