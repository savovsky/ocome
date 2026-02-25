/**
 * Shared types for API responses, domain models, etc.
 */

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

// Add more shared types here
