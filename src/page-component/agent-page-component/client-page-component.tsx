import { Box, Button, Card, CardBody, Heading, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai'
import SectionTitle from 'src/components/section-title/section-title'
import { productClient } from 'src/config/constants'

Chart.register(CategoryScale)

const AgentClientPageComponent = () => {
    const [chartData] = useState({
        labels: productClient.map(data => data.year),
        datasets: [
            {
                label: 'Client Gained',
                data: productClient.map(data => data.user),
                backgroundColor: ['rgba(75,192,192,1)', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            }
        ]
    })

    const { t } = useTranslation()

    return (
        <>
            <Card>
                <CardBody>
                    <Stack>
                        <SectionTitle
                            title='Clients'
                            subtitle='Enrolled clients to your products and analytics'
                        />
                        <Box >
                            <Line
                                data={chartData}
                                options={{
                                    plugins: {
                                        title: { display: false },
                                        legend: { display: false }
                                    }
                                }}
                            />
                        </Box>
                    </Stack>
                </CardBody>
            </Card>

            <Box mt={10}>
                <Heading>All clients</Heading>
                <Box pos={'relative'} mt={5}>
                    <Input
                        h={14}
                        w={'full'}
                        bg={useColorModeValue('', 'gray.700')}
                        color={'gray.900'}
                        placeholder={t('search_input_placeholder', { ns: 'products' }) || ''}
                        _placeholder={{ color: 'gray.500' }}
                    />
                    <Button pos={'absolute'} bg={'#4cea54'}  _hover={{ bg: '#06e911e0' }} right={2} top={2}  zIndex={999}>
                        {t('search_input_btn', { ns: 'products' })}
                    </Button>
                </Box>
                <TableContainer mt={10}>
                    <Table variant={"striped"} colorScheme="purple">
                        <TableCaption>
                            <Button colorScheme='facebook' variant={"outline"} rightIcon={<AiOutlineReload />}>
                                more...
                            </Button>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>
                                    <AiOutlineFieldNumber fontSize={20} />
                                </Th>
                                <Th>Email</Th>
                                <Th>FullName</Th>
                                <Th>Products</Th>
                                <Th>Enrolled date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productClient.map((client, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{client.email}</Td>
                                    <Td>{client.fullName}</Td>
                                    <Td>{2 * index + 3}</Td>
                                    <Td>{t("client.year", {ns: "global"})}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default AgentClientPageComponent
