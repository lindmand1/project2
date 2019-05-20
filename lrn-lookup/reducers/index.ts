import { Action, combineReducers } from '@ngrx/store';
import { createFormControlState, formControlReducer, FormControlState } from 'ngrx-forms';

import * as fromRoot from 'app/reducer';

import * as Actions from '../actions/lrn-lookup.actions';

import { lrnNumbersReducer, LRNNumbersState } from './numbers.reducer';

export interface State extends fromRoot.State {
    LrnLookup: LrnLookupState;
}

export interface LrnLookupState {
    numbersInput: FormControlState<string>;
    data: LRNNumbersState;
}

const initialState = createFormControlState('LRNNumbersInput', '');

export const lrnLookupCombinedReducer = combineReducers<LrnLookupState, Actions.All>({
    numbersInput: (state: FormControlState<string> = initialState, action: Action) => formControlReducer(state, action),
    data: lrnNumbersReducer,
});
