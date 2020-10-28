export interface Pill {
  id: number
  category: number
  name: string
  count: number
  price: number
  lastModifiedAt?: string
}

export interface BasketItem {
  pillId: number
  count: number
}

export interface OrderItem {
  pillId: number
  count: number
  price: number
  sum: number
}

export interface Order {
  sum: number
  items: OrderItem[]
}

export interface PillForm {
  id: number | null
  category: number | null
  name: string | null
  count: number | null
  price: number | null
}

export interface Category {
  id: number
  name: string
}
