import { Component, OnInit } from '@angular/core';
import { Roles, User } from './models/user.model';
import { AppCommonService } from './services/app-common.service';
import { uniqueNamesGenerator, adjectives, colors, animals } from  'unique-names-generator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'gluky-task-frontend';
  currentUser : User;

  constructor(public appCommonService: AppCommonService){}

  ngOnInit() {
    let randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
      length: 2
    });

    this.currentUser = {
      name: randomName,
      email: randomName+'@gmail.com',
      role: Roles.NO_AUTH
    }

    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user
    })

    this.appCommonService.updateUser(this.currentUser);
  }

  checkRole(role: string){
    if(this.currentUser.role == role){
      return true;
    }
    return false;
  }
}
