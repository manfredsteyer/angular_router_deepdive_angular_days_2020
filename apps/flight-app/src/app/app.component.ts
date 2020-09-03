import {Component, OnInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter, debounce, debounceTime } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router) { 

      this.oauthService.configure(authCodeFlowConfig);
      this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(
          e => e instanceof NavigationEnd || 
                  e instanceof NavigationCancel ||
                  e instanceof NavigationError ||
                  e instanceof NavigationStart
          ),
          debounceTime(2000)
          )
    .subscribe(e => {
      this.loading = e instanceof NavigationStart;
    });
  }
}

