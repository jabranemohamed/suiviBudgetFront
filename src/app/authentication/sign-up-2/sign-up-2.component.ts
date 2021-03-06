import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/interfaces/utilisateur';
import { AuthentificationService } from '../../shared/services/authentification.service';
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

    constructor(private fb: FormBuilder, private userService: AuthentificationService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.userService.currentUserValue) {
          this.router.navigate(['/dashboard/default']);
          return;
        } else {
            this.signUpForm = this.fb.group({
                userName         : [ null, [ Validators.required ] ],
                prenom           : [ null, [ Validators.required ] ],
                password         : [ null, [ Validators.required ] ],
                checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
                matricule        : [ null, [ Validators.required ]],
                agree            : [ false ]
            });
        }
      }

      submitForm() {
      //We can optimize using the user object in the form directly
      this.user = new Utilisateur();
      this.user.nom = this.signUpForm.get('userName').value;
      this.user.username = this.signUpForm.get('userName').value;
      this.user.password = this.signUpForm.get('password').value;
      this.user.prenom = this.signUpForm.get('prenom').value;
      this.user.matricule = this.signUpForm.get('matricule').value;

        this.userService.register(this.user).subscribe(data => {
          this.router.navigate(['/authentication/login-2']);
        }, err => {
          this.errorMessage = 'Username is already exist';
        });
      }

}
