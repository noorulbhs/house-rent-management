export interface GeneralSettings {
  dueDate: string;
  gracePeriod: number;
  autoGenerate: boolean;
  partialPayment: boolean;
  manualApproval: boolean;
}

export interface MiscCharge {
  id: number;
  name: string;
  type: 'Monthly' | 'One-Time';
  frequency: string;
  amount: number;
  applyTo: string;
}

export interface DueDateOverride {
  id: number;
  room?: string;
  student?: string;
  dueDate: string;
}

export interface PaymentApprovalRules {
  requireApproval: boolean;
  paymentModes: string[];
}

export interface RentSettings {
  general: GeneralSettings;
  miscCharges: MiscCharge[];
  overrides: DueDateOverride[];
  approvalRules: PaymentApprovalRules;
}
