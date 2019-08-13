import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'manage-profile', pathMatch: 'full'},
  {path: 'manage-profile/:id', component: ManageProfileComponent},
  {path: 'manage-profile', component: ManageProfileComponent},
  {path: 'profiles', component: ProfilesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
