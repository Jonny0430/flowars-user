import { GetServerSideProps } from 'next'
import { ProductTypes } from 'src/interface/product.interface'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AdminProductsPageComponent } from 'src/page-component'
import { AdminService } from 'src/service/admin.service'
import { AuthService } from 'src/service/auth.service'

const Products = () => {
    return <AdminProductsPageComponent />
}

export default withAdminLayout(Products)

export const getServerSideProps: GetServerSideProps<ProductsPageType> = async ({ req }) => {
    try {
        // Проверка прав администратора
        const admin = await AuthService.checkAdmin(req.cookies.refresh);

        if (!admin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        // Получение списка продуктов
        const products = await AdminService.getAllProducts();

        return {
            props: { products },
        };
    } catch (error) {
        console.error('Error fetching products or checking admin status:', error);

        // В случае ошибки возвращаем пустой список продуктов
        return {
            props: { products: [] },
        };
    }
};




interface ProductsPageType extends Record<string, unknown> {
    products: ProductTypes[]
}