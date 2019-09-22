import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landfill',
  templateUrl: './landfill.component.html',
  styleUrls: ['./landfill.component.css']
})
export class LandfillComponent  implements OnInit {
  @Input() list: any;
  @Input() query: string;
  listingImages = [];
  http;
  constructor(http: HttpClient) {
    this.http = http;
  }
async ngOnInit() {
//   for (const  listing of this.list) {
//     let imgSrc = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='
// + listing.Latitude + ',' + listing.Longitude + '&heading=151.78&pitch=-0.76&key=AIzaSyA_JKefOG1BM8rJZoLt7p6OCEdnwPtjiWM'
// this.getImage(imgSrc).subscribe( res => {
// res.onload(blob => {
//   if ((blob.status === 'Zero_Results') &&  (listing['Address'])) {
//     imgSrc  = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='
//      + listing['Site Name'] + ',' + listing.County + '&heading=151.78&pitch=-0.76&key=AIzaSyA_JKefOG1BM8rJZoLt7p6OCEdnwPtjiWM';
//   }
//   this.listingImages.push(imgSrc)
// }

//   )});
// }

}
  getImage(latLongString) {

    // return  this.http.get(latLongString, { responseType: 'blob' });

}
}
