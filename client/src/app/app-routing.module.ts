import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Guards
import { AuthGuard } from './components/authentication/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';

// Components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'promotion', loadChildren: './components/promotions/promotion.module#PromotionModule'},
    { path: 'user', loadChildren: './components/authentication/auth.module#AuthModule'}
];


@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { preloadingStrategy: PreloadAllModules }
    )],
    exports: [RouterModule],
    providers: [AuthGuard, AdminGuard, AnonymousGuard]
})
export class AppRoutingModule {}
