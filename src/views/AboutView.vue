<template>
  <div class="about-page">
    <header class="page-header">
      <h1>เกี่ยวกับเรา</h1>
      <p>Pennueng design studio (SignCraft Studio)</p>
    </header>

    <section class="company-info">
      <div class="info-content">
        <h2>ภาพรวมบริษัท</h2>
        <p>
          Pennueng design studio (SignCraft Studio) โรงงานผู้ผลิตและติดตั้งงานป้ายโฆษณา ฉากหลังนิทรรศการ และบูธจัดแสดงสินค้าที่มีประสบการณ์กว่า 15 ปี 
          พร้อมโรงงานขนาดใหญ่กว่า 1,500 ตารางเมตร ควบคุมคุณภาพครบวงจรและได้รับการรับรองมาตรฐานความปลอดภัยระดับสูง
        </p>
        
        <div class="stats-grid">
          <div class="stat-card">
            <h3>พื้นที่โรงงานผลิต</h3>
            <p>1,500 ตร.ม.</p>
          </div>
          <div class="stat-card">
            <h3>ประสบการณ์ทำงาน</h3>
            <p>15 ปี</p>
          </div>
          <div class="stat-card">
            <h3>จำนวนทีมงาน/ช่างฝีมือ</h3>
            <p>40 คน</p>
          </div>
          <div class="stat-card">
            <h3>การรับประกัน</h3>
            <p>รับประกันความแข็งแรงของโครงสร้างและความปลอดภัยระบบไฟฟ้าไฟส่องสว่างสูงสุด 1-2 ปี</p>
          </div>
        </div>
      </div>
      
      <div class="info-image">
        <div class="placeholder-image">ภาพประกอบโรงงานและทีมงาน</div>
      </div>
    </section>

    <section class="mission-vision">
      <div class="mission">
        <h2>พันธกิจ (Mission)</h2>
        <p>มุ่งมั่นสร้างสรรค์งานป้ายและโครงสร้างที่มีคุณภาพสูงสุด ด้วยนวัตกรรมและเทคโนโลยีทันสมัย เพื่อตอบสนองความต้องการของลูกค้าในทุกอุตสาหกรรม</p>
      </div>
      
      <div class="vision">
        <h2>วิสัยทัศน์ (Vision)</h2>
        <p>เป็นผู้นำในอุตสาหกรรมงานป้ายและโครงสร้างที่ได้รับการยอมรับทั้งในประเทศและระดับสากล ด้วยความมุ่งมั่นในคุณภาพ นวัตกรรม และการบริการที่เหนือกว่า</p>
      </div>
    </section>

    <section class="values">
      <h2>ค่านิยมองค์กร</h2>
      <div class="values-grid">
        <div class="value-item">
          <h3>คุณภาพ</h3>
          <p>เราใส่ใจในทุกรายละเอียดของงานผลิต เพื่อให้ได้ผลงานที่มีมาตรฐานสูงสุดและตรงตามความต้องการของลูกค้า</p>
        </div>
        <div class="value-item">
          <h3>นวัตกรรม</h3>
          <p>เรามุ่งมั่นพัฒนาและประยุกต์ใช้เทคโนโลยีใหม่ๆ เพื่อสร้างสรรค์งานที่ทันสมัยและโดดเด่นไม่เหมือนใคร</p>
        </div>
        <div class="value-item">
          <h3>บริการ</h3>
          <p>เราให้ความสำคัญกับการบริการลูกค้าอย่างเต็มที่ ตั้งแต่การให้คำปรึกษาไปจนถึงการติดตั้งและบริการหลังการขาย</p>
        </div>
        <div class="value-item">
          <h3>ความรับผิดชอบ</h3>
          <p>เราดำเนินธุรกิจด้วยความซื่อสัตย์ โปร่งใส และรับผิดชอบต่อสังคมและสิ่งแวดล้อม</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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
.about-page {
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

.company-info {
  display: flex;
  gap: 3rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;
}

.info-content {
  flex: 1;
  min-width: 320px;
}

.info-content h2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.info-content h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--color-royal-gold);
}

.info-content p {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.stat-card {
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  border-color: rgba(212, 175, 55, 0.15);
}

.stat-card::before {
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

.stat-card:hover::before {
  opacity: 1;
}

.stat-card h3 {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 0.75rem;
}

.stat-card p {
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-deep-black);
  letter-spacing: 0.5px;
}

.info-image {
  flex: 1;
  min-width: 320px;
  height: 380px;
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

.info-image::before {
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

.mission-vision {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;
}

.mission, .vision {
  flex: 1;
  min-width: 320px;
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all var(--transition-base);
}

.mission:hover, .vision:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  border-color: rgba(212, 175, 55, 0.2);
}

.mission h2, .vision h2 {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-block;
}

.mission h2::after,
.vision h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 30px;
  height: 2px;
  background: var(--color-royal-gold);
}

.mission p, .vision p {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #555;
}

.values {
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
}

.values h2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-deep-black);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.values h2::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 50px;
  height: 3px;
  background: var(--color-royal-gold);
  transform: translateX(-50%);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.value-item {
  text-align: center;
  padding: 1.75rem;
  background: var(--color-soft-gray);
  border-radius: 14px;
  transition: all var(--transition-base);
  border: 1px solid rgba(0,0,0,0.03);
}

.value-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  border-color: rgba(212, 175, 55, 0.15);
  background: var(--color-pure-white);
}

.value-item h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.value-item h3::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 25px;
  height: 2px;
  background: var(--color-royal-gold);
}

.value-item p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #666;
}

/* Animation Classes */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.fade-in-delay-1 {
  animation-delay: 0.1s;
}

.fade-in-delay-2 {
  animation-delay: 0.2s;
}

.fade-in-delay-3 {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gold Accent Classes */
.gold-text {
  color: var(--color-royal-gold);
}

.gold-border {
  border-color: var(--color-royal-gold);
}

.gold-bg {
  background-color: var(--color-royal-gold);
}

.gold-hover:hover {
  color: var(--color-royal-gold) !important;
}

.gold-bg-hover:hover {
  background-color: var(--color-royal-gold) !important;
}

/* Animation Classes */
.glow-on-hover {
  transition: box-shadow var(--transition-hover);
}

.glow-on-hover:hover {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255,255,255,0.1),
    transparent
  );
  transform: rotate(30deg);
  transition: transform var(--transition-base);
}

.shimmer:hover::after {
  transform: rotate(30deg) translate(50%, -50%);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-page {
    padding: 0 1.5rem;
  }
  
  .page-header {
    padding: 5rem 1.5rem 3rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
  }
  
  .company-info, .mission-vision {
    gap: 2rem;
  }
  
  .info-content h2, .values h2 {
    font-size: 1.75rem;
  }
  
  .mission h2, .vision h2 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  
  .value-item {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 4rem 1rem 2.5rem;
  }
  
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .company-info, .mission-vision {
    flex-direction: column;
    gap: 2.5rem;
  }
  
  .info-content h2, .values h2 {
    font-size: 1.625rem;
  }
  
  .mission h2, .vision h2 {
    font-size: 1.375rem;
  }
  
  .info-image {
    height: 320px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .info-content h2, .values h2 {
    font-size: 1.5rem;
  }
  
  .mission h2, .vision h2 {
    font-size: 1.25rem;
  }
  
  .stat-card p {
    font-size: 1.375rem;
  }
  
  .value-item h3 {
    font-size: 1.125rem;
  }
}
</style>