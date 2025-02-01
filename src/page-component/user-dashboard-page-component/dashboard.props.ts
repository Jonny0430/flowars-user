import { ReactNode } from 'react'
import { CardType } from 'src/interface/paymentCart.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { TransactionsType } from 'src/interface/user.interface'

export interface StatsCardProps {
	title: string
	stat: string
	icon: ReactNode
}

export interface TransactionsProps {
	transactions: TransactionsType[]
}

export interface MyProductsProps {
	myProducts: ProductTypes[]
}

export interface SavedCardsProps {
	savedCards: CardType[]
}
