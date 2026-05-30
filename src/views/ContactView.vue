<template>
  <div class="contact-page">
    <header class="page-header">
      <h1>ติดต่อเรา</h1>
      <p>เราพร้อมให้บริการและให้คำปรึกษาเกี่ยวกับงานป้ายและโครงสร้างทุกประเภท</p>
    </header>

    <section class="contact-main">
      <section class="contact-form">
        <h2>ส่งข้อความถึงเรา</h2>
        <p>กรอกข้อมูลด้านล่างเพื่อส่งคำถามหรือขอรับใบเสนอราคาเบื้องต้น</p>
        
        <form @submit.prevent="submitForm">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">ชื่อ-สกุล:</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="กรุณาระบุชื่อ-สกุลของคุณ"
              >
            </div>
            
            <div class="form-group">
              <label for="contact">เบอร์โทรศัพท์หรือ Line ID:</label>
              <input 
                type="text" 
                id="contact" 
                v-model="form.contact" 
                required
                placeholder="กรุณาระบุเบอร์โทรศัพท์หรือ Line ID"
              >
            </div>
            
            <div class="form-group">
              <label for="service">บริการที่สนใจ:</label>
              <select id="service" v-model="form.service" required>
                <option value="">-- เลือกบริการที่สนใจ --</option>
                <option value="signage">งานป้ายสัญลักษณ์และตัวอักษรไฟ</option>
                <option value="backdrop">งานฉากหลังและนิทรรศการ</option>
                <option value="booth">งานโครงสร้างบูธจัดแสดงสินค้า</option>
                <option value="printing">งานสติกเกอร์และงานพิมพ์เชิงพาณิชย์</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">รายละเอียดเพิ่มเติม:</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5"
                placeholder="กรุณาระบุรายละเอียดเพิ่มเติมเกี่ยวกับโครงการของคุณ"
              ></textarea>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary" :loading="isSubmitting">
              {{ isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ' }}
            </button>
            <button type="button" class="btn-outline" @click="resetForm">
              รีเซ็ตแบบฟอร์ม
            </button>
          </div>
          
          <div v-if="formSuccess" class="form-success">
            ข้อความของคุณถูกส่งเรียบร้อยแล้ว! เราจะติดต่อกลับภายใน 24 ชั่วโมง
          </div>
          
          <div v-if="formError" class="form-error">
            เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง
          </div>
        </form>
      </section>

      <section class="contact-info">
        <div class="info-container">
          <div class="info-item">
            <h3>ที่อยู่โรงงานและสำนักงาน</h3>
            <p>161/25-26 หมู่ 7 ซอยวิภาวดี 76 แขวงสนามบิน เขตดอนเมือง กรุงเทพฯ 10210</p>
          </div>
          
          <div class="info-item">
            <h3>เบอร์ติดต่อและอีเมล</h3>
            <p>Tel: 095-764-6162<br>Email: pen1office@gmail.com</p>
          </div>
          
          <div class="info-item">
            <h3>LINE Official Account</h3>
            <p><a href="http://line.me/ti/p/%40qik5926b" target="_blank" rel="noopener">@qik5926b</a></p>
          </div>
          
          <div class="info-item">
            <h3>Facebook & Inbox</h3>
            <p>
              <a href="https://www.facebook.com/pen1ad/" target="_blank" rel="noopener">Pennueng design studio</a><br>
              Inbox: <a href="http://m.me/pen1ad" target="_blank" rel="noopener">m.me/pen1ad</a>
            </p>
          </div>
        </div>
        
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.0!2d100.5!3d13.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z4LiL4Lit4Lii4Lin4Li04Lig4Liy4Lin4LiU4Li1IDc2!5e0!3m2!1sth!2sth!4v1"
            width="100%"
            height="100%"
            style="border:0; border-radius: 16px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="แผนที่ Pennueng design studio"
          ></iframe>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  contact: '',
  service: '',
  message: ''
});

const isSubmitting = ref(false);
const formSuccess = ref(false);
const formError = ref(false);

function submitForm() {
  // Basic validation
  if (!form.value.name || !form.value.contact || !form.value.service) {
    formError.value = 'กรุณากรอกข้อมูลให้ครบถ้วน';
    formSuccess.value = false;
    return;
  }
  
  // Simulate form submission
  isSubmitting.value = true;
  
  // In a real app, this would send data to an API endpoint
  setTimeout(() => {
    isSubmitting.value = false;
    formSuccess.value = true;
    formError.value = false;
    
    // Reset form after success
    setTimeout(() => {
      form.value = {
        name: '',
        contact: '',
        service: '',
        message: ''
      };
      formSuccess.value = false;
    }, 3000);
  }, 1500);
}

function resetForm() {
  form.value = {
    name: '',
    contact: '',
    service: '',
    message: ''
  };
  formSuccess.value = false;
  formError.value = false;
}
</script>

<style scoped>
/* Design System Variables */
:root {
  --color-royal-gold: #D4AF37;
  --color-royal-gold-dark: #B8860B;
  --color-deep-black: #121212;
  --color-pure-white: #FFFFFF;
  --color-soft-gray: #F5F5F5;
  --color-dark-charcoal: #2A2A2A;
  
  --font-heading: 'Playfair Display', 'Montserrat Bold', serif;
  --font-body: 'Open Sans', 'Lato', sans-serif;
  --font-accent: 'Cinzel', 'Bebas Neue', cursive;
  
  --transition-base: 0.3s ease;
  --transition-hover: 0.3s ease;
  --transition-transform: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Base Styles */
.contact-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background-color: var(--color-pure-white);
}

.page-header {
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: var(--color-pure-white);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    var(--color-pure-white),
    rgba(212, 175, 55, 0.05)
  );
  pointer-events: none;
}

.page-header h1 {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-deep-black);
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--color-royal-gold);
}

.page-header p {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-royal-gold);
  margin-bottom: 2rem;
  display: block;
}

/* Main container for side-by-side layout on desktop */
.contact-main {
  display: flex;
  gap: 3rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;
}

/* Contact Form Styles */
.contact-form {
  flex: 1 1 400px; /* grow, shrink, basis */
  min-width: 300px;
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
}

.contact-form h2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-deep-black);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.contact-form h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--color-royal-gold);
}

.contact-form p {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--color-deep-black);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 2px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--color-pure-white);
  transition: all var(--transition-base);
  font-family: var(--font-body);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-royal-gold);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
  background: var(--color-pure-white);
}

.form-group select:disabled {
  background-color: var(--color-soft-gray);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-primary, .btn-outline {
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all var(--transition-hover);
  position: relative;
  overflow: hidden;
  font-size: 1.125rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 160px;
}

.btn-primary {
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
}

.btn-primary:hover {
  background: var(--color-royal-gold-dark);
  color: var(--color-pure-white);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.2);
}

.btn-primary:active {
  transform: translateY(-1px);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.2),
    transparent
  );
  transition: left var(--transition-hover);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-outline {
  background: transparent;
  color: var(--color-royal-gold);
  border: 2px solid var(--color-royal-gold);
}

.btn-outline:hover {
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.2);
}

.btn-outline:active {
  transform: translateY(-1px);
}

.btn-outline::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.2),
    transparent
  );
  transition: left var(--transition-hover);
}

.btn-outline:hover::before {
  left: 100%;
}

/* Contact Info Styles */
.contact-info {
  flex: 0 0 350px; /* Don't grow, don't shrink, fixed basis */
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-container {
  flex: 1;
}

.info-item {
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.info-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  border-color: rgba(212, 175, 55, 0.15);
}

.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-royal-gold);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.info-item:hover::before {
  opacity: 1;
}

.info-item h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 1rem;
}

.info-item p {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #555;
}

.map-container {
  height: 300px;
  background: var(--color-soft-gray);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
  font-family: var(--font-body);
  position: relative;
  overflow: hidden;
}

.map-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.05),
    transparent
  );
  pointer-events: none;
}

/* Form Success/Error Messages */
.form-success {
  background: var(--color-soft-gray);
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: var(--color-deep-black);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.0625rem;
}

.form-error {
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: var(--color-deep-black);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.0625rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-page {
    padding: 0 1.5rem;
  }
  
  .page-header {
    padding: 5rem 1.5rem 3rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
  }
  
  .contact-main {
    flex-direction: column;
    gap: 2rem;
  }
  
  .contact-form {
    min-width: 100%;
  }
  
  .contact-info {
    min-width: 100%;
    flex: 1 1 auto;
  }
  
  .info-item {
    padding: 1.75rem 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .info-item h3 {
    font-size: 1.125rem;
  }
  
  .map-container {
    height: 320px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 4rem 1rem 2.5rem;
  }
  
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .contact-info {
    padding: 1.5rem;
  }
  
  .info-item {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .info-item h3 {
    font-size: 1rem;
  }
  
  .map-container {
    height: 280px;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
  
  .form-group label {
    font-size: 0.9375rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.875rem;
  }
  
  .form-actions {
    gap: 1rem;
  }
  
  .btn-primary, .btn-outline {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 0 0.75rem;
  }
  
  .page-header {
    padding: 3.5rem 0.75rem 2rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .contact-info {
    padding: 1rem;
  }
  
  .info-item {
    padding: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .info-item h3 {
    font-size: 0.875rem;
  }
  
  .map-container {
    height: 240px;
  }
  
  .contact-form {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .btn-primary, .btn-outline {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
}
</style>