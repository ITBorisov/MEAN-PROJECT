import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '../../../../node_modules/@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [FooterComponent, HeaderComponent],
    providers: [],
})
export class CommonSharedModule {}
