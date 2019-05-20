import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { SetValueAction } from 'ngrx-forms';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { NotificationService } from 'app/shared/services/notification.service';

import * as LrnLookupActions from '../actions/lrn-lookup.actions';
import { State } from '../reducers';
import { getLrnLookupInputValue } from '../selectors';
import { LrnLookupService } from '../services/lrn-lookup.service';

@Injectable()
export class LrnLookupEffect {
    constructor(
        private action$: Actions,
        private store: Store<State>,
        private service: LrnLookupService,
        private notification: NotificationService,
    ) {}

    @Effect()
    public loadLrnLookup: Observable<Action> = this.action$.pipe(
        ofType(LrnLookupActions.LOAD_NUMBERS_FOR_LRN),
        withLatestFrom(this.store.select(getLrnLookupInputValue), (_, value) =>
            value
                .split('\n')
                .map(phoneNumber => phoneNumber.replace(/[^0-9x]/g, ''))
                .filter(phoneNumber => phoneNumber.trim().length),
        ),
        tap(
            value => !value.length && this.notification.showNotification('warning', 'Inserted numbers are not correct'),
        ),
        switchMap(
            numbers =>
                (numbers.length
                    ? this.service.getLrnStatuses(numbers).pipe(
                          switchMap(value =>
                              from([
                                  new LrnLookupActions.LoadNumbersForLRNSuccess(value),
                                  new SetValueAction('LRNNumbersInput', ''),
                              ]),
                          ),
                          catchError(() =>
                              of(
                                  new LrnLookupActions.LoadNumbersForLRNFail(
                                      'An error occurred while trying to download information about numbers',
                                  ),
                              ),
                          ),
                      )
                    : of(new LrnLookupActions.LoadNumbersForLRNFail('Numbers not provided'))) as Observable<Action>,
        ),
    );
}
