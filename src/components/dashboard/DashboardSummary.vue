<template>
  <section class="summary-band" aria-labelledby="summary-title">
    <div class="summary-copy">
      <div class="summary-heading">
        <span class="status-dot" :class="`status-${summary.status}`" aria-hidden="true" />
        <h2 id="summary-title">Operational summary</h2>
        <span class="status-text" :class="`text-${summary.status}`">{{ statusLabel(summary.status) }} status</span>
      </div>
      <p class="summary-risk">{{ summary.risk }}</p>
      <p class="summary-next"><v-icon icon="mdi-arrow-right" aria-hidden="true" /> <strong>Next step:</strong> {{ summary.nextStep }}</p>
      <a class="summary-action-link" href="#alerts-title">
        Review action queue ({{ alertCount }} {{ alertCount === 1 ? 'item' : 'items' }})
        <v-icon icon="mdi-arrow-down" aria-hidden="true" />
      </a>
    </div>
    <div class="summary-period">{{ periodLabel }}</div>
  </section>
</template>

<script setup lang="ts">
import type { OperationalStatus } from '@/types/dashboard'
import { statusLabel } from '@/utils/formatters'

defineProps<{
  summary: { status: OperationalStatus; risk: string; nextStep: string }
  periodLabel: string
  alertCount: number
}>()
</script>

