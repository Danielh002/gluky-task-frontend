import { Component, OnInit } from '@angular/core';
import { Roles, User } from './models/user.model';
import { AppCommonService } from './services/app-common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'gluky-task-frontend';
  currentUser : User = {
    name: "Loading",
    email: "Loading",
    role: Roles.NO_AUTH
  }

  constructor(public appCommonService: AppCommonService){}

  ngOnInit() {
    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user
    })
  }

  checkRole(role: string){
    if(this.currentUser.role == role){
      return true;
    }
    return false;
  }
}
