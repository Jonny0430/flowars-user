import { adminReducer } from './admin/admin.slice'
import { agentReducer } from './agent/agent.slice'
import { articlesReducer } from './article/articles.slice'
import { booksReducer } from './books/books.slice'
import { cartReducer } from './cart/cart.slice'
import { productReducer } from './product/product.slice'
import { userReducer } from './user/user.slice'

export const reducer = {
	user: userReducer,
	agent: agentReducer,
	product: productReducer,
	admin: adminReducer,
	books: booksReducer,
	cart: cartReducer,
	article: articlesReducer
}
