import { ArticleType } from 'src/interface/article.interface'

export interface ArticlesInitialState {
    isLoading: boolean
    error: null | unknown
    articles: ArticleType[]
    article: ArticleType | null
}

export interface ActionBody extends ArticleType {
	callback: () => void
}

export interface DeleteArticleBody {
    callback: () => void
    articleId: string
}