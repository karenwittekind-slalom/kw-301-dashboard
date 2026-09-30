import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'
import type { ChartOptions, TooltipItem } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

const axisColor = '#61717f'
const gridColor = '#e5eaed'

export type ChartValueUnit = 'people' | 'percent' | 'minutes'

export function formatAxisValue(value: number, unit: ChartValueUnit): string {
    if (unit === 'percent') return `${value}%`
    if (unit === 'minutes') return `${value} min`
    return Math.round(value).toLocaleString()
}

const visualOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
        legend: { position: 'bottom' as const, labels: { color: axisColor, usePointStyle: true, boxWidth: 8, padding: 18 } },
        tooltip: { backgroundColor: '#163b4a', padding: 12 },
    },
    scales: {
        x: { grid: { display: false }, ticks: { color: axisColor, maxRotation: 0, autoSkip: true }, border: { display: false } },
        y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: axisColor, maxTicksLimit: 5 }, border: { display: false } },
    },
}

export function createBarChartOptions(unit: ChartValueUnit = 'people'): ChartOptions<'bar'> {
    return {
        ...visualOptions,
        plugins: {
            ...visualOptions.plugins,
            tooltip: {
                ...visualOptions.plugins.tooltip,
                callbacks: {
                    label(context: TooltipItem<'bar'>) {
                        return `${context.dataset.label ?? ''}: ${formatAxisValue(context.parsed.y ?? 0, unit)}`
                    }
                },
            },
        },
        scales: {
            ...visualOptions.scales,
            y: { ...visualOptions.scales.y, ticks: { ...visualOptions.scales.y.ticks, callback(value) { return formatAxisValue(Number(value), unit) } } },
        },
    }
}

export function createLineChartOptions(unit: ChartValueUnit = 'people'): ChartOptions<'line'> {
    return {
        ...visualOptions,
        plugins: {
            ...visualOptions.plugins,
            tooltip: {
                ...visualOptions.plugins.tooltip,
                callbacks: {
                    label(context: TooltipItem<'line'>) {
                        return `${context.dataset.label ?? ''}: ${formatAxisValue(context.parsed.y ?? 0, unit)}`
                    }
                },
            },
        },
        scales: {
            ...visualOptions.scales,
            y: { ...visualOptions.scales.y, ticks: { ...visualOptions.scales.y.ticks, callback(value) { return formatAxisValue(Number(value), unit) } } },
        },
    }
}
