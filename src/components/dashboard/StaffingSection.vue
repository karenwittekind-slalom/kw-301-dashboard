<template>
  <section aria-labelledby="staffing-title">
    <div class="section-heading"><div><p class="section-kicker">Workforce</p><h2 id="staffing-title">Staffing coverage</h2></div><p>Staffing values are synthetic operational data.</p></div>
    <v-row>
      <v-col cols="12" md="6">
        <ChartCard title="Coverage by unit" description="Present staff as a share of required staffing." :summary="coverageSummary" kind="bar" :data="coverageData" :options="coverageOptions" icon="mdi-account-hard-hat-outline" :has-data="true" />
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
import type { ChartData } from 'chart.js'
import type { MonthlyClinicalOperations, UnitOperations } from '@/types/dashboard'
import { getStaffingStatus } from '@/utils/dashboardCalculations'
import { createBarChartOptions } from '@/utils/chartConfig'
import ChartCard from './ChartCard.vue'

const props = defineProps<{
  months: MonthlyClinicalOperations[]
  units: UnitOperations[]
  selectedIndex: number
  nurseRatio: number
  periodLabel: string
}>()
const coverageData = computed<ChartData<'bar'>>(() => ({
  labels: props.units.map(unit => unit.shortName),
  datasets: [{ label: 'Staffing coverage', data: props.units.map(unit => unit.staffingCoverageRate), backgroundColor: props.units.map(unit => getStaffingStatus(unit.staffingCoverageRate) === 'critical' ? '#bf4d48' : getStaffingStatus(unit.staffingCoverageRate) === 'watch' ? '#d9913c' : '#6da9a1'), borderRadius: 4 }],
}))
const staffCountData = computed<ChartData<'bar'>>(() => ({
  labels: props.units.map(unit => unit.shortName),
  datasets: [
    { label: 'Required staff', data: props.units.map(unit => unit.staffingRequired), backgroundColor: '#b9c9ce', borderRadius: 3 },
    { label: 'Present staff', data: props.units.map(unit => unit.staffingPresent), backgroundColor: '#087f83', borderRadius: 3 },
  ],
}))
const coverageSummary = computed(() => `Staffing coverage ranges from ${Math.min(...props.units.map(unit => unit.staffingCoverageRate)).toFixed(1)}% to ${Math.max(...props.units.map(unit => unit.staffingCoverageRate)).toFixed(1)}% in ${props.periodLabel}.`)
const staffCountSummary = computed(() => `Required and present staff are compared across ${props.units.length} units for ${props.periodLabel}.`)
const coverageOptions = createBarChartOptions('percent')
const staffCountOptions = createBarChartOptions('people')
</script>

<style scoped>
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin: 0 0 12px; }
.section-heading h2 { margin: 0; color: var(--ops-ink); font-size: 18px; }
.section-heading > p { margin: 0; color: var(--ops-muted); font-size: 12px; }
.section-kicker { margin: 0 0 4px; color: var(--ops-teal); font-size: 10px; font-weight: 700; text-transform: uppercase; }
.ratio-band { display: flex; align-items: center; gap: 14px; padding: 15px 18px; border: 1px solid var(--ops-border); border-radius: 9px; background: #fff; }
.ratio-icon { display: grid; width: 40px; height: 40px; flex: 0 0 auto; place-items: center; border-radius: 9px; background: var(--ops-teal-soft); color: var(--ops-teal); }
.ratio-label, .ratio-value { margin: 0; }
.ratio-label { color: var(--ops-muted); font-size: 11px; }
.ratio-value { margin-top: 3px; color: var(--ops-ink); font-size: 18px; font-weight: 700; }
.ratio-note { margin: 0 0 0 auto; max-width: 400px; color: var(--ops-muted); font-size: 11px; line-height: 1.45; }
@media (max-width: 600px) { .section-heading { align-items: flex-start; flex-direction: column; } .ratio-band { align-items: flex-start; flex-wrap: wrap; } .ratio-note { margin-left: 54px; } }
</style>
