import { FC, FunctionComponent, useState } from "react";
import { LayoutProps } from "../layout.props";
import { Box, Container } from "@chakra-ui/react";
import Header from "../header/header";
import AgentSidebar from "../sidebar/agent.sidebar";
import Footer from "../footer/footer";
import AgentProvider from "src/provider/agent.provider";
import { AgentProviderProps } from "./agent.props";


const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
    const [toggle, setToggle] = useState<boolean>(false)

    const onToggle = () => setToggle(prev => !prev)

    return (
        <Box maxW={'full'} overflow={'hidden'}>
            <Header onToggle={onToggle} />
            <AgentSidebar toggle={toggle} />
            <Box mt={'11vh'} pl={{ base: 0, lg: '320px' }} minH={'90vh'} transition={'all .4s ease'}>
                <Container maxW={'container.lg'}>{children}</Container>
            </Box>
            <Footer />
        </Box>
    )
}
export default Layout


export const withAgentLayout = <T extends Record<string, unknown> & AgentProviderProps>(
    Component: FunctionComponent<T>
) => {
    return function withAgentLayout(props: T): JSX.Element {
        return (
            <Layout>
                <AgentProvider product={props.product} products={props.products}>
                    <Component {...props} />
                </AgentProvider>

            </Layout>
        )
    }
}