import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	AdminSearchUsersRequest,
	AdminUserInterfaceRequest,
	ApproveAndDeleteBodyResponse,
	DeleteProductRequest
} from './admin.interface'
import { errorCatch } from 'src/helpers/api.helper'
import { AdminService } from 'src/service/admin.service'
import { UserType } from 'src/interface/user.interface'
import { ProductTypes } from 'src/interface/product.interface'

export const approveAgent = createAsyncThunk<'Success', ApproveAndDeleteBodyResponse>(
	'admin/approve-agent',
	async (body, thunkApi) => {
		try {
			const response = await AdminService.approveAgent(body.agent_id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteAgent = createAsyncThunk<'Success', ApproveAndDeleteBodyResponse>(
	'admin/delete-agent',
	async (body, thunkApi) => {
		try {
			const response = await AdminService.deleteAgent(body.agent_id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const moreAdminUser = createAsyncThunk<UserType[], AdminUserInterfaceRequest>(
	'admin/all-users',
	async (body, thunkApi) => {
		try {
			const response = await AdminService.getUsers(body.limit, body.token)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const searchAdminUsers = createAsyncThunk<UserType[], AdminSearchUsersRequest>(
	'admin/search-users',
	async (body, thunkApi) => {
		try {
			const response = await AdminService.searchUsers(body.query, body.limit)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteAdminProduct = createAsyncThunk<ProductTypes[], DeleteProductRequest>(
	'admin/delete-product',
	async (body, thunkApi) => {
		try {
			const response = await AdminService.deleteProduct(body.product_id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
