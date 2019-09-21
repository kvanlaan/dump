import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-landfill',
  templateUrl: './landfill.component.html',
  styleUrls: ['./landfill.component.css']
})
export class LandfillComponent implements OnInit {
  @Input() list: any;
  @Input() query: string;
  constructor() { }
  ngOnInit() {
  }
}
