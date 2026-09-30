<template>
  <section aria-labelledby="capacity-title">
    <div class="section-heading">
      <div><p class="section-kicker">Capacity & flow</p><h2 id="capacity-title">Demand against available capacity</h2></div>
      <p>Monthly movement across 2025</p>
    </div>
    <v-row>
      <v-col cols="12" lg="6">
        <ChartCard title="Patient volume" description="Monthly patient visits across all units." summary="Monthly totals vary from 3,820 to 4,700 visits; July is the annual high." kind="bar" :data="volumeData" :options="volumeOptions" icon="mdi-account-group-outline" :has-data="true" />
      </v-col>
      <v-col cols="12" lg="6">
        <ChartCard title="Admissions & discharges" description="Monthly patient flow for the hospital system." summary="Admissions and discharges are close throughout the year, with discharge volume exceeding admissions in August, September, and November." kind="line" :data="flowData" :options="flowOptions" icon="mdi-swap-horizontal" :has-data="true" />
      </v-col>
      <v-col cols="12">
        <ChartCard title="Bed occupancy trend" description="Occupied beds as a share of total capacity. Dashed lines mark fictional watch and critical levels." summary="Occupancy peaks at 96% in July. The 85% watch and 95% critical reference levels are shown for demonstration only." kind="line" :data="occupancyData" :options="occupancyOptions" icon="mdi-bed-outline" :height="220" :has-data="true" />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChartData } from 'chart.js'
import type { MonthlyClinicalOperations } from '@/types/dashboard'
import { thresholds } from '@/config/thresholds'
import { createBarChartOptions, createLineChartOptions } from '@/utils/chartConfig'
import ChartCard from './ChartCard.vue'

type Props = { months: MonthlyClinicalOperations[]; selectedIndex: number }
const props = defineProps<Props>()
const labels = computed(() => props.months.map(month => month.monthShort))
const volumeData = computed<ChartData<'bar'>>(() => ({
  labels: labels.value,
  datasets: [{
    label: 'Patient volume',
    data: props.months.map(month => month.patientVolume),
    backgroundColor: props.months.map((_, index) => index === props.selectedIndex ? '#087f83' : '#a9c8ca'),
    borderRadius: 4,
    maxBarThickness: 34,
  }],
}))
const flowData = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Admissions', data: props.months.map(month => month.admissions), borderColor: '#087f83', backgroundColor: '#087f83', pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
    { label: 'Discharges', data: props.months.map(month => month.discharges), borderColor: '#d9913c', backgroundColor: '#d9913c', pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
  ],
}))
const occupancyData = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Bed occupancy', data: props.months.map(month => month.occupancyRate), borderColor: '#087f83', backgroundColor: '#087f83', pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
    { label: 'Watch threshold 85%', data: props.months.map(() => thresholds.occupancy.watch), borderColor: '#d9913c', borderDash: [5, 5], pointRadius: 0, borderWidth: 1.5 },
    { label: 'Critical threshold 95%', data: props.months.map(() => thresholds.occupancy.critical), borderColor: '#bf4d48', borderDash: [5, 5], pointRadius: 0, borderWidth: 1.5 },
  ],
}))
const volumeOptions = createBarChartOptions('people')
const flowOptions = createLineChartOptions('people')
const occupancyOptions = createLineChartOptions('percent')
</script>

<style scoped>
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin: 0 0 12px; }
.section-heading h2 { margin: 0; color: var(--ops-ink); font-size: 18px; }
.section-heading > p { margin: 0; color: var(--ops-muted); font-size: 12px; }
.section-kicker { margin: 0 0 4px; color: var(--ops-teal); font-size: 10px; font-weight: 700; text-transform: uppercase; }
@media (max-width: 540px) { .section-heading { align-items: flex-start; flex-direction: column; } }
</style>
