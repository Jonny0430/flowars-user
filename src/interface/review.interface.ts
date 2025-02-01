import { UserType } from './user.interface'

export interface ReviewType {
	author: UserType
	createdAt: Date
	updatedAt: Date
	rating: number
	summary: string
}
