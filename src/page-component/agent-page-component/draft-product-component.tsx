import { Box, Card, CardBody, Grid, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { AgentDraftProductCard } from 'src/components'
import SectionTitle from 'src/components/section-title/section-title'


const DraftProductComponent = () => {
    const { products } = useTypedSelector(state => state.agent)

    return (
        <>
            <Card>
                <CardBody p={0}>
                    <HStack justify={'center'}>
                        <Stack>
                            <SectionTitle
                                title='Draft products'
                                subtitle='Manage your products and activated it'
                            />
                        </Stack>
                        <Image
                            width={480}
                            height={480}
                            src={'/images/draft.png'}
                            alt='agent'
                        />
                    </HStack>
                </CardBody>
            </Card>

            <Box mt={10}>
                <Tabs isFitted variant={"enclosed"}>
                    <TabList mb={'1em'} borderColor={useColorModeValue('Highlight', 'gray')} boxShadow={useColorModeValue('xl', 'dark-lg')}>
                        <Tab>Draft</Tab>
                        <Tab>Active</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
                                {products
                                    .filter(c => !c.isActive)
                                    .map(item => (<AgentDraftProductCard key={item.slug} item={item} />))
                                }
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
                                {products
                                    .filter(c => c.isActive)
                                    .map(item => (<AgentDraftProductCard key={item.slug} item={item} />))
                                }
                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default DraftProductComponent
