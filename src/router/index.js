import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ContactView from '../views/ContactView.vue'

import AdminView from '../views/AdminView.vue'
import EditContactView from '../views/EditContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'หน้าแรก | Pennueng design studio',
      description: 'Pennueng design studio โรงงานผู้ผลิตและติดตั้งงานป้ายโฆษณา ฉากหลังนิทรรศการ และบูธจัดแสดงสินค้าที่มีประสบการณ์กว่า 15 ปี',
      keywords: 'Pennueng design studio, ป้ายโฆษณา, ฉากหลังนิทรรศการ, บูธจัดแสดงสินค้า, โรงงานผลิต, SignCraft Studio'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'เกี่ยวกับเรา | Pennueng design studio',
      description: 'เรียนรู้เกี่ยวกับประวัติ ความเชี่ยวชาญ และบริการของ Pennueng design studio',
      keywords: 'เกี่ยวกับเรา, Pennueng design studio, ประวัติบริษัท, ความเชี่ยวชาญ, บริการ'
    }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: {
      title: 'บริการ | Pennueng design studio',
      description: 'ดูบริการทั้งหมดของ Pennueng design studio รวมถึงงานป้ายโฆษณา ฉากหลังนิทรรศการ และบูธจัดแสดงสินค้า',
      keywords: 'บริการ, ป้ายโฆษณา, ฉากหลังนิทรรศการ, บูธจัดแสดงสินค้า, Pennueng design studio'
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
    meta: {
      title: 'ผลงาน | Pennueng design studio',
      description: 'ชมผลงานคุณภาพของ Pennueng design studio ในด้านป้ายโฆษณา ฉากหลังนิทรรศการ และบูธจัดแสดงสินค้า',
      keywords: 'ผลงาน, ป้ายโฆษณา, ฉากหลังนิทรรศการ, บูธจัดแสดงสินค้า, Pennueng design studio'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'ติดต่อเรา | Pennueng design studio',
      description: 'ติดต่อ Pennueng design studio เพื่อสอบถามข้อมูลหรือขอใบเสนอราคา',
      keywords: 'ติดต่อเรา, Pennueng design studio, เบอร์โทรศัพท์, LINE, ที่อยู่'
    }
  },
  {
    path: '/edit/contact',
    name: 'edit-contact',
    component: EditContactView,
    meta: { title: 'Edit Contact | Pennueng design studio' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Admin Panel | Pennueng design studio' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to update head meta tags for SEO
router.afterEach((to) => {
  // Update title
  document.title = to.meta.title || 'Pennueng design studio'

  const head = document.head

  // Remove existing meta tags that we control (to avoid duplicates)
  // We'll remove by name or property for the ones we set
  const selectors = [
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:url"]',
    'meta[property="og:type"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:card"]',
    'script#structured-data'
  ]

  selectors.forEach(selector => {
    const existing = head.querySelector(selector)
    if (existing) {
      head.removeChild(existing)
    }
  })

  // Add meta description
  if (to.meta.description) {
    const metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    metaDesc.content = to.meta.description
    head.appendChild(metaDesc)
  }

  // Add meta keywords
  if (to.meta.keywords) {
    const metaKeywords = document.createElement('meta')
    metaKeywords.name = 'keywords'
    metaKeywords.content = to.meta.keywords
    head.appendChild(metaKeywords)
  }

  // Add structured data (JSON-LD)
  if (to.meta.structuredData) {
    const script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(to.meta.structuredData)
    head.appendChild(script)
  }

  // Open Graph tags
  if (to.meta.title) {
    const ogTitle = document.createElement('meta')
    ogTitle.property = 'og:title'
    ogTitle.content = to.meta.title
    head.appendChild(ogTitle)
  }

  if (to.meta.description) {
    const ogDesc = document.createElement('meta')
    ogDesc.property = 'og:description'
    ogDesc.content = to.meta.description
    head.appendChild(ogDesc)
  }

  // og:url
  const ogUrl = document.createElement('meta')
  ogUrl.property = 'og:url'
  ogUrl.content = window.location.href
  head.appendChild(ogUrl)

  // og:type
  const ogType = document.createElement('meta')
  ogType.property = 'og:type'
  ogType.content = 'website'
  head.appendChild(ogType)

  // Twitter Card tags
  if (to.meta.title) {
    const twitterTitle = document.createElement('meta')
    twitterTitle.name = 'twitter:title'
    twitterTitle.content = to.meta.title
    head.appendChild(twitterTitle)
  }

  if (to.meta.description) {
    const twitterDesc = document.createElement('meta')
    twitterDesc.name = 'twitter:description'
    twitterDesc.content = to.meta.description
    head.appendChild(twitterDesc)
  }

  const twitterCard = document.createElement('meta')
  twitterCard.name = 'twitter:card'
  twitterCard.content = 'summary_large_image'
  head.appendChild(twitterCard)
})

export default router
