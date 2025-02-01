import { Box, Button, Divider, Grid, GridItem, Heading, HStack, Icon, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useTypedSelector } from "hooks/useTypedSelector";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { MdOutlineSupportAgent } from "react-icons/md";
import { loadImage } from "src/helpers/image.helper";
import SectionTitle from "../section-title/section-title";


function Agent() {
    const { t } = useTranslation()
    const { agents } = useTypedSelector(state => state.agent)

    return (
        <>
            <SectionTitle textAlign={'center'} title={t('agent_title', { ns: 'home' })} subtitle={t('agent_description', { ns: 'home' })} mt={5} />

            <Grid gap={{base: 6, lg: 10}} gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} mt={5}>
                {agents.map((item, index) => (
                    <GridItem key={index}>
                        <Stack
                            spacing={3}
                            p={5}
                            cursor={'pointer'}
                            border={'1px'}
                            borderRadius={'lg'}
                            borderColor={useColorModeValue('#FF9F6D', 'gray')}
                            boxShadow={useColorModeValue('xl', '')}
                        >
                            <Box pos={'relative'} w={'full'} h={'230px'}>
                                <Image
                                    src={item?.avatar ? loadImage(item.avatar) : '/images/placeholder.png'}
                                    alt={item.fullName}
                                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                                    fill
                                />
                            </Box>
                            <Divider />
                            <HStack>
                                <Icon fontSize="4xl" as={MdOutlineSupportAgent} />
                                <Heading fontSize={'xl'}>
                                    {item.fullName}
                                </Heading>
                            </HStack>
                        </Stack>
                    </GridItem>
                ))}
            </Grid>
            <Text textAlign={'center'}>{t('agent_link_title', { ns: 'home' })}{'  '}
                <Box as={'span'} color={'teal'} _hover={{ textDecoration: 'underline' }} >
                    <Button color={'blackAlpha.900'} bg={'#FFC196'}  _hover={{ bg: '#FF9F6D' }} variant={'solid'}>
                        <Link href={"/become-agent"}>{t('agent_link_router', { ns: 'home' })}</Link>
                    </Button>
                </Box>
            </Text>
        </>
    )
}

export default Agent


