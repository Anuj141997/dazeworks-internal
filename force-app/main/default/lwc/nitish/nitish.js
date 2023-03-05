import { LightningElement } from 'lwc';
import {loadStyle,loadScript} from "lightning/platformResourceLoader";
import WrappedHeaderTable from "@salesforce/resourceUrl/WrappedHeaderTable";
import FullCalendarJS from "@salesforce/resourceUrl/FullCalendarJS";




export default class Nitish extends LightningElement {
data=[];
columns=[
    {label:'Type',fieldName:'type'},
    {label:'Description',fieldName:'description'},
    {label:'Review Date',fieldName:'reviewDate',type:'date'},
    {label:'Status',fieldName:'status'}
];

traindata=[];
traincolumns=[
    {label:'Type',fieldName:'type'},
    {label:'Course Name',fieldName:'courseName'},
    {label:'Date Started',fieldName:'dateStarted',type:'date'},
    {label:'Status',fieldName:'status'}
];

empasset_data=[];

empasset_columns=[  
{label:'Asset ID',fieldName:'assetId'},
{label:'Description',fieldName:'description'},
{label:'Date Out',fieldName:'dateOut',type:'date'},
{label:'Due Back',fieldName:'dueBack'}
];

empposi_data=[];
empposi_columns=[
{label:'Position',fieldName:'position'},
{label:'Commenced',fieldName:'commenced',type:'date'},
{label:'Completed',fieldName:'completed',type:'date'},
{label:'Due Back',fieldName:'dueBack',type: 'currency',typeAttributes:{minimumFractionDigits :'4',currencyCode: { fieldName: 'CurrencyIsoCode'}}}
];

async renderedCallback() {
    if (!this.stylesLoaded) {
        Promise.all([loadStyle(this, WrappedHeaderTable)])
            .then(() => {
                console.log("Custom styles loaded");
                this.stylesLoaded = true;
            })
            .catch((error) => {
                console.error("Error loading custom styles");
            });
    }
}

renderedCallback() {
    Promise.all([
      loadScript(this, FullCalendarJS + '/FullCalendarJS/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalendarJS/moment.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.css'),
      // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
    ])
    .then(() => {
      // Initialise the calendar configuration
      this.getTasks();
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error({
        message: 'Not Loading FullCalendarJS',
        error
      });
    })
  }
  initialiseFullCalendarJs() {
    var str = window.location.href;
    var pos = str.indexOf(".com/");
    var last = pos + 4;
    var tDomain = str.slice(0,last);
    for(var i = 0 ; i < this.returnedOppo.length ; i++)
    {
      this.finalOppo.push({
        start : this.returnedOppo[i].CloseDate,
        title : this.returnedOppo[i].Name,
        url : tDomain+'/lightning/r/Opportunity/'+this.returnedOppo[i].Id+'/view'
    });
    }
    const ele = this.template.querySelector('div.fullcalendarjs');
    // eslint-disable-next-line no-undef
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
     // defaultDate: '2020-03-12',
      defaultDate: new Date(), // default day is today
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events : this.finalOppo
    });
  }
  getTasks(){
    getOppo()
        .then(result =>{   
           this.returnedOppo = JSON.parse(result);
            this.initialiseFullCalendarJs();
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.outputResult = undefined;
        });
  }
}