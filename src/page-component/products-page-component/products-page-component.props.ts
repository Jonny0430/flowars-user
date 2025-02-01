export interface FilterItemProps {
	title: string
	id: string
	categoryList: CategoryListProps[]
}

export interface CategoryListProps {
	name: string
	id: string
}

export interface FilterProductType {
	category: string
	id: string
	rating: number,
	location: string
}
