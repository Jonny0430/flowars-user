import { FC, FunctionComponent } from "react";
import { LayoutProps } from "../layout.props";
import { Box, Container } from "@chakra-ui/react";
import AdminSidebar from "../sidebar/admin.sidebar";
import { AdminProps } from "./admin.props";
import AdminProvider from "src/provider/admin.provider";
import Footer from "../footer/footer";
import articles from "src/pages/admin/articles";


const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
    return (
        <>
            <AdminSidebar toggle />
            <Box pl={{ base: 0, lg: '330px' }} minH={'100vh'} transition={'all .4s ease'}>
                <Container maxW={'container.lg'}>{children}</Container>
            </Box>
            <Footer />
        </>
    )
}

export default Layout

export const withAdminLayout = <T extends Record<string, unknown> & AdminProps>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <AdminProvider products={props.products} agents={props.agents} users={props.users} books={props.books} articles={props.articles}>
                    <Component {...props} />
                </AdminProvider>
            </Layout>
        )
    }
}