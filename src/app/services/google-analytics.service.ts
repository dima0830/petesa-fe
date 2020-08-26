import { Injectable } from '@angular/core';


declare let gtag: Function;


@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventCategory: string,
    eventName: string,  
    eventAction: string, 
    eventLabel: string = null,  
    eventValue: number = null ){ 
         gtag('event', eventName, { 
                 event_category: eventCategory, 
                 event_label: eventLabel,
                 eventAction: eventAction, 
                 eventValue: eventValue
               })
    }
}

