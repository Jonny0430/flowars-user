import { Alert, AlertIcon, Box, Button, Divider, Flex, Grid, GridItem, Heading, HStack, IconButton, Input, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillTrash2Fill } from 'react-icons/bs'
import $axios from 'src/api/axios'
import { ErrorAlert } from 'src/components/error-alert/error-alert'
import SectionTitle from 'src/components/section-title/section-title'
import { getPaymentUrl } from 'src/config/api.config'
import { loadImage } from 'src/helpers/image.helper'
import { getTotalPrice } from 'src/helpers/total-price.helper'


const CartPageComponent = () => {
    const [active, setActive] = useState<boolean>(false)
    const [coupon, setCoupon] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isLoading, setIsloading] = useState<boolean>(false)
    const cart = useTypedSelector(state => state.cart)
    const router = useRouter()
    const {t} = useTranslation()
    const { editProductCart, editBooksCart } = useActions()

    const getSubtitle = () => {
        let textProduct: string = '';
        let textBooks: string = '';
        const products = cart.products;
        const books = cart.books;

        textProduct = products.length ? `${products.length} Product in cart` : '';
        textBooks = books.length ? `${books.length} Books in cart` : '';
        const isAnd = products.length ? true : false

        return `${textProduct} ${isAnd ? 'and' : ''} ${textBooks}`
    }

    const applyCouponHandler = async () => {
        if (active) return

        try {
            setIsloading(true)
            const { data } = await $axios.get(`${getPaymentUrl('apply-coupon')}/${coupon}`)
            if (data.valid) {
                setActive(true)
                const newArr = cart.products.map(item => ({
                    ...item,
                    price: item?.price - (data.percent_off / 100) * item?.price,
                }))
                if (cart.books) {
                    const newArr = cart.books.map(item => ({
                        ...item,
                        price: item.price - (data.percent_off / 100) * item.price,
                    }))
                    editBooksCart(newArr)
                } else {
                    return
                }
                editProductCart(newArr)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            setError('Coupon is not valid')
        }
    }

    return (
        <>
            <SectionTitle title={t('shopping_cart', {ns: "products"})} subtitle={getSubtitle()} />
            <Grid gridTemplateColumns={{base: "100%", lg: '70% 30%'}} gap={5}>
                <GridItem>
                    <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                    {cart.books.map(book => (
                        <Fragment key={book._id}>
                            <ShoppingCartCard item={book} />
                            <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                        </Fragment>
                    ))}
                    {cart.products.map(book => (
                        <Fragment key={book._id}>
                            <ShoppingCartCard item={book} />
                            <Divider my={5} borderColor={useColorModeValue('gray.500', 'gray.500')} />
                        </Fragment>
                    ))}
                </GridItem>
                <GridItem>
                    <Stack
                        mt={5}
                        border={'1px'}
                        borderRadius={'md'}
                        borderColor={useColorModeValue('gray.500', 'gray.500')}
                        p={5}

                    >
                        <Text fontWeight={'bold'} fontSize={'xl'} opacity={'.7'}>
                           {t('total', {ns: "products"})} :
                        </Text>
                        <Heading>
                            {getTotalPrice(cart.products, cart.books).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                        </Heading>
                        <Button
                            h={14}
                            colorScheme='facebook'
                            onClick={() => router.push('/shop/success')}
                        >
                            {t('checkout', {ns: "products"})}
                        </Button>
                        <Divider borderColor={useColorModeValue('gray.500', 'gray.500')} />
                        {error && (
                            <ErrorAlert title={error} clearHandler={() => setError('')} />
                        )}
                        {active && (
                            <Alert status='success'>
                                <AlertIcon />
                                {t('coupon', {ns: 'products'})}
                            </Alert>
                        )}
                        <Text fontWeight={'bold'} fontSize={'xl'} opacity={'.7'}>
                            {t('promotions', {ns: 'products'})}
                        </Text>
                        <Box pos={'relative'} mt={2}>
                            <Input
                                w={'full'}
                                bg={'white'}
                                color={'gray.900'}
                                placeholder='Enter coupon'
                                _placeholder={{ color: 'gray.500' }}
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}

                            />
                            <Button
                                pos={'absolute'}
                                right={0}
                                top={0}
                                colorScheme={'facebook'}
                                zIndex={999}
                                border={10}
                                onClick={applyCouponHandler}
                                isLoading={isLoading}
                            >
                                {t("apply", {ns: "products"})}
                            </Button>
                        </Box>
                    </Stack>
                </GridItem>
            </Grid >
        </>
    )
}

export default CartPageComponent

const ShoppingCartCard = ({ item }) => {
    const { removeBookFromCart, removeProductFromCart } = useActions()

    const removeCartItem = (_id: string) => {
        removeProductFromCart(item._id)
        removeBookFromCart(item._id)
    }

    return (
        <Flex justify={'space-between'} direction={{base: 'column', lg: 'row'}}>
            <HStack>
                <Box pos={'relative'} w={'150px'} h={'100px'}>
                    <Image
                        fill
                        src={loadImage(item.image)}
                        alt={item.title}
                        style={{ borderRadius: '10px' }}
                    />
                </Box>
                <Stack>
                    <Heading fontSize={'xl'}>{item.title}</Heading>
                    <Text>by Admin Platform</Text>
                    <HStack>
                        <Tag colorScheme='facebook'>Books</Tag>
                        <Tag colorScheme='facebook'>Usefull</Tag>
                        <Tag colorScheme='facebook' textTransform={'capitalize'}>
                            {item.category}
                        </Tag>
                    </HStack>
                </Stack>
            </HStack>
            <Stack spacing={0}>
                <Text color={useColorModeValue('', 'facebook.300')} fontSize={'2xl'} fontWeight={'bold'}>
                    {item.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                </Text>
                <IconButton
                    w={'10px'}
                    aria-label='remove'
                    icon={<BsFillTrash2Fill />}
                    colorScheme='red'
                    onClick={() => removeCartItem(item._id as string)}
                ></IconButton>
            </Stack>
        </Flex>
    )
}