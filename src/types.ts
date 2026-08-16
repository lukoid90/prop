export interface Note {
  id: string
  date: string
  message: string
}

export interface PriceDropAlertEntry {
  id: string
  date: string
  unit: '%' | '$'
  value: number
}
