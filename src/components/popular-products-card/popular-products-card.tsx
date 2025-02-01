import { Stack, HStack, Text, Flex, Icon, Divider, Box, useColorModeValue, Button, Card, CardBody } from "@chakra-ui/react";
import ReactStars from "react-stars";
import Image from "next/image";
import { PopularProductsCardProps } from './popular-products-card.props'
import { loadImage } from "src/helpers/image.helper";
import { TfiLocationPin } from "react-icons/tfi";
import { TbCategoryPlus } from "react-icons/tb";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";


const PopularProductsCard = ({ item }: PopularProductsCardProps) => {
    const router = useRouter()
    const {t} = useTranslation()


    return (
        <Stack px={2}>
            <Card>
                <CardBody bg={useColorModeValue("", 'blackAlpha.500')}>
                    <Stack
                        key={item.productName}
                        spacing={3}
                        p={5}
                        cursor={'pointer'}
                        border={'1px'}
                        borderRadius={'lg'}
                        borderColor={useColorModeValue('#FF9F6D', 'gray')}
                        boxShadow={useColorModeValue('xl', '')}
                    >

                        <Card>
                            <CardBody p={0}>
                                <Box pos={'relative'} w={'full'} h={'160'}>
                                    <Image
                                        src={loadImage(item.image)}
                                        alt={item.productName as string}
                                        fill
                                        style={{borderRadius: '10px' }}

                                    />
                                </Box>
                            </CardBody>
                        </Card>

                        <HStack>
                            <Text color={'#e59819'}>{item.reviewAvg?.toFixed(1) || 5}</Text>
                            <ReactStars edit={false} value={item.reviewAvg || 5} color2={"#e59819"} />
                            <Text textColor={'InactiveBorder'} opacity={'.8'}>({item.reviewCount})</Text>
                        </HStack>
                        <HStack justifyContent={'space-between'} gap={3}>
                            <Flex align={'center'} gap={1}>
                                <Icon as={TbCategoryPlus} />
                                <Text fontWeight={'hairline'}>Name: {item.productName}</Text>
                            </Flex>
                            <Flex align={'center'} gap={1}>
                                <Icon as={TfiLocationPin} />
                                <Text>{item.location}</Text>
                            </Flex>
                        </HStack>
                        <Divider />
                        <Flex justify={'space-between'} align={'center'}>
                            <HStack align={'center'}>
                                <Button gap={2} bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={useColorModeValue('', 'blackAlpha.800')} onClick={() => router.push(`/products/${item.slug}`)}>{t('detail', {ns: 'products'})}<BiMessageRoundedDetail /></Button>
                            </HStack>
                            <Button bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={useColorModeValue('', 'blackAlpha.800')} variant={'solid'}>{item?.price?.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</Button>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>
        </Stack>
    )
}

export default PopularProductsCard
