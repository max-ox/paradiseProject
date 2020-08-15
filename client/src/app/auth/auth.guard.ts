import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('!!!!!!!!!!!!', this.authService.isLoggedIn);
    let hours = 2
    let saved = localStorage.getItem('saved')
    if (saved && (new Date().getTime() - Number(saved) > 60 * 1000)) {
      localStorage.clear()
    }
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['log-in'])
    }
    return true;
  }
}
