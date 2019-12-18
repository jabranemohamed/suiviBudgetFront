import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/interfaces/utilisateur';
import { UserService } from '../../shared/services/user.service';
import {Router} from '@angular/router';


@Component({
    templateUrl: './sign-up-2.component.html'
})

export class SignUp2Component implements OnInit {

    signUpForm: FormGroup;
    user: Utilisateur;
    errorMessage: string;

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.userService.currentUserValue) {
          this.router.navigate(['/dashboard/default']);
          return;
        } else {
            this.signUpForm = this.fb.group({
                userName         : [ null, [ Validators.required ] ],
                email            : [ null, [ Validators.required ] ],
                password         : [ null, [ Validators.required ] ],
                checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
                agree            : [ false ]
            });
        }
      }

      submitForm() {
        this.userService.register(this.user).subscribe(data => {
          this.router.navigate(['/login']);
        }, err => {
          this.errorMessage = 'Username is already exist';
        });
      }

}
