import { useTranslation } from "react-i18next";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { FaqPageComponent } from "src/page-component";


const FaqPage = () => {
    const { t } = useTranslation();

    return (
        <Seo
            metaTitle={
                `Pet-Store | ${t('faq_page_title', { ns: 'seo' })}` || 'Pet-Store | FAQ'
            }
            metaDescription={
                `Pet-Store | ${t('faq_page_description', { ns: 'seo' })}` ||
                'More users in Pet-Store platform frequently asked question'
            }
        >
            <FaqPageComponent />
        </Seo>
    );
}

export default withLayout(FaqPage)
