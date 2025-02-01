import { Card, CardBody, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { AgentProductsCard } from 'src/components'
import SectionTitle from 'src/components/section-title/section-title'



const AgentProductsPageComponent = () => {
    const { products } = useTypedSelector(state => state.agent)

    return (
        <>
            <Card>
                <CardBody p={0}>
                    <HStack justify={'center'}>
                        <Stack>
                            <SectionTitle
                                title='All Products'
                                subtitle='Manage your products and refactoring any time'
                            />
                        </Stack>
                        <Image width={480} height={480} src={'/images/manage.png'} alt='agent' />
                    </HStack>
                </CardBody>
            </Card>

            <Tabs isFitted variant={'enclosed'} mt={10}>
                <TabList>
                    <Tab>All products</Tab>
                    <Tab>Active products</Tab>
                    <Tab>Draft products</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {products.map(item => (
                            <AgentProductsCard key={item.price} item={item} />
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {products.filter(c => c.isActive).map(item => (
                            <AgentProductsCard key={item.slug} item={item} />
                        ))
                        }
                    </TabPanel>
                    <TabPanel>
                        {products.filter(c => !c.isActive).map(item => (
                            <AgentProductsCard key={item.slug} item={item} />
                        ))
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default AgentProductsPageComponent
