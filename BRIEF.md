You are acting as a senior Vue frontend developer and UX-focused dashboard designer.

Build a complete Version 1 MVP of a responsive Clinical Operations Dashboard for a fictional hospital system.

Work directly in the currently open VS Code project folder. You are authorized to create and update project files and run required terminal commands.

Do not only explain what to do. Perform the implementation.

==================================================
1. PROJECT GOAL
==================================================

Create a polished, responsive, single-page healthcare operations dashboard for a Clinical Operations Lead.

The dashboard should help the user quickly answer:

1. What is happening across the hospital right now?
2. Which departments or units require attention?
3. Are patient volume, occupancy, wait times, or staffing trending in the wrong direction?
4. What action should the user consider taking?

The dashboard is a mock prototype only.

It must:

- Use synthetic data only
- Contain no real patient information
- Contain no protected health information
- Make no network requests
- Require no API keys
- Require no paid software, services, fonts, APIs, or libraries
- Run entirely in the browser
- Work after npm install and npm run dev
- Build successfully using npm run build

==================================================
2. REQUIRED TECHNOLOGY
==================================================

Use only free, trusted, open-source packages:

- Vue 3
- Vite
- TypeScript
- Vue Composition API
- Vue single-file components using <script setup lang="ts">
- Vuetify as the UI component framework
- Material Design Icons using @mdi/font
- Chart.js
- vue-chartjs
- Vue Router only if it is already included by the scaffold or needed for the project shell
- CSS custom properties and scoped CSS for small visual refinements

Do not add:

- A backend
- Authentication
- A database
- Axios
- External APIs
- Cloud services
- Paid charting libraries
- Proprietary UI libraries
- Tailwind CSS
- Bootstrap
- Pinia unless state becomes complex enough to clearly justify it
- Map services
- CDN dependencies
- External web fonts
- Analytics or tracking
- AI-generated clinical recommendations

For this single-page MVP, prefer computed properties and component state over adding a global state-management dependency.

==================================================
3. PROJECT SETUP
==================================================

First, inspect the current folder.

If a valid Vue/Vite/Vuetify project already exists:

- Preserve it
- Inspect package.json and the existing source files
- Install only missing dependencies
- Refactor the existing project into the requested dashboard
- Do not create a second nested application directory

If the current folder is empty or does not contain a valid Vue project:

1. Scaffold a Vue and Vuetify project in the current folder.
2. Use TypeScript.
3. Use npm.
4. Do not place the application inside an unnecessary subfolder.

Use the official Vuetify scaffolding command when appropriate:

npm create vuetify@latest .

Choose or configure:

- TypeScript: Yes
- Package manager: npm
- Install dependencies: Yes
- Project type: Vite
- Use the current directory

If the scaffold does not install the required chart libraries, run:

npm install chart.js vue-chartjs @mdi/font

If Vue Router or Vuetify is missing from an existing project, install only the missing package:

npm install vue-router vuetify

If Vuetify needs manual Vite integration, install:

npm install -D vite-plugin-vuetify sass

Before making changes:

- Read package.json
- Read vite.config.ts
- Read src/main.ts
- Read src/App.vue
- Check whether Vuetify is already registered
- Check whether @mdi/font is already imported
- Check whether Chart.js and vue-chartjs are already installed

Do not install duplicate or unnecessary packages.

==================================================
4. PRODUCT REQUIREMENTS
==================================================

Application name:

Clinical Operations Dashboard

Primary user:

Clinical Operations Lead at a fictional hospital system

Primary use case:

A morning operational review that helps the user find developing capacity, flow, and staffing problems without reviewing a spreadsheet.

The initial dashboard should default to “All months.”

The user must be able to select a specific month. When a month is selected:

- All KPI values update
- All charts update or clearly highlight the selected month
- Unit and department details update
- Alerts update
- The operational summary updates
- The chosen filter remains visually obvious

When “All months” is selected:

- KPI cards show annual totals, annual averages, or the most meaningful year-level summary
- Charts show all 12 months
- Unit details show an appropriate aggregate or latest-year summary
- Alerts show a concise set of the most important synthetic operational issues

==================================================
5. MOCK DATA REQUIREMENTS
==================================================

Create:

src/data/clinicalOperations.json

The file must contain synthetic monthly data for January through December 2025.

Each monthly record must contain:

- id
- month
- monthShort
- monthNumber
- patientVolume
- admissions
- discharges
- totalBeds
- occupiedBeds
- availableBeds
- occupancyRate
- averageWaitTimeMinutes
- edWaitTimeMinutes
- staffingRequired
- staffingScheduled
- staffingPresent
- staffingCoverageRate
- nurseToPatientRatio
- alertCount
- criticalAlertCount

Each monthly record must also contain department or unit data for:

- Emergency Department
- Intensive Care Unit
- Medical-Surgical
- Pediatrics
- Surgical Services

Each unit object must include:

- id
- name
- shortName
- patientVolume
- totalBeds
- occupiedBeds
- availableBeds
- occupancyRate
- averageWaitTimeMinutes
- staffingRequired
- staffingPresent
- staffingCoverageRate
- status

Use only these status values:

- normal
- watch
- critical

Generate realistic-looking but entirely fictional values.

Apply these internal consistency rules:

- occupiedBeds must never exceed totalBeds
- availableBeds must equal totalBeds minus occupiedBeds
- occupancyRate must equal occupiedBeds divided by totalBeds, rounded appropriately
- staffingPresent must not exceed staffingScheduled
- staffingCoverageRate must equal staffingPresent divided by staffingRequired
- monthly totals should approximately reconcile with unit-level values
- staffing should generally increase with patient volume
- higher occupancy and lower staffing coverage should generally correspond with longer wait times
- include several normal months, several watch conditions, and a small number of critical conditions
- do not make every metric steadily improve or steadily worsen
- include enough variation to make the charts meaningful

Also create alert data derived from or consistent with the monthly data.

Each alert must contain:

- id
- month
- severity
- unit
- category
- title
- message
- recommendedAction
- detectedAt

Use only these severity values:

- info
- warning
- critical

Recommended actions must be operational and non-clinical, such as:

- Review staffing allocation
- Confirm discharge planning capacity
- Evaluate overflow readiness
- Escalate to the operations huddle
- Monitor the next reporting period

Include a visible disclaimer in the interface and README:

“All data is synthetic and intended for demonstration purposes only. This dashboard does not provide clinical guidance.”

==================================================
6. DASHBOARD INFORMATION ARCHITECTURE
==================================================

Create a single-page dashboard with these sections.

A. APPLICATION HEADER

Use a Vuetify v-app-bar.

Include:

- Hospital Operations
- Page title: Clinical Operations Dashboard
- Month selector
- “Last refreshed” label using a fixed mock timestamp
- Small “Synthetic data” badge

The month selector should include:

- All months
- January through December

Do not use the user’s current system time as live production data.

B. OPERATIONAL SUMMARY

Place a short, plain-language summary immediately below the header.

Example style:

“Occupancy and emergency wait times require attention. ICU occupancy is above target while staffing coverage remains below plan.”

Generate the summary from selected data using deterministic rules.

Do not describe it as AI-generated.

Include:

- Overall operational status
- Most important risk
- One operational next step

C. KPI CARDS

Create a reusable component named:

MetricCard.vue

Display five KPI cards:

1. Patient Volume
2. Bed Occupancy
3. Average Wait Time
4. Staffing Coverage
5. Active Alerts

Each card must support these props:

- title
- value
- comparisonText
- trendDirection
- status
- icon
- supportingText
- accessibleLabel

Trend direction options:

- up
- down
- flat

Status options:

- normal
- watch
- critical
- neutral

Use icons and text in addition to color.

For “All months”:

- Patient Volume: annual total
- Bed Occupancy: average occupancy rate
- Average Wait Time: annual average
- Staffing Coverage: annual average
- Active Alerts: total annual count

For a selected month:

- Show that month’s value
- Show comparison with the previous month when available
- For January, state that no previous-month comparison is available

D. CAPACITY AND PATIENT FLOW

Create:

- Monthly patient volume bar chart
- Admissions versus discharges line chart
- Bed occupancy trend chart with visible 85% and 95% reference levels if Chart.js supports the implementation without adding another dependency

If a month is selected:

- Keep enough context to understand the trend
- Emphasize the selected point or bar
- Do not replace a useful trend chart with a single isolated point

E. WAIT TIMES

Create:

- Monthly average wait-time trend
- Current wait time by unit or department
- Text annotation identifying the highest wait time

F. STAFFING

Create:

- Staffing coverage by unit
- Required staff versus present staff
- Nurse-to-patient ratio summary

Do not imply that the ratio represents a real legal or clinical threshold. Label it as synthetic operational data.

G. UNIT STATUS TABLE

Create a responsive Vuetify data table or accessible card list.

Include:

- Unit
- Patient volume
- Occupied beds
- Available beds
- Occupancy
- Average wait
- Staffing coverage
- Status

Support sorting where practical.

On small screens, preserve readability without horizontal overflow where possible.

H. OPERATIONAL ALERTS

Create an alert panel that shows:

- Severity
- Unit
- Alert title
- Explanation
- Recommended operational action
- Mock detected time

Sort critical alerts first, then warnings, then informational alerts.

When filters produce no alerts, show a helpful empty state.

==================================================
7. THRESHOLDS AND STATUS LOGIC
==================================================

Centralize thresholds in:

src/config/thresholds.ts

Do not scatter unexplained numbers across components.

Use these mock prototype thresholds:

Bed occupancy:
- Normal: below 85%
- Watch: 85% through 94.9%
- Critical: 95% or above

Staffing coverage:
- Normal: 95% or above
- Watch: 85% through 94.9%
- Critical: below 85%

Average wait time:
- Normal: below 30 minutes
- Watch: 30 through 44 minutes
- Critical: 45 minutes or above

Overall status rules:

- Critical if any selected unit has a critical condition
- Watch if there are no critical conditions but at least one watch condition
- Normal otherwise

Add a code comment clearly stating that these thresholds are fictional configuration values for a demonstration and must not be treated as clinical standards.

==================================================
8. REQUIRED FILE STRUCTURE
==================================================

Create or normalize the project to approximately this structure:

src/
  assets/
    styles/
      main.css
  components/
    dashboard/
      DashboardHeader.vue
      DashboardSummary.vue
      MetricCard.vue
      MetricsGrid.vue
      ChartCard.vue
      CapacitySection.vue
      WaitTimesSection.vue
      StaffingSection.vue
      UnitStatusTable.vue
      AlertsPanel.vue
      DashboardEmptyState.vue
  composables/
    useDashboardMetrics.ts
  config/
    thresholds.ts
  data/
    clinicalOperations.json
  plugins/
    vuetify.ts
  types/
    dashboard.ts
  utils/
    dashboardCalculations.ts
    chartConfig.ts
    formatters.ts
  views/
    DashboardView.vue
  App.vue
  main.ts

Also create or update:

- package.json
- package-lock.json
- vite.config.ts
- tsconfig files required by the scaffold
- index.html
- README.md
- .gitignore
- .vscode/extensions.json
- .vscode/settings.json

Do not create empty placeholder files.

Every created file must have a real purpose and valid implementation.

==================================================
9. TYPESCRIPT REQUIREMENTS
==================================================

Create interfaces or types for:

- MonthlyClinicalOperations
- UnitOperations
- OperationalAlert
- MetricCardData
- DashboardFilters
- OperationalStatus
- AlertSeverity
- TrendDirection

Avoid:

- any
- unsafe type assertions
- duplicate interfaces
- untyped chart configuration
- unexplained string literals where a union type is appropriate

Put calculation logic in reusable utility functions or composables rather than embedding all calculations in templates.

==================================================
10. VISUAL DESIGN REQUIREMENTS
==================================================

Create a polished healthcare operations aesthetic.

Use:

- Light neutral page background
- White cards
- Deep blue or teal primary color
- Restrained green, amber, and red status colors
- Consistent border radius
- Subtle elevation
- Clear spacing hierarchy
- Readable typography
- Dense enough for operational use without feeling crowded

Use Vuetify’s responsive grid:

- v-container
- v-row
- v-col

Desktop:
- Five KPI cards across the available space where practical
- Two-column layouts for charts
- Full-width alert and table sections where useful

Tablet:
- Two KPI cards per row where practical
- Charts may stack when space is limited

Mobile:
- One KPI card per row
- Stacked charts
- Accessible filter controls
- No clipped text
- No unusable horizontal scrolling

Use CSS custom properties for project-specific design tokens.

Do not:

- Add gradients unless subtle and justified
- Use decorative illustrations
- Use stock photography
- Add excessive animation
- rely on red and green alone
- use unstyled HTML controls
- use inline styles except for truly calculated chart values
- use !important
- introduce colors outside the defined theme or token system

==================================================
11. ACCESSIBILITY REQUIREMENTS
==================================================

Build accessibility into the MVP rather than treating it as a final cleanup task.

Target WCAG 2.1 AA-aligned implementation practices.

Required:

- Semantic landmarks, including header and main
- Logical heading hierarchy
- Keyboard-accessible filters and interactive controls
- Visible keyboard focus
- Descriptive control labels
- Accessible names for icons and controls
- Status text in addition to color
- Sufficient text and UI contrast
- No information communicated by color alone
- Reduced-motion support
- Responsive text without clipping
- Screen-reader-friendly chart summaries

Every chart must include:

1. A visible chart title
2. A concise supporting description
3. A programmatic text summary or accessible data summary
4. A fallback message if data is unavailable

Treat charts as supplemental. The user must still be able to understand important operational conditions from text, cards, alerts, or tables.

Decorative icons should be hidden from assistive technology.

Informative icons should have accessible labels.

==================================================
12. CHART IMPLEMENTATION
==================================================

Use Chart.js with vue-chartjs.

Register only the required Chart.js components.

Create shared chart configuration helpers in:

src/utils/chartConfig.ts

Charts must:

- Be responsive
- Maintain readable legends
- Use accessible color combinations
- Use tooltips
- Avoid 3D effects
- Avoid excessive gridlines
- Avoid pie or donut charts for values that are easier to compare as bars
- Use whole-number formatting for people and beds
- Use percentage formatting for occupancy and staffing coverage
- Use minute labels for wait times

Destroy or update chart instances correctly through vue-chartjs rather than manually manipulating the DOM.

==================================================
13. DATA AND COMPUTATION BEHAVIOR
==================================================

Create a composable:

src/composables/useDashboardMetrics.ts

It should:

- Import the mock JSON dataset
- Hold the selected month
- Expose month options
- Return filtered data
- Calculate KPI values
- Calculate previous-month comparisons
- Calculate trends
- Calculate overall status
- Produce the operational summary
- Return sorted alerts
- Return data formatted for charts and tables

Avoid duplicating calculations across components.

Test calculations manually during implementation, including:

- Occupancy percentages
- Available beds
- Staffing coverage
- Previous-month changes
- Annual totals and averages
- Alert sorting
- January comparison behavior

==================================================
14. README REQUIREMENTS
==================================================

Create a professional README.md containing:

- Project title
- Product overview
- Primary user
- User problem
- MVP features
- Technology stack
- Prerequisites
- Installation instructions
- Development command
- Production build command
- Preview command
- Folder structure
- Mock data explanation
- Status threshold explanation
- Accessibility approach
- Known limitations
- Future enhancements
- Synthetic-data disclaimer
- Open-source dependency summary

Include these commands:

npm install
npm run dev
npm run build
npm run preview

State clearly:

- No API keys are required
- No external APIs are used
- No real patient data is included
- The application is a demonstration prototype
- Thresholds and recommendations are fictional and not clinical guidance

==================================================
15. VS CODE CONFIGURATION
==================================================

Create:

.vscode/extensions.json

Recommend only trusted extensions required for this project, such as:

- Vue - Official
- ESLint, only if ESLint is configured
- Prettier, only if Prettier is configured

Do not require visual themes or unrelated extensions.

Create:

.vscode/settings.json

Include only practical project settings, such as:

- Format on save
- Default formatter for Vue, TypeScript, JSON, and CSS
- Appropriate Vue language support

Do not modify global user settings.

==================================================
16. QUALITY REQUIREMENTS
==================================================

Before considering the project complete:

1. Install all dependencies.
2. Ensure there are no missing imports.
3. Ensure there are no TypeScript errors.
4. Ensure JSON imports work.
5. Ensure Vuetify styles and icons load.
6. Ensure charts render.
7. Ensure month filtering updates every dashboard section.
8. Ensure the dashboard works at desktop, tablet, and mobile widths.
9. Ensure there are no obvious browser console errors.
10. Run the production build.
11. Fix all errors caused by the implementation.
12. Review the final file structure.
13. Remove unused scaffold components, sample assets, and placeholder content.
14. Verify that no real data, secrets, tokens, or API keys exist.
15. Verify that the project does not make network calls.

Run:

npm run build

If a type-check script exists, also run:

npm run type-check

If linting is configured, run:

npm run lint

Do not claim success unless the relevant command completes successfully.

==================================================
17. DEFINITION OF DONE
==================================================

The MVP is complete only when:

- The project launches using npm run dev
- The production build passes
- The dashboard uses Vue, TypeScript, Vuetify, Chart.js, and vue-chartjs
- All data is loaded locally from synthetic JSON
- All 12 months are represented
- “All months” is the default filter
- Month filtering works across cards, charts, table, summary, and alerts
- Five KPI cards are visible
- Capacity, flow, wait-time, and staffing visualizations are present
- A unit status table is present
- An actionable alert panel is present
- Status is never conveyed through color alone
- The layout is responsive
- Core interactions are keyboard accessible
- No API key is required
- No external API request is made
- No real patient information is present
- README.md contains complete setup and usage instructions
- Unused starter files have been removed
- The interface looks polished enough for an MVP demonstration

==================================================
18. IMPLEMENTATION WORKFLOW
==================================================

Perform the work in this order:

1. Inspect the existing project and package configuration.
2. Scaffold only if necessary.
3. Install missing dependencies.
4. Configure Vuetify, Material Design Icons, and Chart.js.
5. Create TypeScript data models.
6. Create the synthetic JSON dataset.
7. Create thresholds and calculation helpers.
8. Create the dashboard composable.
9. Build the application shell.
10. Build reusable components.
11. Connect filters and computed data.
12. Add responsive styling.
13. Add accessibility labels and text summaries.
14. Write the README.
15. Run type checking and the production build.
16. Fix issues.
17. Provide a concise completion summary.

At completion, report:

- Terminal commands executed
- Dependencies installed
- Files created
- Files updated
- Features completed
- Accessibility measures included
- Build and type-check results
- Any remaining known limitations

Do not stop after scaffolding.
Do not leave TODO comments for required MVP behavior.
Do not provide pseudocode instead of implementation.
Do not replace files that are already correct without a reason.
Do not expose or use confidential, client, hospital, or patient data.