import { Button, Card, CardBody, Heading, Icon, Stack, Text } from '@chakra-ui/react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const SuccessPageComponent = () => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <Card>
            <CardBody>
                <Stack align={'center'} flexDirection={'column'}>
                    <Icon as={BsFillPatchCheckFill} w={20} h={20} color={'green.500'} />
                    <Heading>{t('completed', { ns: 'global' })}</Heading>
                    <Text>{t('order', { ns: "global" })}</Text>
                    <Button w={'200px'} colorScheme={'facebook'} h={14} onClick={() => router.push(`/dashboard`)}>
                        {t("dashboard", { ns: 'global' })}
                    </Button>
                    <Image width={380} height={380} src={'/images/sw.png'} alt={'success'} />
                </Stack>
            </CardBody>
        </Card>
    )
}

export default SuccessPageComponent
