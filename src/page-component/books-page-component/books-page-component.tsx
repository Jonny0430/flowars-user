import { Box, Button, Flex, Grid, HStack, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { useActions } from "hooks/useActions"
import { useTypedSelector } from "hooks/useTypedSelector"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiFillShopping } from "react-icons/ai"
import SectionTitle from "src/components/section-title/section-title"
import { booksCategory } from "src/config/constants"
import { loadImage } from "src/helpers/image.helper"
import { BooksType } from "src/interface/books.interface"

const BooksPageComponent = () => {
    const { t } = useTranslation()
    const [filter, setFilter] = useState<string>('all-categories')
    const backroundColor = useColorModeValue('gray.200', 'gray.900')
    const { books } = useTypedSelector(state => state.books)
    const cart = useTypedSelector(state => state.cart)
    const { addBookToCart } = useActions()
    const toast = useToast()

    const filteredData = useCallback(() => {
        switch (filter) {
            case 'pets':
                return books.filter(c => c.category === 'pets')
            case 'food':
                return books.filter(c => c.category === 'food')
            case 'healthcare':
                return books.filter(c => c.category === 'healthcare')
            case 'toys':
                return books.filter(c => c.category === 'toys')
            case 'accessories':
                return books.filter(c => c.category === 'accessories')
            case 'training':
                return books.filter(c => c.category === 'training')
            default:
                return books
        }
    }, [filter, books])

    const addToCart = (book: BooksType) => {
        const existingProduct = cart.books.find(c => c._id === book._id)
        if (existingProduct) {
            toast({
                title: 'Book already exist in cart',
                position: 'top',
                status: 'warning'

            })
            return
        }
        addBookToCart(book)
        toast({
            title: `${book.title}: ${t('book_added', {ns: 'books'})}`,
            position: 'top'
        })
    }


    return (
        <Box mb={20}>
            <SectionTitle p={4} textAlign={'center'} title={t('title', { ns: 'books' })} subtitle={t('description', { ns: 'books' })} />

            <Flex justify={'center'} mt={5} flexWrap={'wrap'}>
                {booksCategory.map((item, index) => (
                    <Button
                        key={index}
                        colorScheme="facebook"
                        variant={filter == item.id ? 'solid' : "outline"}
                        borderRadius={0}
                        borderLeftRadius={index == 0 ? 'md' : 0}
                        borderRightRadius={booksCategory.length - 1 === index ? 'md' : 0}
                        onClick={() => setFilter(item.id)}
                    >
                        {t(item.label, { ns: 'books' })}{'  '}
                    </Button>
                ))}
            </Flex>

            <Grid gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                rowGap={20}
                gap={4}
                mt={8}>
                {filteredData().map(item => (
                    <motion.div key={item._id} layout>
                        <Box pos={'relative'}>
                            <Box pos={'relative'} w='full' h={'250px'}>
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
                                boxShadow={'dark-lg'}
                                bg={backroundColor}
                                left={2}
                                right={2}
                                bottom={-10}
                                p={2}
                                justifyContent={'space-between'}


                            >
                                <Box>
                                    <Text fontSize={'md'}>{item.title}</Text>
                                    <Text fontWeight={'bold'} fontSize={'2xl'}>
                                        {item.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                                    </Text>
                                </Box>
                                <Button
                                    colorScheme="facebook"
                                    rightIcon={<AiFillShopping />}
                                    onClick={() => addToCart(item)}
                                    isDisabled={cart.books.map(c => c._id).includes(item._id) ? true : false}
                                >
                                    {t('buy', {ns: 'books'})}
                                </Button>
                            </HStack>
                        </Box>
                    </motion.div>
                ))}
            </Grid>
        </Box>
    )
}

export default BooksPageComponent



