import { Types } from 'mongoose'

export const findWithRegex = (query: string) => {
  return { $regex: query, $options: 'i' }
}

export const isObjectId = (id: string) => {
  return Types.ObjectId.isValid(id)
}
