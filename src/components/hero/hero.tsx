import * as React from 'react';
import {
	chakra,
	Container,
	Stack,
	HStack,
	Text,
	useColorModeValue,
	Button,
	Image,
	Skeleton,
	Box,
	Link,
	Icon
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { GoChevronRight } from 'react-icons/go';
import { MdBolt } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


function Hero() {
	const router = useRouter()
	const { t } = useTranslation()

	return (
		<Container maxW="7xl" px={{ base: 6, md: 3 }} py={20}>
			<Stack direction={{ base: 'column', md: 'row' }} justifyContent="center">
				<Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
					<HStack
						as={Link}
						p={1}
						rounded="full"
						fontSize="sm"
						w="max-content"
						bg={useColorModeValue('gray.300', 'gray.700')}
					>
						<Box
							py={1}
							px={2}
							lineHeight={1}
							rounded="full"
							color="white"
							bgGradient="linear(to-l, #1c0ee9,#d125eb)"
						>
							{t('hero_start_product_2_btn', { ns: 'home' })}
						</Box>
						<HStack spacing={1} alignItems="center" justifyContent="center">
							<Text lineHeight={1}>{t('hero_start_product_3_btn', { ns: 'home' })}</Text>
							<Icon as={GoChevronRight} w={4} h={4} />
						</HStack>
					</HStack>
					<chakra.h1 fontSize="5xl" lineHeight={1.2} fontWeight="bold" textAlign="left">
						{t('hero_title', { ns: 'home' })}<br />
						<chakra.span color="teal">{t('hero_title_1', { ns: 'home' })}</chakra.span>
					</chakra.h1>
					<HStack
						spacing={{ base: 0, sm: 2 }}
						mb={{ base: '3rem !important', sm: 0 }}
						flexWrap="wrap"
					>
						<chakra.button
							w={{ base: '100%', sm: 'auto' }}
							h={12}
							px={6}
							color="white"
							rounded="md"
							mb={{ base: 2, sm: 0 }}
							zIndex={5}
							lineHeight={1}
							bgGradient="linear(to-l, #1c0ee9,#d125eb)"
							_hover={{ bgGradient: 'linear(to-l, #1c0ee9,#d125eb)', opacity: 0.9 }}
						>
							<chakra.span onClick={() => router.push('/articles')}>{t('hero_start_product_btn', { ns: 'home' })}</chakra.span>
							<Icon as={MdBolt} h={4} w={4} ml={1} />
						</chakra.button>
						<Button
							justifyContent="center"
							textAlign={'center'}
							w={{ base: '100%', sm: '220px' }}
							border="1px solid"
							p={3}
							h={12}
							variant={'outline'}
							colorScheme='facebook'
							lineHeight={1.18}
							rounded="md"
							boxShadow="md"
							onClick={() => router.push('/products')}
						>
							{t('hero_start_product_1_btn', { ns: 'home' })}
						</Button>
					</HStack>
				</Stack>
				<Box ml={{ base: 0, md: 5 }} pos="relative">

					<Image
						w={{ base: '100%', lg: "250px" }}
						h={{ base: '100%', lg: "400px" }}
						minW={{ base: 'auto', md: '20rem' }}
						objectFit="cover"
						src={`/flower/ju.jpg`}
						rounded="md"
						fallback={<Skeleton />}
					/>
				</Box>
			</Stack>
		</Container>
	);
}






export default Hero
