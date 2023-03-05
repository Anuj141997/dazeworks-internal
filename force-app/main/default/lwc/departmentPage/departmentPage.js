import { LightningElement } from 'lwc';
import DeliveryImage from '@salesforce/resourceUrl/DeliveryImage';
import HumanResourceImage from '@salesforce/resourceUrl/HumanResourceImage';
import SalesImage from '@salesforce/resourceUrl/SalesImage';
import MarketingImage from '@salesforce/resourceUrl/MarketingImage';
import Department from '@salesforce/label/c.Departments';

export default class DepartmentPage extends LightningElement {

    image1 = DeliveryImage;
    image2 = HumanResourceImage;
    image3 = SalesImage;
    image4 = MarketingImage;

    header = Department;

    clickHandlerImage1() {
    
        const pEvent = new CustomEvent('type',
        {
            detail:
            {
                  type:'del'
            }
        });
        this.dispatchEvent(pEvent);
      }
      
      clickHandlerImage2() {
  
          
          const pEvent = new CustomEvent('type',
          {
              detail:
              {
                    type:'hr'
              }
          });
          this.dispatchEvent(pEvent);
      }
      clickHandlerImage3() {
          const pEvent = new CustomEvent('type',
          {
              detail:
              {
                    type:'sales'
              }
          });
          this.dispatchEvent(pEvent);
      }
      clickHandlerImage4() {
          const pEvent = new CustomEvent('type',
          {
              detail:
              {
                    type:'market'
              }
          });
          this.dispatchEvent(pEvent);
      }

}