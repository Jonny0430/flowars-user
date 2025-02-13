import { useTranslation } from "react-i18next";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { FaqPageComponent } from "src/page-component";


const FaqPage = () => {
    const { t } = useTranslation();

    return (
        <Seo
            metaTitle={
                `Florist | ${t('faq_page_title', { ns: 'seo' })}` || 'Florist | FAQ'
            }
            metaDescription={
                `Florist | ${t('faq_page_description', { ns: 'seo' })}` ||
                'More users in FlowerShop platform frequently asked questions.'
            }
        >
            <FaqPageComponent />
        </Seo>
    );
}

export default withLayout(FaqPage)
