import {
    Box,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    StackProps,
    Tag,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import TeamReviewComponent from './team-reviews-component';

const companies = [
    {
        title: 'ADMIN',
        alt: 'company image',
        role: 'Software Engineer & PetStore Founder',
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React.js",
            "Next.js",
            "Redux",
            "Vite",
            "MUI (Material-UI)",
            "Tailwind CSS",
            "Node.js",
            "NestJS",
            "Express.js",
            "SCSS",
            "Responsive Design",
            "GraphQL",
            "Git",
            "GitHub",
            'Stripe'
        ],
        logo: '/images/image.png'
    },
    {
        title: 'AGENT',
        alt: 'company image',
        role: 'Product Manager',
        skills: ['Market Analysis', 'Product Strategy Development', 'Financial Modeling', 'KPI Setting and Monitoring'],
        logo: '/images/agent.png'
    },
];

const TeamPageComponent = () => {
    return (
        <>
            <Container maxW="4xl" p={{ base: 5, md: 12 }}>
                <VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]}>
                    {companies.map(({ title, role, skills, logo, alt }, index) => (
                        <Box
                            key={index}
                            px={4}
                            py={5}
                            borderWidth="1px"
                            _hover={{ shadow: 'lg' }}
                            bg={useColorModeValue('white', 'gray.800')}
                            position="relative"
                            rounded="md"
                        >
                            <Flex justifyContent="space-between">
                                <Flex>
                                    <Image
                                        rounded="full"
                                        w={40}
                                        h={20}
                                        objectFit="cover"
                                        // fallbackSrc="https://via.placeholder.com/150"
                                        src={logo}
                                        alt={alt}
                                    />
                                    <Stack spacing={2} pl={3} align="left">
                                        <Heading sx={{ alignContent: 'left' }} fontSize="xl">
                                            {title}
                                        </Heading>
                                        <Heading sx={{ alignContent: 'left' }} fontSize="sm">
                                            {role}
                                        </Heading>
                                        <Tags skills={skills} display={['none', 'none', 'flex', 'flex']} />
                                    </Stack>
                                </Flex>
                            </Flex>

                            <Tags skills={skills} display={['flex', 'flex', 'none', 'none']} />
                        </Box>
                    ))}
                </VStack>
                <TeamReviewComponent />
            </Container>


        </>
    );
};

interface TagsProps extends StackProps {
    skills: string[];
}

const Tags = ({ skills, ...props }: TagsProps) => {
    return (
        <Stack spacing={1} mt={3} isInline alignItems="center" flexWrap="wrap" {...props}>
            {skills.map((skill) => (
                <Tag key={skill} m="2px" size="sm">
                    {skill}
                </Tag>
            ))}
        </Stack>
    );
};

export default TeamPageComponent
