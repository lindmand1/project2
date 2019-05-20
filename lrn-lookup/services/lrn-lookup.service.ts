import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { NotificationService } from 'app/shared/services/notification.service';

import { LrnLookup, LrnLookupResponse, mapLrnLookupResponse } from '../models/LrnLookup';

@Injectable()
export class LrnLookupService {
    constructor(private http: HttpClient, private notification: NotificationService) {}

    public getLrnStatuses(numbers: string[]): Observable<LrnLookup[]> {
        return this.http.post<LrnLookupResponse>(`/api/admin/lrn-lookup/`, { numbers }).pipe(
            tap(() => this.notification.showNotification('success', 'Loaded numbers were successfully checked')),
            map(mapLrnLookupResponse),
            catchError(err => {
                const message = `An error occurred while trying to load information about given numbers`;
                this.notification.showNotification('error', message);
                if (err.error && err.error.numbers) {
                    return of(mapLrnLookupResponse(err.error.numbers));
                }
                return throwError(err);
            }),
        );
    }
}
