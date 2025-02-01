import { Box, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsChatSquare, BsChatSquareQuote, BsCheck } from 'react-icons/bs'
import { CiCircleQuestion } from 'react-icons/ci';


const Overview = () => {
    const { t } = useTranslation()
    const { product } = useTypedSelector(state => state.product)


    return (
        <>
            <Heading mt={10}>{t('overview', { ns: 'products' })}</Heading>

            <Box mt={3} dangerouslySetInnerHTML={{
                __html: product?.description as string,
            }} />
            <Grid
                mt={5}
                gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            >
                {product?.requirements?.map((text, idx) => (
                    <Flex key={idx} gap={3} align={'center'} my={1}>
                        <Icon as={BsCheck} w={6} h={6} borderRadius={'100%'} />
                        <Text>{text}</Text>
                    </Flex>
                ))}
            </Grid>
            <Heading mt={10}>{t('required', { ns: 'products' })}</Heading>
            <Box mt={3}>
                {product?.requirements?.map((text, index) => (
                    <Flex key={index} gap={2} py={1} align={'center'}>
                        <Icon as={BsChatSquareQuote} w={5} h={5} />
                        <Text>{text}</Text>
                    </Flex>
                ))}
            </Box>

        </>
    )
}

export default Overview
