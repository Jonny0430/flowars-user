export interface ProductType {
	productName: string // Mahsulot nomi
	species: string // Hayvon turi (masalan, it, mushuk)
	age: string // Hayvonning yoshi
	gender: string // Hayvonning jinsi
	description: string // Mahsulotning batafsil tavsifi
	price: number // Mahsulotning narxi
	image?: string // Mahsulot rasmlari URL'lari
	availability: [] // Mahsulot mavjudligi
	color: string[] // Mahsulotning rangi
	requirements: string[]
	location: [] // Mahsulot joylashuvi
	category: [] // Mahsulotning kategoriyasi

}

export interface Author {
	firstName: string
	lastName: string
	avatar: string
}

export interface ProductTypes {
	productName?: string // Mahsulot nomi
	species?: string // Hayvon turi (masalan, it, mushuk)
	age?: string // Hayvonning yoshi
	gender?: string // Hayvonning jinsi
	description?: string // Mahsulotning batafsil tavsifi
	price: number // Mahsulotning narxi
	image?: string // Mahsulot rasmlari URL'lari
	availability?: string // Mahsulot mavjudligi
	color?: string[] // Mahsulotning rangi
	requirements?: string[]
	location: string // Mahsulot joylashuvi
	category: string // Mahsulotning kategoriyasi
	slug?: string
	isActive?: boolean
	updatedAt?: Date
	_id?: string
	author?: AuthorType
	reviewAvg: number
	allClients?: number
	reviewCount?: number
}

export interface AuthorType {
	fullName: string
	avatar: string
	email: string
	role: string
	bio: string
	_id: string
}
