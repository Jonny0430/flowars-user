import { ProductTypes } from 'src/interface/product.interface'

export interface InstructorManageCourseProps {
	titleBtn: string
	submitHandler: (data: ProductTypes) => void
	productValues?: ProductTypes | null
}

export interface SubmitValuesInterface {
	productName: string // Mahsulot nomi
	species: string // Hayvon turi (masalan, it, mushuk)
	age: string // Hayvonning yoshi
	gender: string // Hayvonning jinsi
	description: string // Mahsulotning batafsil tavsifi
	price: number // Mahsulotning narxi
	image?: string // Mahsulot rasmlari URL'lari
	availability: string // Mahsulot mavjudligi
	color: string[] // Mahsulotning rangi
	requirements: string[]
	location: string // Mahsulot joylashuvi
	category: string // Mahsulotning kategoriyasi
	slug?: string
	isActive: boolean
	_id: string
}
