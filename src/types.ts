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

export interface StatusAlertEntry {
  id: string
  date: string
  statuses: string[]
  removeWhenSold: boolean
}

export interface Owner {
  id: string
  name: string
  avatar: string
  phone: string
  address: string
}
