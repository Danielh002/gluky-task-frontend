import { render, screen, fireEvent, RenderComponentOptions } from '@testing-library/angular'
import { EditorComponent } from './editor.component'
import { PostService } from '../services/post.service';
import { AppCommonService } from '../services/app-common.service';
import { ProfileInfoComponent } from '../shared/profile-info/profile-info.component';
import { PostComponent } from '../shared/post/post.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Post } from '../models/post.model';
import { CommentComponent } from '../shared/comment/comment.component';



describe('EditorComponent', () => {
  let componentConfiguration: RenderComponentOptions<EditorComponent> = {
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
      pendingPosts: [],
      currentUser: { email: "Loading", name: "Loading" }
    },
  }
  
  test('should have title counter', async () => {
    await render(EditorComponent, componentConfiguration)
    expect(screen.getAllByText('Loading'))
  })

    
  test('should have button with accept', async () => {
    await render(EditorComponent, componentConfiguration)
    expect(screen.getAllByText('Accept'))
  })

  test('should have button with deny', async () => {
    await render(EditorComponent, componentConfiguration)
    expect(screen.getAllByText('Deny'))
  })
})