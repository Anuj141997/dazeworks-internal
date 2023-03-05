import { LightningElement } from 'lwc';

export default class Ipvfpage extends LightningElement {

    
    connectedCallback(){
        //window.addEventListener("message", this.handleIPMessage.bind(this));
        
    }
    handleIPMessage(message){
       // console.log('##$$$ -- ' +  JSON.stringify ( message ) );
    }

    
    
}