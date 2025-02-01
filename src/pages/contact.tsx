import { useTranslation } from 'react-i18next';
import { withLayout } from 'src/layouts/layout';
import Seo from 'src/layouts/seo/seo';
import ContactPageComponent from 'src/page-component/contact-page-component/contact-page-component';

const ContactPage = () => {
	const { t } = useTranslation();
	return (
		<Seo
			metaTitle={
				`Pet-Store | ${t('contact_page_title', { ns: 'seo' })}` ||
				'Pet-Store | Contact us'
			}
			metaDescription={
				`Pet-Store | ${t('contact_page_description', { ns: 'seo' })}` ||
				'Contact with PetStore and you can ask any questions'
			}
		>
			<ContactPageComponent />
		</Seo>
	);
}

export default withLayout(ContactPage)
