<template>
  <section aria-label="Key operational metrics">
    <div class="metrics-grid">
      <MetricCard v-for="metric in metrics" :key="metric.title" v-bind="metric" />
    </div>
  </section>
</template>

<script setup lang="ts">
import MetricCard from './MetricCard.vue'
import type { MetricCardData } from '@/types/dashboard'

defineProps<{ metrics: MetricCardData[] }>()
</script>

