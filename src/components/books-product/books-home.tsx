import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Avatar,
    Grid,
    HStack,
    useToast,
    Button,
} from '@chakra-ui/react'
import Image from 'next/image'

import { useTranslation } from 'react-i18next'
import Carousel from 'react-multi-carousel'
import { articlesCarousel } from 'src/config/carousel'
import SectionTitle from '../section-title/section-title'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { loadImage } from 'src/helpers/image.helper'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useActions } from 'hooks/useActions'
import { AiFillShopping } from 'react-icons/ai'
import { BooksType } from 'src/interface/books.interface'

const BooksHomePageComponent = () => {
    const { t } = useTranslation()
    const backroundColor = useColorModeValue('gray.200', 'gray.900')
    const { books } = useTypedSelector(state => state.books)
    const cart = useTypedSelector(state => state.cart)
    const { addBookToCart } = useActions()
    const toast = useToast()

    // Optimizing cart books check
    const cartBookIds = new Set(cart.books.map(c => c._id))

    const addToCart = (book: BooksType) => {
        if (cartBookIds.has(book._id)) {
            toast({
                title: t('book_already_in_cart', { ns: 'books' }),
                position: 'top',
                status: 'warning',
            })
            return
        }
        addBookToCart(book)
        toast({
            title: `${book.title}: ${t('book_added', { ns: 'books' })}`,
            position: 'top',
        })
    }

    return (
        <>
            <SectionTitle
                mt={4}
                textAlign="center"
                title={t('title', { ns: 'books' })}
                subtitle={t('description', { ns: 'books' })}
            />
            <Carousel
                responsive={articlesCarousel}
                arrows={true}
                showDots={false}
                autoPlaySpeed={5000}
                infinite
            >
                {books.map((item) => (
                    <Box
                        key={item._id}
                        as={motion.div}
                        layout
                        p={4}
                        borderRadius="md"
                        overflow="hidden"
                        pos="relative"
                    >
                        <Box w="full" h="300px" pos="relative">
                            <Image
                                src={loadImage(item.image)}
                                alt={item.title}
                                fill
                                style={{ borderRadius: '10px' }}
                            />
                        </Box>
                        <HStack
                            pos={'absolute'}
                            minH={'90px'}
                            borderRadius={'lg'}
                            bg={backroundColor}
                            left={2}
                            right={2}
                            bottom={15}
                            p={2}
                            justifyContent={'space-between'}
                        >
                            <Box>
                                <Text fontSize="md">{item.title}</Text>
                                <Text fontWeight="bold" fontSize="2xl">
                                    {item.price.toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                    })}
                                </Text>
                            </Box>
                            <Button
                               color={"black"}
                                bg={'#4cea54'}  _hover={{ bg: '#06e911e0' }}
                                rightIcon={<AiFillShopping />}
                                onClick={() => addToCart(item)}
                                isDisabled={cartBookIds.has(item._id)}
                            >
                                {t('buy', { ns: 'books' })}
                            </Button>
                        </HStack>
                    </Box>
                ))}
            </Carousel>
        </>
    )
}

export default BooksHomePageComponent
