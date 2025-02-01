import { AgentType } from 'src/interface/agent.interface'
import { ProductTypes } from 'src/interface/product.interface'

export interface AgentIntialStateType {
	isLoading: boolean
	error: string | null | unknown
	products: ProductTypes[]
	product: ProductTypes | null
	agents: AgentType[]
}

export interface AgentApplyBody {
	firstName: string
	lastName: string
	email: string
	socialMedia: string
	callback: () => void
}
