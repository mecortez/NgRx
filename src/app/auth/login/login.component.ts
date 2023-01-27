import { AppState } from './../reducers/index';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { login } from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store:Store<AppState>
      // the values emitted by the store observable are the values of the global state
      ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password)
    .pipe(
      /*
        tap -> allow to produce side-effects in our rxjs stream;
        Used to perform side-effects for notifications from the source observable;
        Used when you want to affect outside state with a notification without altering the notification;
      */
      tap( user => {
        console.log(user);
        // Save the user profile inside the store
        this.store.dispatch(login({user})
          // {
          //   type: 'Login Action',
          //   payload: {
          //     user
          //   }
          // }
        )
        /*
          The dispatch method is the only way to modify the data inside the store;
          This method takes only one argument, wich is an NgRx action;

          An action is a plain JS object that we send to the store in order to trigger some modification of the store state;
          Each action has a type, wich is a string;
          Each action also contains a payload, wich is any data that the store might need in order to create a new version of it's internal state;
          An action always has a type and usually it has a payload (not mandatory);
        */
        this.router.navigateByUrl('/courses');
      }
      )
    )
    .subscribe(
      noop,
      () => alert('Login Failed')
    )
  }

}

