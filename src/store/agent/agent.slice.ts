import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AgentIntialStateType } from './agent.interface'
import { applyAgent } from './agent.action'
import { ProductTypes } from 'src/interface/product.interface'
import { AgentType } from 'src/interface/agent.interface'

const initialState: AgentIntialStateType = {
	isLoading: false,
	error: null,
	products: [],
	product: null,
	agents: []
}

export const agentSlice = createSlice({
	name: 'agent',
	initialState,
	reducers: {
		clearAgentError: state => {
			state.error = null
		},
		agentAllProducts: (state, action: PayloadAction<ProductTypes[]>) => {
			state.products = action.payload
		},
		agentDetailedProduct: (state, action: PayloadAction<ProductTypes>) => {
			state.product = action.payload
		},
		getAgents: (state, action: PayloadAction<AgentType[]>) => {
			state.agents = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(applyAgent.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(applyAgent.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(applyAgent.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})

export const agentReducer = agentSlice.reducer
export const agentSliceAction = agentSlice.actions
