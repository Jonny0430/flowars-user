import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartInitialState } from './cart.interface'
import { BooksType } from 'src/interface/books.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { StripeProductsType } from 'src/interface/StripeProductsType'

const initialState: CartInitialState = {
	books: [],
	products: [],
	stripeProduct: {} as StripeProductsType
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addBookToCart: (state, { payload }: PayloadAction<BooksType>) => {
			state.books = [...state.books, payload]
		},
		addProductCart: (state, { payload }: PayloadAction<ProductTypes>) => {
			state.products = [...state.products, payload]
		},
		editProductCart: (state, { payload }: PayloadAction<ProductTypes[]>) => {
			state.products = payload
		},
		editBooksCart: (state, { payload }: PayloadAction<BooksType[]>) => {
			state.books = payload
		},
		addStripeProductCart: (state, { payload }: PayloadAction<StripeProductsType>) => {
			state.stripeProduct = payload
		},
		removeBookFromCart: (state, { payload }: PayloadAction<string>) => {
			const newArr = state.books.filter(c => c._id !== payload)
			state.books = newArr
		},
		removeProductFromCart: (state, { payload }: PayloadAction<string>) => {
			const newArr = state.products.filter(c => c._id !== payload)
			state.products = newArr
		}
	}
})

export const cartReducer = cartSlice.reducer
export const cartSliceAction = cartSlice.actions
