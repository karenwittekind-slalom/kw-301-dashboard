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
        <ChartCard title="Admissions & discharges" description="Focused vertical scale from 750 to 1,050 patients; this axis does not start at zero." summary="Admissions and discharges are close throughout the year, with discharge volume exceeding admissions in August, September, and November. The vertical axis is focused on 750 to 1,050 patients, not zero-based, to make monthly differences easier to compare." kind="line" :data="flowData" :options="flowOptions" icon="mdi-swap-horizontal" :has-data="true" />
      </v-col>
      <v-col cols="12">
        <ChartCard title="Bed occupancy trend" description="Occupied beds as a share of total capacity. Dashed lines mark fictional watch and critical levels." summary="Occupancy peaks at 96% in July. The 85% watch and 95% critical reference levels are shown for demonstration only." kind="line" :data="occupancyData" :options="occupancyOptions" icon="mdi-bed-outline" :height="220" :has-data="true" />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import type { ChartData } from 'chart.js'
import type { MonthlyClinicalOperations } from '@/types/dashboard'
import { thresholds } from '@/config/thresholds'
import { createBarChartOptions, createLineChartOptions, darkChartPalette, lightChartPalette } from '@/utils/chartConfig'
import ChartCard from './ChartCard.vue'

type Props = { months: MonthlyClinicalOperations[]; selectedIndex: number }
const props = defineProps<Props>()
const theme = useTheme()
const chartPalette = computed(() => theme.global.current.value.dark ? darkChartPalette : lightChartPalette)
const labels = computed(() => props.months.map(month => month.monthShort))
const volumeData = computed<ChartData<'bar'>>(() => ({
  labels: labels.value,
  datasets: [{
    label: 'Patient volume',
    data: props.months.map(month => month.patientVolume),
    backgroundColor: props.months.map((_, index) => index === props.selectedIndex ? chartPalette.value.teal : chartPalette.value.mutedTeal),
    borderRadius: 4,
    maxBarThickness: 34,
  }],
}))
const flowData = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Admissions', data: props.months.map(month => month.admissions), borderColor: chartPalette.value.teal, backgroundColor: chartPalette.value.teal, pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
    { label: 'Discharges', data: props.months.map(month => month.discharges), borderColor: chartPalette.value.amber, backgroundColor: chartPalette.value.amber, pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
  ],
}))
const occupancyData = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Bed occupancy', data: props.months.map(month => month.occupancyRate), borderColor: chartPalette.value.teal, backgroundColor: chartPalette.value.teal, pointRadius: props.months.map((_, index) => index === props.selectedIndex ? 5 : 2), tension: 0.3 },
    { label: 'Watch threshold 85%', data: props.months.map(() => thresholds.occupancy.watch), borderColor: chartPalette.value.amber, borderDash: [5, 5], pointStyle: 'line', pointStyleWidth: 18, pointRadius: 0, borderWidth: 1.5 },
    { label: 'Critical threshold 95%', data: props.months.map(() => thresholds.occupancy.critical), borderColor: chartPalette.value.red, borderDash: [5, 5], pointStyle: 'line', pointStyleWidth: 18, pointRadius: 0, borderWidth: 1.5 },
  ],
}))
const volumeOptions = computed(() => createBarChartOptions('people', chartPalette.value))
const flowOptions = computed(() => createLineChartOptions('people', { min: 750, max: 1050 }, chartPalette.value))
const occupancyOptions = computed(() => createLineChartOptions('percent', undefined, chartPalette.value))
</script>

