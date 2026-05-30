export default {
  // Navigation
  nav: {
    home: 'หน้าแรก',
    about: 'เกี่ยวกับเรา',
    services: 'บริการ',
    portfolio: 'ผลงาน',
    contact: 'ติดต่อเรา',
    billing: 'ระบบบิลลิ่ง'
  },
  
  // Billing System
  billing: {
    title: 'ระบบบิลลิ่ง',
    subtitle: 'จัดการใบแจ้งหนี้และการชำระเงินอย่างมืออาชีพ',
    createInvoice: 'สร้างใบแจ้งหนี้ใหม่',
    invoiceList: 'รายการใบแจ้งหนี้',
    paymentReceived: 'การชำระเงินที่ได้รับ',
    overdueInvoices: 'ใบแจ้งหนี้ที่ค้างชำระ',
    
    // Invoice Form
    invoiceForm: {
      customerName: 'ชื่อลูกค้า',
      customerAddress: 'ที่อยู่ลูกค้า',
      customerTaxId: 'เลขประจำตัวผู้เสียภาษีลูกค้า',
      invoiceDate: 'วันที่ออกใบแจ้งหนี้',
      dueDate: 'วันที่ครบกำหนดชำระ',
      items: 'รายการสินค้า/บริการ',
      description: 'คำอธิบาย',
      quantity: 'จำนวน',
      unitPrice: 'ราคาต่อหน่วย',
      amount: 'จำนวนเงิน',
      subtotal: 'ยอดรวม',
      taxRate: 'อัตราภาษี',
      taxAmount: 'จำนวนภาษี',
      totalAmount: 'ยอดรวมทั้งหมด',
      addItem: 'เพิ่มรายการ',
      removeItem: 'ลบรายการ',
      saveInvoice: 'บันทึกใบแจ้งหนี้',
      sendInvoice: 'ส่งใบแจ้งหนี้',
      markAsPaid: 'ทำเครื่องหมายว่าชำระแล้ว'
    },
    
    // Payment Methods
    paymentMethods: {
      title: 'วิธีการชำระเงิน',
      bankTransfer: 'โอนเงินผ่านธนาคาร',
      promptPay: 'พร้อมเพย์',
      creditCard: 'บัตรเครดิต',
      debitCard: 'บัตรเดบิต',
      cash: 'เงินสด',
      qrCode: 'คิวอาร์โค้ด',
      bankDetails: {
        title: 'รายละเอียดบัญชีธนาคาร',
        bankName: 'ชื่อธนาคาร',
        accountNumber: 'เลขที่บัญชี',
        accountName: 'ชื่อบัญชี',
        branch: 'สาขา'
      }
    },
    
    // Statuses
    status: {
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      viewed: 'ลูกค้าดูแล้ว',
      paid: 'ชำระเงินแล้ว',
      overdue: 'ค้างชำระ',
      cancelled: 'ยกเลิก'
    },
    
    // Table Headers
    table: {
      invoiceNumber: 'เลขที่ใบแจ้งหนี้',
      customer: 'ลูกค้า',
      date: 'วันที่',
      dueDate: 'ครบกำหนด',
      amount: 'จำนวนเงิน',
      status: 'สถานะ',
      actions: 'การดำเนินการ',
      view: 'ดู',
      edit: 'แก้ไข',
      delete: 'ลบ',
      pdf: 'ดาวน์โหลด PDF',
      email: 'ส่งอีเมล'
    },
    
    // Messages
    messages: {
      invoiceCreated: 'สร้างใบแจ้งหนี้สำเร็จ',
      invoiceUpdated: 'อัปเดตใบแจ้งหนี้สำเร็จ',
      invoiceDeleted: 'ลบใบแจ้งหนี้สำเร็จ',
      paymentRecorded: 'บันทึกการชำระเงินสำเร็จ',
      confirmDelete: 'คุณต้องการลบใบแจ้งหนี้นี้หรือไม่?',
      noInvoices: 'ยังไม่มีใบแจ้งหนี้ในระบบ',
      loading: 'กำลังโหลดข้อมูล...',
      error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    }
  },
  
  // Common
  common: {
    loading: 'กำลังโหลด...',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    close: 'ปิด',
    edit: 'แก้ไข',
    delete: 'ลบ',
    search: 'ค้นหา',
    filter: 'กรอง',
    sortBy: 'เรียงตาม',
    reset: 'รีเซ็ต',
    back: 'ย้อนกลับ',
    next: 'ถัดไป',
    previous: 'ก่อนหน้า',
    of: 'จาก',
    itemsPerPage: 'รายการต่อหน้า',
    goToPage: 'ไปที่หน้า'
  },
  
  // Footer
  footer: {
    company: 'Pennueng design studio (SignCraft Studio)',
    description: 'นวัตกรรมงานป้ายและโครงสร้างครบวงจร ผลิตจริงโดยโรงงานโดยตรง',
    quickLinks: 'ลิงก์ด่วน',
    contactUs: 'ติดต่อเรา',
    phone: 'เบอร์ติดต่อ',
    line: 'LINE',
    address: 'ที่อยู่',
    copyright: '© {year} Pennueng design studio. สงวนลิขสิทธิ์ทั้งหมด.'
  }
}
