import { Component } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private store: Store){}

  onLogout(){
    this.store.dispatch(logout());
  }
}
