import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { ReminderListComponent } from './pages/reminder-list/reminder-list.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: ReminderListComponent },
    { path: 'new', component: CardDetailsComponent},
    { path: ':id', component: CardDetailsComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
