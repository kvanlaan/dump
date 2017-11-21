import { Item } from './../item.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
declare var google: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  label: string;
  landFillData: any = [];
  yelpData: any = [];
  recycleData: any = [];
  finalData: any = [];
  displayedData: any = [];
  pageSize = 10;
  currPageIndex = 0;
  pages: number;
  searchDone = false;
  showYelp = false;
  showRecycling = false;
  showLandfill = false;
  query: string;
  yelpUrl = 'https://yelphubb.herokuapp.com/api/yelp';
  data: any;
  showNone = false;
  list: Array<Item> = [
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
    { label: 'underwear', value: 'dump' },
    { label: 'misc clothing', value: 'clothing' },
    { label: 'gloves', value: 'clothing' },
    { label: 'mittens', value: 'clothing' },
    { label: 'jeans', value: 'clothing' },
    { label: 'blanket', value: 'clothing' },
    { label: 'can', value: 'can' },
    { label: 'steel can', value: 'steel' },
    { label: 'aluminum can', value: 'can' },
    { label: 'plastic', value: 'plastic' },
    { label: 'battery', value: 'batteries' },
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
    { label: 'blender', value: 'television' },
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
    { label: 'toy', value: 'toy' },
    { label: 'trash', value: 'dump' },
    { label: 'leftovers', value: 'dump' },
    { label: 'animal', value: 'animal' },
    { label: 'dead animal', value: 'animal' },
    { label: 'body', value: 'body' },
    { label: 'bodies', value: 'body' },
    { label: 'dead bodies', value: 'body' }
  ]
  lat;
  lng;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.lat = Number(position.coords.latitude);
        this.lng = Number(position.coords.longitude);
      })

      this.route.params.subscribe(params => {
        this.label = params['id'];
      });
      this.router.events.subscribe(async (event: NavigationEnd) => {
        if (event instanceof NavigationEnd) {
          this.route.params.subscribe(params => {
            this.label = params['id'];
            this.search();
          });
        }
      })
      this.search();
    }
  }
  search() {
    this.showLandfill = false;
    this.showRecycling = false;
    this.showYelp = false;
    this.yelpData = [];
    this.landFillData = [];
    this.recycleData = [];
    this.finalData = [];
    this.displayedData = [];
    this.searchDone = false;
    this.query = this.label;
    const val = this.list.find(listItem => listItem.label === this.label);
    if (val) {
      if (val.value === 'clothing') {
        console.log('searching yelp');
        this.searchYelp('clothing');
      }
      if (val.value === 'toy') {
        this.searchYelp('Toy');
      }
      if (val.value === 'food') {
        this.searchYelp('Food');
      }

      if (val.value === 'landfill') {
        this.searchLandFills(val.label);
      }
      if (val.value !== 'landfill' && val.value !== 'Toy' && val.value !== 'clothing' && val.value !== 'food') {
        this.searchRecycling(val.label);
      }
    } else {
      this.showNone = true;
      this.searchDone = true;
    }
  }

  searchYelp(query: string) {
    const paramsObj = {
      location: 'Houston',
      term: query + ' donation',
      category_filter: ''
    };
    this.initializeYelp(paramsObj);
    this.http.get(this.yelpUrl)
      .map(res => res.json())
      .subscribe(
      data => this.data = data,
      err => console.log(err),
      () => {
        if (this.data) {
          for (let i = 0; i < this.data.businesses.length; i++) {
            const dataObject = this.data.businesses[i]
            this.yelpData.push(dataObject)
          }
          this.yelpData = this.findMinYelp(this.yelpData);
          this.setPages(this.yelpData);
          this.showYelp = true;
          this.searchDone = true
        }
      }
      );
  }

  searchRecycling(query: string) {
    this.showRecycling = true;
    this.http.get('assets/recyclingCenters.json')
      .map(res => res.json())
      .subscribe(
      data => this.data = data,
      err => console.log(err),
      () => {
        if (this.data) {
          for (let i = 0; i < this.data.length; i++) {
            const dataObject = this.data[i]
            const categories = dataObject.Category
            const materials = dataObject.Materials
            if (materials.indexOf(query) > -1 || categories.indexOf(query) > -1) {
              this.recycleData.push(dataObject)
            }
          }
          // code for sorting
          this.recycleData = this.findMin(this.recycleData);
          this.setPages(this.recycleData);
          this.showRecycling = true;
          this.searchDone = true
        }
      }
      );
  }
  findMinLandfill(resultsArr) {
    const objArr = []
    for (let i = 0; i < resultsArr.length; i++) {
      const dataObject = resultsArr[i]
      // get curr coords
      const hypO = (Math.pow(dataObject.Latitude - this.lat, 2) +
       Math.pow(dataObject.Longitude - this.lng, 2))
      const hypObj = { x: i, y: hypO, z: { dataObject } }
      objArr.push(hypObj)
    }
    const list = objArr.sort(function (a, b) {
      const hypA = (a.y),
        hypB = (b.y)
      return hypA - hypB
    })
    const finList = [];
    for (let i = 0; i < list.length; i++) {
      finList.push(list[i].z.dataObject);
    }
    return finList;
  }
  findMinYelp(resultsArr) {
    const objArr = []
    for (let i = 0; i < resultsArr.length; i++) {
      const dataObject = resultsArr[i]
      // get curr coords
      const hypO = (Math.pow(dataObject.location.coordinate.latitude - this.lat, 2) +
       Math.pow(dataObject.location.coordinate.longitude - this.lng, 2))
      const hypObj = { x: i, y: hypO, z: { dataObject } }
      objArr.push(hypObj)
    }
    const list = objArr.sort(function (a, b) {
      const hypA = (a.y),
        hypB = (b.y)
      return hypA - hypB
    })
    const finList = [];
    for (let i = 0; i < list.length; i++) {
      finList.push(list[i].z.dataObject);
    }
    return finList;
  }
  findMin(resultsArr) {
    const objArr = []
    for (let i = 0; i < resultsArr.length; i++) {
      const dataObject = resultsArr[i]
      // get curr coords
      const hypO = (Math.pow(dataObject.Lat - this.lat, 2) + Math.pow(dataObject.Lon - this.lng, 2))
      const hypObj = { x: i, y: hypO, z: { dataObject } }
      objArr.push(hypObj)
    }
    const list = objArr.sort(function (a, b) {
      const hypA = (a.y),
        hypB = (b.y)
      return hypA - hypB
    })
    const finList = [];
    for (let i = 0; i < list.length; i++) {
      finList.push(list[i].z.dataObject);
    }
    return finList;
  }
  searchLandFills(query: string) {
    this.http.get('assets/landfills.json')
      .map(res => res.json())
      .subscribe(
      data => this.data = data,
      err => console.log(err),
      () => {
        if (this.data) {
          for (let i = 0; i < this.data.length; i++) {
            const dataObject = this.data[i]
            this.landFillData.push(dataObject)
          }
          this.landFillData = this.findMinLandfill(this.landFillData);
          this.setPages(this.landFillData);
          this.searchDone = true;
          this.showLandfill = true;
        }
      }
      );
  }
  setPages(data: any) {
    this.finalData = data;
    this.pages = Math.round(this.finalData.length / 10);
    this.currPageIndex = 0;
    if (this.pages < 1) {
      this.pages = 1;
      this.pageSize = this.finalData.length;
      this.displayedData = this.finalData;
    } else {
      this.displayedData = this.finalData.slice((10 * (this.currPageIndex)), (10 * (this.currPageIndex + 1)));
    }
  }

  setYelpUrl(pString: string) {
    this.yelpUrl += '?' + pString
  }

  initializeYelp(paramsObj: any) {
    let paramStr = '';
    for (const key in paramsObj) {
      if (key) {
        const val = paramsObj[key] + ''
        paramStr += '&' + [key] + '=' + val.replace(/ /g, '+')
      }
    }
    this.setYelpUrl(paramStr.substr(1));
  }

  changePage(pageEvent: PageEvent) {
    if (pageEvent.pageIndex > this.currPageIndex && this.currPageIndex < this.pages) {
      this.currPageIndex++
      this.displayedData = this.finalData.slice((this.currPageIndex * 10), ((this.currPageIndex + 1) * 10));
    } else if (pageEvent.pageIndex < this.currPageIndex) {
      this.currPageIndex--
      this.displayedData = this.finalData.slice((this.currPageIndex * 10), ((this.currPageIndex + 1) * 10));
    }
  }
}

