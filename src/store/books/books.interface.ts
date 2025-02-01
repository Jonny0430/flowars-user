import { BooksType } from 'src/interface/books.interface'

export interface BooksInitialState {
	isLoading: boolean
	error: null | unknown
	books: BooksType[]
}

export interface ActionBody extends BooksType {
	callback: () => void
}

export interface DeleteBookBody {
	callback: () => void
	books_id: string
}
