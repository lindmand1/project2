import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedModule } from 'app/shared/shared.module';

import { LrnLookupComponent } from './component/lrn-lookup.component';
import { LrnLookupEffect } from './effects/lrn-lookup.effect';
import { AdminLrnLookupRouting } from './lrn-lookup.routing';
import { lrnLookupCombinedReducer } from './reducers';
import { LrnLookupService } from './services/lrn-lookup.service';

@NgModule({
    imports: [
        NgrxFormsModule,
        NgZorroAntdModule,
        CommonModule,
        EffectsModule.forFeature([LrnLookupEffect]),
        StoreModule.forFeature('LrnLookup', lrnLookupCombinedReducer),
        SharedModule,
        AdminLrnLookupRouting,
    ],
    declarations: [LrnLookupComponent],
    providers: [LrnLookupEffect, LrnLookupService],
})
export class LrnLookupModule {}
