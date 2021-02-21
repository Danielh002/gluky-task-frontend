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
import { CommentComponent } from './shared/comment/comment.component';
import { PostComponent } from './shared/post/post.component';
import { ProfileInfoComponent } from './shared/profile-info/profile-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WriterComponent,
    EditorComponent,
    NoAuthenticatedViewComponent,
    AuthButtonComponent,
    CommentComponent,
    PostComponent,
    ProfileInfoComponent,
    UpdatePostDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule 
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
  bootstrap: [AppComponent],
  entryComponents: [UpdatePostDialogComponent, ConfirmationDialogComponent]

})
export class AppModule { }
