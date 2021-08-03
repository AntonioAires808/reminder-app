import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReminderListComponent } from './pages/reminder-list/reminder-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { CardComponent } from './card/card.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ReminderListComponent,
    MainLayoutComponent,
    CardComponent,
    CardDetailsComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
