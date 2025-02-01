import { ArticleType } from 'src/interface/article.interface'

export interface ArticleModalProps {
	isOpen: boolean
	onClose: () => void
	articleValue: ArticleType | null
}
