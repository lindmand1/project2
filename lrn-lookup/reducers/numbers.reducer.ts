import * as LRNActions from '../actions/lrn-lookup.actions';
import { LrnLookup } from '../models/LrnLookup';

export interface LRNNumbersState {
    pending: boolean;
    data: LrnLookup[];
    error: string;
}

const initialState: LRNNumbersState = {
    pending: false,
    data: [],
    error: '',
};
export function lrnNumbersReducer(state: LRNNumbersState = initialState, action: LRNActions.All): LRNNumbersState {
    switch (action.type) {
        case LRNActions.LOAD_NUMBERS_FOR_LRN:
            return {
                ...state,
                pending: true,
                error: '',
            };

        case LRNActions.LOAD_NUMBERS_FOR_LRN_SUCCESS:
            return {
                ...state,
                pending: false,
                error: '',
                data: action.data,
            };

        case LRNActions.LOAD_NUMBERS_FOR_LRN_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        case LRNActions.LRN_RESET_LIST:
            return {
                ...state,
                error: '',
                data: [],
            };

        default:
            return state;
    }
}
