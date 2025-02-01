import { useTranslation } from "react-i18next";
import Seo from "src/layouts/seo/seo";
import { AuthPageComponent } from "src/page-component";

const AuthPage = () => {
	const { t } = useTranslation();
	return (
		<Seo
			metaTitle={
				`Pet-Store | ${t('auth_page_title', { ns: 'seo' })}` || 'PetStore | Auth'
			}
			metaDescription={
				`Pet-Store | ${t('auth_page_description', { ns: 'seo' })}` ||
				'Log in or create an account to access Pet Store’s wide range of pet care products, services, and exclusive offers.'
			}
		>
			<AuthPageComponent />
		</Seo>
	);
}

export default AuthPage
