import { Box, chakra, SimpleGrid } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdAlternateEmail, MdUpdate } from 'react-icons/md'
import { SiAwesomelists } from 'react-icons/si'
import { StatsCard } from 'src/components'

const Account = () => {
    const { user } = useTypedSelector(state => state.user)
    const {t} = useTranslation()
    return (
        <>
            <Box maxW={'7xl'} mx={'auto'} px={{ base: 2, sm: 12, md: 17 }}>
                <chakra.h1
                    textAlign={'center'}
                    fontSize={'4xl'}
                    pb={6}
                    fontWeight={'bold'}
                >
                    {t("your_info", {ns: "global"})}
                </chakra.h1>
                <SimpleGrid 
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 5, lg: 8 }}
                >
                    <StatsCard
                        title={t("registr", {ns: 'global'})}
                        stat={`${format(new Date(user?.createdAt as Date), 'dd MMMM, yyyy')}`}
                        icon={<MdUpdate size={'3em'} />}
                    />
                    <StatsCard
                        title={user?.email as string}
                        stat={t("email", {ns: 'global'})}
                        icon={''}
                    />
                    <StatsCard
                        title={t("products", {ns: 'global'})}
                        stat={`${user?.products?.length} ta`}
                        icon={<SiAwesomelists size={'3em'} />}
                    />
                </SimpleGrid>
            </Box>
        </>
    )
}

export default Account
