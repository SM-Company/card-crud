import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AddCardComponent } from './components/add-card/add-card.component';
import { environment } from './environments/environment.prod';
@NgModule({
  declarations: [
    AppComponent,
    ListCardComponent,
    NavbarComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
