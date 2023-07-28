import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosHomeComponent } from './pages/todos-home/todos-home.component';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationInterceptor } from './services/authentication.interceptor';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosHomeComponent,
    LoginPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
