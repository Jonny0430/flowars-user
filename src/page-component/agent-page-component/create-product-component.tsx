import { Divider, useColorModeValue, useToast } from "@chakra-ui/react"
import SectionTitle from "src/components/section-title/section-title"
import { AgentManageProduct } from "src/components"
import { useActions } from "hooks/useActions"
import { useRouter } from "next/router"
import { ProductTypes } from "src/interface/product.interface"


const AgentCreateProductComponent = () => {
    const { createProduct } = useActions()
    const toast = useToast()
    const router = useRouter()

    const onSubmit = (data: ProductTypes) => {
        createProduct({
            ...data,
            callback: () => {
                toast({
                    title: 'Succesfully created',
                    description: 'You can customize your details for your product',
                    position: 'top-right',
                    isClosable: true
                })
                router.push('/agent/products')
            }
        })
    }

    return (
        <>
            <SectionTitle
                title="Create product"
                subtitle="Note that when you're creating product it will be draft"
            />
            <Divider mt={5} borderColor={useColorModeValue('blackAlpha.500', '')} />
            <AgentManageProduct titleBtn="Create product" submitHandler={onSubmit} />
        </>
    )
}

export default AgentCreateProductComponent


//borderColor={useColorModeValue('Highlight', 'Highlight')}