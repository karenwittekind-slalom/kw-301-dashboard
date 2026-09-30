# Clinical Operations Dashboard

A responsive, single-page dashboard prototype for a Clinical Operations Lead reviewing capacity, patient flow, wait times, staffing, unit status, and operational alerts.

## Product Overview

**Primary user:** Clinical Operations Lead at a fictional hospital system.

**Problem:** Identify emerging system-wide and unit-level capacity or staffing pressure quickly, without reviewing a spreadsheet.

**MVP features:** Twelve-month filtering; five operational KPIs; monthly patient-volume, flow, occupancy, and wait-time charts; unit wait and staffing comparisons; sortable unit status; prioritized alerts; deterministic operational summary; accessible mobile layouts.

## Technology

- Vue 3 Composition API, TypeScript, and Vite
- Vuetify 4 and Material Design Icons (`@mdi/font`)
- Chart.js and `vue-chartjs`
- Local JSON fixtures only

Dependencies are open-source and free to use. No paid services or libraries are required.

## Requirements and Setup

Prerequisites: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Use the local URL printed by Vite. Production build and local preview:

```bash
npm run build
npm run preview
```

TypeScript validation is included in `npm run build`; it can also be run alone with `npm run type-check`.

No API keys are required. No external APIs are used, and the application makes no runtime network requests. No real patient data is included.

## Mock Data and Thresholds

`src/data/clinicalOperations.json` contains synthetic monthly system and unit snapshots for January through December 2025, plus matching operational alerts. Values are fictional and designed to exercise trend, status, and filter behavior; they are not operational measurements.

Occupancy, staffing coverage, and wait-time thresholds are centralized in `src/config/thresholds.ts`. The thresholds and recommended actions are fictional demonstration configuration, not clinical, legal, or staffing standards. Recommendations are non-clinical operational prompts only.

The dashboard defaults to All months. Annual KPIs use totals or monthly averages as appropriate, charts preserve the full-year trend and emphasize a selected month, and unit detail uses the latest 2025 snapshot.

## Accessibility

The interface uses semantic header/main landmarks, a logical heading structure, labeled keyboard-accessible month and sort controls, visible focus indicators, text labels in addition to status color, responsive unit cards, reduced-motion support, and visible plus screen-reader chart summaries. Charts supplement rather than replace the table, KPIs, and alerts.

## Project Structure

```text
src/
	assets/styles/main.css
	components/dashboard/   Reusable dashboard sections and cards
	composables/             Shared filtering and KPI calculations
	config/                  Fictional demonstration thresholds
	data/                    Local synthetic JSON dataset
	plugins/                 Vuetify and MDI setup
	types/                   Dashboard data contracts
	utils/                   Calculations, formatters, chart setup
	views/                   Dashboard page
```

## Limitations and Future Enhancements

This is a static demonstration prototype with a fixed refresh timestamp and no backend, authentication, live data, persistence, or export workflow. All values and alerts are synthetic. Future work could add validated fixture loading, date-range selection, exportable operational summaries, and additional usability testing; any live-data integration would require separate security, privacy, and clinical governance review.

**All data is synthetic and intended for demonstration purposes only. This dashboard does not provide clinical guidance.**
