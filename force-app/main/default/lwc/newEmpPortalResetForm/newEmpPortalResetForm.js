/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 08-01-2022
 * @last modified by  : Shivam Kumar
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-01-2022   Shivam Kumar   Initial Version
**/
import { LightningElement } from 'lwc';
import portalName from '@salesforce/resourceUrl/empPortalName';
import Dazeworksicon from '@salesforce/resourceUrl/Dazeworks';
export default class NewEmpPortalResetForm extends LightningElement {
    img_1 = portalName;
    img_2 =Dazeworksicon
}