import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'
import type { Chart as ChartInstance, ChartOptions, TooltipItem } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

export type ChartValueUnit = 'people' | 'percent' | 'minutes'
export interface ChartAxisRange { min: number; max: number }
export interface ChartPalette {
    axis: string
    grid: string
    tooltipBackground: string
    tooltipText: string
    teal: string
    mutedTeal: string
    amber: string
    red: string
    green: string
    requiredBar: string
}

export const lightChartPalette: ChartPalette = {
    axis: '#333333', grid: '#e5eaed', tooltipBackground: '#163b4a', tooltipText: '#ffffff',
    teal: '#087f83', mutedTeal: '#a9c8ca', amber: '#d9913c', red: '#bf4d48', green: '#6da9a1', requiredBar: '#b9c9ce',
}

export const darkChartPalette: ChartPalette = {
    axis: '#c2d0d4', grid: '#3b5058', tooltipBackground: '#0e181d', tooltipText: '#f0f5f6',
    teal: '#65c9c1', mutedTeal: '#47777c', amber: '#f0b55e', red: '#f08079', green: '#79c99a', requiredBar: '#5b747c',
}

export function formatAxisValue(value: number, unit: ChartValueUnit): string {
    if (unit === 'percent') return `${value}%`
    if (unit === 'minutes') return `${value} min`
    return Math.round(value).toLocaleString()
}

function hasBorderDash(dataset: unknown): dataset is { borderDash: number[] } {
    if (typeof dataset !== 'object' || dataset === null || !('borderDash' in dataset)) return false
    const borderDash = dataset.borderDash
    return Array.isArray(borderDash) && borderDash.every(value => typeof value === 'number')
}

function visualOptions(palette: ChartPalette) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index' as const, intersect: false },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: palette.axis,
                    usePointStyle: true,
                    boxWidth: 8,
                    pointStyleWidth: 16,
                    padding: 18,
                    generateLabels(chart: ChartInstance) {
                        const defaults = ChartJS.defaults.plugins.legend.labels.generateLabels(chart)
                        return defaults.map(item => {
                            const dataset = item.datasetIndex === undefined ? undefined : chart.data.datasets[item.datasetIndex]
                            return hasBorderDash(dataset) ? { ...item, lineDash: dataset.borderDash } : item
                        })
                    },
                },
            },
            tooltip: { backgroundColor: palette.tooltipBackground, titleColor: palette.tooltipText, bodyColor: palette.tooltipText, padding: 12 },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: palette.axis, maxRotation: 0, autoSkip: true }, border: { display: false } },
            y: { beginAtZero: true, grid: { color: palette.grid }, ticks: { color: palette.axis, maxTicksLimit: 5 }, border: { display: false } },
        },
    }
}

export function createBarChartOptions(unit: ChartValueUnit = 'people', palette: ChartPalette = lightChartPalette): ChartOptions<'bar'> {
    const base = visualOptions(palette)
    return {
        ...base,
        plugins: {
            ...base.plugins,
            tooltip: {
                ...base.plugins.tooltip,
                callbacks: {
                    label(context: TooltipItem<'bar'>) {
                        return `${context.dataset.label ?? ''}: ${formatAxisValue(context.parsed.y ?? 0, unit)}`
                    }
                },
            },
        },
        scales: {
            ...base.scales,
            y: { ...base.scales.y, ticks: { ...base.scales.y.ticks, callback(value) { return formatAxisValue(Number(value), unit) } } },
        },
    }
}

export function createLineChartOptions(unit: ChartValueUnit = 'people', yAxisRange?: ChartAxisRange, palette: ChartPalette = lightChartPalette): ChartOptions<'line'> {
    const base = visualOptions(palette)
    return {
        ...base,
        plugins: {
            ...base.plugins,
            tooltip: {
                ...base.plugins.tooltip,
                callbacks: {
                    label(context: TooltipItem<'line'>) {
                        return `${context.dataset.label ?? ''}: ${formatAxisValue(context.parsed.y ?? 0, unit)}`
                    }
                },
            },
        },
        scales: {
            ...base.scales,
            y: {
                ...base.scales.y,
                ...(yAxisRange ? { min: yAxisRange.min, max: yAxisRange.max, beginAtZero: false } : {}),
                ticks: { ...base.scales.y.ticks, callback(value) { return formatAxisValue(Number(value), unit) } },
            },
        },
    }
}
