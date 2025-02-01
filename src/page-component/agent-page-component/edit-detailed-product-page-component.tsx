import { Divider, useColorModeValue, useToast } from "@chakra-ui/react"
import dynamic from "next/dynamic"

import SectionTitle from "src/components/section-title/section-title"

import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router"
import { AgentManageProduct } from "src/components"
import { useTypedSelector } from "hooks/useTypedSelector";
import { useActions } from "hooks/useActions";
import { ProductTypes } from "src/interface/product.interface";


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })


const EditDetailedProductPageComponent = () => {
    const {product} = useTypedSelector(state => state.agent)
    const router = useRouter()
    const {editProduct} = useActions()
    const toast = useToast()

    const onSubmit = (data: ProductTypes) => {
        editProduct({
            ...data,
            callback: ()=> {
                toast({
                    title: 'Successfully edited',
                    position: 'top-right',
                    isClosable: true
                })
                router.push('/agent/edit-products')
            }
        })
    }

    return (
        <>
            <SectionTitle title={`Edit product ${router.query.slug}`} subtitle='' />
            <Divider mt={5} borderColor={useColorModeValue('blackAlpha.500', '')} />
            <AgentManageProduct titleBtn="Edit product" submitHandler={onSubmit} productValues={product}/>
        </>
    )
}
export default EditDetailedProductPageComponent
