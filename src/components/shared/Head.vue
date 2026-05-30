<template>
  <head>
    <title v-if="$route.meta.title">{{ $route.meta.title }}</title>
    <meta v-if="$route.meta.description" name="description" :content="$route.meta.description">
    <meta v-if="$route.meta.keywords" name="keywords" :content="$route.meta.keywords">
<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()

if (route.meta.structuredData) {
  useHead({
    script: [{ type: 'application/ld+json', children: JSON.stringify(route.meta.structuredData) }]
  })
}
</script>
    <meta property="og:type" content="website">
    <meta property="og:url" :content="`${$route.fullPath}`">
    <meta property="og:title" v-if="$route.meta.title" :content="$route.meta.title">
    <meta property="og:description" v-if="$route.meta.description" :content="$route.meta.description">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" v-if="$route.meta.title" :content="$route.meta.title">
    <meta name="twitter:description" v-if="$route.meta.description" :content="$route.meta.description">
  </head>
</template>


