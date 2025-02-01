import { GetServerSideProps } from 'next'
import React from 'react'
import { ArticleType } from 'src/interface/article.interface'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { ArticlePageComponent } from 'src/page-component'
import { ArticleService } from 'src/service/article.service'

const ArticlesPage = ({ articles }: ArticlesPageProps) => {
    return (
        <Seo
            metaTitle={`Pet-Store | Articles`}
            metaDescription={`Pet-Store | Articles`}
        >
            {articles.length === 0 ? (
                <div>No articles available at the moment. Please check back later.</div>
            ) : (
                <ArticlePageComponent articles={articles} />
            )}
        </Seo>
    );
};


export default withLayout(ArticlesPage)

export const getServerSideProps: GetServerSideProps<ArticlesPageProps> = async () => {
    try {
        const articles = await ArticleService.getArticle();
        return {
            props: {
                articles: articles || [], // Empty array if no articles are found
            },
        };
    } catch (error) {
        console.error("Error fetching articles:", error);

        // Option 1: Show fallback props
        return {
            props: {
                articles: [], // Return an empty array in case of error
            },
        };
    }
};


interface ArticlesPageProps extends Record<string, unknown> {
    articles: ArticleType[];
}
