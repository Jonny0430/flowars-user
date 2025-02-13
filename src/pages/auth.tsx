import { useTranslation } from "react-i18next";
import Seo from "src/layouts/seo/seo";
import { AuthPageComponent } from "src/page-component";

const AuthPage = () => {
	const { t } = useTranslation();
	return (
		<Seo
			metaTitle={
				`Florist | ${t('auth_page_title', { ns: 'seo' })}` || 'PetStore | Auth'
			}
			metaDescription={
				`Florist | ${t('auth_page_description', { ns: 'seo' })}` ||
				                'Learn more about the FlowerShop platform, your one-stop destination for premium flower care products, services, and expert advice.'
			}
		>
			<AuthPageComponent />
		</Seo>
	);
}

export default AuthPage
