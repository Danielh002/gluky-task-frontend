
import { render, screen, RenderComponentOptions } from '@testing-library/angular'
import { NoAuthenticatedViewComponent } from './no-authenticated-view.component'
import { PostService } from '../services/post.service';
import { AppCommonService } from '../services/app-common.service';
import { ProfileInfoComponent } from '../shared/profile-info/profile-info.component';
import { PostComponent } from '../shared/post/post.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Post } from '../models/post.model';
import { CommentComponent } from '../shared/comment/comment.component';



describe('NoAuthenticatedViewComponent', () => {
  let componentConfiguration: RenderComponentOptions<NoAuthenticatedViewComponent> = {
    providers: [{
      provide: PostService,
      useValue: {
        getPosts: () => {
          let post : Post = {
            author : "Test",
            content: "Test",
            tittle: "Tittle"
          }
          return of([post])
        }
      }
    },
    { provide: AppCommonService, useClass: AppCommonService },
    { provide: MatDialog, useValue: {} }
    ],
    declarations: [
      ProfileInfoComponent,
      PostComponent,
      CommentComponent
    ],
    
    componentProperties: {
      approvedPosts: [],
      currentUser: { email: "Loading", name: "Loading" }
    },
  }
  
  test('should have title TEXT', async () => {
    await render(NoAuthenticatedViewComponent, componentConfiguration)
    expect(screen.getAllByText('Role: NO_AUTH'))
  })
})