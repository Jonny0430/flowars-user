import { Box, Button, Divider, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorMode, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaGithub, FaRegCommentDots, FaTelegram } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'
import { HiHeart } from 'react-icons/hi'
import { RiLogoutBoxLine } from 'react-icons/ri'
import ReactStars from 'react-stars'
import TextAreaField from 'src/components/text-area-field/text-area-field'
import TextField from 'src/components/text-filed/text-filed'
import { DarkLogo, LightLogo } from 'src/icons'
import { ProductService } from 'src/service/product.service'

const Header = () => {
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
        <Box
            position={'fixed'}
            top={0}
            left={0}
            zIndex={99}
            right={0}
            h={'11vh'}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            boxShadow={useColorModeValue('xs', 'dark-lg')}
        >
            <Stack
                direction={'row'}
                h={'10vh'}
                w={'90%'}
                mx={'auto'}
                align={'center'}
                justify={'space-between'}
            >
                <Stack gap={{ base: 0, md: 2 }} direction={'row'}>
                    <Link href={'/'}>
                        {colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
                    </Link>
                </Stack>

                <Stack direction={'row'} align={'center'}>
                    <IconButton
                        colorScheme='green'
                        variant={'outline'}
                        onClick={toggleColorMode}
                        icon={
                            colorMode == 'light' ? (
                                <BsFillMoonStarsFill />
                            ) : (<FiSun />)
                        }
                        aria-label={'moon'}
                    />
                    <IconButton
                        icon={<FaTelegram />}
                        onClick={() => window.open('https://t.me/ISMOILOV_8686')}
                        aria-label='comments'
                        variant={'outline'}
                        colorScheme='telegram'
                        display={{ base: 'none', md: 'flex' }}
                    />
                    <IconButton
                        icon={<FaGithub />}
                        onClick={() => window.open('https://github.com/IsmoilovMax')}
                        aria-label='sourse'
                        variant={'outline'}
                        colorScheme='github'
                        display={{ base: 'none', md: 'flex' }}
                    />
                    <IconButton
                        onClick={onOpen}
                        icon={<FaRegCommentDots />}
                        aria-label={'comments'}
                        variant={'outline'}
                        colorScheme={'green'}
                        display={{ base: 'none', md: 'flex' }}
                    />
                    <Button
                        rightIcon={<HiHeart color='red' />}
                        onClick={() => window.open('https://github.com/IsmoilovMax')}
                        colorScheme='green'
                        variant={'outline'}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        Sponsor
                    </Button>
                    <IconButton
                        onClick={() => router.push(`/products/`)}
                        icon={<RiLogoutBoxLine />}
                        aria-label='comments'
                        variant={'solid'}
                        colorScheme='red'
                    />
                </Stack>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                >
                    <ModalContent>
                        <ModalHeader>Izoh</ModalHeader>
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
                                            Product haqida o'z fikringizni yozishingiz mumkin
                                        </Text>
                                        <Flex gap={2}>
                                            <TextField
                                                name='email'
                                                label='Email manzilingiz'
                                                disabled={true}
                                            />
                                            <TextField
                                                name='name'
                                                label='Ismingiz'
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
                                                label='Izohingiz'
                                                resize='none'
                                                height='150px'
                                                placeholder='Comment.....'
                                            />
                                        </Box>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            h={14}
                                            colorScheme='facebook'
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
        </Box>
    )
}

export default Header


const val = {
    email: '',
    name: '',
    rating: 0,
    summary: ''
}