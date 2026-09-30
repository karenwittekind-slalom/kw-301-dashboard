<template>
  <DashboardHeader v-model="selectedMonth" :month-options="monthOptions" />
  <v-main id="main-content">
    <v-container class="dashboard-shell" fluid>
      <DashboardEmptyState v-if="months.length === 0" />
      <template v-else>
        <DashboardSummary :summary="summary" :period-label="periodLabel" />
        <MetricsGrid :metrics="metricCards" />
        <CapacitySection :months="months" :selected-index="selectedIndex" />
        <WaitTimesSection :months="months" :units="unitSnapshot" :selected-index="selectedIndex" :period-label="periodLabel" />
        <StaffingSection :months="months" :units="unitSnapshot" :selected-index="selectedIndex" :nurse-ratio="averageNurseRatio" :period-label="periodLabel" />
        <UnitStatusTable :units="unitSnapshot" :period-label="periodLabel" />
        <AlertsPanel :alerts="filteredAlerts" />
        <footer class="dashboard-disclaimer">
          <v-icon icon="mdi-information-outline" aria-hidden="true" />
          <p>All data is synthetic and intended for demonstration purposes only. This dashboard does not provide clinical guidance.</p>
        </footer>
      </template>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardSummary from '@/components/dashboard/DashboardSummary.vue'
import MetricsGrid from '@/components/dashboard/MetricsGrid.vue'
import CapacitySection from '@/components/dashboard/CapacitySection.vue'
import WaitTimesSection from '@/components/dashboard/WaitTimesSection.vue'
import StaffingSection from '@/components/dashboard/StaffingSection.vue'
import UnitStatusTable from '@/components/dashboard/UnitStatusTable.vue'
import AlertsPanel from '@/components/dashboard/AlertsPanel.vue'
import DashboardEmptyState from '@/components/dashboard/DashboardEmptyState.vue'
import { useDashboardMetrics } from '@/composables/useDashboardMetrics'

const {
  selectedMonth,
  monthOptions,
  months,
  selectedIndex,
  metricCards,
  unitSnapshot,
  filteredAlerts,
  summary,
  averageNurseRatio,
} = useDashboardMetrics()
const periodLabel = computed(() => selectedMonth.value ?? '2025 annual summary')
</script>
