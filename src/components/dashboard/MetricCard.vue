<template>
  <v-card class="metric-card" variant="outlined" :aria-label="accessibleLabel">
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

<style scoped>
.metric-card { display: flex; min-height: 177px; flex-direction: column; padding: 16px; border-color: var(--ops-border); border-radius: 9px; box-shadow: 0 2px 8px rgb(17 49 61 / 3%); }
.metric-topline { display: flex; align-items: center; justify-content: space-between; }
.metric-icon { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 9px; background: var(--ops-teal-soft); color: var(--ops-teal); }
.metric-status { padding: 3px 7px; border-radius: 999px; font-size: 10px; font-weight: 700; }
.status-normal { background: var(--ops-green-soft); color: var(--ops-green-ink); }
.status-watch { background: var(--ops-amber-soft); color: var(--ops-amber-ink); }
.status-critical { background: var(--ops-red-soft); color: var(--ops-red-ink); }
.status-neutral { background: #eef2f4; color: #536572; }
.metric-title { margin: 14px 0 2px; color: var(--ops-muted); font-size: 12px; font-weight: 600; }
.metric-value { margin: 0; color: var(--ops-ink); font-size: 26px; font-weight: 700; line-height: 1.25; }
.metric-comparison { display: flex; align-items: center; gap: 4px; min-height: 20px; margin-top: 5px; color: var(--ops-muted); font-size: 10px; }
.metric-comparison :deep(.v-icon) { font-size: 15px; }
.trend-up { color: var(--ops-amber-ink); }
.trend-down { color: var(--ops-green-ink); }
.trend-flat { color: var(--ops-muted); }
.metric-supporting { margin: auto 0 0; padding-top: 8px; color: var(--ops-muted); font-size: 11px; line-height: 1.35; }
</style>
