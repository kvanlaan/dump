import { GoogleplaceDirective } from './directives/googleplace.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent, InfoDialogComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './map/map.component';
import { DirectionsComponent } from 'app/directions/directions.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatExpansionModule, MatButtonModule, MatInputModule,
  MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatCheckboxModule, MatSidenavModule,
  MatDialog,
  MatFormField,
  MatFormFieldModule,
  MatIconModule,
  MatDivider,
  MatDividerModule,
  MatChipsModule
} from '@angular/material';
import { YelpComponent } from './yelp/yelp.component';
import { LandfillComponent } from './landfill/landfill.component';
import { RecyclingComponent } from './recycling/recycling.component';
import { SearchComponent } from './nav/search/search.component';
import { MatAutocompleteModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { DumpComponent } from './dump/dump.component';
import { PositionService } from './position.service';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderPickupDialogComponent } from './order-pickup-dialog/order-pickup-dialog.component';
import { LoginComponent } from './login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatRippleModule} from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DirectionsComponent,
    MapComponent,
    TypeaheadComponent,
    YelpComponent,
    LandfillComponent,
    GoogleplaceDirective,
    RecyclingComponent,
    SearchComponent,
    InfoDialogComponent,
    LocationDialogComponent,
    DumpComponent,
    SignUpComponent,
    OrderPickupDialogComponent,
    LoginComponent,
    LoginDialogComponent],
  entryComponents: [
    InfoDialogComponent, LoginDialogComponent, LocationDialogComponent, OrderPickupDialogComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
   MatChipsModule,
   MatRippleModule,
   ReactiveFormsModule,
    MatIconModule,
    MatDialogModule, MatSidenavModule, MatExpansionModule,
    MatButtonModule, MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FlexLayoutModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGcVpoS35RezE4cQzMXcH-M1VdQgZXuw0',
      libraries: ['places']
    })
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
