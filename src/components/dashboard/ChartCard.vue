<template>
  <v-card class="chart-card" color="surface" variant="flat" border>
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

