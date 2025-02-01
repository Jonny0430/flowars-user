import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import { BooksType } from 'src/interface/books.interface';
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo';
import { BooksPageComponent } from 'src/page-component'
import { BooksService } from 'src/service/books.service';

const Books = () => {
    const { t } = useTranslation();
    return (
        <Seo
            metaTitle={
                `Pet-Store | ${t('books_page_title', { ns: 'seo' })}` || 'Pet-Store | Books'
            }
            metaDescription={
                `Pet-Store | ${t('books_page_description', { ns: 'seo' })}` ||
                'Pet Store offers a curated selection of books to help you better care for and understand your pets.'
            }
        >
            <BooksPageComponent />
        </Seo>
    );
}

export default withLayout(Books)


export const getServerSideProps: GetServerSideProps<BooksPageProps> = async () => {
    try {
        const books = await BooksService.get();
        return {
            props: { books }
        };
    } catch (error) {
        console.error('Error fetching books:', error);
        return {
            props: { books: [] } 
        };
    }
};


interface BooksPageProps {
    books: BooksType[]
}
