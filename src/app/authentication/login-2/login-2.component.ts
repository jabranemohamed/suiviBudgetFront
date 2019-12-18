import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/interfaces/utilisateur';
import { UserService } from '../../shared/services/user.service';
import {Router} from '@angular/router';


@Component({
    templateUrl: './login-2.component.html'
})

export class Login2Component implements OnInit {
    loginForm: FormGroup;
    user: Utilisateur;
    errorMessage: string;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    }

    submitForm(): void {
        this.user = new Utilisateur();
        this.user.matricule = this.loginForm.get('userName').value;
        this.user.password = this.loginForm.get('password').value;
        this.userService.login(this.user).subscribe(data => {
            this.router.navigate(['/dashboard/default']);
          }, err => {
            this.errorMessage = 'Username or password is incorrect.';
          });
    }

    ngOnInit(): void {
        if (this.userService.currentUserValue) {
            this.router.navigate(['/dashboard/default']);
            return;
          } else {
            this.loginForm = this.fb.group({
                userName: [ null, [ Validators.required ] ],
                password: [ null, [ Validators.required ] ]
            });
         }
    }
}

