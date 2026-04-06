# FinSight Intelligence Dashboard

FinSight is a high-performance, modern financial management dashboard built with **React.js**, **Tailwind CSS**, and **Recharts**. It features a premium glassmorphism design system, real-time data visualization, and role-based access controls.

## ✨ Key Features

- **Glassmorphism UI**: A stunning, frosted-glass interface with backdrop blurs and smooth micro-interactions.
- **Dynamic Visualizations**: 
  - **Balance Trend**: Interactive area chart showing your running balance over time.
  - **Spending Breakdown**: Animated pie chart with custom tooltips and dynamic category coloring.
- **Transaction Management**:
  - Full CRUD operations (Add, Edit, Delete).
  - Search and Category filtering.
  - **CSV Export**: One-click functionality to download all transaction data.
  - **Auto-Generated Category Colors**: Unique, consistent color badges for any category you create.
- **Role-Based Access**: Specialized views for **Admin** (Full CRUD) and **Viewer** (Read-only) roles.
- **Financial Insights**: Smart analysis panel that calculates savings rates and identifies high-spending areas.
- **Responsive Theme**: Full support for Dark and Light modes with persistent state.

## 📁 Project Structure

```text
FinSight-Dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BalanceChart.jsx      # Balance trend visualization
│   │   ├── CategoryChart.jsx     # Spending pie chart
│   │   ├── SummaryCards.jsx      # Top-level KPI cards
│   │   ├── TransactionsTable.jsx # CRUD table & Export logic
│   │   ├── InsightsPanel.jsx     # Strategic data analysis
│   │   └── RoleSwitcher.jsx      # Role toggle component
│   ├── data/
│   │   └── mockTransactions.js   # Initial dataset & category config
│   ├── utils.js            # Tailwind merge & Color hashing logic
│   ├── App.jsx             # Main application & State orchestrator
│   ├── index.css           # Global glassmorphism design system
│   └── main.jsx            # Entry point
├── tailwind.config.js      # Custom theme & animation tokens
└── package.json            # Dependencies & Scripts
```

## 🚀 Installation & Setup

Follow these steps to get the project running locally on your machine:

### 1. Prerequisite
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd "FinSight Dashboard"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### 5. Build for Production
```bash
npm run build
```

---
**Built for Zorvyn Frontend Assignment**
© 2026 FinSight Dashboard
