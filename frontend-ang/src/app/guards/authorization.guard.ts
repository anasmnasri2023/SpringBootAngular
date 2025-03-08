import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      let requiredRoles:string[]=route.data['roles'];
      let userRoles:string[]=this.authService.roles;
      for (let role of userRoles) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }

      return  false;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
