import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Credentials } from '../../models/credentials.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() title = 'User Management';
  @Input() credentials: Credentials | null = null;
  @Output() logoutEvent = new EventEmitter();

  logout(): void {
    this.logoutEvent.emit();
  }

}
