import { AgentType } from 'src/interface/agent.interface'
import { ArticleType } from 'src/interface/article.interface'
import { BooksType } from 'src/interface/books.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { UserType } from 'src/interface/user.interface'

export interface AdminProps {
	products: ProductTypes[]
	agents: AgentType[]
	users: UserType[]
	books: BooksType[]
	articles: ArticleType[]
}
