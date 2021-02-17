import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly postRoute : string = '/user';

  constructor(private http: HttpClient) { }

  createUser( name: string, userEmail: string, userImage: string) : Observable<User> {
    let newUser : User = {
      email: userEmail,
      name: name,
      imageUrl: userImage 
    }
    return this.http.post<User>(environment.server + this.postRoute, newUser).pipe(pluck('result'));
  }
}
