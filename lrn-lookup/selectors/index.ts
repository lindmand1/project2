import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LrnLookupState } from '../reducers';

export const getLrnLookupState = createFeatureSelector<LrnLookupState>('LrnLookup');
export const getLrnLookupInput = createSelector(
    getLrnLookupState,
    ({ numbersInput }) => numbersInput,
);
export const getLrnLookupInputValue = createSelector(
    getLrnLookupInput,
    ({ value }) => value,
);
export const getLrnLookupData = createSelector(
    getLrnLookupState,
    ({ data }) => data.data,
);
export const getLrnLookupError = createSelector(
    getLrnLookupState,
    ({ data }) => data.error,
);
export const getLrnLookupPending = createSelector(
    getLrnLookupState,
    ({ data }) => data.pending,
);
