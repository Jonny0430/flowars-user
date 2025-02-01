import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticlesInitialState } from './articles.interface'
import { ArticleType } from 'src/interface/article.interface'
import { createArticles, deleteArticles, updateArticles } from './articles.action'

const initialState: ArticlesInitialState = {
	isLoading: false,
	error: null,
	articles: [],
	article: null
}

export const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		clearArticlesError: state => {
			state.error = null
		},
		startCreateArticlesLoading: state => {
			state.isLoading = true
		},
		getArticles: (state, action: PayloadAction<ArticleType[]>) => {
			state.articles = action.payload
		},
		getArticle: (state, action: PayloadAction<ArticleType>) => {
			state.article = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(createArticles.pending, state => {
				(state.isLoading = true), (state.error = null)
			})
			.addCase(createArticles.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.articles = [...state.articles, payload]
			})
			.addCase(createArticles.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteArticles.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteArticles.fulfilled, (state, { payload }) => {
				state.isLoading = false
				const newArr = state.articles.filter(c => c._id !== payload._id)
				state.articles = newArr
				state.error = null
			})
			.addCase(deleteArticles.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(updateArticles.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateArticles.fulfilled, (state, { payload }) => {
				state.isLoading = false
				const newArr = state.articles.map(item => {
					if (item._id === payload._id) {
						return payload
					}
					return item
				})
				state.articles = newArr
				state.error = null
			})
			.addCase(updateArticles.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})

export const articlesReducer = articlesSlice.reducer
export const articlesSliceAction = articlesSlice.actions
