import { AgentType } from 'src/interface/agent.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { UserType } from 'src/interface/user.interface'

export interface AdminIntialStateType {
	isLoading: boolean
	error: string | null | unknown
	products: ProductTypes[]
	agents: AgentType[]
	users: UserType[]
}

export interface ApproveAndDeleteBodyResponse {
	agent_id: string
	callback: () => void
}

export interface AdminUserInterfaceRequest {
	limit: string
	token?: string
}

export interface AdminSearchUsersRequest {
	query: string
	limit: string
}

export interface DeleteProductRequest {
	product_id: string
	callback: () => void
}
