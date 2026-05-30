<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-particles"></div>
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
      <div class="hero-content">
        <h1 class="hero-title">Premium Signage Studio</h1>
        <p class="hero-subtitle">ออกแบบ ผลิต ติดตั้ง งานป้ายครบวงจร</p>
        <div class="hero-cta">
          <router-link to="/portfolio" class="btn-primary btn-glow">ดูผลงาน</router-link>
          <router-link to="/contact" class="btn-outline btn-glow">ขอใบเสนอราคา</router-link>
        </div>
      </div>
    </section>

    <section class="services-overview">
      <div class="section-header">
        <h2>บริการของเรา</h2>
        <p>ครบวงจรด้านงานป้าย ฉาก และโครงสร้าง ด้วยประสบการณ์กว่า 15 ปี</p>
      </div>
      <div class="service-cards">
        <div v-for="svc in services" :key="svc.id" class="service-card">
          <div class="card-icon">{{ svc.icon }}</div>
          <h3>{{ svc.service_name_th }}</h3>
          <p>{{ svc.short_desc_th }}</p>
        </div>
      </div>
      <div class="section-cta">
        <router-link to="/services" class="btn-outline">ดูรายละเอียดทั้งหมด</router-link>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-pattern"></div>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number" data-target="500">0</span>
          <span class="stat-label">Projects Completed</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="10">0</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">⚡</span>
          <span class="stat-label">Fast Installation</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">💎</span>
          <span class="stat-label">Premium Materials</span>
        </div>
      </div>
    </section>

    <section class="clients-marquee">
      <div class="marquee-track">
        <div class="marquee-content">
          <span class="client-logo">CLIENT 1</span>
          <span class="client-logo">CLIENT 2</span>
          <span class="client-logo">CLIENT 3</span>
          <span class="client-logo">CLIENT 4</span>
          <span class="client-logo">CLIENT 5</span>
          <span class="client-logo">CLIENT 6</span>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <span class="client-logo">CLIENT 1</span>
          <span class="client-logo">CLIENT 2</span>
          <span class="client-logo">CLIENT 3</span>
          <span class="client-logo">CLIENT 4</span>
          <span class="client-logo">CLIENT 5</span>
          <span class="client-logo">CLIENT 6</span>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <div class="section-header">
        <h2>ผลงานเด่น</h2>
        <p>ผลงานระดับมาสเตอร์พีซที่สร้างความประทับใจให้กับลูกค้า</p>
      </div>
      <div class="featured-grid">
        <div v-for="project in featuredProjects" :key="project.id" class="featured-card">
          <div class="featured-image">
            <img v-if="project.image_url" :src="project.image_url.startsWith('http') || project.image_url.startsWith('/') ? project.image_url : `/api/images/${project.image_url}`" :alt="project.project_name_th" class="feat-img" />
            <div v-else class="image-placeholder">{{ project.category }}</div>
          </div>
          <div class="featured-info">
            <h3>{{ project.project_name_th }}</h3>
            <p>{{ project.client_name_th }}</p>
          </div>
        </div>
      </div>
      <div class="section-cta">
        <router-link to="/portfolio" class="btn-primary">ดูผลงานทั้งหมด</router-link>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2>พร้อมเริ่มงานป้ายของคุณหรือยัง?</h2>
        <p>ทีมงานมืออาชีพของเราพร้อมให้คำปรึกษาและเสนอราคาประเมินฟรี</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn-primary btn-glow">ติดต่อเรา</router-link>
          <router-link to="/contact" class="btn-outline btn-glow">ส่งแบบประเมินราคา</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSettings, getServices, getPortfolio } from '@/composables/useApi.js';

const settings = ref({});
const services = ref([]);
const featuredProjects = ref([]);

onMounted(async () => {
  const [sets, srvs, ports] = await Promise.all([
    getSettings(),
    getServices(),
    getPortfolio(),
  ]);
  if (sets) settings.value = sets;
  if (srvs && srvs.services) services.value = srvs.services;
  if (ports) featuredProjects.value = ports.filter(p => p.is_featured).slice(0, 3);

  // Animate counters
  animateCounters();
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };

    updateCounter();
  });
}
</script>

<style scoped>
.home-page {
  background: var(--color-pure-white);
}

/* ── Hero ────────────────────────────────── */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  overflow: hidden;
}

.hero-particles {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.02) 0%, transparent 40%),
    radial-gradient(circle at 60% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 45%);
  animation: particleFloat 20s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.4) 0%, transparent 70%),
    linear-gradient(180deg, rgba(15, 15, 15, 0.8) 0%, rgba(15, 15, 15, 0.95) 100%);
  pointer-events: none;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(45deg, rgba(212, 175, 55, 0.02) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212, 175, 55, 0.02) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212, 175, 55, 0.02) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212, 175, 55, 0.02) 75%);
  background-size: 80px 80px, 80px 80px, 80px 80px, 80px 80px;
  animation: patternMove 30s linear infinite;
}

@keyframes patternMove {
  0% { background-position: 0 0, 80px 0, 0 80px, 80px 80px; }
  100% { background-position: 80px 80px, 0 80px, 80px 0, 0 0; }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 900px;
}

.hero-title {
  font-family: var(--heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: blurFadeUp 1s ease-out;
}

@keyframes blurFadeUp {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-family: var(--sans);
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--gold);
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: blurFadeUp 1s ease-out 0.2s backwards;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: blurFadeUp 1s ease-out 0.4s backwards;
}

.hero-cta .btn-primary,
.hero-cta .btn-outline {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  transition: all 0.3s ease;
}

.btn-glow {
  position: relative;
  overflow: hidden;
}

.btn-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, var(--gold), var(--gold-glow), var(--gold));
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: blur(8px);
  z-index: -1;
  border-radius: inherit;
}

.btn-glow:hover::before {
  opacity: 0.6;
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}

/* ── Section Common ─────────────────────── */
.section-header {
  text-align: center;
  padding: 5rem 2rem 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.section-header h2 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-deep-black);
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.section-header h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-royal-gold);
  margin: 0.75rem auto 0;
}

.section-header p {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: #666;
  line-height: 1.7;
}

.section-cta {
  text-align: center;
  padding: 2rem 2rem 5rem;
}

/* ── Services Overview ──────────────────── */
.services-overview {
  max-width: 1400px;
  margin: 0 auto;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.service-card {
  background: var(--color-pure-white);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-royal-gold), var(--color-royal-gold-dark));
  opacity: 0;
  transition: opacity var(--transition-base);
}

.service-card:hover::before {
  opacity: 1;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
  border-color: rgba(212,175,55,0.15);
}

.card-icon {
  font-size: 2.5rem;
  color: var(--color-royal-gold);
  margin-bottom: 1.25rem;
}

.service-card h3 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 1rem;
}

.service-card p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #666;
}

/* ── Stats ──────────────────────────────── */
.stats-section {
  position: relative;
  background: var(--bg-secondary);
  padding: 6rem 2rem;
  overflow: hidden;
}

.stats-pattern {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(45deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212, 175, 55, 0.03) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212, 175, 55, 0.03) 75%);
  background-size: 80px 80px, 80px 80px, 80px 80px, 80px 80px;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.stats-grid {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem;
  background: var(--bg);
  border-radius: 16px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
  border-color: rgba(212, 175, 55, 0.3);
}

.stat-number {
  font-family: var(--heading);
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--gold), var(--gold-glow));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
}

.stat-label {
  font-family: var(--sans);
  font-size: 1.125rem;
  color: var(--text);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Client Logo Marquee ────────────────── */
.clients-marquee {
  background: var(--bg);
  padding: 3rem 0;
  overflow: hidden;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.marquee-track {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  gap: 4rem;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}

.clients-marquee:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.client-logo {
  font-family: var(--heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
  cursor: default;
}

.client-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
  color: var(--gold);
}

/* ── Featured Projects ──────────────────── */
.featured-section {
  max-width: 1400px;
  margin: 0 auto;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.featured-card {
  background: var(--color-pure-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all var(--transition-base);
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.09);
  border-color: rgba(212,175,55,0.18);
}

.featured-image {
  height: 220px;
  background: var(--color-soft-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.featured-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212,175,55,0.06), transparent);
}

.image-placeholder {
  font-family: var(--font-body);
  font-style: italic;
  color: #999;
  position: relative;
  z-index: 1;
}

.featured-info {
  padding: 1.5rem 2rem 2rem;
}

.featured-info h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-deep-black);
  margin-bottom: 0.5rem;
}

.featured-info p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}

.feat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── CTA Section ────────────────────────── */
.cta-section {
  background: linear-gradient(135deg, var(--bg), var(--bg-secondary));
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.cta-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-family: var(--heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-family: var(--sans);
  font-size: 1.125rem;
  color: var(--text);
  opacity: 0.8;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-content .btn-primary,
.cta-content .btn-outline {
  padding: 1.125rem 3rem;
  font-size: 1.125rem;
}

/* ── Button Styles ──────────────────────── */
.btn-primary {
  display: inline-block;
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
  padding: 0.875rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-family: var(--font-body);
  transition: all var(--transition-hover);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: var(--color-royal-gold-dark);
  color: var(--color-pure-white);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(212,175,55,0.3);
}

.btn-primary:active {
  transform: translateY(-1px);
}

.btn-outline {
  display: inline-block;
  border: 2px solid var(--color-royal-gold);
  color: var(--color-royal-gold);
  padding: 0.875rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-family: var(--font-body);
  transition: all var(--transition-hover);
  background: transparent;
}

.btn-outline:hover {
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(212,175,55,0.3);
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 1024px) {
  .hero-logo { max-height: 160px; }
  .hero-tagline { font-size: 1.125rem; }
  .section-header h2 { font-size: 2.25rem; }
  .cta-content h2 { font-size: 2.25rem; }
}

@media (max-width: 768px) {
  .hero-section { min-height: 70vh; }
  .hero-logo { max-height: 130px; }
  .hero-subtitle { font-size: 1.25rem; }
  .hero-tagline { font-size: 1rem; }
  .hero-cta { flex-direction: column; align-items: center; }
  .service-cards { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  .stat-number { font-size: 2.5rem; }
  .section-header { padding: 3rem 1.5rem 2rem; }
  .section-header h2 { font-size: 2rem; }
  .cta-content h2 { font-size: 2rem; }
  .cta-section { padding: 4rem 1.5rem; }
}

@media (max-width: 480px) {
  .hero-logo { max-height: 100px; }
  .hero-subtitle { font-size: 1.125rem; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .stat-number { font-size: 2rem; }
}
</style>
