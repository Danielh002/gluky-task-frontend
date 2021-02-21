import { render, screen, fireEvent, RenderComponentOptions } from '@testing-library/angular'
import { ProfileInfoComponent } from './profile-info.component';



describe('ProfileInfoComponent', () => {
  let componentConfiguration: RenderComponentOptions<ProfileInfoComponent> = {
    providers: [],
    declarations: [
      ProfileInfoComponent,
    ],    
    componentProperties: {
      user: { email: "Loading", name: "Loading" }
    },
  }
  
  test('should have title counter', async () => {
    await render(ProfileInfoComponent, componentConfiguration)
    expect(screen.getAllByText('Loading'))
  })

})