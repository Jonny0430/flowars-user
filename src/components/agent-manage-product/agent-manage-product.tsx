import { Box, Button, Flex, FormLabel, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { GiSave } from 'react-icons/gi';
import 'react-quill/dist/quill.snow.css';
import { productAge, productAvailability, productCategory, productGender, productLocation, productPrice, productSpecies } from 'src/config/constants';
import { editorModules } from 'src/config/edit-config';
import { loadImage } from 'src/helpers/image.helper';
import { ProductTypes } from 'src/interface/product.interface';
import { FileService } from 'src/service/file.service';
import { CourseValidation, manageProductValues } from 'src/validations/product.validation';
import { ErrorAlert } from '../error-alert/error-alert';
import SelectField from '../select-field/select-field';
import TagField from '../tag-filed/tag-field';
import TextField from '../text-filed/text-filed';
import { InstructorManageCourseProps } from './agent-manage-product.props';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const InstructorManageCourse = ({ submitHandler, titleBtn, productValues }: InstructorManageCourseProps) => {
	const [file, setFile] = useState<File | string | null>();
	const [errorFile, setErrorFile] = useState('')
	const [initialValues, setInitialValues] = useState(manageProductValues)
	const { error, isLoading } = useTypedSelector(state => state.product)
	const { startLoading, clearProductError } = useActions();
	const { t } = useTranslation()


	const handleChange = (file: File) => {
		setFile(file);
	};

	const onSubmit = async (formValues: FormikValues) => {
		if (!file) {
			setErrorFile('Preview image is required')
			return
		}
		let imageUrl = file;
		if (typeof file !== 'string') {
			startLoading()
			const formData = new FormData()
			formData.append('image', file as File)
			const response = await FileService.fileUpload(formData, 'image')
			imageUrl = response.url
		}
		const data: any = { ...formValues, image: imageUrl } as unknown as ProductTypes
		submitHandler(data)
	};

	useEffect(() => {
		if (productValues) {
			setInitialValues(productValues as any)
			setFile(productValues.image)
		}
	}, [productValues])

	return (
		<>
			<Formik
				onSubmit={onSubmit}
				initialValues={initialValues}
				validationSchema={CourseValidation.create}
				enableReinitialize
			>
				{formik => (
					<Form>
						<Flex mt={12} gap={4}>
							<Box w={'70%'}>
								<Stack spacing={5}>
									<HStack>
										<TextField name='productName' label='ProductName' placeholder='ProductName...' />
										<SelectField
											name='age'
											label='Age'
											placeholder='-'
											arrOptions={productAge}

										/>
									</HStack>
									<HStack gap={4}>
										<SelectField
											name='species'
											label='Species'
											placeholder='-'
											arrOptions={productSpecies}
										/>
										<SelectField
											name='availability'
											label='Availability'
											placeholder='-'
											arrOptions={productAvailability}
										/>
										<SelectField
											name='gender'
											label='Gender'
											placeholder='-'
											arrOptions={productGender}
										/>
									</HStack>
									<Stack gap={4}>
										<TagField
											label='Please enter the product color and press Enter'
											name='color'
											placeholder='White&Black...'
											values={formik.values.color}
											formik={formik}
											errorMessage={formik.touched.color ? (formik.errors.color as string) : ''}
										/>
										<TagField
											label='Please enter the requirements  and press Enter'
											name='requirements'
											placeholder='happy...'
											values={formik.values.requirements}
											formik={formik}
											errorMessage={
												formik.touched.requirements ? (formik.errors.requirements as string) : ''
											}
										/>
									</Stack>
									<Box>
										<FormLabel mb={3}>
											Description{' '}
											<Box as={'span'} color={'red.300'}>
												*
											</Box>
										</FormLabel>
										<ReactQuill
											modules={editorModules}
											onChange={data => formik.setFieldValue('description', data)}
											value={formik.values.description}
										/>
										{formik.errors.description && formik.touched.description && (
											<Text mt={2} fontSize='14px' color='red.500'>
												{formik.errors.description as string}
											</Text>
										)}
									</Box>
									<>{typeof error === 'string' && <ErrorAlert title={error} clearHandler={clearProductError} />}</>
									<Button
										w={'full'}
										type={'submit'}
										h={14}
										colorScheme={'facebook'}
										rightIcon={<GiSave />}
										isLoading={isLoading}
										loadingText={`${t('loading', { ns: 'global' })}`}
									>
										{titleBtn}
									</Button>
								</Stack>
							</Box>
							<Box w={'30%'}>
								<Stack spacing={5}>
									<SelectField
										name='location'
										label='Location'
										placeholder='-'
										arrOptions={productLocation}
									/>
									<SelectField
										name='category'
										label='Category'
										placeholder='-'
										arrOptions={productCategory}
									/>
									<SelectField
										name='price'
										label='Price'
										placeholder='-'
										arrOptions={productPrice}
									/>
									<FormLabel>
										Product preview image{'  '}
										<Box as='span' color={'red.300'}>*</Box>
									</FormLabel>
									{file ? (
										<Box pos={'relative'} w={'full'} h={300}>
											<Image
												src={
													typeof file === 'string'
														? loadImage(file as string)
														: URL.createObjectURL(file)
												}
												alt={'preview image'}
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
												types={['JPG', 'PNG', 'GIF']}
												style={{ minWidth: '100%' }}
											/>
											{errorFile && (
												<Text mt={2} fontSize='14px' color='red.500'>
													{errorFile}
												</Text>
											)}
										</Box>
									)}
								</Stack>
							</Box>
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default InstructorManageCourse;