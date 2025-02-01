import { BooksType } from 'src/interface/books.interface'

export interface BookModalProps {
	isOpen: boolean
	onClose: () => void
	booksValue: BooksType | null
}
