import { ProductTypes } from 'src/interface/product.interface'

export interface ProductIntialStateType {
	isLoading: boolean
	error: string | null | unknown
	products: ProductTypes[]
	product: ProductTypes | null
}

export interface ProductCreateBodyInterface extends ProductTypes {
	callback: () => void
}

export interface ByIdBodyInterface {
	product_id: string
	callback: () => void
}
