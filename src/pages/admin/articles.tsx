import { GetServerSideProps } from 'next'
import React from 'react'
import { ArticleType } from 'src/interface/article.interface'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AdminArticlesPageComponent } from 'src/page-component'
import { ArticleService } from 'src/service/article.service'
import { AuthService } from 'src/service/auth.service'

const Articles = () => {
    return <AdminArticlesPageComponent />
}

export default withAdminLayout(Articles)


export const getServerSideProps: GetServerSideProps<ArticlePageType> = async ({ req }) => {
    try {
      // Проверка прав администратора
      const admin = await AuthService.checkAdmin(req.cookies.refresh);
  
      if (!admin) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      // Получение статей
      const articles = await ArticleService.getArticle();
  
      return {
        props: { articles },
      };
    } catch (error) {
      console.error('Error fetching articles or checking admin:', error);
  
      // В случае ошибки возвращаем пустой массив или дефолтные данные
      return {
        props: { articles: [] },
      };
    }
  };
  


interface ArticlePageType extends Record<string, unknown> {
    articles: ArticleType[]
}