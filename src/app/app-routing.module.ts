import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailviewComponent } from './detailview/detailview.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { Protection } from './shared/protection.guard';

const routes: Routes = [
  { path: 'home', component: LibraryComponent },
  { path: 'details/:id', component: DetailviewComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'newObject',
    component: AddNewItemComponent,
    canActivate: [Protection],
  },

  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
