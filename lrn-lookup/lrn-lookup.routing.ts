import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LrnLookupComponent } from './component/lrn-lookup.component';

const routes: Routes = [
    {
        path: '',
        component: LrnLookupComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AdminLrnLookupRouting {}
