import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, FormGroup, FormArray,  Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertsService } from 'angular-alert-module';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { State } from '../../model/state.model';
import { City } from '../../model/city.model';
import { Fruit } from '../../model/fruit.model';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  checkForm: FormGroup;
  // userData = User;
  //  State = [];
  // for states
  selectedState: State;
  states: State[];
  // for cities
  selectedCity: City;
  cities: City[];
  selectedState_id: number ;
  // for fruits
  selectedFruit: Fruit;
  fruits: Fruit[];
  
  // fruits = [{'fruit_id': 1, 'fruit_name': 'apples'}, {'fruit_id': 2, 'fruit_name': 'mango'}, {'fruit_id': 3, 'fruit_name': 'pears' }];
 

  favFruitsError: Boolean = true;
  selectedFruitValues = [];
  get f() { return this.registerForm.controls; }
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alerts: AlertsService ) {

  }


  // get states for drop down from db
  getStates() {
    this.userService.getStates().subscribe(states => this.states = states);
  }
  // get Cities for drop down from db
  getCities(selectedState_id) {
    this.userService.getCities(selectedState_id).subscribe(cities => {
        // console.log(cities);
        this.cities = cities;
    });
  }
  // get selected state_id for cities
  selectChangeHandler (event: any) {
    this.selectedState_id = event.target.value;
    this.getCities(this.selectedState_id);
  }
  // get fruits for check box
  getFruits() {
    this.userService.getFruits().subscribe(fruits => {
     // debugger
      this.fruits = fruits;
    });
  }
  // End getting data from db...


// checking ends

  ngOnInit() {
    this.getStates();
    this.getCities(this.selectedState_id);
    this.getFruits();
    // this.addFruitsControls();

    this.registerForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4)] ],
      firstName: [null, [Validators.required, Validators.minLength(4)] ],
      lastName: [null,  [Validators.required, Validators.minLength(4)] ],
      password: [null, [Validators.required, Validators.minLength(4)] ],
      cPassword: [null, [Validators.required, Validators.minLength(4) ] ],

      // favFruits: this.addFruitsControls(),
      address: this.formBuilder.group({
        addressType: [null, Validators.required],
        expiryDate: [null, this.expiryDateValidator],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
      })
    },
    {
      validator: this.confirmPassword
    });
  }

  // Confirm password validator
  confirmPassword(group: FormGroup) {
    const pw = group.controls['password'];
    const pw2 = group.controls['cPassword'];
    if (pw.value !== pw2.value) { // this is the trick
      pw2.setErrors({confirmPassword: true});
    } else {
      pw2.setErrors(null);
    }
    return null;
  }

// fruits Checkbox
  addFruitsControls() {
    const arr = this.fruits.map(item => {
      // debugger
      return this.formBuilder.control(false);
    });
    // debugger
    return this.formBuilder.array(arr);
  }
//
  // validation Touched
  checkFruitControlsTouched() {
    let flg = false;
    this.fruitsArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });
    return flg;
  }
  // // Get selected values
  getSelectedFruitsValue() {
    // debugger
    this.selectedFruitValues = [];
    this.fruitsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFruitValues.push(this.fruits[i]);
      }
    });
    this.favFruitsError =  this.selectedFruitValues.length > 0 ? false : true;
  }
//
  // Trigger Date
  triggerExpiryValidator() {
    this.expiryDate.updateValueAndValidity();
  }
  expiryDateValidator(control: AbstractControl) {
    if (control) {
      const group = <FormGroup>control.root.get('address');
      if (group) {
        const addControl = group.controls.addressType;
        if (addControl) {
          if (addControl.value === 'temporary') {
            if (control.value === null || control.value === undefined || control.value === '') {
              return {'date_error' : 'Date cannot be blank.'};
            }
          }
        }
      }
    }
    return null;
  }

// get fruit array from form
  get fruitsArray() {
    return <FormArray>this.registerForm.get('favFruits');
  }
//
  get zipCode() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.zipCode;
  }

  get state() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.state;
  }

  get city() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.city;
  }

  get streetAddress() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.streetAddress;
  }
  get addressType() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.addressType;
  }

  get expiryDate() {
    const temp = <FormGroup>this.registerForm.controls.address;
    return temp.controls.expiryDate;
  }

  /*get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get cPassword() {
    return this.registerForm.get('cPassword');
  }
*/
  // register form submit
  onSubmit(registerForm) {
    this.userService.registerUser( registerForm.value ).subscribe((res) => {
      // this.resetForm(form);
      // localStorage.setItem('token', res.toString() );
      this.alerts.setMessage('Register  successfully...!', 'success');
      // this.router.navigateByUrl('/login');
    },
      err => {
        console.log(err);
         this.alerts.setMessage ('Registration in-complete', 'error');
      }
    );
  }


} // class ends here.

/** Code Ends Here  */











/** Password validation
export function passValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        const cnfpassValue = control.value;

        const passControl = control.root.get('password');
        if(passControl){
            const passValue = passControl.value;
            if(passValue !== cnfpassValue){
                return{
                    isError: true
                };
            }
        }
    }
    return null;
}
 */





/*
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {FormsModule, registerFormsModule} from '@angular/forms';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    constructor(private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(6)] ],
            lastName: ['', [Validators.required, Validators.minLength(6)] ],
            email: ['', [Validators.required, Validators.email] ],
            password: ['', [Validators.required, Validators.minLength(6)] ]
        });
    }

    // convenience getter for easy access to form fields
    // get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        alert('SUCCESS!! :-)');
    }


    export function passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfpassValue = control.value;

        const passControl = control.root.get('password'); // magic is this
        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== cnfpassValue || passValue === '') {
                return {
                    isError: true
                };
            }
        }
    }

}


*/


/**Code Ends  */
