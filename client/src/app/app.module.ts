import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule } from '@angular/material';


// Interceptors
import { AuthInterceptor } from './core/interceptors/auth-interceptors';
import { ErrorInterceptor } from './core/interceptors/error-interceptors';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AddPromotionComponent } from './components/promotions/add-promotion/add-promotion.component';
import { ListPromotionComponent } from './components/promotions/list-promotion/list-promotion.component';

import { ProfileComponent } from './components/authentication/profile/profile.component';
import { DetailsPromotionComponent } from './components/promotions/details-promotion/details-promotion.component';
import { EditPromotionComponent } from './components/promotions/edit-promotion/edit-promotion.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/common/footer/footer.component';

// Pipes
import { SearchPipe } from './components/promotions/search.pipe';
import { MostLikesPipe } from './core/pipes/most-likes.pipe';
import { MostCommentsPipe } from './core/pipes/most-comments.pipe';




@NgModule({
  declarations: [
    AppComponent,
    AddPromotionComponent,
    HeaderComponent,
    ListPromotionComponent,
    HomeComponent,
    ProfileComponent,
    DetailsPromotionComponent,
    EditPromotionComponent,
    UserProfileComponent,
    DashboardComponent,
    SearchPipe,
    MostLikesPipe,
    MostCommentsPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
