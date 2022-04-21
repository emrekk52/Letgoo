import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.auth.loggedIn();


        if (logged) return true;


        this.router.navigateByUrl('/login')
        return false;


    }



}