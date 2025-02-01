import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Avatar,
} from '@chakra-ui/react'
import Image from 'next/image'

import { useTranslation } from 'react-i18next'
import Carousel from 'react-multi-carousel'
import { articlesCarousel } from 'src/config/carousel'
import SectionTitle from '../section-title/section-title'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { loadImage } from 'src/helpers/image.helper'
import { format } from 'date-fns'
import {useRouter} from 'next/router'


function Articles() {
  const { t } = useTranslation()
  const { articles } = useTypedSelector(state => state.article)
  const router = useRouter()



  return (
    <>
      <SectionTitle mt={4} textAlign={'center'} title={t('articles', { ns: 'home' })} subtitle={t('articles_description', { ns: 'home' })} />

      <Carousel responsive={articlesCarousel} arrows={true} showDots={false} autoPlaySpeed={5000} infinite>
        {articles.map((article, idx) => (
          <Center py={6}>
            <Box
              maxW={'445px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              rounded={'md'}
              p={6}
              mx={2}
              overflow={'hidden'}
              key={idx}>
              <Box h={{ base: "230", lg: '250px' }} bg={'gray.100'} onClick={() => router.push(`/articles/${article.slug}`)} mt={-6} mx={-6} mb={6} pos={'relative'} cursor={"pointer"}>
                <Image
                  src={loadImage(article?.image)}
                  // style={{ objectFit: 'cover' }}
                  fill
                  alt="Example"
                />
              </Box>
              <Stack>
                <Heading
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={'xl'}
                  fontFamily={'body'}>
                  {article?.title?.slice(0, 10)}...
                </Heading>
                <Text color={useColorModeValue('gray.500', 'whiteAlpha.600')}>
                  {article?.description?.slice(0, 35)}...
                </Text>
              </Stack>
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar src={loadImage(article?.author?.avatar)} />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>{article?.author?.fullName}</Text>
                  <Text color={'gray.500'}>
                    {format(new Date(article?.createdAt as Date), 'dd MMMM, yyyy')}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        ))}
      </Carousel>


    </>
  )
}

export default Articles


