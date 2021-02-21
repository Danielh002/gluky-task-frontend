import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {
  public currentUser$ = new ReplaySubject(1);

  updateUser(user: User){
    this.currentUser$.next(user);
  }
}