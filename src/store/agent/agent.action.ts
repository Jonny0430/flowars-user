import { createAsyncThunk } from '@reduxjs/toolkit'
import { AgentApplyBody } from './agent.interface'
import { errorCatch } from 'src/helpers/api.helper'
import { AgentService } from 'src/service/agent.service'

export const applyAgent = createAsyncThunk<'Success', AgentApplyBody>('agent/apply', async (body, thunkApi) => {
	try {
		const response = await AgentService.applyAgent(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
