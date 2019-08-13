import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import {
  MatButtonModule,
   MatIconModule,
   MatInputModule,
   MatFormFieldModule,
   MatRadioModule,
   MatCheckboxModule,
   MatCardModule,
   MatOptionModule,
   MatSelectModule,
   MatSnackBarModule,
   MatSlideToggleModule,
  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { RatingComponent } from './components/rating/rating.component';
import { InputTypeDirective } from './directives/input-type.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManageProfileComponent,
    ProfilesListComponent,
    RatingComponent,
    InputTypeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
