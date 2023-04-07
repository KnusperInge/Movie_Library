import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './library/search/search.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Protection } from './shared/protection.guard';

import { SideNavService } from './shared/sideNav.service';
import { MovieService } from './shared/movie.service';
import { AuthService } from './shared/auth.service';
import { BreakpointService } from './shared/breakpoint.service';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddNewItemComponent,
    DetailviewComponent,
    LibraryComponent,
    LoginComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
  ],
  providers: [
    MovieService,
    SideNavService,
    AuthService,
    Protection,
    BreakpointService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
