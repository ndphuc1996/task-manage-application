import { Component } from '@angular/core';
import {BackendService, User} from './backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks = this.backend.tasks();
  users: Observable<User[]> = this.backend.users();

  constructor(private backend: BackendService) {}
}
