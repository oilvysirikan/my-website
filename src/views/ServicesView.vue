<template>
  <div class="services-page">
    <header class="page-header">
      <h1>บริการของเรา</h1>
      <p>เราให้บริการงานป้ายและโครงสร้างครบวงจรด้วยคุณภาพระดับพรีเมียม</p>
    </header>

    <section class="price-calculator">
      <div class="calculator-inner">
        <div class="calc-header">
          <h2>เครื่องคำนวณราคาเบื้องต้น</h2>
          <p>คำนวณราคาประเมินเบื้องต้นสำหรับโครงการของคุณ</p>
        </div>

        <div class="calculator-form">
          <div class="form-group form-group-service">
            <label for="service-select">เลือกประเภทบริการ:</label>
            <select id="service-select" v-model="selectedService">
              <option value="">-- เลือกบริการ --</option>
              <option v-for="service in services" :key="service.id" :value="service.id">
                {{ service.service_name_th }}
              </option>
            </select>
          </div>

          <div class="form-group form-group-material">
            <label for="material-select">เลือกรูปแบบวัสดุ/สไตล์งาน:</label>
            <select id="material-select" v-model="selectedMaterial" :disabled="!selectedService">
              <option value="">-- เลือกรูปแบบวัสดุ --</option>
              <option v-for="s in selectedService ? filteredMaterials : []" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div class="form-group form-group-dims">
            <label for="calc-w">ความกว้าง (เมตร):</label>
            <div class="input-wrap">
              <input id="calc-w" type="number" v-model.number="width" min="0.1" step="0.1" placeholder="เช่น 3.0">
              <span class="input-unit">ม.</span>
            </div>
          </div>

          <div class="form-group form-group-dims">
            <label for="calc-h">ความสูง (เมตร):</label>
            <div class="input-wrap">
              <input id="calc-h" type="number" v-model.number="height" min="0.1" step="0.1" placeholder="เช่น 2.0">
              <span class="input-unit">ม.</span>
            </div>
          </div>

          <template v-if="calculatedArea > 0">
            <div class="form-group result-row">
              <label>พื้นที่รวม:</label>
              <p class="area-value">{{ calculatedArea.toFixed(2) }} <span>ตร.ม.</span></p>
            </div>
            <div class="form-group result-row">
              <label>ราคาประเมินเบื้องต้น:</label>
              <p class="price-result">{{ estimatedPrice.toLocaleString() }} <span>บาท</span></p>
            </div>
          </template>

          <div class="form-group form-group-action">
            <button @click="calculatePrice" class="btn-primary" :disabled="!canCalculate">
              คำนวณราคา
            </button>
          </div>
        </div>

        <p class="price-note" v-if="estimatedPrice > 0">
          *ราคานี้เป็นการประเมินเบื้องต้น ราคาจริงอาจแตกต่างขึ้นอยู่กับรายละเอียดเพิ่มเติม
        </p>
      </div>
    </section>

    <section class="services-list">
      <div v-for="service in services" :key="service.id" class="service-section">
        <h2 :id="`service-${service.id}`">{{ service.service_name_th }}</h2>
        <p v-if="service.service_name_en" class="service-subtitle gold-text">{{ service.service_name_en }}</p>
        <div class="service-content">
          <div class="service-details">
            <h3>ลักษณะวัสดุและจุดเด่น</h3>
            <p>{{ service.material_features }}</p>

            <h3>ลักษณะการใช้งานที่เหมาะสม</h3>
            <p>{{ service.recommended_usage }}</p>

            <div v-if="service.base_price_sqm">
              <h3>ราคาประเมินเริ่มต้นต่อตารางเมตร</h3>
              <p>{{ service.base_price_sqm.toLocaleString() }} บาท/ตรม.</p>
            </div>
          </div>

          <div class="service-image">
            <div class="placeholder-image">ภาพตัวอย่างผลงาน</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

import { getServices } from '@/composables/useApi.js';

const services = ref([]);
const priceCatalogue = ref([]);

onMounted(async () => {
  const data = await getServices();
  if (data) {
    services.value = data.services;
    priceCatalogue.value = data.prices;
  }
});

const selectedService   = ref(null);
const selectedMaterial  = ref('');
const width             = ref('');
const height            = ref('');

const filteredMaterials = computed(() => {
  if (!selectedService.value) return [];
  return priceCatalogue.value
    .filter(p => p.service_id === selectedService.value)
    .map(p => p.style_name);
});

// Auto-select first material when service changes
watch(selectedService, () => {
  const list = filteredMaterials.value;
  selectedMaterial.value = list.length > 0 ? list[0] : '';
});

const calculatedArea = computed(() => {
  const w = parseFloat(width.value);
  const h = parseFloat(height.value);
  return (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) ? w * h : 0;
});

const estimatedPrice = computed(() => {
  if (!selectedService.value || !selectedMaterial.value || calculatedArea.value === 0) return 0;

  const entry = priceCatalogue.value.find(
    p => p.service_id === selectedService.value && p.style_name === selectedMaterial.value
  );
  if (entry) return calculatedArea.value * ((entry.price_min + entry.price_max) / 2);

  // Fallback – use the service's base price
  const svc = services.value.find(s => s.id === selectedService.value);
  return calculatedArea.value * (svc?.base_price_sqm || 0);
});

const canCalculate = computed(() =>
  selectedService.value &&
  selectedMaterial.value &&
  width.value && height.value &&
  parseFloat(width.value) > 0 && parseFloat(height.value) > 0
);

function calculatePrice() {
  // All reactive — computed properties update automatically.
  // This button action exists so the user explicitly triggers the reveal of results,
  // e.g. we could add a copy-to-clipboard or quote request action here later.
}
</script>

<style scoped>
/* ── Tokens ───────────────────────────────────────────────── */
:root {
  --cg:       #D4AF37;
  --cg-dark:  #B8860B;
  --c-dark:   #121212;
  --c-white:  #FFFFFF;
  --c-soft:   #F5F5F5;
  --c-charco: #2A2A2A;

  --ff-heading: 'Playfair Display', 'Montserrat Bold', serif;
  --ff-body:    'Open Sans',          'Lato',          sans-serif;
  --ff-accent:  'Cinzel',             'Bebas Neue',    cursive;

  --ease: 0.25s ease;
  --snap: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Base ─────────────────────────────────────────────────── */
.services-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background: var(--c-white);
}

/* ── Page header ──────────────────────────────────────────── */
.page-header {
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: var(--c-white);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--c-white), rgba(212,175,55,.06));
  pointer-events: none;
}

.page-header h1 {
  font-family: var(--ff-heading);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--c-dark);
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -5px; left: 0;
  width: 50px; height: 3px;
  background: var(--cg);
}

.page-header p {
  font-family: var(--ff-body);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--cg);
  margin-bottom: 0;
  display: block;
}

/* ══════════════════════════════════════════════════════════════
   PRICE CALCULATOR
   ══════════════════════════════════════════════════════════════ */
.price-calculator {
  background: var(--c-soft);
  border-radius: 28px;
  padding: 0;
  margin-bottom: 5rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.07),
    0 1px  0  rgba(255, 255, 255, 0.80) inset,
    0 -1px 0  rgba(0,   0,   0, 0.06) inset;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* gold top-ruler */
.price-calculator::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(90deg, var(--cg), var(--cg-dark) 60%, transparent);
}

.calculator-inner {
  padding: 2.75rem 3rem 3rem;
}

.calc-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.calc-header h2 {
  font-family: var(--ff-heading);
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--c-dark);
  margin-bottom: 0.5rem;
}

.calc-header h2::after {
  content: '';
  display: block;
  width: 56px; height: 3px;
  background: var(--cg);
  margin: 0.75rem auto 0;
  border-radius: 2px;
}

.calc-header p {
  font-family: var(--ff-body);
  font-style: italic;
  color: #888;
  font-size: 1.05rem;
  margin: 0;
}

/* ── Results bar ──────────────────────────────────────────── */
.result-bar {
  background: rgba(212, 175, 55, 0.08);
  border: 1.5px solid rgba(212, 175, 55, 0.25);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.result-item .label {
  font-family: var(--ff-heading);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #666;
}

.result-item .value {
  font-family: var(--ff-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--c-dark);
}

.result-item .value.area,
.result-item .value.price {
  color: var(--cg-dark);
}

/* divider between the two values */
.result-bar::after {
  content: '';
  display: block;
  width: 1px;
  align-self: stretch;
  background: rgba(212,175,55,0.2);
  margin: 0 0.5rem;
}

/* hide divider when only one value present */
.result-bar:has(.result-item:only-child)::after,
.result-bar:has(> :first-child + :last-child:only-of-type)::after {
  /* not reliably applied; use CS as a graceful fallback */
  display: none;
}

/* ── Form grid ────────────────────────────────────────────── */
.calculator-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

/* span the result rows full width */
.calculator-form .result-row { grid-column: 1 / -1; }

/* cta spans full width */
.calculator-form .form-group-action { grid-column: 1 / -1; text-align: center; }

/* service & material each span full – true top of form width */
.calculator-form .form-group-service,
.calculator-form .form-group-material {
  grid-column: 1 / -1;
}

/* ── Input fields ─────────────────────────────────────────── */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-family: var(--ff-heading);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  color: var(--c-dark);
}

.input-wrap {
  position: relative;
}

.input-wrap input,
.form-group select {
  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--c-white);
  transition: border-color var(--ease), box-shadow var(--ease);
  font-family: var(--ff-body);
  appearance: none;
}

.input-wrap input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--cg);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.20);
}

.input-unit {
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #aaa;
  pointer-events: none;
  font-family: var(--ff-body);
}

.form-group select:disabled {
  background-color: var(--c-soft);
  cursor: not-allowed;
  opacity: 0.7;
}

/* ── Results ───────────────────────────────────────────────── */
.price-result {
  font-family: var(--ff-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--cg-dark);
  margin: 0;
  display: inline;
}

.price-result span { font-size: 1.1rem; margin-left: 0.35rem; }

.area-value {
  font-family: var(--ff-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--c-dark);
  margin: 0;
  display: inline;
}

.area-value span { font-size: 1rem; margin-left: 0.25rem; color: #888; }

.price-note {
  font-family: var(--ff-body);
  font-size: 0.875rem;
  color: #999;
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
}

/* ── Button ────────────────────────────────────────────────── */
.btn-primary {
  font-family: var(--ff-body);
  font-size: 1.05rem;
  font-weight: 600;
  background: var(--cg);
  color: var(--c-dark);
  border: none;
  padding: 0.95rem 2.75rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background var(--ease), transform var(--ease), box-shadow var(--ease);
  box-shadow: 0 4px 10px rgba(212,175,55,0.25);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.btn-primary:hover:not(:disabled) {
  background: var(--cg-dark);
  color: var(--c-white);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212,175,55,0.38);
}

.btn-primary:active:not(:disabled) { transform: translateY(0); }

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ═══════════════════════════════════════════════════════
   SERVICES LIST  (unchanged, trimmed)
   ═══════════════════════════════════════════════════════ */
.services-list { margin-bottom: 6rem; }

.service-section { margin-bottom: 5rem; }

.service-section h2 {
  font-family: var(--ff-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--c-dark);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.service-section h2::after {
  content: '';
  position: absolute;
  bottom: -8px; left: 50%;
  width: 60px; height: 3px;
  background: var(--cg);
  transform: translateX(-50%);
}

.service-subtitle {
  font-family: var(--ff-body);
  font-size: 1.125rem;
  font-style: italic;
  color: var(--cg);
  margin-bottom: 2.5rem;
  display: block;
}

.service-content {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.service-details { flex: 1; min-width: 380px; }

.service-details h3 {
  font-family: var(--ff-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--c-dark);
  margin: 1.75rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-details h3::before {
  content: '';
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--cg);
}

.service-details p {
  font-family: var(--ff-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
}

.service-image {
  flex: 1;
  min-width: 320px;
  height: 280px;
  background: var(--c-soft);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
  font-family: var(--ff-body);
  position: relative;
  overflow: hidden;
}

.service-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212,175,55,.06), transparent);
  pointer-events: none;
}

.placeholder-image { position: relative; z-index: 1; }

/* ── Traits ───────────────────────────────────────────────── */
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.gold-text     { color: var(--cg); }
.gold-border   { border-color: var(--cg); }
.gold-bg       { background-color: var(--cg); }
.gold-hover:hover       { color: var(--cg) !important; }
.gold-bg-hover:hover    { background-color: var(--cg) !important; }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 1024px) {
  .services-page   { padding: 0 1.5rem; }
  .page-header     { padding: 5rem 1.5rem 3rem; }
  .page-header h1  { font-size: 2.5rem; }
  .service-details { min-width: 300px; }
  .service-image   { min-width: 300px; height: 240px; }
  .price-calculator { padding: 0; }
  .calculator-inner { padding: 2.2rem 2rem; }
  .calculator-form  { gap: 1.25rem 1.5rem; }
}

@media (max-width: 768px) {
  .services-page  { padding: 0 1rem; }
  .page-header    { padding: 4rem 1rem 2.5rem; }
  .page-header h1 { font-size: 2.25rem; }
  .service-section h2 { font-size: 2rem; }
  .service-content { flex-direction: column; gap: 2rem; }
  .service-details { min-width: 100%; }
  .service-image   { min-width: 100%; height: 200px; }
  .calculator-inner { padding: 1.75rem 1.25rem; }
  .calculator-form  { grid-template-columns: 1fr; gap: 1.15rem; }
  .calculator-form .form-group-service,
  .calculator-form .form-group-material { grid-column: 1; }
  .price-result { font-size: 1.6rem; }
  .btn-primary  { width: 100%; padding: 0.9rem; }
}

@media (max-width: 480px) {
  .services-page    { padding: 0 0.75rem; }
  .page-header      { padding: 3.5rem 0.75rem 2rem; }
  .page-header h1   { font-size: 2rem; }
  .service-section h2 { font-size: 1.75rem; }
  .price-calculator { border-radius: 20px; }
  .calculator-inner { padding: 1.5rem 1rem; }
}
</style>
