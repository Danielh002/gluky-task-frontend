import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHasRole } from './directives/app-has-role.directive';
import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';
import { EditorComponent } from './editor/editor.component';
import { NoAuthenticatedViewComponent } from './no-authenticated-view/no-authenticated-view.component';



@NgModule({
  declarations: [
    AppComponent,
    AppHasRole,
    HomeComponent,
    WriterComponent,
    EditorComponent,
    NoAuthenticatedViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
