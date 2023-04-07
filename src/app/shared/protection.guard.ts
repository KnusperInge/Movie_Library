import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
@Injectable()
export class Protection {
  constructor(private authService: AuthService, private router: Router) {}
  private isAuth: boolean = false;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.isAuthenticated();
    this.authService
      .isAuthenticated()
      .subscribe((check) => (this.isAuth = check));
    if (this.isAuth) {
      return this.isAuth;
    } else {
      this.router.navigate(['/home']);
      return this.isAuth;
    }
  }
}
