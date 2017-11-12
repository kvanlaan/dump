import { GoogleplaceDirective } from './directives/googleplace.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './map/map.component';
import { DirectionsComponent } from 'app/directions/directions.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatButtonModule, MatInputModule,
  MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, MatCheckboxModule, MatSidenavModule } from '@angular/material';
import { YelpComponent } from './yelp/yelp.component';
import { LandfillComponent } from './landfill/landfill.component';
import { RecyclingComponent } from './recycling/recycling.component';
import { SearchComponent } from './nav/search/search.component';
import {MatAutocompleteModule} from '@angular/material';
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
    SearchComponent],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    MatSidenavModule, MatExpansionModule,
    MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule,  MatCheckboxModule, MatCardModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule,
    FlexLayoutModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGcVpoS35RezE4cQzMXcH-M1VdQgZXuw0',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
