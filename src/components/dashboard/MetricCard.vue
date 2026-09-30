<template>
  <v-card class="metric-card" color="surface" variant="flat" border :aria-label="accessibleLabel">
    <div class="metric-topline">
      <span class="metric-icon" aria-hidden="true"><v-icon :icon="icon" /></span>
      <span class="metric-status" :class="`status-${status}`">{{ statusText }}</span>
    </div>
    <p class="metric-title">{{ title }}</p>
    <p class="metric-value" aria-hidden="true">{{ value }}</p>
    <div class="metric-comparison">
      <v-icon :icon="trendIcon" :class="`trend-${trendDirection}`" aria-hidden="true" />
      <span>{{ comparisonText }}</span>
    </div>
    <p class="metric-supporting">{{ supportingText }}</p>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MetricCardData } from '@/types/dashboard'
import { statusLabel } from '@/utils/formatters'

const props = defineProps<MetricCardData>()
const trendIcon = computed(() => props.trendDirection === 'flat' ? 'mdi-minus' : props.trendDirection === 'up' ? 'mdi-trending-up' : 'mdi-trending-down')
const statusText = computed(() => props.status === 'neutral' ? 'Year view' : statusLabel(props.status))
</script>

