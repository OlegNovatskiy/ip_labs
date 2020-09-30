export interface Car {
  article: number
  brand: string
  model: string
  year: number
  price: number
}

export interface Order {
  car: Car | null
  firstName: string
  lastName: string
  birthYear: number
}
