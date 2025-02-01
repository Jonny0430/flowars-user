import { Button, Card, CardBody, Grid, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import SectionTitle from "src/components/section-title/section-title"


const AboutPageComponent = () => {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <>
            <SectionTitle textAlign={'center'} p={5} title={t('about_title', { ns: 'global' })} subtitle={t('about_descrption', { ns: 'global' })} />

            <Grid gridTemplateColumns={{ base: '100%', lg: '50% 50%' }} mt={10} gap={5}>
                <Image src={"/images/about.png"} />
                <Card>
                    <CardBody>
                        <Stack justifySelf={'center'} spacing={4} alignSelf={'center'}>
                            <Heading fontSize={'3xl'} color={'gray.500'}>
                                {t('about_heading', { ns: 'global' })}
                            </Heading>
                            <Text>
                                {t('about_text_1', { ns: 'global' })}
                            </Text>
                            <Text>
                                {t('about_text_2', { ns: 'global' })}
                            </Text>
                            <Button color={'black'}
                                bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} h={14} w={'100%'} onClick={() => router.push('/')} mt={4}>
                                {t('about_btn', { ns: 'global' })}
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
            </Grid>
        </>
    )
}

export default AboutPageComponent
