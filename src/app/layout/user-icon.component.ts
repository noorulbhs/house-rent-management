import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss'
})
export class UserIconComponent {
  constructor(private router: Router) {}
  goToRentSettings() {
    this.router.navigate(['/rent-settings-configuration']);
    this.closeUserDropdown();
  }
  @Input() isMobile = false;
  @Input() showUserDropdown = false;
  @Input() ownerName = '';
  @Input() toggleUserDropdown!: () => void;
  @Input() closeUserDropdown!: () => void;
}
