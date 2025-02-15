import { FC, useEffect, useState } from "react"
import { useActions } from "hooks/useActions"
import { useTypedSelector } from "hooks/useTypedSelector"
import { Box, Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react"
import { Form, Formik, FormikValues } from "formik"
import { FileService } from "src/service/file.service"
import { ErrorAlert } from "../error-alert/error-alert"
import TextField from "../text-filed/text-filed"
import SelectField from "../select-field/select-field"
import { booksCategories } from "src/config/constants"
import Image from "next/image"
import { loadImage } from "src/helpers/image.helper"
import { FaTimes } from "react-icons/fa"
import { FileUploader } from "react-drag-drop-files"
import { useTranslation } from "react-i18next"
import { ArticleModalProps } from "./article-modal.props"
import { ArticleValidation } from "src/validations/article.validation"


const ArticleModal: FC<ArticleModalProps> = ({ isOpen, onClose, articleValue }): JSX.Element => {
    const [values, setValues] = useState(data)
    const [file, setFile] = useState<File | string | null>()
    const [errorFile, setErrorFile] = useState('')

    const { startCreateArticlesLoading, createArticles, clearArticlesError, updateArticles } = useActions()
    const { isLoading, error } = useTypedSelector(state => state.article)
    const toast = useToast()
    const { t } = useTranslation()

    const handleChange = (file: File) => {
        setFile(file)
    }

    const onSubmit = async (formikValues: FormikValues) => {
        if (!file) {
            setErrorFile('Preview image is required')
            return
        }
        let imageUrl = file
        if (typeof file !== 'string') {
            startCreateArticlesLoading()
            const formData = new FormData()
            formData.append('image', file as File)
            const response = await FileService.fileUpload(formData, 'books')
            imageUrl = response.url
        }

        if (!articleValue) {
            createArticles({
                title: formikValues.title,
                description: formikValues.description,
                category: formikValues.category,
                image: imageUrl as string,
                callback: () => {
                    toast({
                        title: 'Successfully created',
                        position: 'top-right',
                        isClosable: true,
                        status: 'success'
                    })
                    setFile(null)
                    onClose()
                }
            })
        } else {
            updateArticles({
                title: formikValues.title,
                description: formikValues.description,
                _id: articleValue._id,
                category: formikValues.category,
                image: imageUrl as string,
                callback: () => {
                    toast({
                        title: 'Successfully updated',
                        position: 'top-right',
                        isClosable: true,
                        status: 'success'
                    })
                    setFile(null)
                    onClose()
                }
            })
        }
    }

    useEffect(() => {
        setErrorFile('')
        if (articleValue) {
            setValues(articleValue as any)
            setFile(articleValue?.image)
        } else {
            setValues(data)
            setFile(null)
        }
    }, [articleValue])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'xs'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add articles</ModalHeader>
                <ModalCloseButton />
                <Formik
                    onSubmit={onSubmit}
                    initialValues={values}
                    validationSchema={ArticleValidation.createArticles}
                    enableReinitialize
                >
                    <Form>
                        <ModalBody>
                            <>{typeof error === 'string' && <ErrorAlert title={error} clearHandler={clearArticlesError} />}</>
                            <VStack>
                                <TextField name="title" label="Title" placeholder="Dog articles" />
                                <TextField name='description' label={t('Description', { ns: 'admin' })} />
                                <SelectField
                                    name="category"
                                    label={t('category', { ns: 'agent' })}
                                    placeholder="-"
                                    arrOptions={booksCategories}
                                />
                                {file ? (
                                    <Box pos={'relative'} w={'full'} h={200}>
                                        <Image
                                            src={typeof file === 'string'
                                                ? loadImage(file as string)
                                                : URL.createObjectURL(file)
                                            }
                                            alt={"preview image"}
                                            fill
                                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <Icon
                                            as={FaTimes}
                                            fontSize={20}
                                            pos={'absolute'}
                                            right={2}
                                            top={2}
                                            cursor={'pointer'}
                                            onClick={() => setFile(null)}
                                        />
                                    </Box>
                                ) : (
                                    <Box>
                                        <FileUploader
                                            handleChange={handleChange}
                                            name='file'
                                            types={['JPG', 'PNG', 'GIF', "WEBP"]}
                                            style={{ minWidth: '100%' }}
                                        />
                                        {errorFile && (
                                            <Text mt={2} fontSize={'14px'} color={'red.500'}>
                                                {errorFile}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                color={'black'}
                                bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                                mr={3}
                            >
                                {articleValue ? 'Edit article' : 'Add articles'}
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default ArticleModal


const data = {
    title: '',
    description: '',
    category: ''
};