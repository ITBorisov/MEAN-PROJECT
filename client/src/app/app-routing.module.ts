import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddPromotionComponent } from './components/promotions/add-promotion/add-promotion.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthGuard } from './components/authentication/auth.guard';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { ListPromotionComponent } from './components/promotions/list-promotion/list-promotion.component';
import { DetailsPromotionComponent } from './components/promotions/details-promotion/details-promotion.component';
import { EditPromotionComponent } from './components/promotions/edit-promotion/edit-promotion.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'promotions', component: ListPromotionComponent},
    { path: 'promotion-edit/:id', component: EditPromotionComponent, canActivate: [AuthGuard]},
    { path: 'promotion-details/:id', component: DetailsPromotionComponent},
    { path: 'user-profile/:id', component: UserProfileComponent},
    { path: 'add-promotion', component: AddPromotionComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule {}
