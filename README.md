# Clinical Operations Dashboard

A healthcare operations dashboard designed to help clinical leaders identify staffing, patient flow, occupancy, and capacity risks before they impact patient care.

**Live Demo:** [View Dashboard](https://kw-301-dashboard.vercel.app/)

---

# Overview

This project was created for Protogen Capstone 301.

Healthcare leaders are often forced to piece together information from multiple systems, reports, and spreadsheets before they can understand operational performance.

This project explores a different approach:

> A dashboard that prioritizes action over reporting.

Rather than simply displaying metrics, the dashboard is designed to help a Clinical Operations Lead quickly identify developing issues, understand operational context, and determine where attention is needed.

The experience is intentionally focused on the questions an operations leader might ask during a daily operational review:

- How many patients are we serving?
- Are we approaching capacity?
- Are wait times increasing?
- Do we have adequate staffing coverage?
- Which departments require attention?
- What operational risks are emerging?

---

# Problem Statement

Traditional operational reports often require users to:

- Navigate multiple systems
- Compare spreadsheets manually
- Interpret disconnected metrics
- Detect trends on their own

This dashboard aims to reduce that burden by surfacing:

- Key performance indicators
- Operational risks
- Capacity constraints
- Staffing shortages
- Patient flow trends

in a single, actionable view.

---

# Primary User

## Clinical Operations Lead

A Clinical Operations Lead is responsible for coordinating resources, monitoring operational performance, and escalating issues before they affect patients, clinicians, or hospital throughput.

Their goals include:

- Monitoring hospital capacity
- Managing patient flow
- Supporting staffing decisions
- Identifying operational bottlenecks
- Preparing for daily operations meetings

---

# Design Principles

Several principles guided the design of this dashboard.

## 1. Show Me What Needs Attention Now

Every element should answer one of three questions:

1. What is happening?
2. Why is it happening?
3. What should I do next?

---

## 2. Prioritize Actionable Information

Metrics alone are rarely enough.

The dashboard combines:

- KPI summaries
- Trends
- Unit-level performance
- Operational alerts

to help users understand implications, not just numbers.

---

## 3. Reduce Cognitive Load

The dashboard emphasizes:

- Clear visual hierarchy
- Consistent status indicators
- Meaningful trend comparisons
- Plain-language summaries

so users can quickly assess operational conditions.

---

## 4. Accessibility by Design

Accessibility was considered throughout implementation rather than as a final QA step.

The interface is designed to support:

- Keyboard navigation
- Semantic structure
- Screen-reader-friendly content
- Status indicators beyond color alone
- Responsive layouts across devices

---

# Features

## Executive Operational Summary

Provides a concise summary of overall operational status, including:

- Capacity concerns
- Staffing challenges
- Wait-time trends
- Recommended areas of focus

---

## KPI Dashboard

High-level metrics include:

- Patient Volume
- Bed Occupancy
- Average Wait Time
- Staffing Coverage
- Active Alerts

Each KPI supports trend visualization and status indicators.

---

## Capacity & Throughput Monitoring

Visualizes:

- Patient volume trends
- Admissions vs. discharges
- Bed occupancy patterns

These metrics help identify capacity constraints before they become critical.

---

## Wait Time Analysis

Tracks operational performance related to patient flow, including:

- Average wait times
- Department-level comparisons
- Emerging service bottlenecks

---

## Staffing Overview

Provides visibility into workforce readiness through metrics such as:

- Staffing coverage
- Scheduled vs. available staff
- Staffing gaps by department

---

## Unit Status Monitoring

Provides a department-level operational view for:

- Emergency Department
- Intensive Care Unit (ICU)
- Medical-Surgical
- Pediatrics
- Surgical Services

Operational status is categorized as:

- Normal
- Watch
- Critical

---

## Operational Alerts

Highlights areas requiring attention.

Examples include:

- High occupancy
- Staffing shortages
- Elevated wait times
- Operational capacity concerns

---

## Temporal Analysis

Users can:

- View all months
- Analyze specific monthly periods
- Compare trends over time
- Understand seasonal operational patterns

---

# Technology Stack

## Front End

- Vue 3
- TypeScript
- Vite
- Vuetify

## Data Visualization

- Chart.js
- vue-chartjs

## Styling

- Vuetify Design System
- CSS Custom Properties

## Deployment

- Vercel

## Development Environment

- VS Code
- GitHub Copilot

---

# Architecture

```text
src/
├── components/
│   ├── dashboard/
│   ├── charts/
│   ├── alerts/
│   └── metrics/
│
├── composables/
│   └── useDashboardMetrics.ts
│
├── config/
│   └── thresholds.ts
│
├── data/
│   └── clinicalOperations.json
│
├── types/
│   └── dashboard.ts
│
├── utils/
│   ├── chartConfig.ts
│   ├── dashboardCalculations.ts
│   └── formatters.ts
│
├── views/
│   └── DashboardView.vue
│
├── App.vue
└── main.ts
```

---

# Mock Data Strategy

The dashboard uses a fully synthetic dataset to simulate hospital operations.

The dataset includes:

- Monthly patient volume
- Admissions
- Discharges
- Bed utilization
- Staffing metrics
- Wait-time metrics
- Operational alerts

The goal is not to replicate a specific health system but to create realistic operational scenarios that support dashboard design and development.

---

# Synthetic Data Disclaimer

All data displayed in this application is synthetic and intended solely for demonstration purposes.

This project:

- Does not contain real patient information
- Does not contain protected health information (PHI)
- Does not connect to healthcare systems
- Does not provide clinical guidance
- Does not support medical decision-making

Any operational thresholds or recommendations shown are fictional and intended only to demonstrate dashboard functionality.

---

# Accessibility Considerations

The dashboard was designed with accessibility in mind.

Key considerations include:

- Semantic page structure
- Responsive layouts
- Keyboard-accessible controls
- Visible focus states
- Accessible status indicators
- Screen-reader-friendly summaries
- Text alternatives for visual information
- Adequate contrast ratios

Target considerations were aligned with WCAG 2.1 AA principles.

---

# Running Locally

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

---

# Development Approach

This project was built as an experiment in AI-assisted application development.

The workflow combined:

- Product thinking
- UX strategy
- Systems design
- Dashboard best practices
- AI-assisted code generation

A detailed implementation brief was used to guide GitHub Copilot through:

- Project scaffolding
- Architecture decisions
- Data modeling
- Component creation
- Accessibility considerations
- Responsive design
- Documentation

The objective was to determine whether a clearly defined product vision could enable AI tooling to produce a high-quality functional prototype with minimal manual coding.

---

# Future Enhancements

## Executive Narrative Insights

Generate operational summaries such as:

> "ICU occupancy remains elevated while staffing coverage trends downward. Additional monitoring is recommended."

---

## Shift-Based Operations Views

Support:

- Day Shift
- Evening Shift
- Night Shift

to reflect how many healthcare organizations operate.

---

## Forecasting & Trend Analysis

Add:

- Occupancy projections
- Demand forecasting
- Wait-time forecasting
- Staffing predictions

using simple statistical approaches before introducing machine learning.

---

## Scenario Planning

Enable users to model questions such as:

- What happens if staffing drops 10%?
- What happens if admissions increase 15%?
- How does occupancy change if discharge performance improves?

---

## Drill-Down Analytics

Provide department-level detail pages that include:

- Historical trends
- Staffing breakdowns
- Alert history
- Operational notes

---

## Real-Time Data Integration

Potential future integrations:

- Electronic Health Record (EHR) systems
- Bed management platforms
- Workforce management systems
- Operational analytics platforms

These integrations are intentionally out of scope for the MVP.

---

# Key Takeaway

This project demonstrates how thoughtful product strategy, strong UX principles, and modern AI-assisted development workflows can be combined to rapidly create meaningful operational software.

The goal was never to build a dashboard that simply displays data.

The goal was to build a dashboard that helps someone make a better decision faster.

---

# Acknowledgements

This project was created as part of an AI-assisted dashboard design and development exercise focused on healthcare operations.

Special emphasis was placed on:

- User-centered design
- Data-informed decision support
- Accessibility
- Rapid prototyping
- Reusable component architecture
- Responsible use of synthetic healthcare data

It serves as an exploration of how modern AI development tools can accelerate the journey from problem statement to working application while maintaining