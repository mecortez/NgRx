import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';

// this class is only handled by the NgRx effects library
@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action =>
        localStorage.setItem(
          'user',
          JSON.stringify(action.user)
        )
      )
    ),
    // inform that this particular side effect does not result in the dispatching of an action
    // in this case, without this would create an loop
    {dispatch: false}
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(action => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    ),
    // in this case, without this would create an loop
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
