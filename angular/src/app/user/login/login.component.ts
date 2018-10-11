import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, FormArray,  Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';

import { AlertsService } from 'angular-alert-module';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // userData = {};
  get f() { return this.loginForm.controls; }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alerts: AlertsService ) { }
  loginForm: FormGroup;

  ngOnInit() {
    // console.log('Initial Value', this.user);
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4)] ],
      password: [null, [Validators.required, Validators.minLength(4)] ]
    });
  }


  // register form submit
  onSubmit(loginForm) {
    this.userService.loginUser(loginForm.value).subscribe((res) => {
      // debugger
      // this.resetForm(form);
      // localStorage.setItem('token', res.toString() );
      this.alerts.setMessage('Login successfully...!', 'success');
      // this.router.navigateByUrl('/profile');
    },
      err => {
        // debugger
        // console.log(err);
        this.alerts.setMessage ('Login failed ', 'error');
      }
    );
  }
}
