<template>
  <section aria-labelledby="alerts-title">
    <div class="section-heading">
      <div><p class="section-kicker">Action queue</p><h2 id="alerts-title">Operational alerts</h2></div>
      <span class="alert-count">{{ alerts.length }} shown</span>
    </div>
    <div v-if="alerts.length" class="alerts-list">
      <article v-for="alert in alerts" :key="alert.id" class="alert-item" :class="`alert-${alert.severity}`">
        <div class="alert-mark" aria-hidden="true"><v-icon :icon="severityIcon(alert.severity)" /></div>
        <div class="alert-content">
          <div class="alert-meta"><span class="severity-text">{{ severityLabel(alert.severity) }}</span><span>{{ alert.unit }}</span><span>{{ alert.category }}</span></div>
          <h3>{{ alert.title }}</h3>
          <p class="alert-message">{{ alert.message }}</p>
          <p class="alert-action"><strong>Suggested operational action:</strong> {{ alert.recommendedAction }}</p>
        </div>
        <time class="alert-time" :datetime="isoDate(alert.detectedAt)">{{ alert.detectedAt }}</time>
      </article>
    </div>
    <div v-else class="alerts-empty" role="status">
      <v-icon icon="mdi-check-circle-outline" aria-hidden="true" />
      <div><h3>No alerts for this reporting period</h3><p>No operational alerts were recorded in this synthetic dataset.</p></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { AlertSeverity, OperationalAlert } from '@/types/dashboard'
import { severityLabel } from '@/utils/formatters'

defineProps<{ alerts: OperationalAlert[] }>()
function severityIcon(severity: AlertSeverity) {
  return severity === 'critical' ? 'mdi-alert-octagon-outline' : severity === 'warning' ? 'mdi-alert-outline' : 'mdi-information-outline'
}
function isoDate(value: string) {
  return value.replace(' ', 'T')
}
</script>

