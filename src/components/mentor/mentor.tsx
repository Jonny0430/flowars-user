import { Avatar, Box, Flex, Heading, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FaProductHunt, FaStar } from 'react-icons/fa'
import { loadImage } from 'src/helpers/image.helper'

const Mentor = () => {
    const { t } = useTranslation()
    const { product } = useTypedSelector(state => state.product)



    return (
        <>
            <Heading mt={5}>{t('information', { ns: 'global' })}</Heading>
            <Flex mt={5} gap={5} align={'center'}>
                <Avatar
                    display={{ base: 'none', md: 'block' }}
                    src={loadImage(product?.author?.avatar)}
                    size={'2xl'}
                />
                <Box>
                    <Text fontWeight={'bold'} fontSize={'20px'}>
                        {product?.author?.fullName}
                    </Text>
                    <Text>{product?.author?.role}</Text>
                    <Link href='/contact'><Text>{product?.author?.email}</Text></Link>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        mt={2}
                        gap={2}
                        align={{ base: 'flex-start', md: 'center' }}
                    >
                        <Flex align={'center'} gap={1}>
                            <Icon as={FaStar} color={'facebook.500'} />
                            <Text as={'span'}>5.0 Rating</Text>
                        </Flex>
                        <Flex align={'center'} gap={1}>
                            <Icon as={FaProductHunt} color={'facebook.500'} />
                            <Text as={'span'}>+1000 Product</Text>
                        </Flex>
                        <Flex align={'center'} gap={1}>
                            <Icon as={BsFillPersonPlusFill} color={'facebook.500'} />
                            <Text as={'span'}>+100 Clients</Text>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>
            <Text mt={4}>
                <Box as={'span'} fontWeight={'bold'} color={'facebook.500'}>
                    {product?.author?.fullName ?
                        `${product?.author?.fullName}` : 'No Name'
                    }
                </Box>{'  '}
                {product?.author?.bio}
            </Text>
        </>
    )
}

export default Mentor
