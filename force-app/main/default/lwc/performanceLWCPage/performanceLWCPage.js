import { LightningElement } from 'lwc';
import AwardNominationImage from '@salesforce/resourceUrl/AwardNominationImage';
import EmployeePerformanceImage from '@salesforce/resourceUrl/EmployeePerformanceImage';
import PerformanceBonusImage from '@salesforce/resourceUrl/PerformanceBonusImage';
import TraineePerformanceImage from '@salesforce/resourceUrl/TraineePerformanceImage';
import PerformanceLogin from '@salesforce/label/c.Performance_Login';


export default class performanceLWCPage extends LightningElement {


    loading = false;
  
    label=
    {
        PerformanceLogin
    };

   

    image1 = AwardNominationImage;
    image2 = EmployeePerformanceImage;
    image3 = PerformanceBonusImage;
    image4 = TraineePerformanceImage;

    connectedCallback()
    {
        this.loading = true;
        
        let timer = window.setTimeout(() =>
        {
            this.loading = false;
           
            window.clearTimeout(timer)
         },1000)
    }
    clickHandlerImage1() {
    
      const pEvent = new CustomEvent('type',
      {
          detail:
          {
                type:'awrd'
          }
      });
      this.dispatchEvent(pEvent);
    }
    
    clickHandlerImage2() {

        
        const pEvent = new CustomEvent('type',
        {
            detail:
            {
                  type:'epm'
            }
        });
        this.dispatchEvent(pEvent);
    }
    clickHandlerImage3() {
        const pEvent = new CustomEvent('type',
        {
            detail:
            {
                  type:'pbt'
            }
        });
        this.dispatchEvent(pEvent);
    }
    clickHandlerImage4() {
        const pEvent = new CustomEvent('type',
        {
            detail:
            {
                  type:'tpt'
            }
        });
        this.dispatchEvent(pEvent);
    }
}