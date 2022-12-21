import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const config = {
  apiKey: "AIzaSyC3sAmKnWDpX7x6nasX1succG-1J2skxkU",
  authDomain: "sign-94b79.firebaseapp.com",
  projectId: "sign-94b79",
  storageBucket: "sign-94b79.appspot.com",
  messagingSenderId: "989900392187",
  appId: "1:989900392187:web:9c76e3c0c8b4bb527f925e",
  measurementId: "G-SX3537M87P"
  }
  

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
