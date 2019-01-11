import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { SchoolComponent } from './school/school.component';
import { MaterialModule } from './material/material.module';
import { CardComponent } from './card/card.component';

import { CoreModule } from './core/core.module';
import { AuthService } from './core/auth.service';
import { DataService } from './core/data.service';
import { ListComponent } from './list/list.component';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SnackMessageComponent } from './snack-message/snack-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SchoolComponent,
    CardComponent,
    ListComponent,
    AccountComponent,
    AboutComponent,
    CreateAccountComponent,
    SnackMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'unifind-web'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    CoreModule
  ],
  entryComponents: [
    SnackMessageComponent
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
