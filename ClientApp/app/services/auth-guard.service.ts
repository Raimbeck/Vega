import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected authService: AuthService, private router: Router) {
        
    }

    canActivate(route: ActivatedRouteSnapshot) {
        if(this.authService.isAuthenticated()) {
            if(this.authService.isInRoles(route.data.requiredRoles))
                return true;
            
            this.router.navigate(['/']);
            return false;
        }

        this.authService.login();
        return false;
    }
}