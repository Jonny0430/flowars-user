import { BooksType } from 'src/interface/books.interface'
import { ProductTypes } from 'src/interface/product.interface'

export const getTotalPrice = (products: ProductTypes[], books: BooksType[]): number => {
	const booksPrice = books.reduce((total, item) => total + item.price, 0)
	const productsPrice = products.reduce((total, item) => total + item.price, 0)
	const totalPrice = booksPrice + productsPrice

	return totalPrice
}
