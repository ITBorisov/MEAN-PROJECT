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

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'promotions', component: ListPromotionComponent},
    { path: 'promotion-edit/:id', component: EditPromotionComponent},
    { path: 'promotion-details/:id', component: DetailsPromotionComponent},
    { path: 'add-promotion', component: AddPromotionComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
