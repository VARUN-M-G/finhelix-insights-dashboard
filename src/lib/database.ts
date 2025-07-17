import { Client } from 'pg';

// Database configuration
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'financials_db',
  user: 'app_user',
  password: 'admin@123',
};

// Create a client instance
export const dbClient = new Client(dbConfig);

// Connect to the database
export const connectToDatabase = async () => {
  try {
    await dbClient.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Database query helper
export const query = async (text: string, params?: any[]) => {
  try {
    const result = await dbClient.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Types for database entities
export interface Company {
  id: number;
  name: string;
}

export interface Period {
  id: number;
  company_id: number;
  year: number;
  quarter: string;
  start_date?: string;
  end_date?: string;
}

export interface IncomeStatement {
  id: number;
  period_id: number;
  total_revenue: number;
  product_revenue: number;
  service_revenue: number;
  other_revenue: number;
  total_cost_of_revenue: number;
  cost_of_goods_sold: number;
  cost_of_services: number;
  gross_profit: number;
  research_and_development: number;
  sales_and_marketing: number;
  general_and_administrative: number;
  other_operating_expenses: number;
  operating_income: number;
  interest_income: number;
  interest_expense: number;
  other_income: number;
  other_expense: number;
  income_before_taxes: number;
  income_tax_expense: number;
  net_income: number;
  basic_eps: number;
  diluted_eps: number;
  basic_shares: number;
  diluted_shares: number;
}

export interface CashFlowStatement {
  id: number;
  period_id: number;
  operating_cash_flow: number;
  investing_cash_flow: number;
  financing_cash_flow: number;
  net_cash_flow: number;
}

export interface BalanceSheet {
  id: number;
  period_id: number;
  total_assets: number;
  total_liabilities: number;
  total_equity: number;
  current_assets: number;
  current_liabilities: number;
  inventory: number;
  receivables: number;
  payables: number;
  cash_and_equivalents: number;
  other_assets: number;
  other_liabilities: number;
}

export interface Metrics {
  id: number;
  period_id: number;
  revenue_growth_qoq: number;
  revenue_growth_yoy: number;
  ebitda_margin: number;
  debt_service_coverage: number;
  dso: number;
  inventory_turns: number;
  working_capital_ratio: number;
  notes?: string;
}

// Database queries for financial data
export const getCompanies = async (): Promise<Company[]> => {
  return await query('SELECT * FROM companies ORDER BY name');
};

export const getRevenueGrowth = async (companyId?: number) => {
  const sql = `
    SELECT 
      c.name as company_name,
      p.year,
      p.quarter,
      i.total_revenue,
      LAG(i.total_revenue) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter) AS prev_quarter_revenue,
      LAG(i.total_revenue, 4) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter) AS prev_year_revenue,
      CASE 
        WHEN LAG(i.total_revenue) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter) IS NOT NULL 
        THEN ((i.total_revenue - LAG(i.total_revenue) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter)) / LAG(i.total_revenue) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter)) * 100
        ELSE NULL
      END AS revenue_growth_qoq,
      CASE 
        WHEN LAG(i.total_revenue, 4) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter) IS NOT NULL 
        THEN ((i.total_revenue - LAG(i.total_revenue, 4) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter)) / LAG(i.total_revenue, 4) OVER (PARTITION BY p.company_id ORDER BY p.year, p.quarter)) * 100
        ELSE NULL
      END AS revenue_growth_yoy
    FROM periods p
    JOIN companies c ON p.company_id = c.id
    JOIN income_statements i ON p.id = i.period_id
    ${companyId ? 'WHERE p.company_id = $1' : ''}
    ORDER BY p.year, p.quarter
  `;
  return await query(sql, companyId ? [companyId] : []);
};

export const getEbitdaMargins = async (companyId?: number) => {
  const sql = `
    SELECT 
      c.name as company_name,
      p.year,
      p.quarter,
      i.total_revenue,
      i.operating_income as ebitda,
      CASE 
        WHEN i.total_revenue > 0 
        THEN (i.operating_income / i.total_revenue) * 100
        ELSE NULL
      END AS ebitda_margin_percent
    FROM periods p
    JOIN companies c ON p.company_id = c.id
    JOIN income_statements i ON p.id = i.period_id
    ${companyId ? 'WHERE p.company_id = $1' : ''}
    WHERE i.total_revenue IS NOT NULL
    ORDER BY p.year, p.quarter
  `;
  return await query(sql, companyId ? [companyId] : []);
};

export const getCashFlowAnalysis = async (companyId?: number) => {
  const sql = `
    SELECT 
      c.name as company_name,
      p.year,
      p.quarter,
      cf.operating_cash_flow,
      cf.investing_cash_flow,
      cf.financing_cash_flow,
      cf.net_cash_flow,
      (cf.operating_cash_flow + cf.investing_cash_flow) as free_cash_flow
    FROM periods p
    JOIN companies c ON p.company_id = c.id
    JOIN cash_flow_statements cf ON p.id = cf.period_id
    ${companyId ? 'WHERE p.company_id = $1' : ''}
    ORDER BY p.year, p.quarter
  `;
  return await query(sql, companyId ? [companyId] : []);
};

export const getWorkingCapitalMetrics = async (companyId?: number) => {
  const sql = `
    SELECT 
      c.name as company_name,
      p.year,
      p.quarter,
      bs.current_assets,
      bs.current_liabilities,
      bs.inventory,
      bs.receivables,
      bs.payables,
      (bs.current_assets - bs.current_liabilities) as working_capital,
      CASE 
        WHEN bs.current_liabilities > 0 
        THEN bs.current_assets / bs.current_liabilities
        ELSE NULL
      END as current_ratio,
      CASE 
        WHEN i.total_revenue > 0 
        THEN (bs.receivables / i.total_revenue) * 365
        ELSE NULL
      END as days_sales_outstanding
    FROM periods p
    JOIN companies c ON p.company_id = c.id
    JOIN balance_sheets bs ON p.id = bs.period_id
    LEFT JOIN income_statements i ON p.id = i.period_id
    ${companyId ? 'WHERE p.company_id = $1' : ''}
    ORDER BY p.year, p.quarter
  `;
  return await query(sql, companyId ? [companyId] : []);
};

export const getDashboardMetrics = async () => {
  const sql = `
    SELECT 
      c.name as company_name,
      p.year,
      p.quarter,
      i.total_revenue,
      i.operating_income,
      cf.operating_cash_flow,
      cf.net_cash_flow,
      bs.current_assets,
      bs.current_liabilities,
      bs.total_assets,
      bs.total_liabilities,
      CASE 
        WHEN i.total_revenue > 0 
        THEN (i.operating_income / i.total_revenue) * 100
        ELSE NULL
      END AS ebitda_margin,
      CASE 
        WHEN bs.current_liabilities > 0 
        THEN bs.current_assets / bs.current_liabilities
        ELSE NULL
      END as current_ratio
    FROM periods p
    JOIN companies c ON p.company_id = c.id
    JOIN income_statements i ON p.id = i.period_id
    JOIN cash_flow_statements cf ON p.id = cf.period_id
    JOIN balance_sheets bs ON p.id = bs.period_id
    WHERE p.year = 2024 AND p.quarter = 'Q4'
    ORDER BY c.name
  `;
  return await query(sql);
};

// Initialize database connection
connectToDatabase().catch(console.error);