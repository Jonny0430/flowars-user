import { Avatar, Box, Button, Center, Divider, Flex, Heading, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, Text, useColorMode, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { enUS, ko, ru, tr, uz } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoReload } from "react-icons/io5";
import ReactStars from 'react-stars';
import { ReviewProps } from './review.props';
import { Form, Formik, FormikValues } from 'formik';
import TextField from '../text-filed/text-filed';
import TextAreaField from '../text-area-field/text-area-field';
import { ProductService } from 'src/service/product.service';
import { useRouter } from 'next/router';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { FaRegEdit } from 'react-icons/fa';

const Review: FC<ReviewProps> = ({ reviews, isLoading }) => {
    const { t } = useTranslation()

    const getLocalLanguage = () => {
        const lng = Cookies.get('i18next');
        if (lng == 'tr') {
            return tr;
        }
        if (lng == 'en') {
            return enUS;
        }
        if (lng == 'uz') {
            return uz;
        }
        if (lng == 'ru') {
            return ru;
        }
        if (lng == 'ko') {
            return ko;
        }
    };

    const { colorMode, toggleColorMode } = useColorMode();
    const [reviewVal, setReviewVal] = useState(val)
    const [reviewId, setReviewId] = useState<string>()
    const { user } = useTypedSelector(state => state.user)
    const { product } = useTypedSelector(state => state.product)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const router = useRouter()

    const onReviewSubmit = async (formikValues: FormikValues) => {
        try {
            if (reviewId) {
                const data = {
                    summary: formikValues.summary,
                    rating: formikValues.rating,
                }

                await ProductService.editReview(data, reviewId)
                toast({ title: 'Successfully edited', status: 'success' })
                setReviewId('');
                onClose()
            } else {
                const response = await ProductService.getReviewByUser({
                    product: product?._id,
                    user: user?.id,
                })

                if (response._id) {
                    setReviewVal({
                        ...reviewVal,
                        summary: response.summary,
                        rating: response.rating
                    })
                    setReviewId(response._id)
                    toast({
                        title: 'Already have review, you can change it now',
                        status: 'warning'
                    })
                } else {
                    const data = {
                        product: product?._id,
                        author: user?.id,
                        rating: formikValues.rating,
                        summary: formikValues.summary
                    }
                    await ProductService.createReview(data)

                    toast({
                        title: 'Successfully created new review',
                        status: 'success'
                    })
                    onClose()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }





    useEffect(() => {
        setReviewVal({
            ...reviewVal,
            name: user?.fullName as string,
            email: user?.email as string
        })
    }, [user])


    return (
        <>
            <Heading mt={10}>{t('review', { ns: 'products' })}</Heading>
            {isLoading ? (
                <Stack>
                    <Skeleton height={'20px'} />
                    <Skeleton height={'20px'} />
                    <Skeleton height={'20px'} />
                </Stack>
            ) : (
                <>
                    {reviews.map((item, idx) => (
                        <Flex
                            key={idx}
                            gap={4}
                            mt={6}
                            borderBottomWidth={'1px'}
                            pb={2}
                        >
                            <Avatar
                                bg={useColorModeValue('gray.200', 'gray.600')}
                                display={{ base: 'none', md: 'block' }}
                                size={'md'}
                                name={item?.author?.fullName}
                                src={item?.author?.avatar}
                            />
                            <Box>
                                <Flex align={'center'} gap={2} mt={1}>
                                    <Text fontWeight={'bold'}>
                                        {item?.author?.fullName}
                                    </Text>
                                    <Text>
                                        {formatDistance(
                                            new Date(item.updatedAt),
                                            new Date(),
                                            {
                                                locale: getLocalLanguage()
                                            }
                                        )}{' '}
                                        {t('ago', { ns: 'products' })}
                                    </Text>
                                </Flex>
                                <ReactStars
                                    edit={false}
                                    value={Number(item.rating)}
                                />
                                <Text mt={2}>{item.summary}</Text>
                            </Box>
                        </Flex>
                    ))}
                </>

            )}
            <Center mt={5} gap={4}>
                <Button
                    size={'sm'}
                    colorScheme='facebook'
                    variant={'outline'}
                    fontWeight={'bold'}
                    gap={2}
                    onClick={onOpen}
                >
                    Create review
                    <Icon as={FaRegEdit} />
                </Button>
                <Button
                    size={'sm'}
                    colorScheme='facebook'
                    variant={'outline'}
                    fontWeight={'bold'}
                    gap={2}
                    onClick={() => router.reload()}
                >
                    Reload review
                    <Icon as={IoReload} />
                </Button>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                >
                    <ModalContent>
                        <ModalCloseButton />
                        <Divider />
                        <Formik
                            initialValues={reviewVal}
                            onSubmit={onReviewSubmit}
                            enableReinitialize

                        >
                            {formik => (
                                <Form>
                                    <ModalBody>
                                        <Text fontWeight={'bold'} mb={'1rem'}>
                                            "Have you registered? Only those who have registered can write their opinions about the product."
                                        </Text>
                                        <Flex gap={2}>
                                            <TextField
                                                name='email'
                                                label='Email'
                                                disabled={true}
                                            />
                                            <TextField
                                                name='name'
                                                label='FullName'
                                                disabled={true}
                                            />
                                        </Flex>
                                        <Box mt={2}>
                                            <ReactStars
                                                edit={true}
                                                size={20}
                                                value={formik.values.rating}
                                                onChange={e => formik.setFieldValue('rating', e)}
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <TextAreaField
                                                name='summary'
                                                label='Comment'
                                                resize='none'
                                                height='150px'
                                                placeholder='Comment.....'
                                            />
                                        </Box>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            h={14}
                                            color={'black'}
                                            bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                                            w={'full'}
                                            isActive
                                            type='submit'
                                        >
                                            {reviewId ? 'Edit' : 'Submit'}
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default Review


const val = {
    email: '',
    name: '',
    rating: 0,
    summary: ''
}