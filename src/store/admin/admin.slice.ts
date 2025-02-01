import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AdminIntialStateType } from './admin.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { AgentType } from 'src/interface/agent.interface'
import { UserType } from 'src/interface/user.interface'
import { approveAgent, deleteAdminProduct, deleteAgent, moreAdminUser, searchAdminUsers } from './admin.action'

const initialState: AdminIntialStateType = {
	isLoading: false,
	error: null,
	products: [],
	agents: [],
	users: []
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		startLoading: state => {
			state.isLoading = true
		},
		clearAdminError: state => {
			state.error = null
		},
		getAdminProducts: (state, action: PayloadAction<ProductTypes[]>) => {
			state.products = action.payload
		},
		getAdminAgents: (state, action: PayloadAction<AgentType[]>) => {
			state.agents = action.payload
		},
		getAdminUsers: (state, action: PayloadAction<UserType[]>) => {
			state.users = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(approveAgent.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(approveAgent.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(approveAgent.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteAgent.pending, state => {
				(state.isLoading = true), (state.error = null)
			})
			.addCase(deleteAgent.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(deleteAgent.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(moreAdminUser.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(moreAdminUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.users = payload
			})
			.addCase(moreAdminUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(searchAdminUsers.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(searchAdminUsers.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.users = payload
			})
			.addCase(searchAdminUsers.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteAdminProduct.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteAdminProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.products = payload
			})
			.addCase(deleteAdminProduct.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})

export const adminReducer = adminSlice.reducer
export const adminSliceAction = adminSlice.actions
