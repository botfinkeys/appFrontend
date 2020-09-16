import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from './interceptors/producto-interceptor.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  ComponentsModule, HttpClientModule ],
  providers: [
    StatusBar,
    SplashScreen,FormsModule, CustomFormsModule,FingerprintAIO,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
