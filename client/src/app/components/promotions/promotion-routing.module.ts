import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { ListPromotionComponent } from './list-promotion/list-promotion.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { DetailsPromotionComponent } from './details-promotion/details-promotion.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
    { path: 'add', component: AddPromotionComponent, canActivate: [AuthGuard]},
    { path: 'all', component: ListPromotionComponent},
    { path: 'edit/:id', component: EditPromotionComponent, canActivate: [AuthGuard]},
    { path: 'details/:id', component: DetailsPromotionComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionRoutingModule {}
