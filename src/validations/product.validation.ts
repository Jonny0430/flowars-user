import * as Yup from 'yup'

interface Props {
	productName: string
	availability: string[]
	species: string[]
	color: string[]
	requirements: string[]
	description: string
	location: string[]
	category: string[]
	price: number[]
	gender: string[]
	age: string
}

export const manageProductValues: Props = {
	productName: '',
	availability: [],
	species: [],
	color: [],
	requirements: [],
	description: '',
	location: [],
	category: [],
	price: [],
	gender: [],
	age: ''
}

export const CourseValidation = {
	manageCourseValues() {
		return {
			productName: '',
			availability: [],
			species: [],
			color: [],
			requirements: [],
			description: '',
			location: [],
			category: [],
			price: [],
			gender: [],
			age: ''
		}
	},
	create() {
		return Yup.object({
			productName: Yup.string().min(2, 'ProductName should be minimum 2 character').required('Title is required'),
			availability: Yup.string().required('Availability is required'),
			species: Yup.string(),
			color: Yup.array().required('Color is required'),
			requirements: Yup.array().required('Requirements is required'),
			description: Yup.string()
				.min(10, 'Description should be minimum 10 characters')
				.required('Description is required'),
			location: Yup.string().required('Location is required'),
			category: Yup.string().required('Category is required'),
			price: Yup.string().required('Price is required'),
			age: Yup.string(),
			gender: Yup.string().required('Availability is required')
		})
	}
}
