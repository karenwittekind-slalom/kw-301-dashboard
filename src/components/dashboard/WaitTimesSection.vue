<template>
  <section aria-labelledby="wait-title">
    <div class="section-heading"><div><p class="section-kicker">Patient flow</p><h2 id="wait-title">Wait-time pressure</h2></div></div>
    <div class="wait-callout" role="status">
      <v-icon icon="mdi-clock-alert-outline" aria-hidden="true" />
      <span><strong>Highest current unit wait:</strong> {{ highestWait?.name ?? 'No unit data' }} at {{ highestWait?.averageWaitTimeMinutes ?? 0 }} minutes.</span>
    </div>
    <v-row>
      <v-col cols="12" md="7">
        <ChartCard title="Average wait-time trend" description="Monthly average wait time across the system." :summary="waitSummary" kind="line" :data="trendData" :options="trendOptions" icon="mdi-chart-timeline-variant" :has-data="true" />
      </v-col>
      <v-col cols="12" md="5">
        <ChartCard title="Current wait by unit" description="Latest year snapshot or selected month." :summary="unitSummary" kind="bar" :data="unitData" :options="unitOptions" icon="mdi-domain" :has-data="true" />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChartData } from 'chart.js'
import type { MonthlyClinicalOperations, UnitOperations } from '@/types/dashboard'
import { getWaitStatus } from '@/utils/dashboardCalculations'
import { createBarChartOptions, createLineChartOptions } from '@/utils/chartConfig'
import ChartCard from './ChartCard.vue'

const props = defineProps<{
  months: MonthlyClinicalOperations[]
  units: UnitOperations[]
  selectedIndex: number
  periodLabel: string
}>()
const highestWait = computed(() => [...props.units].sort((first, second) => second.averageWaitTimeMinutes - first.averageWaitTimeMinutes)[0])
const waitSummary = computed(() => `Average wait ranges from ${Math.min(...props.months.map(month => month.averageWaitTimeMinutes))} to ${Math.max(...props.months.map(month => month.averageWaitTimeMinutes))} minutes; ${props.periodLabel} is ${props.selectedIndex >= 0 ? props.months[props.selectedIndex]?.averageWaitTimeMinutes : 'shown in the monthly trend'} minutes.`)
const unitSummary = computed(() => `The Emergency Department has the highest average wait at ${highestWait.value?.averageWaitTimeMinutes ?? 0} minutes.`)
const trendData = computed<ChartData<'line'>>(() => ({
  labels: props.months.map(month => month.monthShort),
  datasets: [{ label: 'Average wait', data: props.months.map(month => month.averageWaitTimeMinutes), borderColor: '#087f83', backgroundColor: '#087f83', pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.32 }],
}))
const unitData = computed<ChartData<'bar'>>(() => ({
  labels: props.units.map(unit => unit.shortName),
  datasets: [{
    label: 'Average wait (minutes)',
    data: props.units.map(unit => unit.averageWaitTimeMinutes),
    backgroundColor: props.units.map(unit => getWaitStatus(unit.averageWaitTimeMinutes) === 'critical' ? '#bf4d48' : getWaitStatus(unit.averageWaitTimeMinutes) === 'watch' ? '#d9913c' : '#82b8b5'),
    borderRadius: 4,
  }],
}))
const trendOptions = createLineChartOptions('minutes')
const unitOptions = createBarChartOptions('minutes')
</script>

<style scoped>
.section-heading { margin: 0 0 12px; }
.section-heading h2 { margin: 0; color: var(--ops-ink); font-size: 18px; }
.section-kicker { margin: 0 0 4px; color: var(--ops-teal); font-size: 10px; font-weight: 700; text-transform: uppercase; }
.wait-callout { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; padding: 11px 14px; border: 1px solid #efd8b6; border-radius: 8px; background: var(--ops-amber-soft); color: var(--ops-amber-ink); font-size: 12px; line-height: 1.45; }
.wait-callout :deep(.v-icon) { flex: 0 0 auto; }
</style>
