import axios from 'axios'
import $axios from 'src/api/axios'
import { API_URL, getProductUrl, getReviewUrl } from 'src/config/api.config'
import { ProductTypes } from 'src/interface/product.interface'

export const ProductService = {
	async createProduct(body: ProductTypes) {
		const response = await $axios.post(`${getProductUrl('create')}`, body)

		return response.data
	},

	async editProduct(body: ProductTypes, _id: string) {
		const response = await $axios.patch(`${getProductUrl('edit')}/${_id}`, body)

		return response.data
	},

	async deleteProduct(productId: string) {
		const response = await $axios.delete(`${getProductUrl('delete')}/${productId}`)

		return response.data
	},

	async activateProduct(productId: string) {
		const response = await $axios.put(`${getProductUrl('activate')}/${productId}`)

		return response.data
	},

	async draftProduct(productId: string) {
		const response = await $axios.put(`${getProductUrl('draft')}/${productId}`)

		return response.data
	},

	async createReview(data) {
		const response = await $axios.post(`${getReviewUrl('create')}`, data)

		return response.data
	},

	async editReview(data, reviewId: string) {
		const response = await axios.put(`${API_URL}${getReviewUrl('edit')}/${reviewId}`, data)

		return response.data
	},

	async getReviewByUser(data) {
		const response = await axios.post(`${API_URL}${getReviewUrl('get-by-user')}`, data)

		return response.data
	},

	async getReviews(productId) {
		const response = await axios.get(`${API_URL}${getReviewUrl('get')}/${productId}`)
		return response.data
	}
}
