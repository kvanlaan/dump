import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.css']
})
export class RecyclingComponent implements OnInit {
  @Input() list: any;
  constructor() { }
  ngOnInit() {
  }

}
