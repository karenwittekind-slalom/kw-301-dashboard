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

<style scoped>
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin: 0 0 12px; }
.section-heading h2 { margin: 0; color: var(--ops-ink); font-size: 18px; }
.section-kicker { margin: 0 0 4px; color: var(--ops-teal); font-size: 10px; font-weight: 700; text-transform: uppercase; }
.alert-count { color: var(--ops-muted); font-size: 12px; }
.alerts-list { display: grid; gap: 9px; }
.alert-item { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 12px; padding: 13px 15px; border: 1px solid var(--ops-border); border-left: 3px solid var(--ops-amber); border-radius: 8px; background: #fff; }
.alert-critical { border-left-color: var(--ops-red); }
.alert-info { border-left-color: var(--ops-teal); }
.alert-mark { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 8px; background: var(--ops-amber-soft); color: var(--ops-amber-ink); }
.alert-critical .alert-mark { background: var(--ops-red-soft); color: var(--ops-red-ink); }
.alert-info .alert-mark { background: var(--ops-teal-soft); color: var(--ops-teal); }
.alert-meta { display: flex; flex-wrap: wrap; gap: 6px 10px; color: var(--ops-muted); font-size: 10px; }
.severity-text { color: var(--ops-amber-ink); font-weight: 750; }
.alert-critical .severity-text { color: var(--ops-red-ink); }
.alert-info .severity-text { color: var(--ops-teal); }
.alert-content h3 { margin: 4px 0 3px; color: var(--ops-ink); font-size: 13px; }
.alert-message, .alert-action { margin: 0; color: var(--ops-muted); font-size: 11px; line-height: 1.5; }
.alert-action { margin-top: 4px; color: var(--ops-ink); }
.alert-time { color: var(--ops-muted); font-size: 10px; white-space: nowrap; }
.alerts-empty { display: flex; align-items: center; gap: 13px; padding: 18px; border: 1px solid var(--ops-border); border-radius: 8px; background: #fff; }
.alerts-empty :deep(.v-icon) { color: var(--ops-green-ink); font-size: 25px; }
.alerts-empty h3 { margin: 0; color: var(--ops-ink); font-size: 13px; }
.alerts-empty p { margin: 3px 0 0; color: var(--ops-muted); font-size: 11px; }
@media (max-width: 680px) { .alert-item { grid-template-columns: 30px minmax(0, 1fr); } .alert-time { grid-column: 2; } }
</style>
