import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

// GUARDS
import { CheckLoginGuard } from './guards/check-login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent, canActivate: [CheckLoginGuard] },
  { path: 'verify-email', component: SendEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
