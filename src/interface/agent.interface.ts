import { UserType } from './user.interface'

export interface AgentType {
	_id: string
	fullName: string
	avatar?: string
	totalProduct?: number
	clientCount?: number
	socialMedia?: string
	author: UserType
	approved: boolean
}
