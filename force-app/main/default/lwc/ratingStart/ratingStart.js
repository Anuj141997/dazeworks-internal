/**
 * @description       : 
 * @author            : Shivam Kumar
 * @group             : 
 * @last modified on  : 08-19-2022
 * @last modified by  : Shivam Kumar 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   08-19-2022   Shivam Kumar   Initial Version
**/
import { LightningElement } from 'lwc';

export default class RatingStart extends LightningElement {
    pizzarating;
    deliveryrating;
    burgerrating;
    packagerating;
  
    rating(event) {
      if (event.target.name === "Pizza") {
        this.pizzarating = event.target.value;
      }
      if (event.target.name === "Burger") {
        this.burgerrating = event.target.value;
      }
      if (event.target.name === "Package") {
        this.packagerating = event.target.value;
      }
      if (event.target.name === "Delivery") {
        this.deliveryrating = event.target.value;
      }
    }
  
    getvalues() {
      alert(
        "DeliveryRating:" +
          this.deliveryrating +
          ", PizzaRating:" +
          this.pizzarating +
          ", BurgerRating:" +
          this.burgerrating +
          ", PackageRating:" +
          this.packagerating
      );
    }
}