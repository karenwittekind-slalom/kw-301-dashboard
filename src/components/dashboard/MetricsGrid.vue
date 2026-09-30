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

<style scoped>
.metrics-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
@media (max-width: 1120px) { .metrics-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 720px) { .metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .metrics-grid { grid-template-columns: 1fr; } }
</style>
