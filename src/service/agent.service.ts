import axios from 'axios'
import $axios from 'src/api/axios'
import { API_URL, getAgentUrl } from 'src/config/api.config'
import { ProductTypes } from 'src/interface/product.interface'
import { AgentApplyBody } from 'src/store/agent/agent.interface'

export const AgentService = {
	async applyAgent(body: AgentApplyBody) {
		const response = await axios.post<'Success'>(`${API_URL}${getAgentUrl('apply')}`, body)

		return response.data
	},

	async getAllProduct(token?: string) {
		const response = await axios.get<ProductTypes[]>(`${API_URL}${getAgentUrl('product-all')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	},

	async getDetailedProduct(token?: string, slug?: string) {
		const response = await $axios.get(`${getAgentUrl(`product/${slug}`)}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}
}
