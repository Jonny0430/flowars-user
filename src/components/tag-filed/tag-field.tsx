import { Box, FormLabel, Text } from "@chakra-ui/react"
import { TagFieldProps } from "./tag-field.props"
import { TagsInput } from "react-tag-input-component"




const TagField = ({ formik, label, name, placeholder, errorMessage, values }: TagFieldProps) => {
    return (
        <Box w={'full'}>
            <FormLabel>
                {label}{' '}
                <Box as="span" color={'red.300'}>*</Box>
            </FormLabel>
            <TagsInput
                value={values}
                onChange={data => formik.setFieldValue(name, data)}
                name={name}
                placeHolder={placeholder}
            />
            {errorMessage && (
                <Text mt={2} fontSize={'14px'} color={'red.500'}>
                    {errorMessage}
                </Text>
            )}
        </Box>
    )
}

export default TagField
