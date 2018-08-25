import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { DetailsPromotionComponent } from './details-promotion/details-promotion.component';
import { ListPromotionComponent } from './list-promotion/list-promotion.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';

import { SearchPipe } from './search.pipe';

@NgModule({
    declarations: [
        AddPromotionComponent,
        DetailsPromotionComponent,
        ListPromotionComponent,
        EditPromotionComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        PromotionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ],
    exports: [],
    providers: [],
})
export class PromotionModule {}
