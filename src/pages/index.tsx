import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import { AgentType } from 'src/interface/agent.interface';
import { ArticleType } from 'src/interface/article.interface';
import { BooksType } from 'src/interface/books.interface';
import { ProductTypes } from 'src/interface/product.interface';
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo';
import { HomePageComponent } from 'src/page-component'
import { AppService } from 'src/service/app.service';

function Home() {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`Pet-Store | ${t('main_page_title', { ns: 'seo' })}`}
      metaDescription={`${t('main_page_description', { ns: 'seo' })}`}
    >
      <HomePageComponent />
    </Seo>
  );
}

export default withLayout(Home)

export const getServerSideProps: GetServerSideProps<MainPageProps> = async () => {
  try {
    const response = await AppService.getMainPageSourse();

    return {
      props: {
        products: response.products,
        agents: response.agents,
        articles: response.articles,
        books: response.books
      }
    };
  } catch (error) {
    console.error('Error fetching main page data:', error);

    return {
      props: {
        products: [],
        agents: [],
        articles: [],
        books: []
      }
    };
  }
};



interface MainPageProps {
  products: ProductTypes[]
  agents: AgentType[]
  articles: ArticleType[]
  books: BooksType[]
}