import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ProductTypes } from 'src/interface/product.interface'
import { withAgentLayout } from 'src/layouts/agentLayout'
import EditProductPageComponent from 'src/page-component/agent-page-component/edit-product-page-component'
import { AgentService } from 'src/service/agent.service'


const EditProducts: NextPage = () => {
    return <EditProductPageComponent />
}

export default withAgentLayout(EditProducts)


export const getServerSideProps: GetServerSideProps<ProductsPageType> = async ({ req }) => {
    try {
      // Fetching products from AgentService
      const products = await AgentService.getAllProduct(req.cookies.refresh);
  
      // If no products are returned, you can either handle it or show a fallback
      if (!products) {
        return {
          notFound: true, // Shows 404 page if no products are found
        };
      }
  
      return {
        props: { products }, // Passing products as props
      };
    } catch (error) {
      console.error("Error fetching products:", error);
  
      // Handle error (e.g., redirect to home page in case of failure)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
  
  interface ProductsPageType extends Record<string, unknown> {
    products: ProductTypes[]; // Define the expected product type here
  }
  
