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
}>()
</script>

<style scoped>
.summary-band { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 19px 22px; border: 1px solid var(--ops-border); border-radius: 10px; background: #fff; }
.summary-heading { display: flex; align-items: center; gap: 9px; }
h2 { margin: 0; font-size: 14px; font-weight: 700; }
.status-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--ops-green); }
.status-watch { background: var(--ops-amber); }
.status-critical { background: var(--ops-red); }
.status-text { padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.text-normal { background: var(--ops-green-soft); color: var(--ops-green-ink); }
.text-watch { background: var(--ops-amber-soft); color: var(--ops-amber-ink); }
.text-critical { background: var(--ops-red-soft); color: var(--ops-red-ink); }
.summary-risk { margin: 9px 0 4px; color: var(--ops-ink); font-size: 14px; line-height: 1.5; }
.summary-next { display: flex; align-items: center; gap: 6px; margin: 0; color: var(--ops-muted); font-size: 12px; }
.summary-next :deep(.v-icon) { color: var(--ops-teal); font-size: 17px; }
.summary-period { flex: 0 0 auto; color: var(--ops-muted); font-size: 12px; font-weight: 600; }
@media (max-width: 640px) { .summary-band { align-items: flex-start; flex-direction: column; gap: 10px; padding: 16px; } .summary-period { align-self: flex-start; } }
</style>
