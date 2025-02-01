import { ReactNode } from 'react'
import { AgentType } from 'src/interface/agent.interface'
import { ArticleType } from 'src/interface/article.interface'
import { BooksType } from 'src/interface/books.interface'
import { CardType } from 'src/interface/paymentCart.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { StripeProductsType } from 'src/interface/StripeProductsType'

export interface LayoutProps {
	children: ReactNode
}

export interface AppProviderProps {
	products: ProductTypes[]
	product: ProductTypes
	agents: AgentType[]
	books: BooksType[]
	cards: CardType[]
	stripeProducts: StripeProductsType[]
	articles: ArticleType[]
	article: ArticleType
}
