import { userSliceAction } from './user/user.slice'
import * as userActions from './user/user.action'
import { agentSliceAction } from './agent/agent.slice'
import * as agentAction from './agent/agent.action'
import * as productActions from './product/product.action'
import { productSliceAction } from './product/product.slice'
import { adminSliceAction } from './admin/admin.slice'
import * as adminActions from './admin/admin.action'
import { booksSLiceAction } from './books/books.slice'
import * as booksActions from './books/books.action'
import { cartSliceAction } from './cart/cart.slice'
import { articlesSliceAction } from './article/articles.slice'
import * as articlesActions from './article/articles.action'

export const allActions = {
	...userSliceAction,
	...userActions,
	...agentSliceAction,
	...agentAction,
	...productActions,
	...productSliceAction,
	...adminSliceAction,
	...adminActions,
	...booksSLiceAction,
	...booksActions,
	...cartSliceAction,
	...articlesSliceAction,
	...articlesActions
}
