import {
    Avatar,
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

const reviewData = [
    {
        avatarSrc: '/images/draft.png',
        review: `"An Absolute Game-Changer for Plant Lovers!"
        "I've been using FlowerShop for the past few months, and it's completely transformed the way I take care of my plants. The app is easy to use, and the community is super supportive. I especially love the plant health tracking feature. It helps me keep track of my plant's watering and sunlight needs. Highly recommend it to all plant parents!"`,
        stars: 5,
        userName: 'Max',
        dateTime: '2 months ago'
    },
    {
        avatarSrc: '',
        review: `"A Must-Have for Every Flower Lover!"
        "As a first-time plant owner, FlowerShop has been a lifesaver. The resources and tips are spot-on, and the ability to track my plant's milestones has been incredibly helpful. The community of fellow plant lovers is also fantastic. I feel like I’m part of a big, loving family. If you're looking for an app that truly cares about flowers and their owners, this is it!"`,
        stars: 5,
        userName: 'Mohi',
        dateTime: '4 months ago'

    }
];

const ratingSummary = [
    { id: 1, rating: 5, percentage: '100%' },
    { id: 2, rating: 4, percentage: '0%' },
    { id: 3, rating: 3, percentage: '0%' },
    { id: 4, rating: 2, percentage: '0%' },
    { id: 5, rating: 1, percentage: '0%' }
];

const TeamReviewComponent = () => {
    return (
        <Container maxW="5xl" p={{ base: 5, md: 10 }}>
            <Box mb={8}>
                <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={3}>
                    Audience rating summary
                </Heading>
                <Stack spacing={3}>
                    <Box>
                        <HStack spacing={3}>
                            <Flex>
                                <Flex alignItems="center" justifyContent="start">
                                    {Array.from(Array(5).keys()).map((id) => {  // Ensure 5 stars are rendered
                                        return <Star key={id} fillColor="#EACA4E" />;
                                    })}
                                </Flex>
                            </Flex>

                            <Text fontWeight="bold" fontSize="lg">
                                5.0
                            </Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="md">
                            3 ratings
                        </Text>
                    </Box>

                    <Stack direction="column" spacing={1}>
                        {ratingSummary.map((data) => {
                            return (
                                <HStack key={data.id} spacing={5}>
                                    <Text fontWeight="bold" fontSize="md">
                                        {data.rating}
                                    </Text>
                                    <Box w={{ base: '100%', md: '100%' }}>
                                        <Box w="100%" bg={useColorModeValue('gray.300', 'gray.600')} rounded="md">
                                            <Box w={data.percentage} h={3} bg="yellow.400" rounded="md"></Box>
                                        </Box>
                                    </Box>
                                    <Text fontWeight="bold" fontSize="md">
                                        {data.percentage}
                                    </Text>
                                </HStack>
                            );
                        })}
                    </Stack>
                </Stack>
            </Box>

            <Box>
                <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={4}>
                    Audience reviews
                </Heading>
                <Stack direction="column" spacing={5}>
                    {reviewData.map((review, index) => {
                        return (
                            <>
                                <Box key={index} maxW="2xl">
                                    <HStack spacing={3} mb={2}>
                                        <Avatar size="md" name={review.userName} src={review.avatarSrc} />
                                        <Stack direction="column" spacing={2}>
                                            <Text fontWeight="bold" fontSize="md">
                                                {review.userName}
                                            </Text>
                                            <Flex alignItems="center" justifyContent="start">
                                                {Array.from(Array(review.stars).keys()).map((id) => {  // Display the correct number of stars
                                                    return <Star key={id} fillColor="#EACA4E" />;
                                                })}
                                                {Array.from(Array(5 - review.stars).keys()).map((id) => {  // Fill the remaining stars
                                                    return <Star key={id + review.stars} fillColor="#e2e8f0" />;
                                                })}
                                            </Flex>
                                        </Stack>
                                    </HStack>
                                    <Text
                                        color={useColorModeValue('gray.700', 'gray.400')}
                                        fontSize="0.87rem"
                                        textAlign="left"
                                        lineHeight="1.375"
                                        fontWeight="300"
                                    >
                                        {review.review}
                                    </Text>
                                </Box>
                                <Divider />
                            </>
                        );
                    })}
                </Stack>
            </Box>
        </Container>
    );
};

const Star = ({ fillColor }: { fillColor: string }) => {
    return (
        <svg
            style={{
                width: '1rem',
                height: '1rem',
                fill: fillColor,
                marginRight: '0.25rem'
            }}
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
        </svg>
    );
};

export default TeamReviewComponent;
