import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router :Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean>
        | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                if (!authenticated) {
                    this.router.navigate(['/home']);
                    return false;
                }                    
                if(authenticated) {
                    return true;
                }
                    
                    
            });
    }
}