import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.css']
})
export class RecyclingComponent implements OnInit {
  @Input() list: any;
  constructor(private http: Http) { }
  ngOnInit() {
    for (const listObj of this.list) {
      // tslint:disable-next-line:max-line-length
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-{{listObj.Lat}},{{listObj.Lon}}&radius=500&key=AIzaSyDwYoJzlRs_9_TAzOaMDwqWlhtZm8a0GjM'
      let searchRes = null;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(
        data => searchRes = data,
        err => console.log(err),
        () => {
          if (searchRes) {
            console.log('searchRes', searchRes);

    }
  })
}
  }
}
