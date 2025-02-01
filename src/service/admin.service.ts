import axios from 'axios'
import $axios from 'src/api/axios'
import { API_URL, getAdminUrl, getProductUrl } from 'src/config/api.config'
import { AgentType } from 'src/interface/agent.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { UserType } from 'src/interface/user.interface'

export const AdminService = {
	async getAllProducts() {
		const { data } = await axios.get<ProductTypes[]>(`${API_URL}${getProductUrl('admin-all-products')}`)

		return data
	},
	async getAllAgents(token?: string) {
		const { data } = await axios.get<AgentType[]>(`${API_URL}${getAdminUrl('all-agents')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return data
	},
	async approveAgent(agent_id: string) {
		const { data } = await $axios.put<'Success'>(`${getAdminUrl('approve-agent')}`, {
			agent_id
		})

		return data
	},
	async deleteAgent(agent_id: string) {
		const { data } = await $axios.put<'Success'>(`${getAdminUrl('delete-agent')}`, {
			agent_id
		})

		return data
	},

	async getUsers(limit: string, token?: string) {
		const { data } = await axios.get<UserType[]>(`${API_URL}${getAdminUrl('all-users')}`, {
			params: { limit },
			headers: { Authorization: `Bearer ${token}` }
		})

		return data
	},

	async searchUsers(query: string, limit: string) {
		const { data } = await $axios.get<UserType[]>(`${getAdminUrl('search-users')}`, {
			params: { email: query, limit }
		})

		return data
	},

	async deleteProduct(product_id: string) {
		const { data } = await $axios.delete<ProductTypes[]>(`${getAdminUrl('delete-product')}`, {
			params: { product_id }
		})

		return data
	}
}
