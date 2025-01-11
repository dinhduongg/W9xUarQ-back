import { Types } from 'mongoose'
import { convertToRegex } from './regex-search'

export const findWithRegex = (query: string) => {
  return { $regex: convertToRegex(query) }
}

export const isObjectId = (id: string) => {
  return Types.ObjectId.isValid(id)
}
