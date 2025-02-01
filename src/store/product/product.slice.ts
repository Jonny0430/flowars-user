import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { activateProduct, createProduct, deleteProduct, draftProduct, editProduct } from './product.action'
import { ProductIntialStateType } from './product.interface'
import { ProductTypes } from 'src/interface/product.interface'

const initialState: ProductIntialStateType = {
	isLoading: false,
	error: null,
	products: [],
	product: null
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		startLoading: state => {
			state.isLoading = true
		},
		clearProductError: state => {
			state.error = null
		},
		getProducts: (state, action: PayloadAction<ProductTypes[]>) => {
			state.products = action.payload
		},
		getProduct: (state, action: PayloadAction<ProductTypes>) => {
			state.product = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(createProduct.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createProduct.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(createProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(editProduct.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(editProduct.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(editProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteProduct.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(deleteProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(activateProduct.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(activateProduct.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(activateProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(draftProduct.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(draftProduct.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(draftProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})

export const productReducer = productSlice.reducer
export const productSliceAction = productSlice.actions
