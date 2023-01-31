import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  state => state['auth'],
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

// this is a mapping function but has memory because we use the createSelector
// so as long as  our input state objec does not change, the output is not going to be recalculated

// can use the create selectors to combine multiple selectors together

/*
  this type of function is known in functional proggraming terms as a memorized function.
  meaning that it keeps memory of previous executions and only executes itself if the inputs of the function have not been calculated before.
  after each new execution of the function, the memorized function is going to keep in the memory cache specific to the function the results of each calculation
*/
