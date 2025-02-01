import { createAsyncThunk } from '@reduxjs/toolkit'
import { BooksType } from 'src/interface/books.interface'
import { ActionBody, DeleteBookBody } from './books.interface'
import { BooksService } from 'src/service/books.service'
import { errorCatch } from 'src/helpers/api.helper'

export const createBooks = createAsyncThunk<BooksType, ActionBody>('books/create', async (body, thunkApi) => {
	try {
		const response = await BooksService.create(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const deleteBooks = createAsyncThunk<BooksType, DeleteBookBody>(`books/delete`, async (body, thunkApi) => {
	try {
		const response = await BooksService.remove(body?.books_id)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const updateBooks = createAsyncThunk<BooksType, ActionBody>(`books/update`, async (body, thunkApi) => {
	try {
		const response = await BooksService.update(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
