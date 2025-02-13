import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { StripeProductsType } from "src/interface/StripeProductsType";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { PricingPageComponent } from "src/page-component";
import { PaymentService } from "src/service/payment.service";

const PricingPage = ({ stripeProducts }: PricingPageType) => {
    const { t } = useTranslation();

    return (
        <Seo
            metaTitle={
                `Florist | ${t('pricing_page_title', { ns: 'seo' })}` ||
                'Florist | Pricing Package'
            }
            metaDescription={
                `Florist | ${t('pricing_page_description', { ns: 'seo' })}` ||
                'Choose the best plan on Pet Store to access premium pet care products, exclusive deals, and personalized shopping features.'
            }
        >
            {stripeProducts && stripeProducts.length > 0 ? (
                <PricingPageComponent stripeProducts={stripeProducts} />
            ) : (
                <div>No pricing plans available at the moment.</div>
            )}
        </Seo>
    );
};


export default withLayout(PricingPage)


export const getServerSideProps: GetServerSideProps<PricingPageType> = async () => {
    try {
        const stripeProducts = await PaymentService.productList();
        console.log("stripeProducts:", stripeProducts)

        // Prevent undefined values from being returned
        const sanitizedProducts = stripeProducts.map((product: StripeProductsType) => ({
            ...product,
            description: product.description ?? null, // Replace undefined with null if applicable
        }));

        console.log("Fetched Stripe products:", sanitizedProducts); // Debug log for data

        return {
            props: { stripeProducts: sanitizedProducts }
        };
    } catch (error) {
        console.error('Error fetching Stripe products:', error);

        return {
            props: { stripeProducts: [] }
        };
    }
};


interface PricingPageType extends Record<string, unknown> {
    stripeProducts: StripeProductsType[];
}
  


