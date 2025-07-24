import { Injectable } from '@angular/core';
import { RentSettings } from './rent-settings.model';
import { MOCK_RENT_SETTINGS } from './mock-rent-settings';

@Injectable({ providedIn: 'root' })
export class RentSettingsService {
  private settings: RentSettings = MOCK_RENT_SETTINGS as RentSettings;

  getSettings(): RentSettings {
    return this.settings;
  }

  updateGeneralSettings(general: Partial<RentSettings['general']>) {
    this.settings.general = { ...this.settings.general, ...general };
  }

  getMiscCharges() {
    return this.settings.miscCharges;
  }

  addMiscCharge(charge: any) {
    this.settings.miscCharges.push(charge);
  }

  updateMiscCharge(id: number, charge: any) {
    const idx = this.settings.miscCharges.findIndex(c => c.id === id);
    if (idx > -1) this.settings.miscCharges[idx] = charge;
  }

  deleteMiscCharge(id: number) {
    this.settings.miscCharges = this.settings.miscCharges.filter(c => c.id !== id);
  }

  getOverrides() {
    return this.settings.overrides;
  }

  addOverride(override: any) {
    this.settings.overrides.push(override);
  }

  updateOverride(id: number, override: any) {
    const idx = this.settings.overrides.findIndex(o => o.id === id);
    if (idx > -1) this.settings.overrides[idx] = override;
  }

  deleteOverride(id: number) {
    this.settings.overrides = this.settings.overrides.filter(o => o.id !== id);
  }

  getApprovalRules() {
    return this.settings.approvalRules;
  }

  updateApprovalRules(rules: Partial<RentSettings['approvalRules']>) {
    this.settings.approvalRules = { ...this.settings.approvalRules, ...rules };
  }
}
