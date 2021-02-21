import { of } from 'rxjs';
import { AppCommonService } from '../../services/app-common.service';
import { PostService } from '../../services/post.service'
import { PostComponent } from './post.component';
import { Post } from '../../models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../../models/user.model';
import { render, screen, fireEvent, RenderComponentOptions } from '@testing-library/angular'



describe('PostComponent', () => {
  let componentConfiguration: RenderComponentOptions<PostComponent> = {
    providers: [
      {
        provide: PostService,
        useValue: {
          getPosts: () => {
            let post: Post = {
              author: "Test",
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
      PostComponent,
    ],

    componentProperties: {
      user: {
        email: "Test",
        name: "Test",
        role: Roles.EDITOR
      },
      posts: [],
    },
  }

  test('should button with share', async () => {
    await render(PostComponent, componentConfiguration)
    expect(screen.getAllByText('share'))
  })
})