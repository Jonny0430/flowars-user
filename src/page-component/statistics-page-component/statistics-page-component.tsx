import { Box, Card, CardBody, HStack, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import SectionTitle from 'src/components/section-title/section-title'
import { productClient, productServer } from 'src/config/constants'



const StatisticsPageComponent = () => {
    const { t } = useTranslation()

    const [chartData] = useState({
        labels: productClient.map(data => t(data.year, { ns: 'global' })),
        datasets: [
            {
                label: `${t('statistics_title', {ns: 'global'})}`,
                data: productClient.map(data => data.user),
                backgroundColor: ['rgba(75,192,192,1)', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2
            }
        ]
    })

    const [chartDataProduct] = useState({
        labels: productServer.map(data => t(data.year, { ns: 'global' })),
        datasets: [
            {
                label: `${t('statistics_title_1', {ns: 'global'})}`,
                data: productServer.map(data => data.product),
                backgroundColor: ['rgba(75,192,192,1)', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2
            }
        ]
    })

    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <Stack direction={{ base: 'column', lg: 'row' }}>
                        <Box w={{ base: '100%', lg: '30%' }} alignContent={'center'}>
                            <SectionTitle title={t('statistics_title', { ns: 'global' })} subtitle={t('statistics_descrption', { ns: 'global' })} textAlign={'center'} />
                        </Box>
                        <Box w={{ base: '100%', lg: '70%' }}>
                            <Stack pt={5}>
                                <Box className='chart-container'>
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
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Card mt={10}>
                <CardBody>
                    <Stack direction={{ base: 'column', lg: 'row' }}>
                        <Box w={{ base: '100%', lg: '30%' }} alignContent={'center'}>
                            <SectionTitle title={t('statistics_title_1', { ns: 'global' })} subtitle={t('statistics_descrption_1', { ns: 'global' })} textAlign={'center'} />
                        </Box>
                        <Box w={{ base: '100%', lg: '70%' }}>
                            <Stack pt={5} >
                                <Box className='chart-container' >
                                    <Line
                                        data={chartDataProduct}
                                        options={{
                                            plugins: {
                                                title: { display: false },
                                                legend: { display: false }
                                            }
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default StatisticsPageComponent
