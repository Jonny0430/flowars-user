import { Avatar, Box, Button, Card, CardBody, Divider, Grid, Heading, HStack, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { FC } from 'react'
import Carousel from 'react-multi-carousel'
import { testimonialsCarousel } from 'src/config/carousel'
import { calculateEstimatedReadingTime } from 'src/helpers/time.helper'
import { ArticlePageComponentProps } from './article-page-component.props'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { loadImage } from 'src/helpers/image.helper'
import ArticleDetailedCompomemt from './article-detailed-component'




const ArticlePageComponent: FC<ArticlePageComponentProps> = ({ articles }): JSX.Element => {
    const cardBackroundColor = useColorModeValue('white', 'gray.900')






    return (
        <>
            <Card>
                <CardBody>
                    <Carousel responsive={testimonialsCarousel}>
                        {articles.map(item => (
                            <Box
                                key={item._id}
                                w={'full'}
                                h={{ base: '40vh', lg: '60vh' }}
                                backgroundImage={loadImage(item?.image)}
                                backgroundPosition={'center'}
                                backgroundSize={'cover'}
                                backgroundRepeat={'no-repeat'}
                                pos={'relative'}
                            >
                                <Link href={`/articles/${item.slug}`}>
                                    <Box pos={'absolute'} top={0} left={0} right={0} bottom={0} bg={'rgba(0,0,0, .7)'} />
                                    <Stack
                                        justify={'center'}
                                        spacing={3}
                                        w={{ base: '100%', lg: '70%' }}
                                        pl={{ base: 2, lg: 10 }}
                                        pos={'relative'}
                                        h={'full'}
                                    >
                                        <Heading color={'white'}>{item.title}</Heading>
                                        <HStack>
                                            <Avatar src={loadImage(item?.author?.avatar)} />
                                            <Box>
                                                <Text color={'white'}>{item?.author?.fullName}</Text>
                                                <Text color={'gray.500'}>
                                                    {format(new Date(item?.createdAt as Date), 'dd MMM, yyyy')} · {' '}
                                                    {calculateEstimatedReadingTime(item?.description as string)}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </Stack>
                                </Link>
                            </Box>
                        ))}
                    </Carousel>
                </CardBody>
            </Card>

            <Grid gridTemplateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={4}>
                {articles?.map(item => (
                    <Box key={item._id} w={'full'} bg={cardBackroundColor} boxShadow={'2xl'} rounded={'md'} p={6}>
                        <Link href={`/articles/${item.slug}`}>
                            <Image
                                src={loadImage(item?.image)}
                                alt={item?.title}
                                style={{ borderRadius: "10px", objectFit: 'cover' }}
                                w={'full'}
                                h={'300px'}
                                mb={5}
                            />
                            <Stack>
                                <Heading fontSize={'2xl'} fontFamily={'body'}>
                                    {item?.title}
                                </Heading>
                                <Button w={'fit-content'} variant={'solid'} bgColor='#4cea54'>
                                    <Text color={'black'}>{item.category}</Text>
                                </Button>
                            </Stack>
                            <Divider my={5} />
                            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                <Avatar src={item?.author?.avatar} />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600}>{item.author?.fullName}</Text>
                                    <Text color={'gray.500'}>
                                        {format(new Date(item?.createdAt as Date), 'dd MMM, yyyy')} ·
                                        {calculateEstimatedReadingTime(item?.description as string)}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Link>
                    </Box>
                ))}
            </Grid>
        </>
    )
}

export default ArticlePageComponent


