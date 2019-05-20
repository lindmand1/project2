import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';

import { GetChoiceFields } from 'app/shared/actions/choice-fields.actions';
import { getStatesChoiceFields } from 'app/shared/reducers/choiceFields.reducer';

import { LoadNumbersForLRN, ResetLRNList } from '../actions/lrn-lookup.actions';
import { State } from '../reducers';
import { getLrnLookupData, getLrnLookupInput } from '../selectors';
import { getLrnLookupError, getLrnLookupPending } from '../selectors/index';

@Component({
    selector: 'wtsky-lrn-lookup',
    template: `
        <nz-header class="header">
            <h3>LRN Lookup</h3>
            <nz-button-group>
                <button nz-button nzType="default" (click)="cleanList()" type="button">Clean list</button>
                <button nz-button nzType="default" (click)="onCheck()" type="button" [nzLoading]="pending$ | async">
                    Check
                </button>
            </nz-button-group>
        </nz-header>
        <div class="wrapper">
            <p>Type numbers separated via new line.</p>
            <textarea
                nz-input
                placeholder="Enter numbers here"
                [nzAutosize]="{ minRows: 4 }"
                [ngrxFormControlState]="input$ | async"
            ></textarea>
            <nz-alert *ngIf="(error$ | async) as error" nzType="error" [nzMessage]="error" nzShowIcon></nz-alert>
            <div class="table-wrapper" *ngIf="(data$ | async) as data">
                <nz-table *ngIf="data.length" #table [nzData]="data" [nzShowPagination]="true">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th><span nz-tooltip nzTitle="A name of carrier" nzPlacement="top"> Company </span></th>
                            <th>
                                <span nz-tooltip nzTitle="The name or short name of a state" nzPlacement="top">
                                    State
                                </span>
                            </th>
                            <th><span nz-tooltip nzTitle="Rate center" nzPlacement="top"> RC </span></th>
                            <th><span nz-tooltip nzTitle="Number itself" nzPlacement="top"> TN </span></th>
                            <th><span nz-tooltip nzTitle="Location routing number" nzPlacement="top"> LRN </span></th>
                            <th><span nz-tooltip nzTitle="Operating company number" nzPlacement="top"> OCN </span></th>
                            <th>
                                <span nz-tooltip nzTitle="Local access and transport area" nzPlacement="top">
                                    LATA
                                </span>
                            </th>
                            <th><span nz-tooltip nzTitle="Npa of number" nzPlacement="top"> NPA </span></th>
                            <th><span nz-tooltip nzTitle="Nxx of number" nzPlacement="top"> NXX </span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <ng-container *ngFor="let item of table.data">
                            <tr *ngIf="(state$ | async) as state">
                                <td>{{ item.number | phoneNumber }}</td>
                                <ng-container *ngIf="!item.error">
                                    <td>{{ item.company }}</td>
                                    <td>{{ state[item.state] }}</td>
                                    <td>{{ item.rc }}</td>
                                    <td>{{ item.tn }}</td>
                                    <td>{{ item.lrn }}</td>
                                    <td>{{ item.ocn }}</td>
                                    <td>{{ item.lata }}</td>
                                    <td>{{ item.npa }}</td>
                                    <td>{{ item.nxx }}</td>
                                </ng-container>
                                <ng-container *ngIf="item.error">
                                    <td colspan="9">{{ item.error }}</td>
                                </ng-container>
                            </tr>
                        </ng-container>
                    </tbody>
                </nz-table>
            </div>
        </div>
    `,
    styleUrls: ['lrn-lookup.component.scss'],
})
export class LrnLookupComponent implements OnInit {
    public input$ = this.store.select(getLrnLookupInput);
    public data$ = this.store.select(getLrnLookupData);
    public state$ = this.store
        .select(getStatesChoiceFields)
        .pipe(map(choiceFields => choiceFields.reduce((acc, { key, value }) => ({ ...acc, [key]: value }))));
    public error$ = this.store.select(getLrnLookupError);
    public pending$ = this.store.select(getLrnLookupPending);

    constructor(private store: Store<State>, private modal: NzModalService) {}

    public ngOnInit(): void {
        this.store.dispatch(new GetChoiceFields(['states']));
    }

    public cleanList(): void {
        this.modal.confirm({
            nzTitle: 'Are you sure?',
            nzContent: 'Do you really want to clean the list?',
            nzOkText: 'Yes',
            nzOkType: 'danger',
            nzOnOk: () => this.store.dispatch(new ResetLRNList()),
            nzCancelText: 'No',
        });
    }

    public onCheck(): void {
        this.store.dispatch(new LoadNumbersForLRN());
    }
}
