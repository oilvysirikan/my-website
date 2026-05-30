export default {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    portfolio: 'Portfolio',
    contact: 'Contact Us',
    billing: 'Billing System'
  },
  
  // Billing System
  billing: {
    title: 'Billing System',
    subtitle: 'Manage invoices and payments professionally',
    createInvoice: 'Create New Invoice',
    invoiceList: 'Invoice List',
    paymentReceived: 'Payments Received',
    overdueInvoices: 'Overdue Invoices',
    
    // Invoice Form
    invoiceForm: {
      customerName: 'Customer Name',
      customerAddress: 'Customer Address',
      customerTaxId: 'Customer Tax ID',
      invoiceDate: 'Invoice Date',
      dueDate: 'Due Date',
      items: 'Items',
      description: 'Description',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      amount: 'Amount',
      subtotal: 'Subtotal',
      taxRate: 'Tax Rate',
      taxAmount: 'Tax Amount',
      totalAmount: 'Total Amount',
      addItem: 'Add Item',
      removeItem: 'Remove Item',
      saveInvoice: 'Save Invoice',
      sendInvoice: 'Send Invoice',
      markAsPaid: 'Mark as Paid'
    },
    
    // Payment Methods
    paymentMethods: {
      title: 'Payment Methods',
      bankTransfer: 'Bank Transfer',
      promptPay: 'PromptPay',
      creditCard: 'Credit Card',
      debitCard: 'Debit Card',
      cash: 'Cash',
      qrCode: 'QR Code',
      bankDetails: {
        title: 'Bank Details',
        bankName: 'Bank Name',
        accountNumber: 'Account Number',
        accountName: 'Account Name',
        branch: 'Branch'
      }
    },
    
    // Statuses
    status: {
      draft: 'Draft',
      sent: 'Sent',
      viewed: 'Viewed by Customer',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled'
    },
    
    // Table Headers
    table: {
      invoiceNumber: 'Invoice Number',
      customer: 'Customer',
      date: 'Date',
      dueDate: 'Due Date',
      amount: 'Amount',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      pdf: 'Download PDF',
      email: 'Send Email'
    },
    
    // Messages
    messages: {
      invoiceCreated: 'Invoice created successfully',
      invoiceUpdated: 'Invoice updated successfully',
      invoiceDeleted: 'Invoice deleted successfully',
      paymentRecorded: 'Payment recorded successfully',
      confirmDelete: 'Are you sure you want to delete this invoice?',
      noInvoices: 'No invoices in the system',
      loading: 'Loading data...',
      error: 'An error occurred. Please try again.'
    }
  },
  
  // Common
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    sortBy: 'Sort by',
    reset: 'Reset',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    of: 'of',
    itemsPerPage: 'Items per page',
    goToPage: 'Go to page'
  },
  
  // Footer
  footer: {
    company: 'SignCraft Studio',
    description: 'Innovative signage and structural solutions manufactured directly by our factory',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    phone: 'Phone',
    line: 'LINE',
    address: 'Address',
    copyright: '© {year} SignCraft Studio. All rights reserved.'
  }
}
