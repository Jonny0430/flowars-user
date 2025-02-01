import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleType } from 'src/interface/article.interface'
import { ActionBody, DeleteArticleBody } from './articles.interface'
import { ArticleService } from 'src/service/article.service'
import { errorCatch } from 'src/helpers/api.helper'

export const createArticles = createAsyncThunk<ArticleType, ActionBody>(`article/create`, async (body, thunkApi) => {
	try {
		const response = await ArticleService.create(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const deleteArticles = createAsyncThunk<ArticleType, DeleteArticleBody>(
	`articles/delete`,
	async (body, thunkApi) => {
		try {
			const response = await ArticleService.remove(body?.articleId)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const updateArticles = createAsyncThunk<ArticleType, ActionBody>(`articles/update`, async (body, thunkApi) => {
	try {
		const response = await ArticleService.update(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
