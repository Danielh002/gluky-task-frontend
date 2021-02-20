import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';
import { EditorComponent } from './editor/editor.component';
import { NoAuthenticatedViewComponent } from './no-authenticated-view/no-authenticated-view.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SocialLoginModule, SocialAuthServiceConfig ,  GoogleLoginProvider} from 'angularx-social-login';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WriterComponent,
    EditorComponent,
    NoAuthenticatedViewComponent,
    AuthButtonComponent,
    CommentComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '114997711738-goko2uke2ire5g3q64vm9cv6tpsc9dku.apps.googleusercontent.com'
          )
        },
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
