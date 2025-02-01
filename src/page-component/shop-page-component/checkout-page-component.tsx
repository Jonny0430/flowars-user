import { Box, Divider, Grid, GridItem, HStack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckoutForm } from 'src/components'
import SectionTitle from 'src/components/section-title/section-title'
import { loadImage } from 'src/helpers/image.helper'
import { CardType } from 'src/interface/paymentCart.interface'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutPageComponent = ({ cards }: { cards: CardType[] }) => {
    const { books, products } = useTypedSelector(state => state.cart)
    const { colorMode } = useColorMode()
    const {t} = useTranslation()


    return (
        <>
            <SectionTitle
                title={t('checkout', {ns: "products"})}
                subtitle={t('desc', {ns: 'products'})}
            />
            <Grid gridTemplateColumns={{base: '100%', lg: '70% 30%'}}>
                <GridItem>
                    <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                    <Elements
                        stripe={stripePromise}
                        options={{ appearance: { theme: colorMode === 'dark' ? 'night' : 'stripe' } }}
                    >
                        <CheckoutForm cards={cards} />
                    </Elements>
                </GridItem>
                <GridItem
                    mt={10}
                    borderLeft={'1px'}
                    p={5}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}

                >
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        {t('detail_1', {ns: 'products'})}
                    </Text>
                    {books.map(book => (
                        <Fragment key={book._id}>
                            <OrderedDetailedCart item={book} image={book.image} />
                            <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                        </Fragment>
                    ))}
                    {products.map(product => (
                        <Fragment key={product._id}>
                            <OrderedDetailedCart item={product} image={product.image} />
                            <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                        </Fragment>
                    ))}
                </GridItem>
            </Grid>
        </>
    )
}

export default CheckoutPageComponent


const OrderedDetailedCart = ({ item, image }) => (
    <HStack justify={'space-between'} my={5}>
        <HStack>
            <Box pos={'relative'} w={'60px'} h={'50px'}>
                <Image
                    src={loadImage(item?.image)}
                    fill
                    alt={item.title}
                />
            </Box>
            <Text>{item.productName}</Text>
        </HStack>
        <Text fontWeight={'bold'} color={'facebook.500'}>
            {item.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
        </Text>
    </HStack>
)