<template>
  <div class="invoice-form">
    <div class="form-header">
      <h2>{{ invoiceId ? $t('billing.editInvoice') : $t('billing.createInvoice') }}</h2>
    </div>

    <form @submit.prevent="onSubmit" class="form-container">
      <div class="form-row">
        <div class="form-group">
          <label for="customerName">{{ $t('billing.invoiceForm.customerName') }}</label>
          <input
            type="text"
            id="customerName"
            v-model="form.customerName"
            required
            class="input"
          >
        </div>
        <div class="form-group">
          <label for="customerAddress">{{ $t('billing.invoiceForm.customerAddress') }}</label>
          <input
            type="text"
            id="customerAddress"
            v-model="form.customerAddress"
            class="input"
          >
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="customerTaxId">{{ $t('billing.invoiceForm.customerTaxId') }}</label>
          <input
            type="text"
            id="customerTaxId"
            v-model="form.customerTaxId"
            class="input"
          >
        </div>
        <div class="form-group">
          <label for="invoiceDate">{{ $t('billing.invoiceForm.invoiceDate') }}</label>
          <input
            type="date"
            id="invoiceDate"
            v-model="form.invoiceDate"
            required
            class="input"
          >
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dueDate">{{ $t('billing.invoiceForm.dueDate') }}</label>
          <input
            type="date"
            id="dueDate"
            v-model="form.dueDate"
            required
            class="input"
          >
        </div>
        <div class="form-group">
          <label for="status">{{ $t('billing.table.status') }}</label>
          <select
            id="status"
            v-model="form.status"
            class="select"
          >
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group full-width">
        <label>{{ $t('billing.invoiceForm.items') }}</label>
        <div class="items-container">
          <div
            v-for="(item, index) in form.items"
            :key="index"
            class="item-row"
          >
            <div class="item-fields">
              <input
                type="text"
                v-model="item.description"
                :placeholder="$t('billing.invoiceForm.description')"
                class="input"
              >
              <input
                type="number"
                v-model.number="item.quantity"
                :placeholder="$t('billing.invoiceForm.quantity')"
                min="1"
                class="input"
              >
              <input
                type="number"
                v-model.number="item.unitPrice"
                :placeholder="$t('billing.invoiceForm.unitPrice')"
                min="0"
                step="0.01"
                class="input"
              >
              <input
                type="number"
                v-model.number="item.amount"
                :placeholder="$t('billing.invoiceForm.amount')"
                min="0"
                step="0.01"
                class="input"
                readonly
              >
            </div>
            <button
              type="button"
              @click="removeItem(index)"
              class="btn-outline small"
              :disabled="form.items.length === 1"
            >
              {{ $t('billing.invoiceForm.removeItem') }}
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="addItem"
          class="btn-outline"
        >
          {{ $t('billing.invoiceForm.addItem') }}
        </button>
      </div>

      <div class="form-row totals">
        <div class="form-group">
          <label for="subtotal">{{ $t('billing.invoiceForm.subtotal') }}</label>
          <input
            type="number"
            id="subtotal"
            v-model.number="form.subtotal"
            class="input"
            readonly
          >
        </div>
        <div class="form-group">
          <label for="taxRate">{{ $t('billing.invoiceForm.taxRate') }} (%)</label>
          <input
            type="number"
            id="taxRate"
            v-model.number="form.taxRate"
            min="0"
            max="100"
            step="0.01"
            class="input"
          >
        </div>
      </div>

      <div class="form-row totals">
        <div class="form-group">
          <label for="taxAmount">{{ $t('billing.invoiceForm.taxAmount') }}</label>
          <input
            type="number"
            id="taxAmount"
            v-model.number="form.taxAmount"
            class="input"
            readonly
          >
        </div>
        <div class="form-group">
          <label for="totalAmount">{{ $t('billing.invoiceForm.totalAmount') }}</label>
          <input
            type="number"
            id="totalAmount"
            v-model.number="form.totalAmount"
            class="input"
            readonly
          >
        </div>
      </div>

      <div class="form-actions">
        <button
          type="button"
          @click="resetForm"
          class="btn-outline"
        >
          {{ $t('common.reset') }}
        </button>
        <button
          type="submit"
          class="btn-primary"
        >
          {{ invoiceId ? $t('common.save') : $t('billing.createInvoice') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const invoiceId = route.params.id ? parseInt(route.params.id) : null
const isEditMode = !!invoiceId

// Status options
const statusOptions = ref([
  { value: 'draft', label: $t('billing.status.draft') },
  { value: 'sent', label: $t('billing.status.sent') },
  { value: 'viewed', label: $t('billing.status.viewed') },
  { value: 'paid', label: $t('billing.status.paid') },
  { value: 'overdue', label: $t('billing.status.overdue') },
  { value: 'cancelled', label: $t('billing.status.cancelled') }
])

// Form state
const form = ref({
  customerName: '',
  customerAddress: '',
  customerTaxId: '',
  invoiceDate: '',
  dueDate: '',
  status: 'draft',
  items: [
    {
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0
    }
  ],
  subtotal: 0,
  taxRate: 7, // Default VAT rate in Thailand
  taxAmount: 0,
  totalAmount: 0
})

// Load invoice data if in edit mode
// In a real app, we would fetch from an API
if (isEditMode) {
  // Mock data for edit
  const mockInvoice = {
    id: invoiceId,
    customerName: 'บริษัท อีซี่ คอมพ์ จำกัด',
    customerAddress: '123/45 ถนนสุขุมวิท แคลนทอง กรุงเทพฯ 10110',
    customerTaxId: '1234567890123',
    invoiceDate: '2026-05-01',
    dueDate: '2026-05-15',
    status: 'sent',
    items: [
      { description: 'งานออกแบบป้ายโฆษณา', quantity: 1, unitPrice: 10000, amount: 10000 },
      { description: 'งานติดตั้งป้าย', quantity: 1, unitPrice: 5000, amount: 5000 }
    ],
    subtotal: 15000,
    taxRate: 7,
    taxAmount: 1050,
    totalAmount: 16050
  }
  form.value = { ...mockInvoice }
}

// Computed properties for totals
const computedSubtotal = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
})

const computedTaxAmount = computed(() => {
  return (computedSubtotal.value * form.value.taxRate) / 100
})

const computedTotalAmount = computed(() => {
  return computedSubtotal.value + computedTaxAmount.value
})

// Watchers to keep form in sync
watch(() => form.value.items, () => {
  form.value.subtotal = Number(computedSubtotal.value.toFixed(2))
  form.value.taxAmount = Number(computedTaxAmount.value.toFixed(2))
  form.value.totalAmount = Number(computedTotalAmount.value.toFixed(2))
}, { deep: true })

watch(() => form.value.taxRate, () => {
  form.value.taxAmount = Number(computedTaxAmount.value.toFixed(2))
  form.value.totalAmount = Number(computedTotalAmount.value.toFixed(2))
})

// Methods
function addItem() {
  form.value.items.push({
    description: '',
    quantity: 1,
    unitPrice: 0,
    amount: 0
  })
}

function removeItem(index) {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

function onSubmit() {
  // In a real app, we would save to an API
  // For now, we'll just show a success message and reset/go back
  alert($t('billing.messages.invoiceCreated')) // This message is generic; we could differentiate between create/update
  if (isEditMode) {
    router.push({ name: 'billing-list' })
  } else {
    resetForm()
  }
}

function resetForm() {
  form.value = {
    customerName: '',
    customerAddress: '',
    customerTaxId: '',
    invoiceDate: '',
    dueDate: '',
    status: 'draft',
    items: [
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 7,
    taxAmount: 0,
    totalAmount: 0
  }
}
</script>

<style scoped>
.invoice-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  color: var(--color-deep-black);
}

.form-container {
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03), 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
}

.form-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: none;
  width: 100%;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-deep-black);
}

.input,
.select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 1rem;
  background-color: var(--color-pure-white);
  color: var(--color-deep-black);
}

.input:focus,
.select:focus {
  outline: none;
  border-color: var(--color-royal-gold);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.input::placeholder {
  color: var(--text);
  opacity: 0.7;
}

.items-container {
  margin-top: 1rem;
}

.item-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.item-fields {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.item-fields > * {
  flex: 1;
}

.totals {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-outline,
.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-hover);
  border: none;
}

.btn-outline {
  background: transparent;
  color: var(--color-deep-black);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--color-soft-gray);
}

.btn-primary {
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
}

.btn-primary:hover {
  background: var(--color-royal-gold-dark);
  color: var(--color-pure-white);
}

.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>
