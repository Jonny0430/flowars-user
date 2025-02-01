import { Box, Card, CardBody, Center, Flex, Grid, HStack } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { IoIosBasket } from 'react-icons/io'
import { AdminProductCard } from 'src/components'
import { ErrorAlert } from 'src/components/error-alert/error-alert'
import SectionTitle from 'src/components/section-title/section-title'



const AdminProductsPageComponent = () => {
    const { products } = useTypedSelector(state => state.admin)
    const {error} = useTypedSelector(state => state.admin)
    const {clearAdminError} = useActions()

    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <HStack>
                        <Box w={'40%'}>
                            <Center>
                                <SectionTitle title='Products' subtitle='All products and managing on platform' fontSize={'4xl'} />
                            </Center>
                        </Box>
                        <Flex w={'60%'} justify={'flex-end'}>
                            <IoIosBasket fontSize={'40vh'} />
                        </Flex>
                    </HStack>
                </CardBody>
            </Card>
             <>{typeof error === 'string' && <ErrorAlert title={error} clearHandler={clearAdminError} />}</>
            <Grid
                gridTemplateColumns={'repeat(3, 1fr)'} gap={4}
            >
                {products.map(c => (
                    <AdminProductCard key={c._id} product={c} />
                ))}
            </Grid>
        </>
    )
}

export default AdminProductsPageComponent
