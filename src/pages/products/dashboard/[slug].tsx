import { useActions } from 'hooks/useActions'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ProductTypes } from 'src/interface/product.interface'
import Seo from 'src/layouts/seo/seo'
import { DashboardPageComponent } from 'src/page-component'
import { AppService } from 'src/service/app.service'



const DashboarProduct: NextPage<ProductDashboardPage> = ({ product }) => {
    const { getProduct } = useActions()
    const router = useRouter()

    useEffect(() => {
        getProduct(product)
    }, [product])

    console.log('Product:', product)

    return (
        <Seo metaTitle={`PetStore product | ${router.query.slug}`}>
            <DashboardPageComponent />
        </Seo>
    )
}

export default DashboarProduct

export const getServerSideProps: GetServerSideProps<ProductDashboardPage> = async ({ query }) => {
    try {
      const product = await AppService.getDetailedProduct(query.slug as string);
  
      // If the product is not found, return a 404 page
      if (!product) {
        return {
          notFound: true, // Triggers the default 404 page
        };
      }
  
      return {
        props: { product },
      };
    } catch (error) {
      console.error("Error fetching product:", error);
  
      // Redirect to an error page if something goes wrong
      return {
        redirect: {
          destination: "/error", // Customize this path if needed
          permanent: false,
        },
      };
    }
  };
  
  interface ProductDashboardPage {
    product: ProductTypes;
  }
  