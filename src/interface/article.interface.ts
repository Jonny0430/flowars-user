import { AuthorType } from './product.interface'

export interface ArticleType {
	createdAt?: Date | undefined
	_id?: string
	image?: string
	slug?: string
	title?: string
	author?: AuthorType | null
	description?: string
	category?: string
}
