import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ExitComponent } from '../../shared/exit/exit.guard';
import { Observable, Observer } from 'rxjs';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ExitComponent {
  id: string;
  showDetails: string;
  showWarning = false;
  observer: Observer<boolean>;
  flight: Flight;

  constructor(
    private route: ActivatedRoute) {
  }

  decide(decision: boolean) {
    this.showWarning = false;
    this.observer.next(decision);
    this.observer.complete();
  }

  canExit(): Observable<boolean> {
    this.showWarning = true;
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.flight = data['flight'];
    });

    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

}
