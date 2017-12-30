import { LandfillComponent } from './../landfill/landfill.component';
import { YelpComponent } from './../yelp/yelp.component';
import { RecyclingComponent } from './../recycling/recycling.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Item } from './item.model';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormControl } from '@angular/forms';
import * as similarity from 'similarity';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  templateUrl: './info.component.html'
})

export class DialogContentExampleDialogComponent {

}
@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  entryComponents: [DialogContentExampleDialogComponent]
})

export class NavComponent implements OnInit {
  margin = 'margin-top-20';
  searchQuery: string;
  badQueryString = '';
  showInfoBox = false;
  label = '';
  showBadQuery = false;
  showFancyBadQuery = false;
  list: Array<Item> = [
    { label: 'steel can', value: 'steel' },
    { label: 'aluminum can', value: 'can' },
    { label: 'tin can', value: 'tin' },
    { label: 'plastic', value: 'plastic' },
    { label: 'battery', value: 'batteries' }, // make thing look for value if search does not return label
    { label: 'batteries', value: 'batteries' },
    { label: 'paints', value: 'paint' },
    { label: 'paint', value: 'paint' },
    { label: 'furniture', value: 'furniture' },
    { label: 'table', value: 'furniture' },
    { label: 'chair', value: 'furniture' },
    { label: 'electronics', value: 'Electronics' },
    { label: 'computer', value: 'Electronics' },
    { label: 'laptop', value: 'Electronics' },
    { label: 'electronic', value: 'Electronics' },
    { label: 'ipod', value: 'Electronics' },
    { label: 'speakers', value: 'Electronics' },
    { label: 'electric instruments', value: 'Electronics' },
    { label: 'phone', value: 'Electronics' },
    { label: 'mattress', value: 'landfill' },
    { label: 'microphone', value: 'Electronics' },
    { label: 'appliances', value: 'appliance' },
    { label: 'kitchen appliance', value: 'appliance' },
    { label: 'refrigerator', value: 'refrigerator' },
    { label: 'TV', value: 'television' },
    { label: 'television', value: 'tv' },
    { label: 'blender', value: 'appliance' },
    { label: 'paper', value: 'paper' },
    { label: 'newspaper', value: 'paper' },
    { label: 'magazine', value: 'paper' },
    { label: 'book', value: 'paper' },
    { label: 'cardboard', value: 'cardboard' },
    { label: 'food', value: 'food' },
    { label: 'glass', value: 'glass' },
    { label: 'dishes', value: 'clothing' },
    { label: 'yard trimmings', value: 'yard trimmings' },
    { label: 'tree limbs', value: 'tree' },
    { label: 'wood', value: 'wood' },
    { label: 'car parts', value: 'auto' },
    { label: 'car', value: 'auto' },
    { label: 'motor oil', value: 'oil' },
    { label: 'car filters', value: 'filters' },
    { label: 'tires', value: 'tire' },
    { label: 'clothing', value: 'clothing' },
    { label: 'pants', value: 'clothing' },
    { label: 'scarf', value: 'clothing' },
    { label: 'shoes', value: 'clothing' },
    { label: 'boots', value: 'clothing' },
    { label: 'watch', value: 'clothing' },
    { label: 'tshirt', value: 'clothing' },
    { label: 'jewelry', value: 'clothing' },
    { label: 'blouse', value: 'clothing' },
    { label: 'shorts', value: 'clothing' },
    { label: 'socks', value: 'clothing' },
    { label: 'gloves', value: 'clothing' },
    { label: 'mittens', value: 'clothing' },
    { label: 'jeans', value: 'clothing' },
    { label: 'blanket', value: 'clothing' },
    { label: 'can', value: 'can' },
    { label: 'toy', value: 'toy' },
    { label: 'trash', value: 'dump' }
    // { label: 'leftovers', value: 'dump' },
    // { label: 'animal', value: 'animal' },
    // { label: 'dead animal', value: 'animal' },
    // { label: 'body', value: 'body' },
    // { label: 'bodies', value: 'body' },
    // { label: 'dead bodies', value: 'body' }
  ]

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    let url = new URL(window.location.href);
    if (url.href.indexOf('search') > -1) {
      const urlArr = url.href.split('/home');
      const urlArrTwo = urlArr[1].split('/');
      const searchIndex = urlArrTwo.indexOf('search');
      this.label = urlArrTwo[searchIndex + 1];
      this.label = this.label.replace(/%20/g, ' ');
      this.margin = 'margin-top-1';
    } else {
      this.margin = 'margin-top-20';
      this.openDialog();
    }

    this.router.events.subscribe(async (event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        url = new URL(window.location.href);
        if (url.href.indexOf('search') > -1) {
          this.margin = 'margin-top-1';
        } else {
          this.margin = 'margin-top-20';
        }
      }
    })
  }

  filterQuery(event: any) {
    this.showBadQuery = false;
    if (event !== undefined) {
      this.label = event.label;
      this.margin = 'margin-top-1';
      this.router.navigate(['home/search/', this.label]);
    }
  }
  toggleInfoBox() {
    this.showInfoBox = !this.showInfoBox;
  }
  badQuery(event: any) {
    const url = new URL(window.location.href);
    this.badQueryString = event;
    if (url.href.indexOf('search') < 0) {
      this.showBadQuery = true;

    } else {
      this.router.navigate(['home/search/' + this.label + '/bad/', event]);
    }
  }
}
