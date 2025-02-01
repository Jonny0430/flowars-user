import { FC, useEffect, useState } from "react"
import { BookModalProps } from "./books-modal.props"
import { useActions } from "hooks/useActions"
import { useTypedSelector } from "hooks/useTypedSelector"
import { Box, Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react"
import { Form, Formik, FormikValues } from "formik"
import { FileService } from "src/service/file.service"
import { BooksValidation } from "src/validations/books.validation"
import { ErrorAlert } from "../error-alert/error-alert"
import TextField from "../text-filed/text-filed"
import SelectField from "../select-field/select-field"
import { booksCategories, productPrice } from "src/config/constants"
import Image from "next/image"
import { loadImage } from "src/helpers/image.helper"
import { FaTimes } from "react-icons/fa"
import { FileUploader } from "react-drag-drop-files"
import { useTranslation } from "react-i18next"


const BooksModal: FC<BookModalProps> = ({ isOpen, onClose, booksValue }): JSX.Element => {
    const [values, setValues] = useState(data)
    const [file, setFile] = useState<File | string | null>()
    const [errorFile, setErrorFile] = useState('')

    const { startCrateBooksLoading, createBooks, clearBooksError, updateBooks } = useActions()
    const { isLoading, error } = useTypedSelector(state => state.books)
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
            startCrateBooksLoading()
            const formData = new FormData()
            formData.append('image', file as File)
            const response = await FileService.fileUpload(formData, 'books')
            imageUrl = response.url
        }

        if (!booksValue) {
            createBooks({
                price: formikValues.price,
                title: formikValues.title,
                pdf: formikValues.pdf,
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
            updateBooks({
                price: formikValues.price,
                title: formikValues.title,
                pdf: formikValues.pdf,
                _id: booksValue._id,
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
        if (booksValue) {
            setValues(booksValue)
            setFile(booksValue.image)
        } else {
            setValues(data)
            setFile(null)
        }
    }, [booksValue])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'xs'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add books</ModalHeader>
                <ModalCloseButton />
                <Formik
                    onSubmit={onSubmit}
                    initialValues={values}
                    validationSchema={BooksValidation.createBooks}
                    enableReinitialize
                >
                    <Form>
                        <ModalBody>
                            <>{typeof error === 'string' && <ErrorAlert title={error} clearHandler={clearBooksError} />}</>
                            <VStack>
                                <TextField name="title" label="Title" placeholder="Dog books" />
                                <TextField name='pdf' label={t('pdf_link', { ns: 'admin' })} />
                                <SelectField
                                    name="price"
                                    label={"Books price"}
                                    placeholder="-"
                                    arrOptions={productPrice}
                                />
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
                                bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }}
                                mr={3}
                            >
                                {booksValue ? 'Edit book' : 'Add books'}
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default BooksModal


const data = {
    title: '',
    pdf: '',
    price: 0,
    category: ''
};