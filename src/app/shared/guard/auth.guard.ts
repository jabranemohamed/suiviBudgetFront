import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let item = sessionStorage.getItem('isLoggedin');
    console.log("ITEM"+item)
    if (item) {
      return true;
    }
    this.router.navigate(['/authentication/login-2']);
    return false;
  }
}
