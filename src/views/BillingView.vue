<template>
  <div class="billing-page">
    <section class="billing-header">
      <h1>{{ $t('billing.title') }}</h1>
      <p class="subtitle">{{ $t('billing.subtitle') }}</p>
    </section>

    <section class="billing-nav">
      <router-link :to="{ name: 'billing-list' }" class="nav-link" :class="{ active: $route.name === 'billing-list' }">{{ $t('billing.invoiceList') }}</router-link>
      <router-link :to="{ name: 'billing-create' }" class="nav-link" :class="{ active: $route.name === 'billing-create' }">{{ $t('billing.createInvoice') }}</router-link>
    </section>

    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const toggleForm = () => {
  showForm.value = !showForm.value
}
</script>

<style scoped>
.billing-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.billing-header {
  text-align: center;
  padding: 4rem 0 2rem;
}

.billing-header h1 {
  font-size: 2.5rem;
  color: var(--color-deep-black);
  margin-bottom: 1rem;
}

.billing-header .subtitle {
  font-size: 1.25rem;
  color: var(--color-royal-gold);
}

.billing-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.billing-nav .nav-link {
  color: var(--color-deep-black);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color var(--transition-base);
}

.billing-nav .nav-link.active,
.billing-nav .nav-link:hover {
  background-color: var(--color-royal-gold);
  color: var(--color-pure-white);
}

/* The router-view will show either the list or the form */
</style>
