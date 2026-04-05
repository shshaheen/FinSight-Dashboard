# Finance Dashboard Project Walkthrough

A clean, modern, and responsive Finance Dashboard built with React.js, Tailwind CSS, and Recharts.

## 📁 Project Structure

```text
src/
├── components/          # UI Components
│   ├── SummaryCards.jsx      # Overall stats (Balance, Income, Expenses)
│   ├── BalanceChart.jsx      # Area chart for balance trends
│   ├── CategoryChart.jsx     # Donut chart for spending breakdown
│   ├── TransactionsTable.jsx # Transaction list with CRUD, Search, & Filters
│   ├── RoleSwitcher.jsx      # Toggle between Viewer and Admin roles
│   └── InsightsPanel.jsx     # Data-driven financial observations
├── data/
│   └── mockTransactions.js  # Sample transaction data
├── App.jsx              # Main application entry and state management
├── main.jsx             # React DOM rendering
└── index.css            # Tailwind directives and base styles
```

## 🚀 Key Features

### 1. Dashboard Overview
- **Summary Cards**: Dynamic calculation of total balance, income, and expenses.
- **Balance Trend**: Premium-styled `AreaChart` showing how wealth accumulates or decreases over time.
- **Spending Breakdown**: Donut chart visualizing expenditure across categories (Rent, Food, etc.).

### 2. Transactions Management
- **Table View**: Detailed list of all transactions with type-specific indicators (green/red).
- **Search & Filter**: Real-time searching by category and filtering by transaction type (Income/Expense).
- **Empty States**: Elegant placeholder when no transactions match the current filters.

### 3. Role-Based Access (Simulated)
- **Viewer Role**: View-only mode for dashboard data.
- **Admin Role**: Unlocks management capabilities:
  - **Add Transaction**: Inline animated form to record new incomes or expenses.
  - **Edit Transaction**: Modify existing transaction details.
  - **Delete Transaction**: Instantly remove records from the local state.

### 4. Smart Insights
- Automatically calculates the **Highest Spending Category**.
- Computes **Savings Rate** based on income vs expenses.
- Provides a **Financial Health** status (Positive/Warning) based on monthly performance.

## 🛠️ Tech Stack
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Hooks (`useState`, `useMemo`)

## ⚡ Setup & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the dashboard**:
   Navigate to `http://localhost:5173/` in your browser.
