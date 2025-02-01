import { GetServerSideProps, NextPage } from 'next'
import { ProductTypes } from 'src/interface/product.interface'
import { withAgentLayout } from 'src/layouts/agentLayout'
import { AgentEditDetailedProductPageComponent } from 'src/page-component'
import { AgentService } from 'src/service/agent.service'


const EditDetailProducts: NextPage = () => {
  return <AgentEditDetailedProductPageComponent />
}

export default withAgentLayout(EditDetailProducts)

export const getServerSideProps: GetServerSideProps<ProductsPageType> = async ({ req, query }) => {
  try {
    // Проверка на наличие параметра slug в запросе
    const slug = query.slug as string;

    if (!slug) {
      return {
        notFound: true, // если slug отсутствует, показываем страницу 404
      };
    }

    // Получение детализированного продукта
    const product = await AgentService.getDetailedProduct(req.cookies.refresh, slug);

    // Если продукт не найден, показываем страницу 404
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: { product }, // передаем продукт в компонент
    };
  } catch (error) {
    console.error('Error fetching detailed product:', error);

    // В случае ошибки редирект на главную страницу
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

interface ProductsPageType extends Record<string, unknown> {
  product: ProductTypes;
}
