<template>
  <v-app-bar class="dashboard-header" :height="headerHeight" flat>
    <v-container class="header-inner" fluid>
      <div class="brand-block">
        <div class="brand-mark" aria-hidden="true"><v-icon icon="mdi-hospital-box-outline" /></div>
        <div>
          <p class="eyebrow">Hospital Operations</p>
          <h1>Clinical Operations Dashboard</h1>
        </div>
      </div>
      <div class="header-tools">
        <v-select
          class="month-select"
          :model-value="modelValue"
          :items="monthOptions"
          item-title="title"
          item-value="value"
          label="Reporting period"
          aria-label="Select reporting period"
          variant="outlined"
          density="comfortable"
          hide-details
          @update:model-value="$emit('update:modelValue', $event)"
        />
        <div class="refresh-block">
          <span class="refresh-label">Last refreshed</span>
          <time datetime="2025-12-31T08:30">Dec 31, 2025 · 08:30</time>
        </div>
        <v-chip class="synthetic-badge" prepend-icon="mdi-flask-outline" size="small" variant="tonal">
          Synthetic data
        </v-chip>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import type { MonthOption } from '@/types/dashboard'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { width } = useDisplay()
const headerHeight = computed(() => width.value <= 520 ? 215 : width.value <= 820 ? 149 : 88)

defineProps<{
  modelValue: string | null
  monthOptions: MonthOption[]
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<style scoped>
.dashboard-header { background: rgb(var(--v-theme-surface)); border-bottom: 1px solid var(--ops-border); color: var(--ops-ink); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 20px clamp(20px, 4vw, 56px); }
.brand-block, .header-tools { display: flex; align-items: center; gap: 16px; }
.brand-mark { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 12px; background: var(--ops-teal-soft); color: var(--ops-teal); }
.brand-mark :deep(.v-icon) { font-size: 25px; }
.eyebrow, .refresh-label { margin: 0 0 3px; color: var(--ops-muted); font-size: 11px; font-weight: 700; text-transform: uppercase; }
h1 { margin: 0; font-size: 21px; font-weight: 700; line-height: 1.2; }
.header-tools { justify-content: flex-end; }
.month-select { width: 190px; }
.refresh-block { display: grid; gap: 3px; white-space: nowrap; color: var(--ops-ink); font-size: 12px; }
.synthetic-badge { color: var(--ops-teal); }
@media (max-width: 820px) {
  .header-inner { align-items: flex-start; flex-direction: column; gap: 16px; }
  .header-tools { width: 100%; justify-content: flex-start; flex-wrap: wrap; }
}
@media (max-width: 520px) {
  .header-inner { padding: 16px; }
  .brand-block { align-items: flex-start; }
  h1 { max-width: 260px; font-size: 18px; }
  .header-tools { align-items: stretch; }
  .month-select { width: 100%; }
  .refresh-block { flex: 1; }
}
</style>
