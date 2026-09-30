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
        <v-tooltip :text="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <template #activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              class="theme-toggle"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              :aria-pressed="isDark"
              :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
              size="small"
              variant="text"
              @click="$emit('toggle-theme')"
            />
          </template>
        </v-tooltip>
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
  isDark: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
  'toggle-theme': []
}>()
</script>

