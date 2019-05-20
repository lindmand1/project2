import { Omit } from 'app/shared/types/Omit';

import { LrnLookup } from './LrnLookup';

export type LrnLookup = LrnLookupSuccess | LrnLookupError;

export type LrnLookupResponse = Record<string, Omit<LrnLookupSuccess, 'number'> | null>;
export interface LrnLookupSuccess {
    number: string;
    state: string;
    rc: string;
    tn: string;
    lrn: string;
    ocn: string;
    lata: string;
    npa: string;
    nxx: string;
    company: string;
}

export interface LrnLookupError {
    number: string;
    error: string;
}

export function mapLrnLookupResponse(response: LrnLookupResponse): LrnLookup[] {
    return Object.entries(response).map(
        ([key, value]) =>
            !value || typeof value !== 'string'
                ? { ...value, number: key }
                : { number: key, error: value || 'Something went wrong' },
    );
}
