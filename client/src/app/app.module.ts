import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonSharedModule } from './components/common/common-shared.module';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth-interceptors';
import { ErrorInterceptor } from './core/interceptors/error-interceptors';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Pipes
import { MostLikesPipe } from './core/pipes/most-likes.pipe';
import { MostCommentsPipe } from './core/pipes/most-comments.pipe';
import { ChatComponent } from './components/chat/chat.component';
import { ComparePasswordDirective } from './core/directives/compare-password.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MostLikesPipe,
    MostCommentsPipe,
    ChatComponent,
    ComparePasswordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonSharedModule,
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
