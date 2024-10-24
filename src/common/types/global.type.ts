export type GlobalQuery = {
  page: number
  limit: number
  q: string
}

export type JwtPayload = {
  id: string
  email: string
}

export type PayloadAdmin = {
  id: string
  name: string
  email: string
  token: string
  roles: string[]
}
