<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Head from '@/components/shared/Head.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { locale, t } = useI18n()
const isMobileMenuActive = ref(false)
const isScrolled = ref(false)

function changeLocale(lang) {
  locale.value = lang
}

function toggleMobileMenu() {
  isMobileMenuActive.value = !isMobileMenuActive.value
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app">
    <Head />
    <header class="app-header" :class="{ scrolled: isScrolled }">
      <div class="app-header::before" aria-hidden="true"></div>
      <nav class="nav-container">
        <div class="nav-logo">
          <img src="/logo.png" alt="Pennueng design studio" style="height: 50px; width: auto;" />
        </div>
        <div class="language-switcher">
          <button @click="changeLocale('th')" :class="{ active: locale === 'th' }">ไทย</button>
          <button @click="changeLocale('en')" :class="{ active: locale === 'en' }">EN</button>
        </div>
        <ul class="nav-menu" :class="{ active: isMobileMenuActive }">
          <li><a href="/" class="nav-link" @click="toggleMobileMenu">{{ t('nav.home') }}</a></li>
          <li><a href="/about" class="nav-link" @click="toggleMobileMenu">{{ t('nav.about') }}</a></li>
          <li><a href="/services" class="nav-link" @click="toggleMobileMenu">{{ t('nav.services') }}</a></li>
          <li><a href="/portfolio" class="nav-link" @click="toggleMobileMenu">{{ t('nav.portfolio') }}</a></li>
          <li><a href="/contact" class="nav-link" @click="toggleMobileMenu">{{ t('nav.contact') }}</a></li>

        </ul>
        <!-- Mobile nav toggle -->
        <div class="mobile-nav-toggle" :class="{ active: isMobileMenuActive }" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="app-footer::before" aria-hidden="true"></div>
      <div class="app-footer::after" aria-hidden="true"></div>
      <div class="footer-content">
        <div class="footer-info">
          <h3>{{ t('footer.company') }}</h3>
          <p>{{ t('footer.description') }}</p>
        </div>
        
        <div class="footer-links">
          <h4>{{ t('footer.quickLinks') }}</h4>
          <ul>
            <li><a href="/">{{ t('nav.home') }}</a></li>
            <li><a href="/about">{{ t('nav.about') }}</a></li>
            <li><a href="/services">{{ t('nav.services') }}</a></li>
            <li><a href="/portfolio">{{ t('nav.portfolio') }}</a></li>
            <li><a href="/contact">{{ t('nav.contact') }}</a></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4>{{ t('footer.contactUs') }}</h4>
          <p>{{ t('footer.phone') }}: 095-764-6162</p>
          <p>{{ t('footer.line') }}: @qik5926b</p>
          <p>Email: pen1office@gmail.com</p>
          <p>Facebook: Pennueng design studio</p>
          <p>{{ t('footer.address') }}: 161/25-26 หมู่ 7 ซอยวิภาวดี 76 แขวงสนามบิน เขตดอนเมือง กรุงเทพฯ 10210</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} {{ t('footer.company') }}. {{ t('footer.copyright') }}</p>
      </div>
    </footer>
    <div class="floating-buttons">
      <a href="https://www.facebook.com/pen1ad/" target="_blank" rel="noopener" class="float-btn fb-btn" title="Facebook">
        <svg viewBox="0 0 320 512" width="24" height="24" fill="currentColor">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
        </svg>
      </a>
      <a href="http://line.me/ti/p/%40qik5926b" target="_blank" rel="noopener" class="float-btn line-btn" title="LINE">
        <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
          <path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8 0 3.2 1.4 3.2 3.2zm-82 74.3c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8 0 3.2 1.4 3.2 3.2v71.1zm-32.1 3.2c0 1.8-1.4 3.2-3.2 3.2H132c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8 0 3.2 1.4 3.2 3.2v56.5h21.4c1.8 0 3.2 1.4 3.2 3.2v11.4zm233.4-3.2c0 1.8-1.4 3.2-3.2 3.2H324c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2h64.2c1.8 0 3.2 1.4 3.2 3.2v11.4c0 1.8-1.4 3.2-3.2 3.2h-52.8v14.2h52.8c1.8 0 3.2 1.4 3.2 3.2v11.4c0 1.8-1.4 3.2-3.2 3.2h-52.8v14.2h52.8c1.8 0 3.2 1.4 3.2 3.2v11.4zM448 191.1C448 85.6 347.6 0 224 0S0 85.6 0 191.1c0 93.6 83.3 171.7 195.8 188.7 7.7 1.8 18.2 5.5 21 13 2.1 5.4 1 12.7 0 17.6-1 4.5-6.5 39.4-7.9 47.7-1.9 11.2 5.2 12.1 9.7 9.8 6.4-3.2 82.5-48.4 113.3-83.6C405.2 334.3 448 266 448 191.1z"/>
        </svg>
      </a>
      <a href="tel:095-764-6162" class="float-btn phone-btn" title="Phone">
        <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  line-height: 1.7;
  color: var(--color-deep-black);
  background-color: var(--color-pure-white);
  overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

p {
  font-family: var(--font-body);
  margin-bottom: 1rem;
}

.accent-text {
  font-family: var(--font-accent);
}

/* Layout Components */
.app-header {
  background: transparent;
  color: var(--color-pure-white);
  position: sticky;
  top: 0;
  z-index: 1000;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
}

.app-header.scrolled {
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}

/* Thai geometric doodle pattern (ประจำยาม inspired) */
.app-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNiIgb3BhY2l0eT0iMC4yNSIvPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNiIgb3BhY2l0eT0iMC4yNSIvPgogIDxjaXJjbGUgY3g9IjgwIiBjeT0iMCIgcj0iMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Q0QUYzNyIgc3Ryb2tlLXdpZHRoPSIwLjYiIG9wYWNpdHk9IjAuMjUiLz4KICA8Y2lyY2xlIGN4PSIwIiBjeT0iODAiIHI9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC42IiBvcGFjaXR5PSIwLjI1Ii8+CiAgPGNpcmNsZSBjeD0iODAiIGN5PSI4MCIgcj0iMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Q0QUYzNyIgc3Ryb2tlLXdpZHRoPSIwLjYiIG9wYWNpdHk9IjAuMjUiLz4KICA8cG9seWdvbiBwb2ludHM9IjQwLDIyIDQ3LDM2IDQwLDUwIDMzLDM2IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC44IiBvcGFjaXR5PSIwLjM1Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0MCwyOCA0NCwzNiA0MCw0NCAzNiwzNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4yIi8+CiAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNCIgb3BhY2l0eT0iMC4yIi8+CiAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMS41IiBmaWxsPSIjRDRBRjM3IiBvcGFjaXR5PSIwLjE1Ii8+CiAgPHBhdGggZD0iTTQwLDE0IEExMiwxMiAwIDAsMSA1OCwzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNCIgb3BhY2l0eT0iMC4xNSIvPgogIDxwYXRoIGQ9Ik02Niw0MCBBMTIsMTIgMCAwLDEgNTAsNTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Q0QUYzNyIgc3Ryb2tlLXdpZHRoPSIwLjQiIG9wYWNpdHk9IjAuMTUiLz4KICA8cGF0aCBkPSJNNDAsNjYgQTEyLDEyIDAgMCwxIDIyLDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC40IiBvcGFjaXR5PSIwLjE1Ii8+CiAgPHBhdGggZD0iTTE0LDQwIEExMiwxMiAwIDAsMSAzMCwyMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNCIgb3BhY2l0eT0iMC4xNSIvPgogIDxwYXRoIGQ9Ik0wLDI0IEEyNCwyNCAwIDAsMSAyNCwwIiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC4zIiBvcGFjaXR5PSIwLjEyIi8+CiAgPHBhdGggZD0iTTgwLDI0IEEyNCwyNCAwIDAsMCA1NiwwIiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC4zIiBvcGFjaXR5PSIwLjEyIi8+CiAgPHBhdGggZD0iTTAsNTYgQTI0LDI0IDAgMCwwIDI0LDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMC4zIiBvcGFjaXR5PSIwLjEyIi8+CiAgPHBhdGggZD0iTTgwLDU2IEEyNCwyNCAwIDAsMSA1Niw4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuMyIgb3BhY2l0eT0iMC4xMiIvPgogIDxjaXJjbGUgY3g9IjQwIiBjeT0iMTQiIHI9IjEuMiIgZmlsbD0iI0Q0QUYzNyIgb3BhY2l0eT0iMC4yIi8+CiAgPGNpcmNsZSBjeD0iNjYiIGN5PSI0MCIgcj0iMS4yIiBmaWxsPSIjRDRBRjM3IiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjY2IiByPSIxLjIiIGZpbGw9IiNENEFGMzciIG9wYWNpdHk9IjAuMiIvPgogIDxjaXJjbGUgY3g9IjE0IiBjeT0iNDAiIHI9IjEuMiIgZmlsbD0iI0Q0QUYzNyIgb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPgo=");
  background-repeat: repeat;
  background-size: 80px 80px;
  pointer-events: none;
  z-index: 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.nav-logo {
  display: flex;
  align-items: center;
}

/* Language Switcher */
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.language-switcher button {
  background: transparent;
  border: 1px solid var(--color-pure-white);
  color: var(--color-pure-white);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: 0.875rem;
  font-family: var(--font-body);
}

.language-switcher button.active,
.language-switcher button:hover {
  background: var(--color-royal-gold);
  border-color: var(--color-royal-gold);
  color: var(--color-deep-black);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 0;
}

.nav-menu li {
  margin: 0;
}

.nav-link {
  display: block;
  padding: 1rem 1.5rem;
  color: var(--color-pure-white);
  text-decoration: none;
  font-weight: 500;
  font-family: var(--font-body);
  transition: var(--transition-hover);
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  color: var(--gold);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-royal-gold);
  transition: width var(--transition-base);
}

.nav-link:hover::before {
  width: 100%;
}

/* Mobile Nav Styles */
.mobile-nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-nav-toggle span {
  display: block;
  height: 2px;
  background: var(--color-pure-white);
  border-radius: 2px;
  transition: var(--transition-base);
}

@media (max-width: 768px) {
  .mobile-nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    inset: 0;
    background: rgba(15, 15, 15, 0.98);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
    z-index: 999;
    padding: 6rem 2rem 2rem;
    justify-content: center;
    align-items: center;
  }

  .nav-menu.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    padding: 1.5rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
    color: var(--text-h);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-link:hover {
    color: var(--gold);
    transform: scale(1.05);
  }
}

/* Hide language switcher on mobile? We'll keep it */
@media (max-width: 768px) {
  .language-switcher {
    /* We can hide it or keep it. Let's keep it but adjust */
    margin-left: 1rem;
  }
}

.app-main {
  min-height: calc(100vh - 160px);
  padding: 2rem 0;
  background-color: var(--color-soft-gray);
}

.app-footer {
  background-color: var(--bg-secondary);
  color: var(--text);
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  z-index: 2;
}

/* geometric diamond grid body */
.app-footer::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(45deg,  rgba(212,175,55,0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,175,55,0.05) 25%, transparent 25%),
    linear-gradient(45deg,  transparent 75%, rgba(212,175,55,0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,175,55,0.05) 75%),
    linear-gradient(
      135deg,
      rgba(212,175,55,0.03) 1px,   transparent 1px
    ),
    linear-gradient(
      45deg,
      rgba(212,175,55,0.03) 1px,   transparent 1px
    );
  background-size:
    80px 80px,
    80px 80px,
    80px 80px,
    80px 80px,
    40px 40px,
    40px 40px;
  pointer-events: none;
  z-index: 0;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 0 2rem;
}

.footer-info h3 {
  font-family: var(--heading);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-h);
  font-weight: 700;
}

.footer-info p {
  color: var(--text);
  line-height: 1.7;
  opacity: 0.8;
}

.footer-links h4,
.footer-contact h4 {
  font-family: var(--heading);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-h);
  position: relative;
  padding-bottom: 0.5rem;
  font-weight: 600;
}

.footer-links h4::after,
.footer-contact h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--gold);
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--text);
  text-decoration: none;
  font-family: var(--sans);
  transition: var(--transition-hover);
  display: inline-block;
}

.footer-links a:hover {
  color: var(--gold);
  transform: translateX(5px);
}

.footer-contact p {
  margin-bottom: 1rem;
  color: var(--text);
  line-height: 1.6;
  font-family: var(--sans);
}

.footer-contact p i {
  margin-right: 0.5rem;
  color: var(--gold);
  width: 18px;
  text-align: center;
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  font-size: 0.9rem;
  opacity: 0.7;
  color: var(--text);
}

/* Utility Classes */
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
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
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
  position: relative;
  overflow: hidden;
}

.btn-outline:hover {
  background: var(--color-royal-gold);
  color: var(--color-deep-black);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
}

.btn-outline:active {
  transform: translateY(-1px);
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
@media (max-width: 768px) {
  .app-main {
    padding: 1.5rem 0;
  }
  
  .nav-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .app-footer {
    padding: 2.5rem 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
    text-align: center;
  }
  
  .footer-links ul {
    justify-content: center;
  }
  
  .footer-info h3 {
    font-size: 1.3rem;
  }
  
  .btn-primary,
  .btn-outline {
    padding: 0.75rem 1.75rem;
    font-size: 0.95rem;
  }
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Floating Buttons */
.floating-buttons {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 9999;
}

.float-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.float-btn:hover {
  transform: scale(1.15);
}

.fb-btn { background-color: #1877F2; }
.line-btn { background-color: #00B900; }
.phone-btn { background-color: var(--color-royal-gold); color: var(--color-deep-black); }

@media (max-width: 768px) {
  .floating-buttons {
    bottom: 1.5rem;
    right: 1.5rem;
    gap: 0.75rem;
  }
  .float-btn {
    width: 48px;
    height: 48px;
  }
  .float-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>
