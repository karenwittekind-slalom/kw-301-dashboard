<template>
  <section aria-labelledby="staffing-title">
    <div class="section-heading"><div><p class="section-kicker">Workforce</p><h2 id="staffing-title">Staffing coverage</h2></div><p>Staffing values are synthetic operational data.</p></div>
    <v-row>
      <v-col cols="12" md="6">
        <ChartCard title="Coverage by unit" description="Present staff as a share of required staffing." :summary="coverageSummary" kind="bar" :data="coverageData" :options="coverageOptions" icon="mdi-account-heart-outline" :has-data="true" />
      </v-col>
      <v-col cols="12" md="6">
        <ChartCard title="Required vs present staff" description="Counts for the selected month or latest 2025 snapshot." :summary="staffCountSummary" kind="bar" :data="staffCountData" :options="staffCountOptions" icon="mdi-account-multiple-outline" :has-data="true" />
      </v-col>
      <v-col cols="12">
        <div class="ratio-band">
          <div class="ratio-icon"><v-icon icon="mdi-account-switch-outline" aria-hidden="true" /></div>
          <div><p class="ratio-label">Nurse-to-patient ratio summary</p><p class="ratio-value">1 : {{ nurseRatio.toFixed(1) }}</p></div>
          <p class="ratio-note">Synthetic {{ periodLabel }} ratio. This is operational demonstration data, not a legal or clinical threshold.</p>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import type { ChartData } from 'chart.js'
import type { MonthlyClinicalOperations, UnitOperations } from '@/types/dashboard'
import { getStaffingStatus } from '@/utils/dashboardCalculations'
import { createBarChartOptions, darkChartPalette, lightChartPalette } from '@/utils/chartConfig'
import ChartCard from './ChartCard.vue'

const props = defineProps<{
  months: MonthlyClinicalOperations[]
  units: UnitOperations[]
  selectedIndex: number
  nurseRatio: number
  periodLabel: string
}>()
const theme = useTheme()
const chartPalette = computed(() => theme.global.current.value.dark ? darkChartPalette : lightChartPalette)
const coverageData = computed<ChartData<'bar'>>(() => ({
  labels: props.units.map(unit => unit.shortName),
  datasets: [{ label: 'Staffing coverage', data: props.units.map(unit => unit.staffingCoverageRate), backgroundColor: props.units.map(unit => getStaffingStatus(unit.staffingCoverageRate) === 'critical' ? chartPalette.value.red : getStaffingStatus(unit.staffingCoverageRate) === 'watch' ? chartPalette.value.amber : chartPalette.value.green), borderRadius: 4 }],
}))
const staffCountData = computed<ChartData<'bar'>>(() => ({
  labels: props.units.map(unit => unit.shortName),
  datasets: [
    { label: 'Required staff', data: props.units.map(unit => unit.staffingRequired), backgroundColor: chartPalette.value.requiredBar, borderRadius: 3 },
    { label: 'Present staff', data: props.units.map(unit => unit.staffingPresent), backgroundColor: chartPalette.value.teal, borderRadius: 3 },
  ],
}))
const coverageSummary = computed(() => `Staffing coverage ranges from ${Math.min(...props.units.map(unit => unit.staffingCoverageRate)).toFixed(1)}% to ${Math.max(...props.units.map(unit => unit.staffingCoverageRate)).toFixed(1)}% in ${props.periodLabel}.`)
const staffCountSummary = computed(() => `Required and present staff are compared across ${props.units.length} units for ${props.periodLabel}.`)
const coverageOptions = computed(() => createBarChartOptions('percent', chartPalette.value))
const staffCountOptions = computed(() => createBarChartOptions('people', chartPalette.value))
</script>

