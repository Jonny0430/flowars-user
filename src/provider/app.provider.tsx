import { useActions } from "hooks/useActions";
import { FC, ReactNode, useEffect } from "react";
import { AgentType } from "src/interface/agent.interface";
import { ArticleType } from "src/interface/article.interface";
import { BooksType } from "src/interface/books.interface";
import { ProductTypes } from "src/interface/product.interface";


interface Props {
    children: ReactNode,
    products: ProductTypes[],
    product: ProductTypes,
    agents: AgentType[],
    books: BooksType[],
    articles: ArticleType[],
    article: ArticleType,
}

const AppProvider: FC<Props> = ({ children, product, products, agents, books, article, articles }): JSX.Element => {
    const { getProduct, getProducts, getAgents, getBooks, getArticles, getArticle } = useActions()

    useEffect(() => {
        if (products?.length) {
            getProducts(products)
        }
        if (agents?.length) {
            getAgents(agents)
        }
        if (product) {
            getProduct(product)
        }
        if (books?.length) {
            getBooks(books)
        }
        if (articles?.length) {
            getArticles(articles)
        }
        if (article) {
            getArticle(article)
        }
    }, [product, products, articles, article])

    return <>{children}</>
}

export default AppProvider