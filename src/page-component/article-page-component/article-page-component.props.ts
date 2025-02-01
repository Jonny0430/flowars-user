import { ArticleType } from 'src/interface/article.interface'

export interface ArticlePageComponentProps {
	articles: ArticleType[]
}

export interface ArticleDetailedProps {
	article: ArticleType
}
