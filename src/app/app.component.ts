import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: Http) {
  }
  // data: any;
  // url = "https://yelphubb.herokuapp.com/api/yelp"

  // setUrl(pString: string) {
  //   this.url += "?" + pString
  // }

  // parse(rawData: any) {
  //   return rawData.businesses
  // }

  // initialize(paramsObj: any) {
  //   var paramStr = '';
  //   for (var key in paramsObj) {
  //     var val = paramsObj[key] + ""
  //     paramStr += "&" + [key] + "=" + val.replace(/ /g, '+')
  //   }
  //   this.setUrl(paramStr.substr(1));
  // }

  ngOnInit() {
    // let paramsObj = {
    //   location: 'Houston',
    //   term: 'clothing donation',
    //   limit: 10,
    //   category_filter: ''
    // };
    // this.initialize(paramsObj);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
      });
    }
  }
}
