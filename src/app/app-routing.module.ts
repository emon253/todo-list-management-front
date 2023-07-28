import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosHomeComponent } from './pages/todos-home/todos-home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: TodosHomeComponent,
    title: 'Todo List',
    canActivate: [AuthenticationGuard],
    /*since home will have access only authenticated user,
     so this route will only active for authenticated user
     */
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Todo List',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
