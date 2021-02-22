import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppCommonService } from '../services/app-common.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Roles, User } from '../models/user.model';
import { uniqueNamesGenerator, adjectives, colors, animals } from  'unique-names-generator';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent {
  currentUser : User;
  
  constructor(private userService: UserService, private appCommonService: AppCommonService, private authService: SocialAuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => this.addUser(user.name, user.email, user.photoUrl, user.idToken)
    );
  }

  addUser( name: string, email: string, imageUrl: string, idToken: string){
    this.userService.createUser(name, email, imageUrl).subscribe((result: User) => {
      this.currentUser = result;
      result.idToken = idToken;
      this.appCommonService.updateUser(result);
    })
  }

  signOut(): void {
    if( this.currentUser){
      let randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 2
      });
  
      this.authService.signOut();
      this.currentUser = {
        name: randomName,
        email: randomName+'@gmail.com',
        role: Roles.NO_AUTH
      }
      this.appCommonService.updateUser(this.currentUser);
      this.currentUser = undefined;
    }
  }
}