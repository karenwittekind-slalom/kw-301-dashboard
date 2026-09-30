import { thresholds } from '@/config/thresholds'
import type { MonthlyClinicalOperations, OperationalStatus, UnitOperations } from '@/types/dashboard'

export function getOccupancyStatus(value: number): OperationalStatus {
    if (value >= thresholds.occupancy.critical) return 'critical'
    if (value >= thresholds.occupancy.watch) return 'watch'
    return 'normal'
}

export function getStaffingStatus(value: number): OperationalStatus {
    if (value < thresholds.staffingCoverage.critical) return 'critical'
    if (value < thresholds.staffingCoverage.watch) return 'watch'
    return 'normal'
}

export function getWaitStatus(value: number): OperationalStatus {
    if (value >= thresholds.averageWaitMinutes.critical) return 'critical'
    if (value >= thresholds.averageWaitMinutes.watch) return 'watch'
    return 'normal'
}

export function getUnitStatus(unit: UnitOperations): OperationalStatus {
    const statuses = [
        getOccupancyStatus(unit.occupancyRate),
        getStaffingStatus(unit.staffingCoverageRate),
        getWaitStatus(unit.averageWaitTimeMinutes),
    ]
    if (statuses.includes('critical')) return 'critical'
    if (statuses.includes('watch')) return 'watch'
    return 'normal'
}

export function getOverallStatus(units: UnitOperations[]): OperationalStatus {
    const statuses = units.map(getUnitStatus)
    if (statuses.includes('critical')) return 'critical'
    if (statuses.includes('watch')) return 'watch'
    return 'normal'
}

export function getAverage<T>(items: T[], select: (item: T) => number): number {
    if (items.length === 0) return 0
    return items.reduce((total, item) => total + select(item), 0) / items.length
}

export function getPatientTotal(months: MonthlyClinicalOperations[]): number {
    return months.reduce((total, month) => total + month.patientVolume, 0)
}

export function getHighestWaitUnit(units: UnitOperations[]): UnitOperations | undefined {
    return [...units].sort((first, second) => second.averageWaitTimeMinutes - first.averageWaitTimeMinutes)[0]
}

export function getOperationalSummary(units: UnitOperations[], waitMinutes: number) {
    const highestRisk = [...units].sort((first, second) => {
        const priority = { critical: 2, watch: 1, normal: 0 }
        return priority[getUnitStatus(second)] - priority[getUnitStatus(first)] ||
            second.averageWaitTimeMinutes - first.averageWaitTimeMinutes
    })[0]
    const status = getOverallStatus(units)

    if (!highestRisk) {
        return { status, risk: 'No unit-level data is available.', nextStep: 'Review the next reporting period.' }
    }

    const risk = status === 'normal'
        ? `No unit is above the demonstration thresholds. The highest average wait is ${waitMinutes} minutes.`
        : `${highestRisk.name} is the highest-priority area, with ${highestRisk.occupancyRate}% occupancy and ${highestRisk.staffingCoverageRate}% staffing coverage.`
    const nextStep = status === 'critical'
        ? 'Escalate the capacity and staffing picture to the operations huddle.'
        : status === 'watch'
            ? 'Review staffing allocation and confirm near-term capacity.'
            : 'Monitor the next reporting period.'

    return { status, risk, nextStep }
}

export function getTrendDirection(current: number, previous: number | undefined) {
    if (previous === undefined || current === previous) return 'flat' as const
    return current > previous ? 'up' as const : 'down' as const
}
