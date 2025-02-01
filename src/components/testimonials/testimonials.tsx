import { Center, Icon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ImQuotesRight } from 'react-icons/im';
import Carousel from "react-multi-carousel";
import { testimonialsCarousel } from "src/config/carousel";
import SectionTitle from "../section-title/section-title";

function Testimonials() {
  const { t } = useTranslation()

  return (
    <>
      <SectionTitle textAlign={'center'} title={t('testimonials_title', { ns: 'home' })} subtitle={t('testimonials_description', { ns: 'home' })} />

      <Carousel responsive={testimonialsCarousel} arrows={true} showDots={false} autoPlaySpeed={5000} infinite>
        {reviewData.map((item, index) => (
          <Center key={index} flexDirection={'column'} maxW={'container.sm'} mx={'auto'}>
            <Icon as={ImQuotesRight} fontSize={100} />
            <Text mt={5} textAlign={'center'}>
              {item.review}
            </Text>
            <Text fontSize={'xl'} fontWeight={'bold'} mt={3}>
              {item.userName}
            </Text>
          </Center>
        ))}
      </Carousel>
    </>
  )
}

export default Testimonials


const reviewData = [
  {
    avatarSrc: '/images/draft.png',
    review: `"An Absolute Game-Changer for Pet Owners!"
"I've been using PetStore for the past few months, and it's completely transformed the way I interact with my pet. The app is easy to use, and the community is super supportive. I especially love the pet health tracking feature. It helps me keep track of my pet's diet and exercise routine. Highly recommend it to all pet parents!"`,
    stars: 5,
    userName: 'Khan',
    dateTime: '2 months ago'
  },
  {
    avatarSrc: '',
    review: `"Innovative, Fun, and Easy to Use!"
"I can't say enough good things about PetStore! Not only is it packed with useful tools, but it's also fun to use. My dog’s health and happiness have improved, and I feel more connected to her needs. From activity tracking to pet-friendly events, this app has it all. It's definitely the go-to app for pet lovers everywhere."`,
    stars: 5,
    userName: 'Leo',
    dateTime: '1 months ago'
  },
  {
    avatarSrc: '',
    review: `"A Must-Have for Every Pet Lover!"
"As a first-time pet owner, PetStore has been a lifesaver. The resources and tips are spot-on, and the ability to track my pet’s milestones has been incredibly helpful. The community of fellow pet owners is also fantastic. I feel like I’m part of a big, loving family. If you're looking for an app that truly cares about pets and their owners, this is it!"`,
    stars: 5,
    userName: 'Zac',
    dateTime: '4 months ago'
  }
];