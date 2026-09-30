<template>
  <v-card class="chart-card" variant="outlined">
    <div class="chart-heading">
      <div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <v-icon class="chart-symbol" :icon="icon ?? 'mdi-chart-line'" aria-hidden="true" />
    </div>
    <p class="sr-only">{{ summary }}</p>
    <div v-if="hasData !== false" class="chart-wrap" role="img" :aria-label="`${title}. ${summary}`" :style="{ height: `${height ?? 232}px` }">
      <Bar v-if="kind === 'bar'" :data="data" :options="options" aria-hidden="true" />
      <Line v-else :data="data" :options="options" aria-hidden="true" />
    </div>
    <div v-else class="chart-empty" role="status">No chart data is available for this reporting period.</div>
    <p class="chart-summary">{{ summary }}</p>
  </v-card>
</template>

<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

type ChartCardProps = {
  title: string
  description: string
  summary: string
  kind: 'bar'
  data: ChartData<'bar'>
  options: ChartOptions<'bar'>
  icon?: string
  height?: number
  hasData?: boolean
} | {
  title: string
  description: string
  summary: string
  kind: 'line'
  data: ChartData<'line'>
  options: ChartOptions<'line'>
  icon?: string
  height?: number
  hasData?: boolean
}

defineProps<ChartCardProps>()
</script>

<style scoped>
.chart-card { height: 100%; padding: 18px 18px 13px; border-color: var(--ops-border); border-radius: 9px; box-shadow: 0 2px 8px rgb(17 49 61 / 3%); }
.chart-heading { display: flex; justify-content: space-between; gap: 12px; }
h3 { margin: 0; color: var(--ops-ink); font-size: 14px; font-weight: 700; }
.chart-heading p { margin: 4px 0 0; color: var(--ops-muted); font-size: 11px; line-height: 1.45; }
.chart-symbol { color: var(--ops-teal); }
.chart-wrap { position: relative; margin-top: 14px; }
.chart-summary { margin: 9px 0 0; color: var(--ops-muted); font-size: 11px; line-height: 1.45; }
.chart-empty { display: grid; min-height: 200px; place-items: center; margin-top: 12px; background: #f6f8f9; color: var(--ops-muted); font-size: 13px; text-align: center; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }
</style>
