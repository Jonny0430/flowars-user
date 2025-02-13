import { Box, Button, Card, CardBody, Divider, Flex, Grid, Heading, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FcApproval, FcCollect, FcSportsMode } from 'react-icons/fc'
import { GoVerified } from 'react-icons/go'
import { ErrorAlert } from 'src/components/error-alert/error-alert'
import SectionTitle from 'src/components/section-title/section-title'
import TextField from 'src/components/text-filed/text-filed'
import { teachValues } from 'src/config/constants'
import { AgentValidation } from 'src/validations/agent.validation'


const BecomeAgentPageComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { t } = useTranslation()
    const { applyAgent, clearAgentError } = useActions()
    const { error, isLoading } = useTypedSelector(state => state.agent)

    const onSubmit = (formData) => {
        applyAgent({
            ...formData,
            callback: () => {
                toast({
                    title: 'Successfully',
                    description: "We'll contact with you coming soon",
                    isClosable: true,
                    position: 'top-right'
                })
                onClose()
            }
        })
    }


    return (
        <Stack spacing={16}>
            <Card>
                <CardBody p={0}>
                    <Stack direction={{ base: 'column', lg: 'row' }}>
                        <Box w={{ base: '100%', lg: '50%' }}>
                            <Image src='/images/agent.png' alt='agent' h={{ base: '35vh', lg: '60vh' }} />
                        </Box>
                        <Stack w={{ base: '100%', lg: '50%' }} justify={'center'} p={8}>
                            <SectionTitle
                                textAlign={'center'}
                                title={t('agent_page_title', { ns: 'agent' })}
                                subtitle={t('agent_page_description', { ns: 'agent' })}
                            />
                            <Button onClick={onOpen} h={14} bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={'blackAlpha.900'}>
                                {t('agent_page_get_started', { ns: 'agent' })}
                            </Button>
                        </Stack>
                    </Stack>
                </CardBody>

            </Card>

            <Heading mt={10} textAlign={'center'} p={6}>
                {t('agent_page_many_resaon', { ns: 'agent' })}
            </Heading>
            <Grid templateColumns={{ base: '1fr', lg: "repeat(3, 1fr)" }} gap="6">
                {teachValues.map((item, index) => (
                    <TeachValueCard index={index} item={item} />
                ))}
            </Grid>
            <Heading mt={10} textAlign={'center'}>
                {t('how_to_begin', { ns: 'agent' })}
            </Heading>

            <Tabs isFitted variant={'enclosed'}>
                <TabList mb={'1em'}>
                    <Tab>{t('how_to_begin_1', { ns: 'agent' })}</Tab>
                    <Tab>{t('how_to_begin_2', { ns: 'agent' })}</Tab>
                    <Tab>{t('how_to_begin_3', { ns: 'agent' })}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack direction={{ base: 'column', lg: 'row' }} p={10} >
                            <Stack w={{ base: '100%', lg: '50%' }} >
                                <Text>{t('how_to_begin_1_text_1', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_1_text_2', { ns: 'agent' })}</Text>
                                <Text fontWeight={'bold'}>{t('how_we_help_you', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_1_text_3', { ns: 'agent' })}</Text>
                            </Stack>
                            <Box w={'50%'}>
                                <FcSportsMode size={'300px'} />
                            </Box>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack direction={{ base: 'column', lg: 'row' }} p={10} >
                            <Stack w={{ base: '100%', lg: '50%' }}>
                                <Text>{t('how_to_begin_2_text_1', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_2_text_2', { ns: 'agent' })}</Text>
                                <Text fontWeight={'bold'}>{t('how_we_help_you', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_2_text_3', { ns: 'agent' })}</Text>
                            </Stack>
                            <Box w={{ base: '100%', lg: '50%' }}>
                                <FcCollect size={'300px'} />
                            </Box>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack direction={{ base: 'column', lg: 'row' }} p={10} >
                            <Stack w={{ base: '100%', lg: '50%' }}>
                                <Text>{t('how_to_begin_3_text_1', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_3_text_2', { ns: 'agent' })}</Text>
                                <Text fontWeight={'bold'}>{t('how_we_help_you', { ns: 'agent' })}</Text>
                                <Text>{t('how_to_begin_3_text_3', { ns: 'agent' })}</Text>
                            </Stack>
                            <Box w={{ base: '100%', lg: '50%' }}>
                                <FcApproval size={'300px'} />
                            </Box>
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Card>
                <CardBody>
                    <Stack w={{ base: '100%', lg: '500px' }} textAlign={'center'} mx={'auto'}>
                        <SectionTitle
                            title={t('become_agent_today', { ns: 'agent' })}
                            subtitle={t('become_agent_today_description', { ns: 'agent' })}
                        />
                        <Button onClick={onOpen} w={'full'} h={14} bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={'blackAlpha.900'}>
                            {t('agent_page_get_started', { ns: 'agent' })}
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} size={'4xl'} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={'2xl'}>
                        {t('become_agent_today', { ns: 'agent' })}
                    </ModalHeader>
                    <ModalCloseButton />
                    <Divider />
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={AgentValidation.applyAgentValue}
                        validationSchema={AgentValidation.applyAgentValidation}
                    >
                        <Form>
                            <ModalBody>
                                <Stack spacing={4}>
                                    <>{typeof error == 'string' && <ErrorAlert title={error as string} clearHandler={clearAgentError} />}</>
                                    <Flex gap={4}>
                                        <TextField
                                            name={'firstName'}
                                            label={t('first_name', { ns: 'agent' })}
                                            placeholder={'Leo'}
                                            type={'text'}
                                        />
                                        <TextField
                                            name={'lastName'}
                                            label={t('last_name', { ns: 'agent' })}
                                            placeholder={'Rich'}
                                            type={'text'}
                                        />
                                    </Flex>
                                    <TextField
                                        name={'email'}
                                        label={t('login_input_email_label', { ns: 'global' })}
                                        placeholder={'info@Monrovia.ac'}
                                        type={'email'}
                                    />
                                    <TextField
                                        name={'socialMedia'}
                                        label={`${t('social_media', { ns: 'agent' })} (YouTube)`}
                                        placeholder={'Link to your social media'}
                                        type={'text'}
                                    />
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type='submit'
                                    bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={'blackAlpha.900'}
                                    h={14}
                                    rightIcon={<GoVerified />}
                                    isLoading={isLoading}
                                    loadingText={`${t('loading', { ns: 'global' })}`}
                                >
                                    {t('send_to_verify_btn', { ns: 'agent' })}
                                </Button>
                            </ModalFooter>
                        </Form>
                    </Formik>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

interface TeachValueCardProps {
    index: number,
    item: {
        title: string,
        description: string,
        icon: FC
    }
}

const TeachValueCard = ({ item, index }: TeachValueCardProps) => {
    const { t } = useTranslation()

    return (
        <Stack key={index} align={'center'} textAlign={'center'} p={4}>
            <Icon as={item.icon} fontSize={100} />
            <Text fontWeight={'bold'} fontSize={20}>
                {t(item.title, { ns: 'agent' })}
            </Text>
            <Text>{t(item.description, { ns: 'agent' })}</Text>
        </Stack>
    )
}

export default BecomeAgentPageComponent
