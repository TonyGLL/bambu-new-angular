import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

// COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewsComponent } from './components/news/news.component';

// REACTIVE FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// FIREBASE MODULES
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

// SERVICES
import { AuthService } from './services/auth.service';
import { NewsService } from './services/news.service';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    SendEmailComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, NewsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
