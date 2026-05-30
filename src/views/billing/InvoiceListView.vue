<template>
  <div class="invoice-list">
    <div class="list-header">
      <h2>{{ $t('billing.invoiceList') }}</h2>
      <div class="actions">
        <router-link :to="{ name: 'billing-create' }" class="btn-primary">
          {{ $t('billing.createInvoice') }}
        </router-link>
      </div>
    </div>

    <div class="search-filter">
      <input type="text" :placeholder="$t('common.search')" v-model="search" class="search-input">
      <select v-model="statusFilter" class="select">
        <option value="">{{ $t('billing.status.all') }}</option>
        <option v-for="status in statusOptions" :key="status.value" :value="status.value">
          {{ status.label }}
        </option>
      </select>
    </div>

    <div v-if="filteredInvoices.length === 0" class="empty-state">
      <p>{{ $t('billing.messages.noInvoices') }}</p>
    </div>

    <table class="invoice-table" v-else>
      <thead>
        <tr>
          <th>{{ $t('billing.table.invoiceNumber') }}</th>
          <th>{{ $t('billing.table.customer') }}</th>
          <th>{{ $t('billing.table.date') }}</th>
          <th>{{ $t('billing.table.dueDate') }}</th>
          <th>{{ $t('billing.table.amount') }}</th>
          <th>{{ $t('billing.table.status') }}</th>
          <th>{{ $t('billing.table.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in filteredInvoices" :key="invoice.id">
          <td>{{ invoice.number }}</td>
          <td>{{ invoice.customerName }}</td>
          <td>{{ formatDate(invoice.date) }}</td>
          <td>{{ formatDate(invoice.dueDate) }}</td>
          <td>{{ formatCurrency(invoice.totalAmount) }}</td>
          <td>
            <span class="status-badge" :class="'status-' + invoice.status">
              {{ invoice.statusLabel }}
            </span>
          </td>
          <td class="actions-cell">
            <router-link :to="{ name: 'billing-edit', params: { id: invoice.id } }" class="action-link">
              {{ $t('common.edit') }}
            </router-link>
            <button @click="deleteInvoice(invoice.id)" class="action-link delete">
              {{ $t('common.delete') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const statusOptions = [
  { value: 'draft',    label: 'ฉบับร่าง' },
  { value: 'sent',     label: 'ส่งแล้ว' },
  { value: 'paid',     label: 'ชำระเงินแล้ว' },
  { value: 'overdue',  label: 'เกินกำหนด' },
]

const invoices = ref([
  {
    id: 1,
    number: 'INV-001',
    customerName: 'บริษัท อีซี่ คอมพ์ จำกัด',
    date: '2026-05-01',
    dueDate: '2026-05-15',
    totalAmount: 15000,
    status: 'sent',
    statusLabel: 'ส่งแล้ว'
  },
  {
    id: 2,
    number: 'INV-002',
    customerName: 'ABC Company Ltd.',
    date: '2026-05-05',
    dueDate: '2026-05-20',
    totalAmount: 25000,
    status: 'paid',
    statusLabel: 'ชำระเงินแล้ว'
  }
])

const search = ref('')
const statusFilter = ref('')

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(search.value.toLowerCase()) ||
                          invoice.number.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = !statusFilter.value || invoice.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatCurrency(amount) {
  if (amount == null) return '-'
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount)
}

function deleteInvoice(id) {
  if (confirm('ต้องการลบใบแจ้งหนี้นี้?')) {
    invoices.value = invoices.value.filter(i => i.id !== id)
  }
}
</script>

<style scoped>
.invoice-list {
  max-width: 1200px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.list-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #121212;
}

.search-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: #D4AF37;
}

.select {
  padding: 0.875rem 1rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  background: white;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.125rem;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Open Sans', sans-serif;
}

.invoice-table th {
  text-align: left;
  padding: 1rem;
  background: rgba(212,175,55,0.08);
  color: #121212;
  font-weight: 600;
  border-bottom: 2px solid #D4AF37;
}

.invoice-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  color: #333;
}

.invoice-table tr:hover td {
  background: rgba(212,175,55,0.03);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.status-draft    { background: #f0f0f0; color: #666; }
.status-sent     { background: #e3f2fd; color: #1565c0; }
.status-paid     { background: #e8f5e9; color: #2e7d32; }
.status-overdue  { background: #ffebee; color: #c62828; }

.actions-cell {
  white-space: nowrap;
}

.action-link {
  color: #D4AF37;
  text-decoration: none;
  font-weight: 600;
  margin-right: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
}

.action-link.delete {
  color: #c62828;
}

.action-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .search-filter {
    flex-direction: column;
  }
  .invoice-table {
    font-size: 0.875rem;
  }
  .invoice-table th,
  .invoice-table td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
