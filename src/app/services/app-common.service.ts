import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {
  currentUser$ = new ReplaySubject(1);

  updateUser(user: User){
    console.log("updatingUser", user);
    this.currentUser$.next(user);
  }
}