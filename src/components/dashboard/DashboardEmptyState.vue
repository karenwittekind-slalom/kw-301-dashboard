<template>
  <section class="empty-state" aria-labelledby="empty-title">
    <v-icon icon="mdi-chart-box-outline" aria-hidden="true" />
    <h2 id="empty-title">No operational data available</h2>
    <p>There is no synthetic reporting data to display for this selection.</p>
  </section>
</template>

<style scoped>
.empty-state { display: grid; min-height: 240px; place-content: center; justify-items: center; gap: 8px; border: 1px dashed var(--ops-border-strong); border-radius: 9px; background: #fff; color: var(--ops-muted); text-align: center; }
.empty-state :deep(.v-icon) { color: var(--ops-teal); font-size: 30px; }
h2 { margin: 4px 0 0; color: var(--ops-ink); font-size: 16px; }
p { margin: 0; font-size: 13px; }
</style>
