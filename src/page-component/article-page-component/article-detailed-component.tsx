import { Avatar, Box, Card, CardBody, Container, Tag, Heading, HStack, Text, Stack, useColorModeValue } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FC } from 'react'
import ReactStars from 'react-stars'
import { loadImage } from 'src/helpers/image.helper'
import { calculateEstimatedReadingTime } from 'src/helpers/time.helper'
import { ArticleDetailedProps } from './article-page-component.props'



const ArticleDetailedCompomemt: FC<ArticleDetailedProps> = ({ article }): JSX.Element => {


    return (
        <>
            <Card>
                <CardBody>
                    <Box
                        w={'full'}
                        h={{ base: '30vh', lg: '50vh' }}
                        backgroundImage={loadImage(article?.image)}
                        backgroundPosition={'center'}
                        backgroundSize={'cover'}
                        backgroundRepeat={'no-repeat'}
                        pos={"relative"}
                    >
                        <Box pos={'absolute'} top={0} left={0} right={0} bottom={0} bg={`rgba(0,0,0, .5)`} />
                        <Stack
                            justify={'center'}
                            spacing={3}
                            w={{ base: '100%', lg: '70%' }}
                            pl={{ base: 2, lg: 10 }}
                            pos={'relative'}
                            h={'full'}
                        >
                            <Heading>{article?.title}</Heading>
                        </Stack>
                    </Box>
                </CardBody>
            </Card>
            <Container maxW={'7xl'} p="12">
                <Box
                    marginTop={{ base: '1', sm: '5' }}
                    display="flex"
                    flexDirection={{ base: 'column', sm: 'row' }}
                    justifyContent="space-between">
                    <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: '3', sm: '0' }}>
                        <HStack spacing={2} mt={10}>
                            <Tag size={'md'} variant="solid" colorScheme="orange">
                                {article?.category}
                            </Tag>
                        </HStack>
                        <Heading marginTop="1">
                            <Text>
                                {article?.title}
                            </Text>
                        </Heading>
                        <Text
                            marginTop="2"
                            color={useColorModeValue('gray.700', 'gray.200')}
                            fontSize="lg">
                            {article.description}
                        </Text>
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar src={loadImage(article?.author?.avatar)} />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>{article.author?.fullName}</Text>
                                <Text color={'gray.500'}>
                                    {format(new Date(article?.createdAt as Date), 'dd MMM, yyyy')} ·
                                    {calculateEstimatedReadingTime(article?.description as string)}
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ArticleDetailedCompomemt