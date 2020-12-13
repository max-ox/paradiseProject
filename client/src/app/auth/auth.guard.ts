import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, CanActivate, CanLoad, Router, Route, 	UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HelpersService } from '../_helpers/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    public authService: AuthService,
    private helpersService: HelpersService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {

    //TODO: change for check session key
    let hours = 2
    let saved = localStorage.getItem('saved')
    if (saved && (new Date().getTime() - Number(saved) > 60 * 1000)) {
      localStorage.clear()
    }
    if (this.helpersService.isLoggedIn !== true) {
      this.router.navigate(['sign-in'])
    }
    return true;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.helpersService.isLoggedIn !== true) {
      return false;
    }

    if (this.authService.isAdmin !== true) {
      return false;
    }

    return true;
  }
}
