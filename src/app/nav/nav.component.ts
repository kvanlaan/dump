import { LandfillComponent } from './../landfill/landfill.component';
import { YelpComponent } from './../yelp/yelp.component';
import { RecyclingComponent } from './../recycling/recycling.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Item } from './item.model';

import * as firebase from 'firebase';
 import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


import { FormControl } from '@angular/forms';
import * as similarity from 'similarity';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PositionService } from '../position.service';
import { Coords } from '../coords.model';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { LoginDialogComponent } from 'app/login-dialog/login-dialog.component';
@Component({
  templateUrl: './info.component.html'
})

export class InfoDialogComponent {

}

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html'
  // entryComponents: [InfoDialogComponent]
})

export class NavComponent implements OnInit {
  address: any;
  searchQuery: string;
  badQueryString = '';
  searchDone = false;
  height;
  label = '';
  showBadQuery = false;
  showFancyBadQuery = false;
  @ViewChild('typeahead', {static: false}) typeahead;
  list: Array<Item> = [
    { label: 'steel can', value: 'steel' },
    { label: 'aluminum can', value: 'can' },
    { label: 'tin can', value: 'tin' },
    { label: 'plastic', value: 'plastic' },
    { label: 'battery', value: 'batteries' },
    // make thing look for value if search does not return label
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
    // { label: 'dishes', value: 'clothing' },
    { label: 'yard trimmings', value: 'yard trimmings' },
    { label: 'tree limbs', value: 'tree' },
    { label: 'wood', value: 'wood' },
    { label: 'car parts', value: 'auto' },
    { label: 'car', value: 'auto' },
    { label: 'motor oil', value: 'oil' },
    { label: 'car filters', value: 'filters' },
    { label: 'tires', value: 'tire' },
    // { label: 'clothing', value: 'clothing' },
    // { label: 'pants', value: 'clothing' },
    // { label: 'scarf', value: 'clothing' },
    // { label: 'shoes', value: 'clothing' },
    // { label: 'boots', value: 'clothing' },
    // { label: 'watch', value: 'clothing' },
    // { label: 'tshirt', value: 'clothing' },
    // { label: 'jewelry', value: 'clothing' },
    // { label: 'blouse', value: 'clothing' },
    // { label: 'shorts', value: 'clothing' },
    // { label: 'socks', value: 'clothing' },
    // { label: 'gloves', value: 'clothing' },
    // { label: 'mittens', value: 'clothing' },
    // { label: 'jeans', value: 'clothing' },
    // { label: 'blanket', value: 'clothing' },
    { label: 'can', value: 'can' },
    // { label: 'toy', value: 'toy' },
    { label: 'trash', value: 'dump' }
    // { label: 'leftovers', value: 'dump' },
    // { label: 'animal', value: 'animal' },
    // { label: 'dead animal', value: 'animal' },
    // { label: 'body', value: 'body' },
    // { label: 'bodies', value: 'body' },
    // { label: 'dead bodies', value: 'body' }
  ]

  dialogRef;
  displayName: string = '';
  email: string = '';
  // need typing
  user;
  ui;
  database;
  infoOpen = false;
  suffix: string = '';
  login: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (!this.searchDone) {
      this.height = window.innerHeight;
    }
  }

  constructor(private positionService: PositionService,
    private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogTwo: MatDialog) {
    this.positionService.positionFailed.subscribe(
      data => {
        this.openLocationDialog();
      });
    this.positionService.positionChanged.subscribe(
      data => {
        this.refreshAddress();
      });
  }

  // key for google places api AIzaSyCgLu0hpZUwRVjFXlG8OUHd9JvKCV12vvY
  openInfoDialog() {
    if (!this.infoOpen) {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '450px'
      });
      this.infoOpen = true;
      dialogRef.afterClosed().subscribe(result => {
        this.infoOpen = false;
      });
    }
  }
  async openLoginModal() {
    // if (location.href.indexOf('authenticationTriggered') < 0) {
    //   location.href += '/authenticationTriggered';
    // }
    this.dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
    });
    await this.ui.start('#firebaseui-container', this.getUiConfig());
  }
  getUiConfig() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (this, authResult, redirectUrl) {
          this.login = true;
          console.log('authResult', authResult);
          this.suffix = '/' + this.guid;
          this.displayName = authResult.additionalUserInfo.profile.name.replace(/\s/g, '');

          if (authResult.additionalUserInfo.isNewUser) {
            this.newUser = true;
          } else {
            this.newUser = false;
          }
          if (authResult.user) {
            this.user = authResult.user;
          }
          this.dialogRef.close(LoginDialogComponent);
          return false;
        }.bind(this),
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      signInSuccessUrl: '' + location.host + '/#user/' + this.displayName + this.suffix,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    return uiConfig;
  }
  openLocationDialog() {
    console.log('triggered');
    const position = this.positionService.getPosition();

    if (position === undefined || position === null) {
      console.log('here 2');
      const dialogRef = this.dialogTwo.open(LocationDialogComponent, {
        width: '450px'
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  ngOnInit() {
    this.refreshAddress();
    let url = new URL(window.location.href);
    if (url.href.indexOf('search') > -1) {
      const urlArr = url.href.split('/home');
      const urlArrTwo = urlArr[1].split('/');
      const searchIndex = urlArrTwo.indexOf('search');
      this.label = urlArrTwo[searchIndex + 1];
      this.label = this.label.replace(/%20/g, ' ');
      this.searchDone = true;
    } else {
      this.openInfoDialog();
    }
    this.height = window.innerHeight;
    this.router.events.subscribe(async (event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        url = new URL(window.location.href);
        const urlAfterRedirects = event.urlAfterRedirects;
        if (urlAfterRedirects.indexOf('search') > -1) {
          this.searchDone = true;

        } else {
          this.searchDone = false;
        }
      }
    })

    // setting up firebase
    var config = {
      apiKey: "AIzaSyDwYoJzlRs_9_TAzOaMDwqWlhtZm8a0GjM",
      projectId: "dump-86110",
      authDomain: "dump-86110.firebaseapp.com",
      databaseURL: "https://dump-86110.firebaseio.com",
      storageBucket: "dump-86110.appspot.com",
      messagingSenderId: "393359246872"
    };
    firebase.initializeApp(config);
    this.database = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.database.settings(settings);
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.user = firebase.auth().currentUser;
    // this.getDarkPatterns();

    firebase.auth().onAuthStateChanged(async function (this, user) {
      if (!this.login && !user && location.href.indexOf('loggedOut') >= 0 && location.href.indexOf('authenticationTriggered') > - 0) {
        this.openLoginModal();
      } else {
        this.user = user;
        this.user ? await this.handleSignedInUser() : await this.handleSignedOutUser();
      }
    }.bind(this));
  }
  addressReady = true;

  refreshAddress() {
    console.log('refreshing address')
    this.address = this.positionService.getAddress();
    if (this.address === null || this.address === undefined) {
      console.log('it was nullish')
      this.address = 'Enter Your Current Address...';

    } else {
      // this.addressReady = false;
      // this.addressReady = true;

    }
  }
  public getAddress(place: Object) {
    console.log('place', place);
    this.address = place['formatted_address'];
    const geometry = place['geometry'];
    const location = geometry['location'];
    const lat = location['lat'];
    const lng = location['lng'];
    const newCoords = { lat: lat(), lon: lng() } as Coords;

    this.positionService.setPosition(newCoords);
  }

  filterQuery(event: any) {
    this.showBadQuery = false;
    if (event !== undefined) {
      this.label = event.label;
      this.searchDone = true;
      this.router.navigate(['home/search/', this.label]);
    }
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
async handleSignedInUser() {
    this.displayName = this.user.displayName;
    this.email = this.user.email;

     this.login = true;
    // this.email = this.user.email;
    // if (location.hash.split('/') && location.hash.split('/')[1]) {
    //   this.guid = location.hash.split('/')[1];
    // }

    // let trimmedName = this.email;
    // location.href = '#user/' + this.email + '/' + this.guid;

    // if (this.newUser) {
    //   if (this.savedImageArr.length) {
    //     for (let img of this.savedImageArr)
    //       this.saveImageFirebase(img);
    //   }
    // } else {
    //   this.savedImageArr = [];
    //   if ((!this.newUser) || (this.newUser && this.savedImageArr.length === 0)) {

    //     var storageRef = firebase.storage().ref();
    //     if (this.ready && this.renderDone) {
    //       this.imagePopulationDone = false;
    //     }
    //     for (let img in this.customImages) {
    //       let numerator = (parseInt(img) + 1);
    //       await storageRef.child(trimmedName + '/customImages/uploadCustom' + numerator).getDownloadURL().then((url) => {
    //         if (url) {
    //           this.customImagesActive = true;
    //           this.customImages[parseInt(img)].src = url;
    //         }
    //       }).catch(function (error) {
    //       });

    //       if (parseInt(img) == (this.customImages.length - 1)) {
    //         this.setCustomImages();
    //       }
    //     }

    //     await this.database.collection('users/' + trimmedName + '/images').get().then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         this.savedImageArr.push(doc.data());
    //       });

    //       if (querySnapshot.docs.length) {
    //         this.imagePopulationDone = true;

    //         this.renderImage(0);
    //       } else {
    //         this.imagePopulationDone = true;

    //         if (this.savedImageArr.length === 0) {
    //           this.getRandomArt(true);
    //         }
    //       }
    //     });
    //   }
    // }
  }

  async handleSignedOutUser() {
    // let guid = '';
    // if (location.hash.split('/') && location.hash.split('/')[1]) {
    //   this.guid = location.hash.split('/')[1];
    //   guid = this.guid;
    // }

    // if (!document.getElementById('firebaseui-container')) {
    //   this.login = false;

    //   if (!this.user) {
    //     // create a rand guid
    //     if (location.href.indexOf('loggedOut') < 0) {
    //       this.guid = this.utilities.getGuid();
    //       location.href = '#loggedOut/' + this.guid;
    //     } else {
    //       if (guid) {
    //         if (this.ready && this.renderDone) {
    //           this.imagePopulationDone = false;
    //         }
    //         var storageRef = firebase.storage().ref();
    //         for (let img in this.customImages) {
    //           let numerator = (parseInt(img) + 1);
    //           await storageRef.child(guid + '/customImages/uploadCustom' + numerator).getDownloadURL().then((url) => {
    //             if (url) {
    //               this.customImagesActive = true;
    //               this.customImages[parseInt(img)].src = url;
    //             }
    //           }).catch(function (error) {
    //             console.log('error', error);
    //           });
    //           if (parseInt(img) == (this.customImages.length - 1)) {
    //             this.setCustomImages();

    //           }
    //         }
    //         this.savedImageArr = [];
    //         await this.database.collection('users/' + guid + '/images').get().then((querySnapshot) => {
    //           querySnapshot.forEach((doc) => {
    //             this.savedImageArr.push(doc.data());
    //           });

    //           if (querySnapshot.docs.length) {
    //             this.imagePopulationDone = true;
    //             this.renderImage(0);
    //           } else {
    //             this.imagePopulationDone = true;

    //             // this.getRandomArt(true);
    //           }

    //         });

    //       }
    //     }
    //   }
    // }
  }

}
