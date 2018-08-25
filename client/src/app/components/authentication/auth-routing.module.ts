import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AnonymousGuard } from '../../core/guards/anonymous.guard';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'public-profile/:id', component: UserProfileComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
