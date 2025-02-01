import { useTranslation } from "react-i18next"
import { withLayout } from "src/layouts/layout"
import Seo from "src/layouts/seo/seo"
import { AboutPageComponent } from "src/page-component"

const AboutPage = () => {
    const {t} = useTranslation()

    return (
        <Seo
            metaTitle={
                `Pet-Store | ${t('about_page_title', {ns: 'seo'})}` || 'OnlineSchool | About us'
            }
            metaDescription={
                `Pet-Store | ${t('about_page_description', {ns: 'seo'})}` || 
                'Learn more about the Pet Store platform, your one-stop destination for premium pet care products, services, and expert advice.'
            }
        >
            <AboutPageComponent />
        </Seo>
    )
}

export default withLayout(AboutPage)
