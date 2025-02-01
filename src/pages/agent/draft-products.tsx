import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ProductTypes } from 'src/interface/product.interface'
import { withAgentLayout } from 'src/layouts/agentLayout'
import { AgentDraftProductComponent } from 'src/page-component'
import { AgentService } from 'src/service/agent.service'
import { AuthService } from 'src/service/auth.service'

const DraftProducts: NextPage = () => {
    return <AgentDraftProductComponent />
}

export default withAgentLayout(DraftProducts)


export const getServerSideProps: GetServerSideProps<ProductPageType> = async ({ req }) => {
    try {
      // Проверка прав агента
      const agent = await AuthService.checkAgent(req.cookies.refresh);
  
      if (!agent) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      // Получение всех продуктов
      const products = await AgentService.getAllProduct(req.cookies.refresh);
  
      return {
        props: { products },
      };
    } catch (error) {
      console.error('Error fetching products or checking agent:', error);
  
      // В случае ошибки возвращаем редирект на главную страницу
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
  
  interface ProductPageType extends Record<string, unknown> {
    products: ProductTypes[];
  }
  