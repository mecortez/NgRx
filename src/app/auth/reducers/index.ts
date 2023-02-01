import { User } from './../model/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
}

// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
);

/*
  A reducer function that defines the initial authentication state of our application and also defines what the store should do in response to a login action.
  In response to a login action, the store should simply save the user profile in memory so that we can access later.
*/

// A reducer function always returns a new copy of the state and never mutates the existing state

// The reducer function is just a plain function that tells the store what to do in response to a particular action

/*
  The state inside the store that gets managed by this particular module, the authentication module.
  The authentication state is corresponding to the  data stored inside the property of the store.
*/
