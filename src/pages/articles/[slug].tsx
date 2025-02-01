import { GetServerSideProps } from 'next'
import React from 'react'
import { ArticleType } from 'src/interface/article.interface'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { ArticleDetailedCompomemt } from 'src/page-component'
import { ArticleService } from 'src/service/article.service'

const ArticleDetailedPage = ({ article }: ArticleDetailedPageProps) => {
    return (
        <Seo
            metaTitle={
                `Pet-Store | ${article.slug} `
            }
            metaDescription={
                `Pet-Store | Articles`
            }
        >
            <ArticleDetailedCompomemt article={article} />
        </Seo>

    )
}

export default withLayout(ArticleDetailedPage)

export const getServerSideProps: GetServerSideProps<ArticleDetailedPageProps> = async ({ query }) => {
    try {
      const article = await ArticleService.getDetailedArticle(query.slug as string);
  
      // Handle case where article is not found
      if (!article) {
        return {
          notFound: true, // Show 404 page if article is not found
        };
      }
  
      return {
        props: {
          article,
        },
      };
    } catch (error) {
      console.error("Error fetching article:", error);
  
      // In case of error, you can redirect to an error page or the home page
      return {
        redirect: {
          destination: "/", // You can customize this to an error page URL
          permanent: false,
        },
      };
    }
  };
  
  interface ArticleDetailedPageProps extends Record<string, unknown> {
    article: ArticleType;
  }
  