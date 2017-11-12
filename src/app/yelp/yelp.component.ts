import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-yelp',
  templateUrl: './yelp.component.html',
  styleUrls: ['./yelp.component.css']
})
export class YelpComponent implements OnInit {
  @Input() list: any;
  constructor() { }
  ngOnInit() {
  }

}
