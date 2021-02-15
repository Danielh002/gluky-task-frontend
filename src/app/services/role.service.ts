import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { scan } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles$ = new ReplaySubject<string[]>(1);
  roleUpdates$ = new BehaviorSubject(['basic']);

  constructor() {
    this.roleUpdates$
      .pipe(
        scan((acc, next) => next, [])
      )
      .subscribe(this.roles$);
  }

  update(roles) {
    this.roleUpdates$.next(roles);
  }
}


