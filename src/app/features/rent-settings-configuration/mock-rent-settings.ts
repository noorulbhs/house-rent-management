export const MOCK_RENT_SETTINGS = {
  general: {
    dueDate: '2025-08-01',
    gracePeriod: 5,
    autoGenerate: true,
    partialPayment: true,
    manualApproval: false
  },
  miscCharges: [
    { id: 1, name: 'Water', type: 'Monthly', frequency: 'Monthly', amount: 200, applyTo: 'All' },
    { id: 2, name: 'Electricity', type: 'Monthly', frequency: 'Monthly', amount: 350, applyTo: 'Room 101' }
  ],
  overrides: [
    { id: 1, room: '101', dueDate: '2025-08-05' },
    { id: 2, student: 'S123', dueDate: '2025-08-10' }
  ],
  approvalRules: {
    requireApproval: true,
    paymentModes: ['Cash', 'Online']
  }
};
