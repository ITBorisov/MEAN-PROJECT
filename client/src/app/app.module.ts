import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule } from '@angular/material';

import { AdsService } from './components/ads/ads.service';

import { AppComponent } from './app.component';
import { AdCreateComponent } from './components/ads/ad-create/ad-create.component';
import { HeaderComponent } from './components/header/header.component';
import { AdListComponent } from './components/ads/ad-list/ad-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdCreateComponent,
    HeaderComponent,
    AdListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [AdsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
