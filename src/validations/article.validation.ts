import * as Yup from 'yup'

export const ArticleValidation = {
	createArticles() {
		return Yup.object({
			title: Yup.string().required('Title is required'),
			description: Yup.string().required('Description is required'),
			category: Yup.string().required('Category is required')
		})
	}
}
