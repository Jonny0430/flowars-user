import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Pricing } from 'src/components'
import { StripeProductsType } from 'src/interface/StripeProductsType'




const PricingPageComponent = ({ stripeProducts }: { stripeProducts: StripeProductsType[] }) => {
    const { t } = useTranslation()

    return (
        <>
            <Stack spacing={4} py={10} width={'100%'} direction={'column'}>
                <Stack
                    p={5}
                    alignItems={'center'}
                    justifyContent={{ base: 'flex-start', md: 'space-around' }}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Stack width={{ base: '100%', md: '40%' }} textAlign={'center'}>
                        <Heading size={'lg'}>
                            {t('pricing_title', { ns: 'global' })}
                            <Text color='green.400'>
                                {t('pricing_title_green', { ns: 'global' })}
                            </Text>
                        </Heading>
                    </Stack>
                    <Stack width={{ base: '100%', md: '60%' }}>
                        <Text textAlign={'center'}>
                            {t('pricing_description', { ns: 'global' })}
                        </Text>
                    </Stack>
                </Stack>
                <Divider />
                {stripeProducts.reverse().map(product => (
                    <Fragment key={product._id}>
                        <Divider />
                        <Pricing
                            title={product.name}
                            price={product.default_price.unit_amount}
                            options={product.description.split(/, |\. /).map((c, idx) => ({ id: idx, desc: c }))}
                        />
                    </Fragment>
                ))}
            </Stack>

        </>
    )
}

export default PricingPageComponent
