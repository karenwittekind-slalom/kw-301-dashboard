<template>
  <section aria-labelledby="units-title">
    <div class="section-heading">
      <div><p class="section-kicker">Department detail</p><h2 id="units-title">Unit status</h2></div>
      <p>{{ units.length }} units · {{ periodLabel }}</p>
    </div>
    <div class="desktop-table">
      <v-table density="comfortable" class="unit-table">
        <caption class="sr-only">Unit volume, bed capacity, wait time, staffing coverage, and operational status for {{ periodLabel }}.</caption>
        <thead>
          <tr>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by unit" @click="sortBy('name')">Unit <v-icon :icon="sortIcon('name')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by patient volume" @click="sortBy('patientVolume')">Patients <v-icon :icon="sortIcon('patientVolume')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by occupied beds" @click="sortBy('occupiedBeds')">Occupied <v-icon :icon="sortIcon('occupiedBeds')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by available beds" @click="sortBy('availableBeds')">Available <v-icon :icon="sortIcon('availableBeds')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by occupancy" @click="sortBy('occupancyRate')">Occupancy <v-icon :icon="sortIcon('occupancyRate')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by average wait" @click="sortBy('averageWaitTimeMinutes')">Avg wait <v-icon :icon="sortIcon('averageWaitTimeMinutes')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by staffing coverage" @click="sortBy('staffingCoverageRate')">Staffing <v-icon :icon="sortIcon('staffingCoverageRate')" /></v-btn></th>
            <th scope="col"><v-btn class="sort-button" variant="plain" size="small" aria-label="Sort by status" @click="sortBy('status')">Status <v-icon :icon="sortIcon('status')" /></v-btn></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in sortedUnits" :key="unit.id">
            <th scope="row" class="unit-name">{{ unit.name }}</th>
            <td>{{ formatNumber(unit.patientVolume) }}</td>
            <td>{{ unit.occupiedBeds }} / {{ unit.totalBeds }}</td>
            <td>{{ unit.availableBeds }}</td>
            <td>{{ formatPercent(unit.occupancyRate) }}</td>
            <td>{{ unit.averageWaitTimeMinutes }} min</td>
            <td>{{ formatPercent(unit.staffingCoverageRate) }}</td>
            <td><span class="status-pill" :class="`status-${unit.status}`"><span class="status-marker" aria-hidden="true" />{{ statusLabel(unit.status) }}</span></td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="mobile-units">
      <v-card v-for="unit in sortedUnits" :key="unit.id" class="unit-card" color="surface" variant="flat" border>
        <div class="unit-card-heading"><h3>{{ unit.name }}</h3><span class="status-pill" :class="`status-${unit.status}`"><span class="status-marker" aria-hidden="true" />{{ statusLabel(unit.status) }}</span></div>
        <dl>
          <div><dt>Patients</dt><dd>{{ formatNumber(unit.patientVolume) }}</dd></div>
          <div><dt>Beds occupied</dt><dd>{{ unit.occupiedBeds }} / {{ unit.totalBeds }}</dd></div>
          <div><dt>Available beds</dt><dd>{{ unit.availableBeds }}</dd></div>
          <div><dt>Occupancy</dt><dd>{{ formatPercent(unit.occupancyRate) }}</dd></div>
          <div><dt>Average wait</dt><dd>{{ unit.averageWaitTimeMinutes }} min</dd></div>
          <div><dt>Staffing coverage</dt><dd>{{ formatPercent(unit.staffingCoverageRate) }}</dd></div>
        </dl>
      </v-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { UnitOperations } from '@/types/dashboard'
import { formatNumber, formatPercent, statusLabel } from '@/utils/formatters'

type SortKey = keyof Pick<UnitOperations, 'name' | 'patientVolume' | 'occupiedBeds' | 'availableBeds' | 'occupancyRate' | 'averageWaitTimeMinutes' | 'staffingCoverageRate' | 'status'>
const props = defineProps<{ units: UnitOperations[]; periodLabel: string }>()
const sortKey = ref<SortKey>('status')
const sortDirection = ref<'asc' | 'desc'>('asc')
const sortedUnits = computed(() => [...props.units].sort((first, second) => {
  if (sortKey.value === 'status') {
    const priority = { critical: 0, watch: 1, normal: 2 }
    const comparison = priority[first.status] - priority[second.status]
    return comparison * (sortDirection.value === 'asc' ? 1 : -1)
  }
  const firstValue = first[sortKey.value]
  const secondValue = second[sortKey.value]
  const comparison = typeof firstValue === 'number' && typeof secondValue === 'number'
    ? firstValue - secondValue
    : String(firstValue).localeCompare(String(secondValue))
  return comparison * (sortDirection.value === 'asc' ? 1 : -1)
}))
function sortBy(key: SortKey) {
  if (sortKey.value === key) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortKey.value = key; sortDirection.value = 'asc' }
}
function sortIcon(key: SortKey) {
  return sortKey.value !== key ? 'mdi-unfold-more-horizontal' : sortDirection.value === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down'
}
</script>

