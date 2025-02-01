import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'src/helpers/api.helper'
import { ByIdBodyInterface, ProductCreateBodyInterface } from './product.interface'
import { ProductService } from 'src/service/product.service'

export const createProduct = createAsyncThunk<'Success', ProductCreateBodyInterface>(
	'product/create',
	async (body, thunkApi) => {
		try {
			const response = await ProductService.createProduct(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const editProduct = createAsyncThunk<'Success', ProductCreateBodyInterface>(
	'product/edit',
	async (body, thunkApi) => {
		try {
			const response = await ProductService.editProduct(body, body._id as string)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteProduct = createAsyncThunk<'Success', ByIdBodyInterface>(
	'product/delete',
	async (body, thunkApi) => {
		try {
			const response = await ProductService.deleteProduct(body.product_id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const activateProduct = createAsyncThunk<'Success', ByIdBodyInterface>(
	'product/activate',
	async (body, thunkApi) => {
		try {
			const response = await ProductService.activateProduct(body.product_id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const draftProduct = createAsyncThunk<'Success', ByIdBodyInterface>(
	'product/draft',
	async (body, thunkApi)=> {
		try{
			const response = await ProductService.draftProduct(body.product_id)
			body.callback()
			return response
		}catch(error){
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
