// Fictional demonstration thresholds only; these are not clinical standards.
export const thresholds = {
    occupancy: { watch: 85, critical: 95 },
    staffingCoverage: { critical: 85, watch: 95 },
    averageWaitMinutes: { watch: 30, critical: 45 },
} as const
