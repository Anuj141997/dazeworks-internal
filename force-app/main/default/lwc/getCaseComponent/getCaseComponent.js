import { LightningElement , track } from 'lwc';
export default class GetCaseComponent extends LightningElement {
    @track caseNumber;
    handleClick(event)
    {
        console.log(event.target.label);
        var inp = this.template.querySelector("lightning-input");
        console.log('###',inp.value);
        this.name=inp.value;
        console.log(inp.value);
    }
}