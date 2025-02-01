import { Button, Heading, List, ListIcon, ListItem, Stack, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { FaCheckCircle } from "react-icons/fa"
import { PricingProps } from "./pricing.props"

const Pricing = ({ title, price, options, checked }: PricingProps) => {
    const { t } = useTranslation()
    const router = useRouter()



    return (
        <Stack
            p={3}
            py={3}
            justifyContent={{ base: 'flex-start', md: 'space-around' }}
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
        >
            <Heading size={'md'}>{title}</Heading>
            <List spacing={3} textAlign={"start"}>
                {options.map(item => (
                    <ListItem key={item.desc}>
                        <ListIcon as={FaCheckCircle} color={'green.500'} />
                        {item.desc}
                    </ListItem>
                ))}
            </List>
            <Heading size={'xl'}>{price.toLocaleString('ko-Kr', { currency: 'KRW', style: 'currency' })}</Heading>
            <Stack>
                <Button
                    size={'md'}
                    colorScheme="facebook"
                    _hover={{ bg: 'facebook.900' }}
                    onClick={() => router.push('/become-agent')}
                >
                    {t('pricing_btn', { ns: 'global' })}
                </Button>
            </Stack>
        </Stack>

    )
}

export default Pricing
