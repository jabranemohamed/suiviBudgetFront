import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/interfaces/utilisateur';
import { AuthentificationService } from '../../shared/services/authentification.service';
import {Router} from '@angular/router';


@Component({
    templateUrl: './login-2.component.html',
     styleUrls: ['./login-2.component.css']
})

export class Login2Component implements OnInit {
    loginForm: FormGroup;
    user: Utilisateur;
    errorMessage: string;

    constructor(public fb: FormBuilder, public userService: AuthentificationService, private router: Router) {
    }

    submitForm(): void {
        this.user = new Utilisateur();
        this.user.nom = this.loginForm.get('userName').value;
        this.user.username = this.loginForm.get('userName').value;
        this.user.password = this.loginForm.get('password').value;
        this.userService.login(this.user).subscribe(data => {
            this.router.navigate(['/dashboard/default']);
          }, err => {
            this.errorMessage = 'Erreur lors de le login. Utilisateur non retrouver';
          });
    }

    ngOnInit(): void {
      var currentUserExist = sessionStorage.getItem('currentUser');
        if (currentUserExist && this.userService.currentUserValue) {
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

