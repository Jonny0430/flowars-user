import { GetServerSideProps } from 'next'
import { BooksType } from 'src/interface/books.interface'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AdminBooksPageComponent } from 'src/page-component'
import { AuthService } from 'src/service/auth.service'
import { BooksService } from 'src/service/books.service'

const Books = () => {
    return <AdminBooksPageComponent />
}

export default withAdminLayout(Books)

export const getServerSideProps: GetServerSideProps<BooksPageType> = async ({ req }) => {
    try {
        // Проверка прав администратора (проверьте правильность имени cookie)
        const admin = await AuthService.checkAdmin(req.cookies.refresh);  // Проверьте правильность имени cookie

        if (!admin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        // Получение списка книг
        const books = await BooksService.get();

        return {
            props: { books },
        };
    } catch (error) {
        console.error('Error fetching books or checking admin:', error);

        // В случае ошибки возвращаем пустой список книг или дефолтные данные
        return {
            props: { books: [] },
        };
    }
};


interface BooksPageType extends Record<string, unknown> {
    books: BooksType[]
}