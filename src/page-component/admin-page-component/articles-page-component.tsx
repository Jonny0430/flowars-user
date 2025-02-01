import { Box, Button, Card, CardBody, Center, Flex, Grid, HStack, IconButton, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import SectionTitle from 'src/components/section-title/section-title'
import { loadImage } from 'src/helpers/image.helper'
import { ArticleType } from 'src/interface/article.interface'
import Image from 'next/image'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import ArticleModal from 'src/components/article-madal/article-modal'
import { PiArticle, PiArticleNyTimes } from 'react-icons/pi'
import { GrArticle } from 'react-icons/gr'

const AdminArticlesPageComponent = () => {
    const [articleValue, setArticleValue] = useState<ArticleType | null>(null)
    const priceBackgroundColor = useColorModeValue('gray.200', 'gray.900')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { articles } = useTypedSelector(state => state.article)
    const { deleteArticles } = useActions()
    const toast = useToast()

    const deleteBooksHandler = (_id: string) => {
        const isAgree = confirm('Are you sure?')

        if (isAgree) {
            deleteArticles({
                articleId: _id,
                callback: () => {
                    toast({
                        title: 'Successfully deleted',
                        position: 'top-right',
                        status: 'success',
                        isClosable: true
                    })
                }
            })
        }
    }

    const editOpenModal = (article: ArticleType) => {
        setArticleValue(article)
        onOpen()
    }

    const createOpenModal = () => {
        setArticleValue(null)
        onOpen()
    }


    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <HStack>
                        <Box w={'50%'}>
                            <Center>
                                <SectionTitle title='Books' subtitle='All articles and managing on platform' fontSize={'2xl'} />
                            </Center>
                        </Box>
                        <Flex w={'50%'} justify={'flex-end'}>
                            <PiArticle fontSize={'50vh'} />
                        </Flex>
                    </HStack>
                </CardBody>
            </Card>
            <Flex mt={5} justify={'flex-end'}>
                <IconButton
                    colorScheme='facebook'
                    aria-label='Search database'
                    icon={<CgAdd />}
                    onClick={createOpenModal}
                />
            </Flex>
            <Grid
                gridTemplateColumns={{ base: 'repeat(100%)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={4}
                rowGap={20}
                mt={5}

            >
                {articles.map(item => (
                    <Box key={item.title} pos={'relative'}>
                        <Box pos={'relative'} w={'full'} h={'250px'}>
                            <Image
                                src={loadImage(item.image)}
                                alt={item?.title as string}
                                fill
                                style={{ objectFit: 'fill', borderRadius: '10px' }}
                            />
                        </Box>
                        <Flex
                            pos={'absolute'}
                            left={2}
                            right={2}
                            borderRadius={'lg'}
                            boxShadow={'dark-lg'}
                            bottom={'-10'}
                            minH={'90px'}
                            p={2}
                            bg={priceBackgroundColor}
                            flexDir={'column'}
                        >
                            <Box>
                                <Text fontSize={'lg'}>{item.title}</Text>
                            </Box>
                            <HStack>
                                <Button w={'full'} rightIcon={<FaTrash />} colorScheme='red' onClick={() => deleteBooksHandler(item._id as string)}>
                                    Delete
                                </Button>
                                <Button w={'full'} rightIcon={<FaRegEdit />} colorScheme='green' onClick={() => editOpenModal(item)}>
                                    Edit
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                ))}
            </Grid>

            <ArticleModal isOpen={isOpen} onClose={onClose} articleValue={articleValue} />
        </>
    )
}

export default AdminArticlesPageComponent
