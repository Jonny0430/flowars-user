import { Box, Button, Card, CardBody, Heading, HStack, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai';
import { ErrorAlert } from 'src/components/error-alert/error-alert';
import SectionTitle from 'src/components/section-title/section-title';
import { productClient } from 'src/config/constants';

const AdminUsersPageComponent = () => {
    const { users } = useTypedSelector(state => state.admin)
    const { isLoading, error } = useTypedSelector(state => state.admin)
    const { moreAdminUser, clearAdminError, searchAdminUsers } = useActions()
    const [limit, setLimit] = useState<number>(10)
    const [query, setQuery] = useState<string>('')
    const { t } = useTranslation()

    const [chartData] = useState({
        labels: productClient.map(data => t(data.year, { ns: 'global' })),
        datasets: [
            {
                label: 'Users',
                data: productClient.map(data => data.user),
                backgroundColor: ['rgba(75,192,192,1)', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2
            }
        ]
    })


    const moreAdminUserHandler = () => {
        setLimit(prev => prev + 5)
        const token = Cookies.get('refresh')
        moreAdminUser({ limit: String(limit), token })
    }

    const searchUserHandler = () => {
        searchAdminUsers({ query, limit: String(limit - 5) })
    }


    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <HStack>
                        <Box w={'30%'}>
                            <SectionTitle title='Users' subtitle='Registered users to platform' />
                        </Box>
                        <Box w={'70%'}>
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
                    </HStack>
                </CardBody>
            </Card>

            <Box mt={10}>
                <Heading>All Users</Heading>
                <Box pos={'relative'} mt={5}>
                    <Input
                        h={14}
                        w={'full'}
                        color={useColorModeValue('gray.900', '')}
                        borderColor={'Highlight'}
                        placeholder={t('search_input_placeholder', { ns: 'products' }) || ''}
                        _placeholder={{ color: 'gray.500' }}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Button pos={'absolute'} right={2} top={2} colorScheme='facebook' zIndex={999} onClick={searchUserHandler}>
                        {t('search_input_btn', { ns: 'products' })}
                    </Button>
                </Box>
                <>{typeof error === 'string' && <ErrorAlert title={error} clearHandler={clearAdminError} />}</>
                <TableContainer mt={10}>
                    <Table variant={'striped'} colorScheme='teal'>
                        <TableCaption>
                            <Button
                                colorScheme='facebook'
                                variant={'outline'}
                                rightIcon={<AiOutlineReload />}
                                isLoading={isLoading}
                                onClick={moreAdminUserHandler}
                            >
                                {t('more', { ns: 'agent' })}...
                            </Button>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>
                                    <AiOutlineFieldNumber fontSize={20} />
                                </Th>
                                <Th>{t('email', { ns: 'agent' })}</Th>
                                <Th>{t('full_name', { ns: 'agent' })}</Th>
                                <Th>Role</Th>
                                <Th>{t('enrolled_date', { ns: 'agent' })}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, idx) => (
                                <Tr key={idx}>
                                    <Td>{idx + 1}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.fullName}</Td>
                                    <Td>{user.role || 'USER'}</Td>
                                    <Td>{format(new Date(user.createdAt as Date), 'dd MMMM, yyyy')}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default AdminUsersPageComponent
