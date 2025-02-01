import { GetServerSideProps, NextPage } from "next";
import { ProductTypes } from "src/interface/product.interface";
import { withAgentLayout } from "src/layouts/agentLayout";
import { AgentProductsPageComponent } from "src/page-component";
import { AgentService } from "src/service/agent.service";
import { AuthService } from "src/service/auth.service";

const Products: NextPage<ProductsPageType> = () => {
    return <AgentProductsPageComponent />
}

export default withAgentLayout(Products)

export const getServerSideProps: GetServerSideProps<ProductsPageType> = async ({ req }) => {
    try {
      // Проверка наличия куки refresh
      if (!req.cookies.refresh) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      // Проверка агента
      const agent = await AuthService.checkAgent(req.cookies.refresh);
      
      if (!agent) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      // Получение данных о продуктах
      const products = await AgentService.getAllProduct(req.cookies.refresh);
      
      return {
        props: { products },
      };
    } catch (error) {
      console.error('Error while fetching products or checking agent:', error);
  
      // В случае ошибки также редиректим на главную страницу
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
  
  interface ProductsPageType extends Record<string, unknown> {
    products: ProductTypes[];
  }
  