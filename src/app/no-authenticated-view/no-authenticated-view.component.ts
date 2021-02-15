import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-no-authenticated-view',
  templateUrl: './no-authenticated-view.component.html',
  styleUrls: ['./no-authenticated-view.component.css']
})
export class NoAuthenticatedViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
