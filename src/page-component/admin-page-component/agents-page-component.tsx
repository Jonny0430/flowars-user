import { Box, Card, CardBody, Center, Flex, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { MdSupportAgent } from "react-icons/md";
import { AdminAgentTable } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';

const AdminAgentsPageComponent = () => {
    const { agents } = useTypedSelector(state => state.admin)

    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <HStack>
                        <Box w={'40%'}>
                            <Center>
                                <SectionTitle title='Agents' subtitle='Managing agents on platform' fontSize={'4xl'} />
                            </Center>
                        </Box>
                        <Flex w={'60%'} justify={'flex-end'}>
                            <MdSupportAgent fontSize={350} />
                        </Flex>
                    </HStack>
                </CardBody>
            </Card>
            <Box mt={10} mx={'auto'}>
                <Tabs isFitted variant={'enclosed-colored'} colorScheme='facebook'>
                    <TabList mb={'1em'}>
                        <Tab>Approved agents</Tab>
                        <Tab>Applied agents</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <AdminAgentTable agents={agents.filter(c => c.approved)} approved={true} />
                        </TabPanel>
                        <TabPanel>
                            <AdminAgentTable agents={agents.filter(c => !c.approved)} approved={false} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default AdminAgentsPageComponent
