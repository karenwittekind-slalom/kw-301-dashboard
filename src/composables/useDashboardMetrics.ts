import { computed, ref } from 'vue'
import clinicalOperations from '@/data/clinicalOperations.json'
import type {
    ClinicalOperationsDataset,
    MetricCardData,
    MonthlyClinicalOperations,
    OperationalAlert,
    UnitOperations,
} from '@/types/dashboard'
import {
    getAverage,
    getOccupancyStatus,
    getOperationalSummary,
    getPatientTotal,
    getStaffingStatus,
    getTrendDirection,
    getUnitStatus,
    getWaitStatus,
} from '@/utils/dashboardCalculations'
import { formatChange, formatMinutes, formatNumber, formatPercent } from '@/utils/formatters'

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasNumbers(record: Record<string, unknown>, fields: string[]): boolean {
    return fields.every(field => typeof record[field] === 'number' && Number.isFinite(record[field]))
}

function isUnit(value: unknown): value is UnitOperations {
    if (!isRecord(value)) return false
    return ['id', 'name', 'shortName'].every(field => typeof value[field] === 'string') &&
        hasNumbers(value, ['patientVolume', 'totalBeds', 'occupiedBeds', 'availableBeds', 'occupancyRate', 'averageWaitTimeMinutes', 'staffingRequired', 'staffingPresent', 'staffingCoverageRate']) &&
        ['normal', 'watch', 'critical'].includes(String(value.status))
}

function isMonth(value: unknown): value is MonthlyClinicalOperations {
    if (!isRecord(value)) return false
    const textFields = ['id', 'month', 'monthShort']
    const numberFields = ['monthNumber', 'patientVolume', 'admissions', 'discharges', 'totalBeds', 'occupiedBeds', 'availableBeds', 'occupancyRate', 'averageWaitTimeMinutes', 'edWaitTimeMinutes', 'staffingRequired', 'staffingScheduled', 'staffingPresent', 'staffingCoverageRate', 'nurseToPatientRatio', 'alertCount', 'criticalAlertCount']
    return textFields.every(field => typeof value[field] === 'string') &&
        hasNumbers(value, numberFields) &&
        Array.isArray(value.units) && value.units.every(isUnit)
}

function isAlert(value: unknown): value is OperationalAlert {
    if (!isRecord(value)) return false
    const textFields = ['id', 'month', 'unit', 'category', 'title', 'message', 'recommendedAction', 'detectedAt']
    return textFields.every(field => typeof value[field] === 'string') &&
        (value.severity === 'info' || value.severity === 'warning' || value.severity === 'critical')
}

function isDataset(value: unknown): value is ClinicalOperationsDataset {
    return isRecord(value) && Array.isArray(value.months) && value.months.every(isMonth) &&
        Array.isArray(value.alerts) && value.alerts.every(isAlert)
}

if (!isDataset(clinicalOperations)) {
    throw new Error('The local clinical operations dataset has an invalid shape.')
}

const dataset = clinicalOperations
const alertPriority = { critical: 0, warning: 1, info: 2 } as const

export function useDashboardMetrics() {
    const selectedMonth = ref<string | null>(null)
    const months = dataset.months
    const monthOptions = [
        { title: 'All months', value: null as string | null },
        ...months.map(month => ({ title: month.month, value: month.month })),
    ]
    const selectedIndex = computed(() => months.findIndex(month => month.month === selectedMonth.value))
    const selectedRecord = computed(() => selectedIndex.value >= 0 ? months[selectedIndex.value] : undefined)
    const previousRecord = computed(() => selectedIndex.value > 0 ? months[selectedIndex.value - 1] : undefined)
    const chartFocusIndex = computed(() => selectedIndex.value)
    const unitSnapshot = computed(() => {
        const units = selectedRecord.value?.units ?? months.at(-1)?.units ?? []
        return units.map(unit => ({ ...unit, status: getUnitStatus(unit) }))
    })
    const filteredAlerts = computed(() => {
        const alerts = selectedMonth.value
            ? dataset.alerts.filter(alert => alert.month === selectedMonth.value)
            : dataset.alerts
        return [...alerts].sort((first, second) =>
            alertPriority[first.severity] - alertPriority[second.severity] ||
            dataset.months.findIndex(month => month.month === second.month) - dataset.months.findIndex(month => month.month === first.month) ||
            first.detectedAt.localeCompare(second.detectedAt)
        ).slice(0, selectedMonth.value ? alerts.length : 6)
    })
    const summary = computed(() => getOperationalSummary(
        selectedRecord.value?.units ?? months.flatMap(month => month.units),
        selectedRecord.value?.averageWaitTimeMinutes ?? getAverage(months, month => month.averageWaitTimeMinutes),
    ))

    const metricCards = computed<MetricCardData[]>(() => {
        const record = selectedRecord.value
        const previous = previousRecord.value
        const averageOccupancy = getAverage(months, month => month.occupancyRate)
        const averageWait = getAverage(months, month => month.averageWaitTimeMinutes)
        const averageCoverage = getAverage(months, month => month.staffingCoverageRate)
        const values = record ? {
            volume: record.patientVolume,
            occupancy: record.occupancyRate,
            wait: record.averageWaitTimeMinutes,
            coverage: record.staffingCoverageRate,
            alerts: record.alertCount,
        } : {
            volume: getPatientTotal(months),
            occupancy: averageOccupancy,
            wait: averageWait,
            coverage: averageCoverage,
            alerts: dataset.alerts.length,
        }
        const previousValues = previous ? {
            volume: previous.patientVolume,
            occupancy: previous.occupancyRate,
            wait: previous.averageWaitTimeMinutes,
            coverage: previous.staffingCoverageRate,
            alerts: previous.alertCount,
        } : undefined
        const status = summary.value.status
        const comparison = (key: keyof NonNullable<typeof previousValues>, suffix = '') =>
            record ? formatChange(values[key], previousValues?.[key], suffix) : '2025 annual operating view'
        const trend = (key: keyof NonNullable<typeof previousValues>) =>
            record ? getTrendDirection(values[key], previousValues?.[key]) : 'flat'

        return [
            { title: 'Patient Volume', value: formatNumber(values.volume), comparisonText: comparison('volume'), trendDirection: trend('volume'), status: 'neutral', icon: 'mdi-account-group-outline', supportingText: record ? 'Patients this month' : 'Total patients across 2025', accessibleLabel: `${formatNumber(values.volume)} patient visits` },
            { title: 'Bed Occupancy', value: formatPercent(values.occupancy), comparisonText: comparison('occupancy', ' pp'), trendDirection: trend('occupancy'), status: getOccupancyStatus(values.occupancy), icon: 'mdi-bed-outline', supportingText: record ? `${record.occupiedBeds} of ${record.totalBeds} beds occupied` : 'Average monthly occupancy', accessibleLabel: `${formatPercent(values.occupancy)} bed occupancy` },
            { title: 'Average Wait Time', value: formatMinutes(values.wait), comparisonText: comparison('wait', ' min'), trendDirection: trend('wait'), status: getWaitStatus(values.wait), icon: 'mdi-clock-outline', supportingText: record ? `Emergency department: ${record.edWaitTimeMinutes} min` : 'Average monthly wait', accessibleLabel: `${formatMinutes(values.wait)} average wait time` },
            { title: 'Staffing Coverage', value: formatPercent(values.coverage), comparisonText: comparison('coverage', ' pp'), trendDirection: trend('coverage'), status: getStaffingStatus(values.coverage), icon: 'mdi-account-hard-hat-outline', supportingText: record ? `${record.staffingPresent} present of ${record.staffingRequired} required` : 'Average monthly coverage', accessibleLabel: `${formatPercent(values.coverage)} staffing coverage` },
            { title: 'Active Alerts', value: formatNumber(values.alerts), comparisonText: record ? comparison('alerts') : `${dataset.alerts.filter(alert => alert.severity === 'critical').length} critical across the year`, trendDirection: trend('alerts'), status: values.alerts > 0 ? status : 'normal', icon: 'mdi-bell-alert-outline', supportingText: record ? `${record.criticalAlertCount} critical alerts` : `${dataset.alerts.length} total alerts in 2025`, accessibleLabel: `${values.alerts} active operational alerts` },
        ]
    })

    const unitWaitLeader = computed<UnitOperations | undefined>(() =>
        [...unitSnapshot.value].sort((first, second) => second.averageWaitTimeMinutes - first.averageWaitTimeMinutes)[0]
    )
    const averageNurseRatio = computed(() => getAverage(
        selectedRecord.value ? [selectedRecord.value] : months,
        month => month.nurseToPatientRatio,
    ))

    return {
        selectedMonth,
        monthOptions,
        months,
        selectedRecord,
        selectedIndex: chartFocusIndex,
        metricCards,
        unitSnapshot,
        filteredAlerts,
        summary,
        unitWaitLeader,
        averageNurseRatio,
        allAlerts: dataset.alerts,
    }
}
