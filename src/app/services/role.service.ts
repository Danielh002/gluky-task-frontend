import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  sharedVariable$ = new ReplaySubject(1);
  constructor() { }

  updateValue(value: Array<String>) {
    this.sharedVariable$.next(value);
  }
}


