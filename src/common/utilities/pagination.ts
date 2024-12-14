export interface PaginationResult<T> {
  data: T[]
  total: number
  limit: number
  page: number
  total_page: number
}

export const pagination = (total: number, page?: number | null, limit?: number) => {
  const total_page = Math.ceil(limit ? +total / +limit : +total / 40)
  const current_page = page !== null ? +page : 1
  const per_page = limit ? +limit : 40
  const skip = page ? (+page - 1) * (limit ? limit : 40) : 0

  return {
    total,
    total_page,
    current_page,
    per_page,
    skip,
  }
}

export async function paginate<T>(
  model: any, // The mongoose model
  limit: number,
  page: number,
  filter: any = {},
  sort: any = {},
): Promise<PaginationResult<T>> {
  const l = limit || 40
  const p = page || 1
  const offset = p > 0 ? (p - 1) * l : 0

  const total = await model.countDocuments(filter).exec()
  const data = await model.find(filter).sort(sort).skip(offset).limit(l).exec()
  const { total_page } = pagination(total, p, l)

  return {
    data,
    total,
    limit: l,
    page: p,
    total_page,
  }
}
