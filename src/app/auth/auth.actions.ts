import { User } from './model/user.model';
import { createAction, props } from "@ngrx/store";

// action creator function
export const login = createAction(
  "[Login Page] User Login", // mandatory action type
  props<{user: User}>()
  // define the place of the application where the action is getting dispatched;
  // Should not be dispatching the same action in multiple differents sreens and components;
  // First the source of the action;
  // Second part of the action is either the event or the command that the action corresponds;
);

export const logout = createAction(
  "[Top Menu] Logout"
);
