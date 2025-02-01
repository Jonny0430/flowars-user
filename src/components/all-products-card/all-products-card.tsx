import { Avatar, Box, Button, Divider, Flex, Heading, HStack, Icon, Image, Stack, Text, useToast } from "@chakra-ui/react"
import { useActions } from "hooks/useActions"
import { useTypedSelector } from "hooks/useTypedSelector"
import { useRouter } from "next/router"
import { BsMinecartLoaded } from "react-icons/bs"
import { FaLocationArrow } from "react-icons/fa"
import { PiGenderIntersexBold } from "react-icons/pi"
import { SiGoogleanalytics } from "react-icons/si"
import ReactStars from "react-stars"
import { loadImage } from "src/helpers/image.helper"
import { AllProductsCardProps } from "./all-products-card.props"
import { useTranslation } from "react-i18next"

const AllProductsCard = ({ product, isMyProduct }: AllProductsCardProps) => {
    const router = useRouter()
    const { addProductCart } = useActions()
    const { products } = useTypedSelector(state => state.cart)
    const toast = useToast()
    const { t } = useTranslation()

    const onDetailedCourse = () => router.push(`/products/${product.slug}`)




    const addProductToCardHandler = () => {
        const existingProduct = products.find(c => c._id === product._id)

        if (existingProduct) {
            toast({
                title: 'Product already exist in cart',
                position: 'bottom',
                status: 'warning'
            })
            return
        }
        addProductCart(product)
        toast({
            title: `${product.productName} ${t('added', {ns: 'products'})}`,
            position: 'bottom-right'
        })
    }


    return (
        <>
            <Box py={4}>
                <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                    <Image
                        src={loadImage(product.image)}
                        alt={product.productName}
                        w={{ base: 'full', md: '250px' }}
                        h={'300px'} borderRadius={'lg'}
                        objectFit={'cover'}
                        onClick={onDetailedCourse}
                        cursor={'pointer'}
                    />
                    <Stack>
                        {!isMyProduct && (
                            <HStack>
                                <Text color={'#e59819'}>{(product.reviewAvg || 0).toFixed(1)}</Text>
                                <ReactStars edit={false} value={product.reviewAvg || 5} color2={"#e59819"} />
                                <Text opacity={'.8'}>({product.reviewCount})</Text>
                            </HStack>
                        )}
                        <Heading fontSize={'xl'}>{product.productName}</Heading>
                        <Text w={'410px'} dangerouslySetInnerHTML={{
                            __html: product?.description as string,
                        }} />
                        {!isMyProduct && (
                            <Flex gap={3} fontSize={'14px'} direction={{ base: 'column', sm: 'row' }}>
                                <Avatar src={product?.author?.fullName} name={product?.author?.fullName} />
                                <Flex align={'center'} gap={1}>
                                    <Icon as={PiGenderIntersexBold} />
                                    <Text>{product.gender}</Text>
                                </Flex>
                                <Flex align={'center'} gap={1}>
                                    <Icon as={FaLocationArrow} />
                                    <Text fontWeight={"bold"}>{product.location}</Text>
                                </Flex>
                                <Flex align={'center'} gap={1}>
                                    <Icon as={SiGoogleanalytics} />
                                    <Text>{product.species}</Text>
                                </Flex>
                            </Flex>
                        )}

                        <Divider />
                        <Flex align={{ base: 'flex-start', md: 'center' }} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
                            <Text fontSize={'xl'} fontWeight={'bold'}>{product.price.toLocaleString('ko-Kr', { style: 'currency', currency: 'KRW' })}</Text>
                            <Flex gap={4} mt={{ base: 5, sm: 0 }}>
                                {!isMyProduct && (
                                    <Button
                                        rightIcon={<BsMinecartLoaded />}
                                        color={'black'}
                                        bgColor={'#FFC196'} _hover={{ bg: '#FF9F6D' }}
                                        variant={'solid'}
                                        onClick={addProductToCardHandler}
                                        isDisabled={products.map(c => c._id).includes(product._id) ? true : false}
                                    >
                                        {t('price', { ns: 'products' })}
                                    </Button>
                                )}
                                <Button
                                    colorScheme="facebook"
                                    variant={'outline'}
                                    onClick={onDetailedCourse}
                                >
                                    {t('detail', { ns: 'products' })}
                                </Button>
                            </Flex>
                        </Flex>
                    </Stack>
                </Flex>
            </Box>
            <Divider />
        </>
    )
}

export default AllProductsCard
