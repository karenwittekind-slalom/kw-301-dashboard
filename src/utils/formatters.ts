import type { AlertSeverity, OperationalStatus } from '@/types/dashboard'

const wholeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatNumber(value: number): string {
    return wholeNumber.format(value)
}

export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`
}

export function formatMinutes(value: number): string {
    return `${Math.round(value)} min`
}

export function formatChange(current: number, previous: number | undefined, suffix = ''): string {
    if (previous === undefined) return 'No previous-month comparison available'
    const change = current - previous
    const sign = change > 0 ? '+' : ''
    const precision = suffix === ' pp' ? 1 : 0
    return `${sign}${change.toFixed(precision)}${suffix} vs previous month`
}

export function statusLabel(status: OperationalStatus): string {
    return status === 'normal' ? 'Normal' : status === 'watch' ? 'Watch' : 'Critical'
}

export function severityLabel(severity: AlertSeverity): string {
    return severity === 'critical' ? 'Critical' : severity === 'warning' ? 'Warning' : 'Information'
}
