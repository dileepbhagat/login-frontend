import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DownloadsComponent } from './downloads/downloads.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ProcessRegisterComponent } from './process-register/process-register.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ActivityComponent } from './activity/activity.component';
import { DocumentComponent } from './document/document.component';
import { DrugTypeComponent } from './drug-type/drug-type.component';
import { AdminSetPasswordComponent } from './admin-set-password/admin-set-password.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { AdminLoginGuardService } from '../app/adminAuth/admin-login-guard.service';
import { AdminLoginService } from '../app/adminAuth/admin-login.service';
import { AdminSetPasswordService } from '../app/adminSetPasswordAuth/admin-set-password.service';
import { AdminSetPasswordGuard } from '../app/adminSetPasswordAuth/admin-set-password-guard.service';
import { ProcessUserCreationComponent } from './process-user-creation/process-user-creation.component';
import { UserVerifyMailComponent } from './user-verify-mail/user-verify-mail.component';
import { AdminFirstTimePasswordSetGuard } from './adminFirstTimePasswordSetAuth/admin-first-time-password-set-guard.service';
import  { AdminFirstTimePasswordSetService } from './adminFirstTimePasswordSetAuth/admin-first-time-password-set.service';
import { ProfilePlantComponent } from './profile-plant/profile-plant.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminUserAuthGuard } from './adminUserAuth/admin-user-auth-guard.service';
import { AdminUserAuthService } from './adminUserAuth/admin-user-auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRegisterComponent } from './app-register/app-register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ShowUsersListComponent } from './show-users-list/show-users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseDetailsComponent,
    HomeComponent,
    AboutUsComponent,
    DownloadsComponent,
    DashboardComponent,
    RegisterComponent,
    VerifyComponent,
    ProcessRegisterComponent,
    SetPasswordComponent,
    ProfileComponent,
    AdminComponent,
    ActivityComponent,
    DocumentComponent,
    DrugTypeComponent,
    AdminSetPasswordComponent,
    UserCreationComponent,
    ProcessUserCreationComponent,
    UserVerifyMailComponent,
    ProfilePlantComponent,
    AppRegisterComponent,
    EmailVerificationComponent,
    ShowUsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
     RouterModule.forRoot([
       {path: 'home', component: HomeComponent},
       {path: 'about-us', component: AboutUsComponent},
       {path: 'downloads', component: DownloadsComponent},
       {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
       {path: 'register', component: RegisterComponent},
       {path: 'verify/mail', component: VerifyComponent},
       {path: 'process-register', component: ProcessRegisterComponent},
       {path: 'set-password', component: SetPasswordComponent},
       {path: 'profile/1', component: ProfileComponent, canActivate:[AuthGuard]},
       {path: 'profile/2', component: ProfilePlantComponent},
       {path: 'app/register', component: AppRegisterComponent},
       {path: 'email/verification', component: EmailVerificationComponent},
       {path: 'user/admin/home', component: AdminComponent, canActivate:[AdminUserAuthGuard]},
       {path: 'user/admin/set-password', component: AdminSetPasswordComponent , canActivate:[AdminSetPasswordGuard]},
       {path: 'user/admin/verify/mail', component: UserVerifyMailComponent , canActivate:[AdminFirstTimePasswordSetGuard]},
       {path: 'user/admin/create-user', component: UserCreationComponent , canActivate:[AdminLoginGuardService]},
       {path: 'user/admin/process/user-creation', component: ProcessUserCreationComponent , canActivate:[AdminLoginGuardService]},
       {path: 'user/admin/master/activity', component: ActivityComponent , canActivate:[AdminLoginGuardService]},
       {path: 'user/admin/master/document', component: DocumentComponent , canActivate:[AdminLoginGuardService]},
       {path: 'user/admin/master/drug-type', component: DrugTypeComponent , canActivate:[AdminLoginGuardService]},
       {path: 'show/users/list', component: ShowUsersListComponent},
       {path: '', redirectTo: '/home', pathMatch: 'full'}
     ])
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, AuthGuard, AuthService, AppComponent,
    AdminLoginGuardService, AdminLoginService, AdminSetPasswordGuard, AdminSetPasswordService,
    AdminFirstTimePasswordSetGuard, AdminFirstTimePasswordSetService, AdminUserAuthGuard, AdminUserAuthService,
    BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
