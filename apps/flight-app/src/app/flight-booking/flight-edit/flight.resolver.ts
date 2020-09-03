

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlightResolver implements Resolve<Flight> {

    constructor(private flightService: FlightService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Flight> {
        const id = route.params['id'];
        return this.flightService.findById(id).pipe(delay(7000));
    }
}