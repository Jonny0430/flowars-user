import { Avatar, AvatarBadge, Box, Button, Flex, HStack, IconButton, Text, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Cookies from 'js-cookie'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import TextAreaField from 'src/components/text-area-field/text-area-field'
import TextField from 'src/components/text-filed/text-filed'
import { loadImage } from 'src/helpers/image.helper'
import { AuthService } from 'src/service/auth.service'
import { FileService } from 'src/service/file.service'

const Settings = () => {
    const { user } = useTypedSelector(state => state.user)
    const [avatar, setAvatar] = useState<File>()
    const [values, setValues] = useState(data)
    const [isLoading, setIsloading] = useState(false)
    const toast = useToast()
    const { checkAuth } = useActions()
    const {t} = useTranslation()

    const onSubmit = async (formikValues: FormikValues) => {
        setIsloading(true)
        let avatarUrl: string = user?.avatar as string
        try {
            if (avatar) {
                const formData = new FormData()
                formData.append('image', avatar)
                const response = await FileService.fileUpload(
                    formData,
                    'avatar'
                )
                avatarUrl = response.url
            }
            const data = {
                avatar: avatarUrl,
                ...formikValues,
            }
            const response = await AuthService.updateUser(data)
            if (response) {
                const refreshToken = Cookies.get('refresh')
                if (refreshToken) checkAuth()
                setIsloading(false)
                toast({
                    title: `${t('successfully_edited', { ns: 'global' })}`,
                    status: 'success',
                    position: 'top-right'
                })
            }
        } catch (error) {
            setIsloading(false)
        }
    }

    const onFileHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        if (file && file.size > 2081800) {
            toast({
                title: "The image size is too large; it must be at least 2MB",
                status: 'error'
            })
        }

        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            setAvatar(file)
        } else {
            toast({
                title: "Error: We only support PNG and JPG files.",
                status: 'error'
            })
        }
    }

    const openFile = () => {
        const doc = document.getElementById('file')
        return doc?.click()
    }

    useEffect(() => {
        if (user) {
            const { fullName, job, bio, birthday } = user
            const full: string[] = fullName ? fullName?.split(' ') as string[] : []
            setValues({
                firsName: full[0] || '',
                lastName: full[1] || '',
                job: job as string || '',
                bio: bio as string || '',
                birthday: birthday as string || ''
            })
        }

    }, [user])



    return (
        <>
            <HStack>
                <Avatar
                    src={avatar ? URL.createObjectURL(avatar) : loadImage(user?.avatar)}
                    name={user?.fullName}
                    backgroundColor={'facebook.500'}
                    size={'xl'}
                >
                    {avatar ? (
                        <AvatarBadge
                            as={IconButton}
                            size={'sm'}
                            rounded={'full'}
                            top={'-10px'}
                            colorScheme='facebook'
                            aria-label='remove Image'
                            icon={<AiOutlineClose />}
                            onClick={() => setAvatar(undefined)}
                        />
                    ) : (
                        <label htmlFor=''>
                            <AvatarBadge
                                as={IconButton}
                                size={'sm'}
                                rounded={'full'}
                                top={'-10px'}
                                colorScheme='facebook'
                                aria-label='remove Image'
                                icon={<MdEdit />}
                                onClick={openFile}
                            />
                            <input
                                type='file'
                                hidden
                                accept='image/*'
                                id='file'
                                onChange={e => onFileHandler(e)}

                            />
                        </label>
                    )}
                </Avatar>
                <VStack align={'flex-start'}>
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                        {user?.fullName}
                    </Text>
                    <Text>
                        <Box fontWeight={'bold'} as={'span'}>
                            {t('emails', {ns: 'global'})}
                        </Box>
                        : {user?.email}
                    </Text>
                </VStack>
            </HStack>
            <Formik onSubmit={onSubmit} initialValues={values} enableReinitialize>
                <Form>
                    <Flex gap={5} direction={{base: 'column'}}>
                        <TextField
                            name='firsName'
                            label={t('firstName', {ns: 'global'})}
                            placeholder='Loe'
                        />
                        <TextField
                            name='lastName'
                            label={t('lastName', {ns: 'global'})}
                            placeholder='OI'
                        />
                    </Flex>
                    <Flex gap={5} direction={{base: 'column'}}>
                        <TextField
                            name='birthday'
                            label={t('birthday', {ns: 'global'})}
                            placeholder='birthday'
                            type='date'
                        />
                        <TextField
                            name='job'
                            label={t('job', {ns: 'global'})}
                            placeholder='Manager'
                        />
                    </Flex>
                    <TextAreaField
                        name='bio'
                        placeholder='Bio'
                        label={t('bio', { ns: 'global' }) ?? 'BIO'}
                        height='100'
                    />
                    <Button
                        mt={5}
                        h={14}
                        w={'full'}
                        colorScheme='facebook'
                        isActive
                        type='submit'
                        isLoading={isLoading}
                    >
                       {t("submit", {ns: "global"})}
                    </Button>
                </Form>
            </Formik>
        </>

    )
}

export default Settings

const data = {
    firsName: '',
    lastName: '',
    birthday: '',
    job: '',
    bio: ''
}