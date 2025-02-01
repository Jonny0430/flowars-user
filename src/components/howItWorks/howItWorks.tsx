import React, { Fragment } from 'react'
import SectionTitle from '../section-title/section-title'
import { Avatar, Flex, Icon, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { howItWorks } from 'src/config/constants';

function HowItWorks() {
    const { t } = useTranslation()

    const backgroundColor = useColorModeValue('gray.200', 'gray.700')

    return (
        <>
            <SectionTitle textAlign={'center'} title={t('how_it_works_title', { ns: 'home' })} subtitle={t('how_it_works_description', { ns: 'home' })} />

            <SimpleGrid
                mt={10}
                columns={{ base: 1, sm: 2, md: 3, lg: 5 }} // Responsive column configuration
                spacing={{ base: 5, md: 8, lg: 10 }} // Adjust spacing for different breakpoints
                alignItems="center"
            >
                {howItWorks.map((item, index) => {
                    const odd = index % 2;

                    return (
                        <Fragment key={index}>
                            {!odd ? (
                                <Stack justify="center" align="center">
                                    <Flex
                                        w={{ base: 90, md: 110 }} // Responsive size for Flex container
                                        h={{ base: 90, md: 110 }}
                                        justify="center"
                                        align="center"
                                        backgroundColor={backgroundColor}
                                        borderRadius="full"
                                    >
                                        <Avatar src={item?.image} w={{ base: 35, md: 50 }} h={{ base: 35, md: 50 }} /> {/* Responsive avatar size */}
                                    </Flex>
                                    <Text textAlign="center" fontSize={{ base: 'sm', md: 'md' }}> {/* Adjust text size */}
                                        {t(item.title, { ns: 'home' })}
                                    </Text>
                                </Stack>
                            ) : (
                                <Stack justify="center">
                                    <Icon as={item.icon} w={{ base: '100px', md: '142px' }} h={{ base: '15px', md: '21px' }} />
                                </Stack>
                            )}
                        </Fragment>
                    );
                })}
            </SimpleGrid>

        </>
    )
}

export default HowItWorks


