import { Component, Input } from '@angular/core';
import { UserIconComponent } from './user-icon.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, UserIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() ownerName = '';
  @Input() isMobile = false;
  @Input() showUserDropdown = false;
  @Input() toggleUserDropdown!: () => void;
  @Input() closeUserDropdown!: () => void;
}
