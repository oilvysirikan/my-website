<template>
  <div class="portfolio-page">
    <header class="page-header">
      <h1>ผลงานของเรา</h1>
      <p>ผลงานระดับมาสเตอร์พีซที่สร้างความประทับใจให้กับลูกค้า</p>
    </header>

    <section class="portfolio-filters" ref="filterBar">
      <div
        class="_slider"
        :style="sliderStyle"
      />
      <button
        v-for="category in categories"
        :key="category"
        :data-category="category"
        :class="{ active: activeCategory === category }"
        @click="selectCategory(category)"
      >
        {{ labelFor(category) }}
      </button>
    </section>

    <section class="portfolio-grid">
      <transition-group name="shuffle" tag="div" class="transition-grid">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="portfolio-card clickable-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="openProjectModal(project)"
        >
          <div class="portfolio-image-container">
            <img
              v-if="project.image_url"
              :src="project.image_url.startsWith('http') || project.image_url.startsWith('/') ? project.image_url : `/api/images/${project.image_url}`"
              :alt="project.project_name_th"
              class="portfolio-image"
              loading="lazy"
            >
            <div v-else class="portfolio-image-placeholder">{{ project.category }}</div>
            <div class="featured-badge" v-if="project.is_featured">
              แนะนำ
            </div>
            <div class="card-hover-overlay">
              <button class="view-details-btn">
                ดูรายละเอียด
              </button>
            </div>
          </div>

          <div class="portfolio-info">
            <h3 class="portfolio-title">{{ project.project_name_th }}</h3>
            <p v-if="project.project_name_en" class="portfolio-subtitle gold-text">{{ project.project_name_en }}</p>

            <div class="portfolio-client">
              <span class="client-label">ลูกค้า:</span>
              <span class="client-value">{{ project.client_name_th }}</span>
            </div>

            <div class="portfolio-date">
              <span class="date-label">วันที่ส่งมอบ:</span>
              <span class="date-value">{{ project.completion_date }}</span>
            </div>

            <div class="portfolio-description">
              <p>{{ project.work_description }}</p>
            </div>

            <!-- Installation Thumbnails Gallery -->
            <div class="installation-gallery" v-if="project.installation_images && project.installation_images.length > 0">
              <h4>รูปการติดตั้ง:</h4>
              <div class="thumbnail-grid">
                <div
                  v-for="(img, index) in project.installation_images.slice(0, 4)"
                  :key="index"
                  class="thumbnail-item"
                  @click.stop="openLightbox(project.installation_images, index)"
                >
                  <img
                    :src="img.startsWith('http') || img.startsWith('/') ? img : `/api/images/${img}`"
                    :alt="`Installation ${index + 1}`"
                    loading="lazy"
                    class="thumbnail-image"
                  >
                  <div class="thumbnail-overlay">
                    <span class="view-icon">🔍</span>
                  </div>
                </div>
                <div
                  v-if="project.installation_images.length > 4"
                  class="thumbnail-item more-images"
                  @click.stop="openLightbox(project.installation_images, 4)"
                >
                  <div class="more-count">+{{ project.installation_images.length - 4 }}</div>
                </div>
              </div>
            </div>

            <div class="portfolio-highlights" v-if="project.highlights && project.highlights.length > 0">
              <h4>จุดเด่น:</h4>
              <ul>
                <li v-for="(highlight, index) in project.highlights" :key="index">
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition-group>
    </section>

    <section class="load-more" v-if="showLoadMore">
      <button @click="loadMoreProjects" class="btn-primary">
        ดูผลงานเพิ่มเติม
      </button>
    </section>

    <!-- Lightbox Modal -->
    <transition name="lightbox">
      <div v-if="lightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">×</button>
        <button class="lightbox-nav lightbox-prev" @click="prevImage" aria-label="Previous">‹</button>
        <button class="lightbox-nav lightbox-next" @click="nextImage" aria-label="Next">›</button>
        <div class="lightbox-content">
          <img
            :src="lightboxImages[currentImageIndex].startsWith('http') || lightboxImages[currentImageIndex].startsWith('/') ? lightboxImages[currentImageIndex] : `/api/images/${lightboxImages[currentImageIndex]}`"
            :alt="`Installation image ${currentImageIndex + 1}`"
            class="lightbox-image"
          >
          <div class="lightbox-counter">{{ currentImageIndex + 1 }} / {{ lightboxImages.length }}</div>
        </div>
      </div>
    </transition>

    <!-- Project Detail Modal -->
    <transition name="modal">
      <div v-if="projectModalOpen" class="project-modal-overlay" @click.self="closeProjectModal">
        <button class="modal-close-btn" @click="closeProjectModal" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div class="project-modal-content" ref="modalContent" 
             @touchstart="handleTouchStart" 
             @touchend="handleTouchEnd">
          <!-- Hero Section -->
          <div class="modal-hero-section">
            <div class="modal-hero-image-container" ref="heroImageContainer">
              <img
                v-if="currentProject"
                :src="getGalleryImage(currentModalImageIndex)"
                :alt="currentProject.project_name_th"
                class="modal-hero-image"
                @load="onImageLoad"
              >
              <div class="modal-hero-overlay">
                <div class="modal-category-badge">{{ getCategoryLabel(currentProject?.category) }}</div>
              </div>
            </div>
          </div>

          <!-- Gallery Thumbnails -->
          <div class="modal-gallery-section" v-if="currentProject && getGalleryImages().length > 1">
            <div class="gallery-thumbnails">
              <button
                v-for="(img, index) in getGalleryImages()"
                :key="index"
                class="gallery-thumbnail"
                :class="{ active: currentModalImageIndex === index }"
                @click="currentModalImageIndex = index"
              >
                <img
                  :src="img.startsWith('http') || img.startsWith('/') ? img : `/api/images/${img}`"
                  :alt="`Gallery ${index + 1}`"
                  loading="lazy"
                >
              </button>
            </div>
            <div class="gallery-navigation">
              <button class="gallery-nav-btn gallery-prev" @click="prevModalImage" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button class="gallery-nav-btn gallery-next" @click="nextModalImage" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Project Info -->
          <div class="modal-info-section" v-if="currentProject">
            <div class="modal-info-header">
              <h2 class="modal-project-title">{{ currentProject.project_name_th }}</h2>
              <p v-if="currentProject.project_name_en" class="modal-project-subtitle gold-text">{{ currentProject.project_name_en }}</p>
            </div>

            <div class="modal-project-meta">
              <div class="meta-item" v-if="currentProject.client_name_th">
                <span class="meta-label">ลูกค้า:</span>
                <span class="meta-value">{{ currentProject.client_name_th }}</span>
              </div>
              <div class="meta-item" v-if="currentProject.completion_date">
                <span class="meta-label">วันที่ส่งมอบ:</span>
                <span class="meta-value">{{ currentProject.completion_date }}</span>
              </div>
            </div>

            <div class="modal-description">
              <h3>รายละเอียดโครงการ</h3>
              <p>{{ currentProject.work_description }}</p>
            </div>

            <div class="modal-highlights" v-if="currentProject.highlights && currentProject.highlights.length > 0">
              <h3>จุดเด่น</h3>
              <ul>
                <li v-for="(highlight, index) in currentProject.highlights" :key="index">
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const filterBar = ref(null);

const categoryLabels = {
  'ทั้งหมด':   'ALL',
  'led-sign':  'LED SIGN',
  'acrylic':  'ACRYLIC',
  'lightbox': 'LIGHTBOX',
  'neon':     'NEON',
  'installation': 'INSTALLATION',
};

const categories  = ref(Object.keys(categoryLabels));
const activeCategory = ref('ทั้งหมด');
const sliderStyle = ref({ left: '0px', width: '0px', opacity: '0' });

function labelFor(cat)          { return categoryLabels[cat] || cat; }

async function selectCategory(cat) {
  activeCategory.value = cat;
  await nextTick();
  moveSlider();
}

function moveSlider() {
  if (!filterBar.value) return;
  const bar     = filterBar.value;
  const barRect = bar.getBoundingClientRect();
  const btns    = bar.querySelectorAll('button[data-category]');
  let btn = null;
  for (const b of btns) {
    if (b.getAttribute('data-category') === activeCategory.value) { btn = b; break; }
  }
  if (btn) {
    const bRect = btn.getBoundingClientRect();
    sliderStyle.value = {
      left:    `${bRect.left - barRect.left}px`,
      width:   `${bRect.width}px`,
      opacity: '1',
    };
  }
}

import { getPortfolio } from '@/composables/useApi.js';

const allProjects = ref([]);

onMounted(async () => {
  nextTick(moveSlider);
  window.addEventListener('resize', moveSlider);
  
  allProjects.value = await getPortfolio();
});

onBeforeUnmount(() => window.removeEventListener('resize', moveSlider));


// ─── Computed ────────────────────────────────────────────────
const filteredProjects = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return allProjects.value;
  return allProjects.value.filter(p => p.category === activeCategory.value);
});

const showLoadMore = computed(() =>
  filteredProjects.value.length < allProjects.value.length,
);

function loadMoreProjects() {
  alert('กำลังโหลดผลงานเพิ่มเติม...');
}

// ─── Lightbox ─────────────────────────────────────────────────────
const lightboxOpen = ref(false);
const lightboxImages = ref([]);
const currentImageIndex = ref(0);

function openLightbox(images, startIndex = 0) {
  lightboxImages.value = images;
  currentImageIndex.value = startIndex;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % lightboxImages.value.length;
}

function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length;
}

// ─── Project Modal ─────────────────────────────────────────────────
const projectModalOpen = ref(false);
const currentProject = ref(null);
const currentModalImageIndex = ref(0);
const modalContent = ref(null);
const heroImageContainer = ref(null);
const touchStartX = ref(0);
const touchEndX = ref(0);

function openProjectModal(project) {
  currentProject.value = project;
  currentModalImageIndex.value = 0;
  projectModalOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModalOpen.value = false;
  currentProject.value = null;
  document.body.style.overflow = '';
}

function getGalleryImages() {
  if (!currentProject.value) return [];
  const images = [];
  if (currentProject.value.image_url) {
    images.push(currentProject.value.image_url);
  }
  if (currentProject.value.installation_images && Array.isArray(currentProject.value.installation_images)) {
    images.push(...currentProject.value.installation_images);
  }
  return images;
}

function getGalleryImage(index) {
  const images = getGalleryImages();
  if (!images[index]) return '';
  const img = images[index];
  return img.startsWith('http') || img.startsWith('/') ? img : `/api/images/${img}`;
}

function nextModalImage() {
  const images = getGalleryImages();
  currentModalImageIndex.value = (currentModalImageIndex.value + 1) % images.length;
}

function prevModalImage() {
  const images = getGalleryImages();
  currentModalImageIndex.value = (currentModalImageIndex.value - 1 + images.length) % images.length;
}

function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

function onImageLoad() {
  // Placeholder for image load handling if needed
}

// Touch handling for mobile swipe
function handleTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX.value - touchEndX.value;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextModalImage(); // Swipe left - next
    } else {
      prevModalImage(); // Swipe right - previous
    }
  }
}

// ─── Keyboard Navigation ─────────────────────────────────────────
function handleKeydown(e) {
  if (lightboxOpen.value) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
  
  if (projectModalOpen.value) {
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowRight') nextModalImage();
    if (e.key === 'ArrowLeft') prevModalImage();
  }
}

onMounted(async () => {
  nextTick(moveSlider);
  window.addEventListener('resize', moveSlider);
  window.addEventListener('keydown', handleKeydown);
  
  allProjects.value = await getPortfolio();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', moveSlider);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* ── Design Tokens ──────────────────────────────────────────── */
:root {
  --cg:       #D4AF37;
  --cg-dark:  #B8860B;
  --c-dark:   #121212;
  --c-white:  #FFFFFF;
  --c-soft:   #F5F5F5;
  --c-charco: #2A2A2A;
  --bg:       #0f0f0f;
  --bg-secondary: #181818;
  --text:     #BBBBBB;
  --text-h:   #F5F5F5;
  --gold:     #D4AF37;

  --ff-heading: 'Playfair Display', 'Montserrat Bold', serif;
  --ff-body:    'Open Sans',          'Lato',          sans-serif;
  --ff-accent:  'Cinzel',             'Bebas Neue',    cursive;

  --ease: 0.25s ease;
  --snap: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Base ───────────────────────────────────────────────────── */
.portfolio-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background: var(--c-white);
}

/* ── Page header ────────────────────────────────────────────── */
.page-header {
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, var(--c-white) 0%, rgba(212,175,55,0.03) 100%);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 70%);
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
  animation: fadeInDown 0.8s ease;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -5px; left: 50%;
  transform: translateX(-50%);
  width: 80px; height: 3px;
  background: linear-gradient(90deg, transparent, var(--cg), transparent);
}

.page-header p {
  font-family: var(--ff-body);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--cg);
  margin-bottom: 2rem;
  display: block;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

/* ── Modern pill-toggle filter bar ──────────────────────────── */
.portfolio-filters {
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3.5rem;
  background: rgba(212, 175, 55, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 999px;
  padding: 0.5rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  box-shadow:
    0  2px 12px rgba(0, 0, 0, 0.04),
    inset 0 1px 0  rgba(255, 255, 255, 0.72);
}

/* sliding amber pill */
.portfolio-filters ._slider {
  position: absolute;
  z-index: 1;
  top: 0.25rem;
  height: calc(100% - 0.5rem);
  border-radius: 999px;
  background: var(--cg);
  box-shadow:
    0 4px 18px rgba(212, 175, 55, 0.30),
    0 1px  4px rgba(0,      0,   0, 0.10),
    inset 0 1px 0 rgba(255,255,255,.22);
  transition: left 0.38s var(--snap), width 0.38s var(--snap);
  pointer-events: none;
}

/* chip buttons */
.portfolio-filters button {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  border-radius: 999px;
  padding: 0.875rem 1.875rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--ff-body);
  color: #888;
  cursor: pointer;
  transition: color 0.22s ease;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
}

.portfolio-filters button:hover {
  color: var(--c-dark);
}

.portfolio-filters button.active {
  color: var(--c-white);
  font-weight: 600;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.35);
}

/* ── Grid ───────────────────────────────────────────────────── */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 300px;
  gap: 1.5rem;
  padding: 0 2rem;
}

/* Bento-style grid with mixed sizes */
.portfolio-grid .portfolio-card:nth-child(3n+1) {
  grid-column: span 2;
  grid-row: span 2;
}

.portfolio-grid .portfolio-card:nth-child(5n) {
  grid-column: span 2;
}

/* list container for <transition-group> */
.transition-grid {
  display: contents;
}

/* ── Card ───────────────────────────────────────────────────── */
.portfolio-card {
  background: var(--bg-secondary);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all var(--ease);
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.6s ease backwards;
  position: relative;
}

.portfolio-card.clickable-card {
  cursor: pointer;
}

.portfolio-card.clickable-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212, 175, 55, 0.25);
  border-color: rgba(212, 175, 55, 0.5);
}

/* gold side-accent bar */
.portfolio-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 4px;
  height: 100%;
  background: var(--cg);
  opacity: 0;
  transition: opacity var(--ease);
  z-index: 1;
}

.portfolio-card.clickable-card:hover::before { opacity: 1; }

/* Card hover overlay with details button */
.card-hover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
}

.portfolio-card.clickable-card:hover .card-hover-overlay {
  opacity: 1;
}

.view-details-btn {
  font-family: var(--ff-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-white);
  background: transparent;
  border: 2px solid var(--cg);
  padding: 0.875rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all var(--ease);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.view-details-btn:hover {
  background: var(--cg);
  color: var(--c-dark);
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
}

/* ── Image ──────────────────────────────────────────────────── */
.portfolio-image-container {
  position: relative;
  height: 100%;
  min-height: 260px;
  overflow: hidden;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.portfolio-image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.portfolio-card:hover .portfolio-image {
  transform: scale(1.08);
}

/* Hover overlay with project info */
.portfolio-image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.portfolio-card:hover .portfolio-image-container::after {
  opacity: 1;
}

.featured-badge {
  position: absolute;
  top: 1rem; left: 1rem;
  background: var(--gold);
  color: var(--bg);
  padding: 0.375rem 1rem;
  border-radius: 50px;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: var(--sans);
  box-shadow: 0 2px 8px rgba(212,175,55,0.28);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
}

/* ── Card body ──────────────────────────────────────────────── */
.portfolio-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
}

.portfolio-title {
  font-family: var(--heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 0.6rem;
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.portfolio-title::before {
  content: '';
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--gold);
}

.portfolio-subtitle {
  font-size: 1rem;
  font-style: italic;
  color: var(--gold);
  margin-bottom: 1.25rem;
}

.portfolio-client,
.portfolio-date {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  font-size: 0.9375rem;
  color: var(--text);
}

.client-label, .date-label {
  font-family: var(--heading);
  font-weight: 600;
  color: var(--text-h);
}

.portfolio-description {
  flex: 1;
  margin-bottom: 1.5rem;
}

.portfolio-description p {
  font-family: var(--sans);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text);
}

.portfolio-highlights {
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 1.25rem;
}

.portfolio-highlights h4 {
  font-family: var(--heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 0.75rem;
}

.portfolio-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.portfolio-highlights li {
  font-family: var(--sans);
  font-size: 0.875rem;
  color: var(--text);
  padding: 0.4rem 0;
  padding-left: 1.4rem;
  position: relative;
}

.portfolio-highlights li::before {
  content: '✓';
  position: absolute;
  left: 0.4rem;
  color: var(--gold);
  font-weight: 700;
  font-size: 0.8rem;
  top: 0.45rem;
}

/* ── Load more ──────────────────────────────────────────────── */
.load-more {
  text-align: center;
  margin: 4rem 0 2rem;
}

/* ── Buttons ────────────────────────────────────────────────── */
.btn-primary {
  font-family: var(--ff-body);
  font-size: 1.125rem;
  font-weight: 600;
  background: var(--cg);
  color: var(--c-dark);
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background var(--ease), transform var(--ease),
              box-shadow var(--ease);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
}

.btn-primary:hover {
  background: var(--cg-dark);
  color: var(--c-white);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(212,175,55,0.28);
}

.btn-primary:active { transform: translateY(-1px); }

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before { left: 100%; }

/* ── Gold utility ────────────────────────────────────────────── */
.gold-text    { color: var(--cg);  }
.gold-border  { border-color: var(--cg); }
.gold-bg      { background-color: var(--cg); }
.gold-hover:hover       { color: var(--cg) !important; }
.gold-bg-hover:hover    { background-color: var(--cg) !important; }

/* ── Installation Gallery ─────────────────────────────────────── */
.installation-gallery {
  margin-bottom: 1.5rem;
}

.installation-gallery h4 {
  font-family: var(--ff-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-dark);
  margin-bottom: 0.75rem;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.thumbnail-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: var(--c-soft);
  transition: transform var(--ease), box-shadow var(--ease);
}

.thumbnail-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--ease);
}

.thumbnail-item:hover .thumbnail-overlay {
  opacity: 1;
}

.view-icon {
  font-size: 1.5rem;
  color: var(--c-white);
}

.more-images {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cg);
  color: var(--c-dark);
  font-weight: 600;
  font-size: 1.25rem;
}

.more-count {
  font-family: var(--ff-heading);
}

/* ── Lightbox ─────────────────────────────────────────────────── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: rgba(255,255,255,0.1);
  border: none;
  color: var(--c-white);
  font-size: 2.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--ease), transform var(--ease);
  line-height: 1;
}

.lightbox-close:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: none;
  color: var(--c-white);
  font-size: 3rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--ease), transform var(--ease);
  line-height: 1;
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

.lightbox-nav:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-counter {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--c-white);
  font-family: var(--ff-body);
  font-size: 1rem;
  font-weight: 500;
  background: rgba(0,0,0,0.6);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

/* ── Lightbox Animations ─────────────────────────────────────── */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* ── Project Modal ────────────────────────────────────────────── */
.project-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.project-modal-content {
  position: relative;
  max-width: 1000px;
  width: 100%;
  max-height: 95vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  color: var(--c-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease);
  backdrop-filter: blur(10px);
}

.modal-close-btn:hover {
  background: rgba(212, 175, 55, 0.2);
  border-color: var(--cg);
  transform: scale(1.1);
}

.modal-hero-section {
  position: relative;
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
}

.modal-hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #000;
}

.modal-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

.modal-hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
  padding: 2rem;
}

.modal-category-badge {
  display: inline-block;
  background: var(--cg);
  color: var(--c-dark);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-family: var(--ff-body);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-gallery-section {
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.gallery-thumbnails {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--cg) transparent;
}

.gallery-thumbnails::-webkit-scrollbar {
  height: 4px;
}

.gallery-thumbnails::-webkit-scrollbar-track {
  background: transparent;
}

.gallery-thumbnails::-webkit-scrollbar-thumb {
  background: var(--cg);
  border-radius: 2px;
}

.gallery-thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--ease);
  opacity: 0.6;
}

.gallery-thumbnail:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.gallery-thumbnail.active {
  border-color: var(--cg);
  opacity: 1;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.gallery-nav-btn {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  color: var(--cg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease);
}

.gallery-nav-btn:hover {
  background: var(--cg);
  color: var(--c-dark);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.modal-info-section {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.modal-info-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  padding-bottom: 1.5rem;
}

.modal-project-title {
  font-family: var(--ff-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--c-white);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.modal-project-subtitle {
  font-family: var(--ff-body);
  font-size: 1.125rem;
  font-style: italic;
}

.modal-project-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-family: var(--ff-heading);
  font-weight: 600;
  color: var(--cg);
  font-size: 0.9375rem;
}

.meta-value {
  font-family: var(--ff-body);
  color: var(--c-white);
  font-size: 0.9375rem;
}

.modal-description,
.modal-highlights {
  margin-bottom: 2rem;
}

.modal-description h3,
.modal-highlights h3 {
  font-family: var(--ff-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-white);
  margin-bottom: 1rem;
}

.modal-description p {
  font-family: var(--ff-body);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  margin: 0;
}

.modal-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-highlights li {
  font-family: var(--ff-body);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  padding: 0.5rem 0;
  padding-left: 2rem;
  position: relative;
}

.modal-highlights li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--cg);
  font-weight: 700;
}

/* ── Modal Animations ───────────────────────────────────────── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .project-modal-content,
.modal-leave-active .project-modal-content {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.modal-enter-from .project-modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-leave-to .project-modal-content {
  transform: scale(0.95);
  opacity: 0;
}

/* ── Animations ─────────────────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive: 1024 px ────────────────────────────────────── */
@media (max-width: 1024px) {
  .portfolio-page          { padding: 0 1.5rem; }
  .page-header             { padding: 5rem 1.5rem 3rem; }
  .page-header h1          { font-size: 2.5rem; }
  .portfolio-filters       { gap: 0.65rem; margin-bottom: 3rem; padding: 0.4rem; }
  .portfolio-filters button{ padding: 0.75rem 1.6rem; font-size: 0.875rem; }
  .portfolio-grid          { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
  .portfolio-info          { padding: 1.6rem; }
  .portfolio-title         { font-size: 1.35rem; }
  .thumbnail-grid          { grid-template-columns: repeat(4, 1fr); }
  .lightbox-nav            { width: 3.5rem; height: 3.5rem; font-size: 2.5rem; }
  .lightbox-close          { width: 3rem; height: 3rem; font-size: 2rem; }
  
  .project-modal-overlay   { padding: 1rem; }
  .project-modal-content   { max-height: 98vh; }
  .modal-hero-image-container { min-height: 300px; }
  .modal-project-title     { font-size: 1.5rem; }
  .modal-info-section      { padding: 1.5rem; }
  .gallery-thumbnail       { width: 60px; height: 60px; }
}

/* ── Responsive: 768 px ─────────────────────────────────────── */
@media (max-width: 768px) {
  .portfolio-page          { padding: 0 1rem; }
  .page-header             { padding: 4rem 1rem 2.5rem; }
  .page-header h1          { font-size: 2.25rem; }
  .portfolio-filters       { gap: 0.5rem; margin-bottom: 2.5rem; padding: 0.35rem; }
  .portfolio-filters button{ padding: 0.625rem 1.25rem; font-size: 0.8125rem; }
  .portfolio-grid          { grid-template-columns: 1fr; gap: 2rem; }
  .portfolio-image-container{ height: 200px; }
  .portfolio-info          { padding: 1.4rem; }
  .portfolio-title         { font-size: 1.2rem; }
  .portfolio-description   { margin-bottom: 1.25rem; }
  .thumbnail-grid          { grid-template-columns: repeat(4, 1fr); gap: 0.4rem; }
  .lightbox-nav            { width: 3rem; height: 3rem; font-size: 2rem; }
  .lightbox-close          { width: 2.5rem; height: 2.5rem; font-size: 1.75rem; }
  .lightbox-counter        { font-size: 0.875rem; padding: 0.4rem 0.8rem; }
  
  .project-modal-overlay   { padding: 0.5rem; }
  .project-modal-content  { border-radius: 16px; max-height: 100vh; }
  .modal-close-btn         { width: 3rem; height: 3rem; top: 1rem; right: 1rem; }
  .modal-hero-section      { max-height: 40vh; }
  .modal-hero-image-container { min-height: 250px; }
  .modal-project-title     { font-size: 1.35rem; }
  .modal-info-section      { padding: 1.25rem; }
  .modal-gallery-section   { padding: 1rem 1.25rem; }
  .gallery-thumbnail       { width: 50px; height: 50px; }
  .gallery-nav-btn         { width: 2rem; height: 2rem; }
  .modal-project-meta      { flex-direction: column; gap: 0.75rem; }
  .modal-description h3, .modal-highlights h3 { font-size: 1.125rem; }
}

/* ── Responsive: 480 px ─────────────────────────────────────── */
@media (max-width: 480px) {
  .portfolio-page          { padding: 0 0.75rem; }
  .page-header             { padding: 3.5rem 0.75rem 2rem; }
  .page-header h1          { font-size: 2rem; }
  .portfolio-filters       { gap: 0.35rem; margin-bottom: 2rem; padding: 0.3rem; }
  .portfolio-filters button{ padding: 0.5rem 1.1rem; font-size: 0.75rem; }
  .portfolio-image-container{ height: 180px; }
  .portfolio-title         { font-size: 1.1rem; }
  .portfolio-highlights h4 { font-size: 1rem; }
  .thumbnail-grid          { grid-template-columns: repeat(2, 1fr); gap: 0.35rem; }
  .lightbox-nav            { width: 2.5rem; height: 2.5rem; font-size: 1.75rem; }
  .lightbox-close          { width: 2rem; height: 2rem; font-size: 1.5rem; }
  .lightbox-counter        { font-size: 0.8125rem; padding: 0.35rem 0.7rem; }
  
  .project-modal-overlay   { padding: 0; }
  .project-modal-content  { border-radius: 0; max-height: 100vh; border: none; }
  .modal-close-btn         { width: 2.75rem; height: 2.75rem; }
  .modal-hero-section      { max-height: 35vh; }
  .modal-hero-image-container { min-height: 200px; }
  .modal-project-title     { font-size: 1.25rem; }
  .modal-info-section      { padding: 1rem; }
  .modal-gallery-section   { padding: 0.75rem 1rem; }
  .gallery-thumbnail       { width: 45px; height: 45px; }
  .gallery-nav-btn         { width: 1.75rem; height: 1.75rem; }
  .modal-hero-overlay      { padding: 1rem; }
  .modal-category-badge    { font-size: 0.75rem; padding: 0.375rem 1rem; }
  .view-details-btn        { padding: 0.625rem 1.5rem; font-size: 0.875rem; }
}
</style>
