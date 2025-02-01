import axios from 'axios'
import $axios from 'src/api/axios'
import { API_URL, getArticlesUrl } from 'src/config/api.config'
import { ArticleType } from 'src/interface/article.interface'

export const ArticleService = {
	async create(body: ArticleType) {
		const { data } = await $axios.post<ArticleType>(`${getArticlesUrl('create')}`, body)
		

		return data
	},

	async update(body: ArticleType) {
		const { data } = await $axios.patch<ArticleType>(`${getArticlesUrl('update')}/${body._id}`, body)

		return data
	},

	async remove(_id: string) {
		const { data } = await $axios.delete<ArticleType>(`${getArticlesUrl('delete')}/${_id}`)

		return data
	},

	async getArticle() {
		const { data } = await axios.get<ArticleType[]>(`${API_URL}${getArticlesUrl('find-all')}`)

		return data
	},

	async getDetailedArticle(slug?: string) {
		const { data } = await axios.get(`${API_URL}${getArticlesUrl('detailed-article')}/${slug}`)

		return data
	}
}
