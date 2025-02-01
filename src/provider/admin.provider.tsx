import { useActions } from "hooks/useActions";
import { FC, ReactNode, useEffect } from "react";
import { AgentType } from "src/interface/agent.interface";
import { ArticleType } from "src/interface/article.interface";
import { BooksType } from "src/interface/books.interface";
import { ProductTypes } from "src/interface/product.interface";
import { UserType } from "src/interface/user.interface";


interface Props {
    children: ReactNode;
    products: ProductTypes[]
    agents: AgentType[]
    users: UserType[]
    books: BooksType[]
    articles: ArticleType[]
}

const AdminProvider: FC<Props> = ({ children, products, agents, users, books, articles }): JSX.Element => {
    const { getAdminProducts, getAdminAgents, getAdminUsers, getBooks, getArticles} = useActions()

    useEffect(() => {
        if (products?.length) {
            getAdminProducts(products)
        }
        if (agents?.length) {
            getAdminAgents(agents)
        }
        if (users?.length) {
            getAdminUsers(users)
        }
        if (books?.length) {
            getBooks(books)
        }
        if (articles?.length) {
            getArticles(articles)
        }
    }, [products, agents, users, articles])


    return <>{children}</>
}

export default AdminProvider;