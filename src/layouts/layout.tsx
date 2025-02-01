import { Box, Container } from "@chakra-ui/react"
import { AppProviderProps, LayoutProps } from "./layout.props"
import Header from "./header/header"
import { FunctionComponent, useState } from "react"
import SideBar from "./sidebar/sidebar"
import Footer from "./footer/footer"
import AppProvider from "src/provider/app.provider"



const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [toggle, setToggle] = useState<boolean>(false)

    const onToggle = () => setToggle(prev => !prev)

    return (
        <Box maxW={'full'} overflow={'hidden'}>
            <Header onToggle={onToggle} />
            <SideBar toggle={toggle} />
            <Box mt={'11vh'} pl={{ base: 0, lg: '320px' }} minH={'90vh'} transition={'all .4s ease'}>
                <Container maxW={'container.lg'}>{children}</Container>
            </Box>
            <Footer />
        </Box>

    )
}

export default Layout;

export const withLayout = <T extends Record<string, unknown> & AppProviderProps>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <AppProvider
                    product={props.product}
                    products={props.products}
                    agents={props.agents}
                    books={props.books}
                    article={props.article}
                    articles={props.articles}
                >
                    <Component {...props} />
                </AppProvider>
            </Layout>
        )
    }
}