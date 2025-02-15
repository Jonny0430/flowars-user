import { Box, Button, Card, CardBody, Divider, Flex, Heading, Icon, Image, Stack, Tab, TabList, Tabs, Text, useMediaQuery, useToast } from "@chakra-ui/react"
import { format } from 'date-fns'
import { useActions } from "hooks/useActions"
import { useTypedSelector } from "hooks/useTypedSelector"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BsBasket2 } from "react-icons/bs"
import { FaLocationArrow, FaRegCalendarCheck } from "react-icons/fa"
import { MdPlayLesson } from "react-icons/md"
import { PiGenderIntersexBold } from "react-icons/pi"
import { TfiAlarmClock } from 'react-icons/tfi'
import ReactStars from "react-stars"
import { Mentor, Overview, Review } from "src/components"
import { tablist } from "src/config/constants"
import { loadImage } from "src/helpers/image.helper"
import { ProductTypes } from "src/interface/product.interface"
import { ReviewType } from "src/interface/review.interface"
import { ProductService } from "src/service/product.service"
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuFlower2 } from "react-icons/lu";



const DetailedProductComponent = () => {
    const { t } = useTranslation()
    const [tabIndex, setTabIndex] = useState(0)
    const { product } = useTypedSelector(state => state.product)
    const [media] = useMediaQuery('(min-width: 592px)');
    const { user } = useTypedSelector(state => state.user)
    const { products } = useTypedSelector(state => state.cart)
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { addProductCart } = useActions()
    const { push } = useRouter()
    const toast = useToast()



    const tabHandler = async (idx: number) => {
        setTabIndex(idx)
        if (idx == 0 && !products.length) {
            return
        } else if (idx == 1 && !reviews.length) {
            setIsLoading(true)
            const response = await ProductService.getReviews(product?._id)
            setReviews(response)
            setIsLoading(false)
        }
    }

    const navigation = () => {
        if (user?.products?.includes(product?._id as string)) {
            push(`/products/dashboard/${product?.slug}`)
        } else {
            const existingProduct = products.find(c => c._id == product?._id)

            if (existingProduct) {
                toast({
                    title: 'Product already exist in cart',
                    position: 'bottom',
                    status: 'warning',
                });
                return;
            }
            addProductCart(product as ProductTypes)
            toast({
                title: 'Product added successfuly',
                position: 'bottom'
            })
        }

    }


    return (
        <>
            <Box>
                <Card>
                    <CardBody pos={'relative'} p={{ base: 2, md: 5 }}>
                        <Stack direction={{ base: 'column', md: 'row' }} gap={5}>
                            <Box w={{ base: '100%', lg: '60%' }}>
                                <Heading mt={5} fontSize={'3xl'}>
                                    {product?.productName}
                                </Heading>
                                <Text mt={5}>
                                    {product?.availability}
                                </Text>
                                <Stack mt={5} direction={!media ? 'column' : 'row'} gap={1}>
                                    <Flex fontSize={'sm'} align={'flex-end'} gap={1}>
                                        <Text>({product?.reviewAvg.toFixed(1) || 0})</Text>
                                        <ReactStars edit={false} value={product?.reviewAvg || 5} />
                                        <Text>({product?.reviewCount})</Text>
                                    </Flex>
                                    <Flex align={'center'} fontSize={'sm'} gap={1}>
                                        <Icon as={TfiAlarmClock} />
                                        <Text>
                                            Last updated{'  '}
                                            {product?.updatedAt ? format(new Date(product.updatedAt), 'dd MMM, yyyy') : 'No date available'}
                                        </Text>
                                    </Flex>
                                </Stack>
                            </Box>
                            <Box
                                w={{ base: '100%', lg: '39%' }}
                                position={{ base: 'relative', lg: 'absolute' }}
                                right={{ base: 0, lg: 2 }}
                            >
                                <Card variant={'outline'} boxShadow={'dark-lg'}>
                                    <CardBody p={{ base: 2, lg: 5 }}>
                                        <Image
                                            w={'full'}
                                            h={'300px'}
                                            src={loadImage(product?.image)}
                                            alt={product?.productName}
                                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <Stack
                                            mt={5}
                                            direction={'row'}
                                            align={'flex-end'}
                                            justify={'space-between'}
                                        >
                                            <Heading fontSize={'2xl'}>Price</Heading>
                                            <Text fontWeight={'bold'} fontSize={'2xl'}>
                                                {product?.price?.toLocaleString('ko-KR', {
                                                    currency: 'KRW',
                                                    style: 'currency'
                                                })}
                                            </Text>
                                        </Stack>
                                        <Button
                                            mt={5}
                                            w={'full'}
                                            h={14}
                                            color={'black'}
                                            bgColor={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                                            leftIcon={<BsBasket2 />}
                                            onClick={navigation}
                                        >
                                            {user?.products?.includes(product?._id as string)
                                                ? 'Go'
                                                : 'Add to cart'
                                            }
                                        </Button>
                                        <Box mt={3}>
                                            <Flex
                                                justify={'space-between'}
                                                align={'center'}
                                                py={2}
                                                px={2}
                                                fontSize={'17px'}
                                            >
                                                <Flex align={'center'} gap={3}>
                                                    <MdPlayLesson />
                                                    <Text fontWeight={'bold'}>
                                                        {product?.species}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Divider />
                                            <Flex
                                                justify={'space-between'}
                                                align={'center'}
                                                py={2}
                                                px={2}
                                                fontSize={'17px'}
                                            >
                                                <Flex align={'center'} gap={3}>
                                                    <FaRegCalendarCheck />
                                                    <Text fontWeight={'bold'}>
                                                        <Text>{product?.age}</Text>
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Divider />
                                            <Flex
                                                justify={'space-between'}
                                                align={'center'}
                                                py={2}
                                                px={2}
                                                fontSize={'17px'}
                                            >
                                                <Flex align={'center'} gap={3}>
                                                <FaLocationCrosshairs />
                                                    <Text fontWeight={'bold'}>
                                                        {product?.location}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Divider />
                                            <Flex
                                                justify={'space-between'}
                                                align={'center'}
                                                py={2}
                                                px={2}
                                                fontSize={'17px'}
                                            >
                                                <Flex align={'center'} gap={3}>
                                                <LuFlower2 />
                                                    <Text fontWeight={'bold'}>
                                                        {product?.gender}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Divider />
                                            <Flex
                                                justify={'space-between'}
                                                align={'center'}
                                                py={2}
                                                px={2}
                                                fontSize={'17px'}
                                            >
                                            </Flex>
                                            <Divider />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>


                <Tabs
                    mt={5}
                    mb={'5vh'}
                    w={{ base: '100%', lg: '60%' }}
                    orientation={'horizontal'}
                    onChange={tabHandler}
                    defaultValue={tabIndex}
                    isFitted
                    colorScheme="facebook"
                >
                    <TabList>
                        {tablist.map(tab => (
                            <Tab
                                key={tab.name}
                                fontWeight={'bold'}
                                textTransform={'capitalize'}
                                w={'100%'}
                                justifyContent={'center'}
                            >
                                <Icon as={tab.Icon}
                                    mr={2}
                                    display={{ base: 'none', md: 'block' }}
                                />{'  '}
                                {t(tab.name, { ns: 'products' })}
                            </Tab>
                        ))}
                    </TabList>
                    <Box w={'full'}>
                        {tabIndex === 0 && <Overview />}
                        {tabIndex === 1 && <Review reviews={reviews} isLoading={isLoading} />}
                        {tabIndex === 2 && <Mentor />}
                    </Box>
                </Tabs>
            </Box>
        </>
    )
}





export default DetailedProductComponent
