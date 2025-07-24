import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MOCK_PAYMENTS } from '../../payments/mock-payments';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatCheckboxModule, MatProgressSpinnerModule],
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.scss'
})
export class PaymentSummaryComponent implements OnInit {
  houses: string[] = ['House A', 'House B', 'House C'];
  approvingId: string | null = null;

  inlineApprove(paymentId: string) {
    this.approvingId = paymentId;
    setTimeout(() => {
      const payment = this.payments.find(p => p.id === paymentId);
      if (payment) {
        payment.status = 'PAID';
        this.applyFilters();
      }
      this.approvingId = null;
    }, 800); // Simulate real-time update
  }

  downloadInvoice(payment: any) {
    // For mock, just download a simple text file as PDF
    const content = `Invoice\nStudent: ${payment.studentName}\nRoom: ${payment.room}\nMonth: ${payment.month}\nRent: ₹${payment.rent}\nMisc: ₹${payment.miscCharges}\nTotal Due: ₹${payment.totalDue}\nTotal Paid: ₹${payment.totalPaid}\nStatus: ${payment.status}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${payment.studentName}-${payment.month}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  isMobile = false;
  selectedPayments: Set<string> = new Set();
  bulkActionMessage = '';

  toggleSelection(paymentId: string) {
    if (this.selectedPayments.has(paymentId)) {
      this.selectedPayments.delete(paymentId);
    } else {
      this.selectedPayments.add(paymentId);
    }
  }

  selectAllVisible() {
    this.filteredPayments.forEach(p => this.selectedPayments.add(p.id));
  }

  clearSelection() {
    this.selectedPayments.clear();
  }

  bulkApprove() {
    this.payments.forEach(p => {
      if (this.selectedPayments.has(p.id) && p.status !== 'PAID') {
        p.status = 'PAID';
      }
    });
    this.applyFilters();
    this.bulkActionMessage = 'Selected bills approved.';
    this.clearSelection();
  }

  bulkExport() {
    // For mock, just show a message
    this.bulkActionMessage = 'Exported ' + this.selectedPayments.size + ' bills.';
    this.clearSelection();
  }

  bulkSendReminders() {
    // For mock, just show a message
    this.bulkActionMessage = 'Reminders sent for ' + this.selectedPayments.size + ' bills.';
    this.clearSelection();
  }
  showManualEntryModal = false;
  manualPayment: any = {
    studentName: '',
    room: '',
    month: '',
    rent: 0,
    miscCharges: 0,
    totalPaid: 0,
    status: 'UNPAID',
    receiptUrl: ''
  };
  manualError = '';

  openManualEntry() {
    this.manualPayment = {
      studentName: '',
      room: '',
      month: '',
      rent: 0,
      miscCharges: 0,
      totalPaid: 0,
      status: 'UNPAID',
      receiptUrl: ''
    };
    this.manualError = '';
    this.showManualEntryModal = true;
  }

  saveManualPayment() {
    if (!this.manualPayment.studentName || !this.manualPayment.room || !this.manualPayment.month) {
      this.manualError = 'Student, Room, and Month are required.';
      return;
    }
    // Add to payments (mock)
    this.payments.push({
      id: 'pmt-' + (this.payments.length + 1),
      studentId: '',
      studentName: this.manualPayment.studentName,
      room: this.manualPayment.room,
      month: this.manualPayment.month,
      rent: this.manualPayment.rent,
      miscCharges: this.manualPayment.miscCharges,
      totalDue: this.manualPayment.rent + this.manualPayment.miscCharges,
      totalPaid: this.manualPayment.totalPaid,
      status: this.manualPayment.status,
      receiptUrl: this.manualPayment.receiptUrl
    });
    this.applyFilters();
    this.showManualEntryModal = false;
  }

  cancelManualEntry() {
    this.showManualEntryModal = false;
  }

  uploadReceipt(event: any) {
    const file = event.target.files[0];
    if (file) {
      // For mock, just set a fake URL
      this.manualPayment.receiptUrl = 'https://example.com/' + file.name;
    }
  }
  payments: any[] = [];
  filteredPayments: any[] = [];

  filterMonth = '';
  filterStatus = '';
  searchText = '';

  get months() {
    return Array.from(new Set(this.payments.map(p => p.month)));
  }

  get statuses() {
    return Array.from(new Set(this.payments.map(p => p.status)));
  }

  applyFilters() {
    this.filteredPayments = this.payments.filter(p => {
      const matchesMonth = !this.filterMonth || p.month === this.filterMonth;
      const matchesStatus = !this.filterStatus || p.status === this.filterStatus;
      const matchesSearch = !this.searchText ||
        p.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.room.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesMonth && matchesStatus && matchesSearch;
    });
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    this.payments = [...MOCK_PAYMENTS];
    this.filteredPayments = [...MOCK_PAYMENTS];
  }
}
  // Removed duplicate payments and ngOnInit
