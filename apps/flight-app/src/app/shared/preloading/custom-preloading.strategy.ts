

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomPreloadingStrategy implements PreloadingStrategy {
    constructor() { }


    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        
        if (route && route.data && route.data['preload']) {
            return fn();
        }
        else {
            return of(null);
        }

        // return of(true).pipe(delay(9000), switchMap(_ => fn()))

    }
    
}