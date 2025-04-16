import { Routes } from '@angular/router';
import { ListComponent } from './page/list/list.component';
import { AddComponent } from './page/add/add.component';
import { EditComponent } from './page/edit/edit.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {path: '/', canActivate: [authGuard], children:[
    {path: 'product',  component: ListComponent},
    {path: 'product/add', component: AddComponent},
    {path: 'product/edit/:id', component: EditComponent},
  ]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];
