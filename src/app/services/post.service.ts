import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly postRoute : string = '/posts';

  constructor(private http: HttpClient) { }

  getPost(searchAtt: Object) : Observable<Response<Post[]>> {
    return this.http.post<Response<Post[]>>(environment.server + this.postRoute, searchAtt);
  }
}
