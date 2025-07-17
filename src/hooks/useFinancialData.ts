import { useState, useEffect } from 'react'
import { 
  getDashboardMetrics, 
  getRevenueGrowth, 
  getEbitdaMargins, 
  getCashFlowAnalysis,
  getWorkingCapitalMetrics,
  getCompanies 
} from '@/lib/database'

export function useDashboardMetrics() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getDashboardMetrics()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useRevenueGrowth(companyId?: number) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getRevenueGrowth(companyId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch revenue data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [companyId])

  return { data, loading, error }
}

export function useEbitdaMargins(companyId?: number) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getEbitdaMargins(companyId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch EBITDA data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [companyId])

  return { data, loading, error }
}

export function useCashFlowAnalysis(companyId?: number) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getCashFlowAnalysis(companyId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cash flow data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [companyId])

  return { data, loading, error }
}

export function useWorkingCapitalMetrics(companyId?: number) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getWorkingCapitalMetrics(companyId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch working capital data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [companyId])

  return { data, loading, error }
}

export function useCompanies() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getCompanies()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch companies')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}