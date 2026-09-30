export type OperationalStatus = 'normal' | 'watch' | 'critical'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type TrendDirection = 'up' | 'down' | 'flat'
export type MetricStatus = OperationalStatus | 'neutral'

export interface UnitOperations {
    id: string
    name: string
    shortName: string
    patientVolume: number
    totalBeds: number
    occupiedBeds: number
    availableBeds: number
    occupancyRate: number
    averageWaitTimeMinutes: number
    staffingRequired: number
    staffingPresent: number
    staffingCoverageRate: number
    status: OperationalStatus
}

export interface MonthlyClinicalOperations {
    id: string
    month: string
    monthShort: string
    monthNumber: number
    patientVolume: number
    admissions: number
    discharges: number
    totalBeds: number
    occupiedBeds: number
    availableBeds: number
    occupancyRate: number
    averageWaitTimeMinutes: number
    edWaitTimeMinutes: number
    staffingRequired: number
    staffingScheduled: number
    staffingPresent: number
    staffingCoverageRate: number
    nurseToPatientRatio: number
    alertCount: number
    criticalAlertCount: number
    units: UnitOperations[]
}

export interface OperationalAlert {
    id: string
    month: string
    severity: AlertSeverity
    unit: string
    category: string
    title: string
    message: string
    recommendedAction: string
    detectedAt: string
}

export interface ClinicalOperationsDataset {
    months: MonthlyClinicalOperations[]
    alerts: OperationalAlert[]
}

export interface MetricCardData {
    title: string
    value: string
    comparisonText: string
    trendDirection: TrendDirection
    status: MetricStatus
    icon: string
    supportingText: string
    accessibleLabel: string
}

export interface DashboardFilters {
    selectedMonth: string | null
}

export interface MonthOption {
    title: string
    value: string | null
}
