import { GetServerSideProps } from "next"
import { useTranslation } from "react-i18next"
import { ProductTypes } from "src/interface/product.interface"
import { withLayout } from "src/layouts/layout"
import Seo from "src/layouts/seo/seo"
import { ProductsPageComponent } from "src/page-component"
import { AppService } from "src/service/app.service"

const products = () => {
    const { t } = useTranslation();
    return (
        <Seo
            metaTitle={
                `Florist | ${t('product_page_title', { ns: 'seo' })}` ||
                'Florist | All products'
            }
            metaDescription={
                `Florist | ${t('product_page_description', { ns: 'seo' })}` ||
                'Discover a wide range of products on the FlowerShop platform to meet all your flower care needs and enjoy a seamless shopping experience.'
            }
        >
            <ProductsPageComponent />
        </Seo>
    );
}

export default withLayout(products)

export const getServerSideProps: GetServerSideProps<MainPageProps> = async () => {
    try {
      const products = await AppService.getProducts();
  
      // If no products are found, you might want to handle it (e.g., show a message or fallback)
      if (!products || products.length === 0) {
        return {
          notFound: true, // Returns a 404 page if no products are found
        };
      }
  
      return {
        props: { products },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
  
      // Redirect to an error page in case of failure
      return {
        redirect: {
          destination: "/", // Customize this URL to your app's error page
          permanent: false,
        },
      };
    }
  };
  
  interface MainPageProps {
    products: ProductTypes[];
  }
  