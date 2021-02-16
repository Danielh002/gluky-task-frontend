import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { UserService } from '../services/user.service';

declare var gapi : any;

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;

  constructor(private userService: UserService){
}

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi loaded
    // and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '114997711738-goko2uke2ire5g3q64vm9cv6tpsc9dku.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user  => {
          this.user = user
          this.userService.createUser( user.getBasicProfile().getName() , user.getBasicProfile().getEmail(), user.getBasicProfile().getImageUrl()).subscribe(noop)
          localStorage.setItem('idToken', this.user.getAuthResponse().id_token)
        },
        error => this.error = error);
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  public googleLogout() {
    gapi.load('auth2', () => {
      gapi.auth2 = gapi.auth2.getAuthInstance();
      gapi.auth2.signOut().then(function() {
        console.log("User logout")
      });
    });
  }
}