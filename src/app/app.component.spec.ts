import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthService } from 'angularx-social-login';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { EditorComponent } from './editor/editor.component';
import { NoAuthenticatedViewComponent } from './no-authenticated-view/no-authenticated-view.component';
import { AppCommonService } from './services/app-common.service';
import { PostComponent } from './shared/post/post.component';
import { ProfileInfoComponent } from './shared/profile-info/profile-info.component';
import { WriterComponent } from './writer/writer.component';


 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        AuthButtonComponent,
        NoAuthenticatedViewComponent,
        WriterComponent,
        EditorComponent,
        PostComponent,
        ProfileInfoComponent
      ],
      providers: [AppCommonService, {       
        provide: SocialAuthService,
        useValue: {}
      },
      { provide: MatDialog, useValue: {} }
    ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gluky-task-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gluky-task-frontend');
  });