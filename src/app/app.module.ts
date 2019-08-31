import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTreeModule,
        MatAutocompleteModule,
        MatInputModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { SideselectionComponent } from './components/sideselection/sideselection.component';
import { SearchComponent } from './components/search/search.component';
import { RoadinfoComponent } from './components/roadinfo/roadinfo.component';
import { ZoomtoComponent } from './components/zoomto/zoomto.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    MapComponent,
    SideselectionComponent,
    SearchComponent,
    RoadinfoComponent,
    ZoomtoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTreeModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
