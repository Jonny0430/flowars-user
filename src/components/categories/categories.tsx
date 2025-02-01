import { categoryCarousel } from "src/config/carousel";
import SectionTitle from "../section-title/section-title"
import Carousel from 'react-multi-carousel';
import { categories } from "src/config/constants";
import { Avatar, Box, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

function Categories() {
    const backgroundColor = useColorModeValue('gray.100', 'gray.900')
    const fill = useColorModeValue('#020288', 'gray.600')
    const { t } = useTranslation()
    const router = useRouter()


    return (
        <>
            <SectionTitle textAlign={'center'} title={t('category_title', { ns: 'home' })} subtitle={t('category_description', { ns: 'home' })} />
            <Carousel responsive={categoryCarousel} showDots={false} arrows={false} autoPlay={true} autoPlaySpeed={2000} infinite>
                {categories.map(item => (
                    <Box
                        key={item.id}
                        minH={'200px'}
                        mx={2}
                        backgroundColor={backgroundColor}
                        textAlign={'center'}
                        p={5}
                        borderRadius={'lg'}
                        cursor={'pointer'}
                    >
                        <Avatar src={item.image} w={20} h={20} fill={fill} onClick={() => router.push('/products')} />
                        <Text mt={2} fontSize={'20px'}>{t(item.name, { ns: 'home' })}</Text>
                    </Box>
                ))}
            </Carousel>
        </>
    )
}

export default Categories
