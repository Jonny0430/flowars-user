import { BooksType } from 'src/interface/books.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { StripeProductsType } from 'src/interface/StripeProductsType'

export interface CartInitialState {
	books: BooksType[]
	products: ProductTypes[]
	stripeProduct: StripeProductsType
}
