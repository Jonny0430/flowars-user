import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ProductTypes } from "src/interface/product.interface";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { DetailedProductComponent } from "src/page-component";
import { AppService } from "src/service/app.service";




const DetailedProductPage = () => {
	const router = useRouter();
	return (
		<Seo metaTitle={`Florist product | ${router.query.slug}`}>
			<DetailedProductComponent />
		</Seo>
	);
}

export default withLayout(DetailedProductPage)

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({ query }) => {
	try {
		const product = await AppService.getDetailedProduct(query.slug as string);

		// Handle case where product is not found
		if (!product) {
			return {
				notFound: true, // Show a 404 page if product is not found
			};
		}

		return {
			props: { product },
		};
	} catch (error) {
		console.error("Error fetching product:", error);

		// Redirect to an error page or fallback in case of failure
		return {
			redirect: {
				destination: "/error", // Customize this to your error page
				permanent: false,
			},
		};
	}
};

interface MainPageProps {
	product: ProductTypes;
}

