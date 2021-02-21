import { MatDialog } from '@angular/material/dialog';
import { render, screen, RenderComponentOptions } from '@testing-library/angular'
import { of } from 'rxjs';
import { Post } from '../models/post.model';
import { AppCommonService } from '../services/app-common.service';
import { PostService } from '../services/post.service';
import { CommentComponent } from '../shared/comment/comment.component';
import { PostComponent } from '../shared/post/post.component';
import { ProfileInfoComponent } from '../shared/profile-info/profile-info.component';
import { WriterComponent } from './writer.component';

describe('WriterComponent', () => {
  let componentConfiguration: RenderComponentOptions<WriterComponent> = {
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
        },
        getPostsByStatusAndEmail: () => {
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
      deniedPosts: [],
      currentUser: { email: "Loading", name: "Loading" }
    },
  }
  
  test('should have title counter', async () => {
    await render(WriterComponent, componentConfiguration)
    expect(screen.getAllByText('Loading'))
  })

    
  test('should have button with accept', async () => {
    await render(WriterComponent, componentConfiguration)
    expect(screen.getAllByText('Update'))
  })
})