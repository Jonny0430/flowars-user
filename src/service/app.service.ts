import axios from 'axios'
import { API_URL, getAgentUrl, getArticlesUrl, getBooksUrl, getProductUrl } from 'src/config/api.config'
import { BooksType } from 'src/interface/books.interface'

export const AppService = {
	async getMainPageSourse() {
		const { data: products } = await axios.get(`${API_URL}${getProductUrl('all')}`)

		const { data: agents } = await axios.get(`${API_URL}${getAgentUrl('all')}`)

		const { data: articles } = await axios.get(`${API_URL}${getArticlesUrl('find-all')}`)

		const { data: books } = await axios.get<BooksType[]>(`${API_URL}${getBooksUrl('find-all')}`)

		console.log(`Products: ${products}`,  `Agents: ${agents}` , `Articles: ${articles}`)


		return { products, agents, articles, books }
	},

	async getProducts() {
		const { data: products } = await axios.get(`${API_URL}${getProductUrl('all')}`)

		return products
	},

	async getDetailedProduct(slug?: string) {
		const {data} = await axios.get(
			`${API_URL}${getProductUrl('detailed-product')}/${slug}`
		)

		return data

	}

	
}
