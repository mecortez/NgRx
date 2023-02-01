import { isLoggedIn } from './auth.selectors';
import { select } from '@ngrx/store';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
    return this.store
    .pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if(!loggedIn) this.router.navigateByUrl('/login');
      })
    )
  }
}
