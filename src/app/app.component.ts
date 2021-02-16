import { Component, OnInit } from '@angular/core';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'gluky-task-frontend';

  constructor(private roleService: RoleService){}

  ngOnInit() {
    this.roleService.update('WRITER')
  }

}
