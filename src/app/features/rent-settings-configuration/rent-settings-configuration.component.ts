import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RentSettingsService } from './rent-settings.service';
import { RentSettings, GeneralSettings, MiscCharge, DueDateOverride, PaymentApprovalRules } from './rent-settings.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rent-settings-configuration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './rent-settings-configuration.component.html',
  styleUrls: ['./rent-settings-configuration.component.scss']
})
export class RentSettingsConfigurationComponent {
  // ...existing code...

  isValidDate(dateStr: string | undefined): boolean {
    if (!dateStr) return false;
    return !isNaN(Date.parse(dateStr));
  }
  activeTab: number = 0;

  settings!: RentSettings;
  general!: GeneralSettings;
  miscCharges: MiscCharge[] = [];
  overrides: DueDateOverride[] = [];
  approvalRules!: PaymentApprovalRules;

  // For add/edit forms
  newCharge: Partial<MiscCharge> = {};
  editCharge: MiscCharge | null = null;
  newOverride: Partial<DueDateOverride> = {};
  editOverride: DueDateOverride | null = null;

  preview: any = {};

  constructor(private settingsService: RentSettingsService, private snackBar: MatSnackBar) {
    this.loadSettings();
  }

  loadSettings() {
    this.settings = this.settingsService.getSettings();
    this.general = { ...this.settings.general };
    this.miscCharges = [...this.settings.miscCharges];
    this.overrides = [...this.settings.overrides];
    this.approvalRules = { ...this.settings.approvalRules };
    this.updatePreview();
  }

  // General settings CRUD
  saveGeneralSettings() {
    if (!this.general.dueDate || isNaN(Date.parse(this.general.dueDate))) {
      this.showAlert('Please enter a valid due date.', 'error');
      return;
    }
    if (this.general.gracePeriod == null || this.general.gracePeriod < 0) {
      this.showAlert('Grace period must be a positive number.', 'error');
      return;
    }
    this.settingsService.updateGeneralSettings(this.general);
    this.loadSettings();
    this.showAlert('General settings saved!', 'success');
  }

  // Misc Charges CRUD
  addMiscCharge() {
    if (!this.newCharge.name || !this.newCharge.type || !this.newCharge.frequency || !this.newCharge.applyTo) {
      this.showAlert('All fields are required for Misc Charge.', 'error');
      return;
    }
    if (this.newCharge.amount == null || this.newCharge.amount <= 0) {
      this.showAlert('Amount must be a positive number.', 'error');
      return;
    }
    const charge: MiscCharge = {
      id: Date.now(),
      name: this.newCharge.name!,
      type: this.newCharge.type as 'Monthly' | 'One-Time',
      frequency: this.newCharge.frequency!,
      amount: this.newCharge.amount!,
      applyTo: this.newCharge.applyTo!
    };
    this.settingsService.addMiscCharge(charge);
    this.newCharge = {};
    this.loadSettings();
    this.showAlert('Misc charge added!', 'success');
  }
  editMiscCharge(charge: MiscCharge) {
    this.editCharge = { ...charge };
  }
  updateMiscCharge() {
    if (this.editCharge) {
      if (!this.editCharge.name || !this.editCharge.type || !this.editCharge.frequency || !this.editCharge.applyTo) {
        this.showAlert('All fields are required for Misc Charge.', 'error');
        return;
      }
      if (this.editCharge.amount == null || this.editCharge.amount <= 0) {
        this.showAlert('Amount must be a positive number.', 'error');
        return;
      }
      this.settingsService.updateMiscCharge(this.editCharge.id, this.editCharge);
      this.editCharge = null;
      this.loadSettings();
      this.showAlert('Misc charge updated!', 'success');
    }
  }
  deleteMiscCharge(id: number) {
    this.settingsService.deleteMiscCharge(id);
    this.loadSettings();
  }

  // Due Date Overrides CRUD
  addOverride() {
    if (!this.newOverride.dueDate || isNaN(Date.parse(this.newOverride.dueDate))) {
      this.showAlert('Please enter a valid due date for override.', 'error');
      return;
    }
    if (!this.newOverride.room && !this.newOverride.student) {
      this.showAlert('Room or student is required for override.', 'error');
      return;
    }
    const override: DueDateOverride = {
      id: Date.now(),
      room: this.newOverride.room,
      student: this.newOverride.student,
      dueDate: this.newOverride.dueDate!
    };
    this.settingsService.addOverride(override);
    this.newOverride = {};
    this.loadSettings();
    this.showAlert('Override added!', 'success');
  }
  editDueDateOverride(override: DueDateOverride) {
    this.editOverride = { ...override };
  }
  updateDueDateOverride() {
    if (this.editOverride) {
      if (!this.editOverride.dueDate || isNaN(Date.parse(this.editOverride.dueDate))) {
        this.showAlert('Please enter a valid due date for override.', 'error');
        return;
      }
      if (!this.editOverride.room && !this.editOverride.student) {
        this.showAlert('Room or student is required for override.', 'error');
        return;
      }
      this.settingsService.updateOverride(this.editOverride.id, this.editOverride);
      this.editOverride = null;
      this.loadSettings();
      this.showAlert('Override updated!', 'success');
    }
  }
  deleteDueDateOverride(id: number) {
    this.settingsService.deleteOverride(id);
    this.loadSettings();
  }

  // Approval Rules CRUD
  saveApprovalRules() {
    // Example validation: require at least one payment mode if approval is required
    if (this.approvalRules.requireApproval && (!this.approvalRules.paymentModes || this.approvalRules.paymentModes.length === 0)) {
      this.showAlert('Select at least one payment mode if approval is required.', 'error');
      return;
    }
    this.settingsService.updateApprovalRules(this.approvalRules);
    this.loadSettings();
    this.showAlert('Approval rules saved!', 'success');
  }

  // Dynamic preview is updated in loadSettings()
  updatePreview() {
    this.preview = {
      general: this.general,
      miscCharges: this.miscCharges,
      overrides: this.overrides,
      approvalRules: this.approvalRules
    };
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
