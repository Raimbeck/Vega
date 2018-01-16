import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  //https://polk.auth0.com/userinfo
  auth0 = new auth0.WebAuth({
    clientID: 'leb0WlHnRkjuLrFOqLmf9PIsDIofYVQK',
    domain: 'polk.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.vega.com',
    redirectUri: 'http://localhost:52921/vechiles',
    scope: 'openid email profile'
  });

  jwtHelper: JwtHelper = new JwtHelper();
  private userRoles: string[] = [];
  private userObserver: Observer<any>;
  userProfile$: Observable<any> = new Observable(obs => this.userObserver = obs);

  constructor(public router: Router) {
    this.setUserRoles();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log("handle")
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.setUserRoles();

        this.router.navigate(['/']);
      } else if (err) {
        console.log(err);
        this.router.navigate(['/']);
      }
      this.getProfile();
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  private setUserRoles() {
    var accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      var decodedToken = this.jwtHelper.decodeToken(accessToken);
      this.userRoles = decodedToken['https://vega.com/roles'] || [];
    }
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');

    this.userRoles = [];
    this.userObserver.next(null);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    var expires_at = localStorage.getItem('expires_at');
    if(expires_at == null) return false;
    const expiresAt = JSON.parse(expires_at);
    return new Date().getTime() < expiresAt;
  }

  public getProfile() {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken) 
      return;
    
    
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if(profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userObserver.next(profile);
      }
    });
  }

  public isInRoles(roles: string[]): boolean {
    if(!roles) return true;
    return roles.every(r => this.userRoles.indexOf(r) > -1);
  }
}