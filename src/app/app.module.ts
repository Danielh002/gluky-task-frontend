import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IfRolesDirective } from './directives/if-roles.directive';
import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';


@NgModule({
  declarations: [
    AppComponent,
    IfRolesDirective,
    HomeComponent,
    WriterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
