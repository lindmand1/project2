import { Action } from '@ngrx/store';

import { LrnLookup } from '../models/LrnLookup';

export const LOAD_NUMBERS_FOR_LRN = 'LOAD_NUMBERS_FOR_LRN';
export const LOAD_NUMBERS_FOR_LRN_SUCCESS = 'LOAD_NUMBERS_FOR_LRN_SUCCESS';
export const LOAD_NUMBERS_FOR_LRN_FAIL = 'LOAD_NUMBERS_FOR_LRN_FAIL';
export const LRN_RESET_LIST = 'LRN_RESET_LIST';

export class LoadNumbersForLRN implements Action {
    public readonly type = LOAD_NUMBERS_FOR_LRN;
}

export class LoadNumbersForLRNSuccess implements Action {
    public readonly type = LOAD_NUMBERS_FOR_LRN_SUCCESS;

    constructor(public data: LrnLookup[]) {}
}

export class LoadNumbersForLRNFail implements Action {
    public readonly type = LOAD_NUMBERS_FOR_LRN_FAIL;

    constructor(public error: string) {}
}

export class ResetLRNList implements Action {
    public readonly type = LRN_RESET_LIST;
}

export type All = ResetLRNList | LoadNumbersForLRN | LoadNumbersForLRNSuccess | LoadNumbersForLRNFail;
