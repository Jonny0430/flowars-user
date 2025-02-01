

import { Box, Button, ButtonGroup, Divider, Flex, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { BsTrash } from 'react-icons/bs'
import { VscOpenPreview } from 'react-icons/vsc'
import { loadImage } from 'src/helpers/image.helper'
import { AdminProductCardProps } from './admin-product-card.props'

const AdminProductCard: FC<AdminProductCardProps> = ({ product }): JSX.Element => {
    const { deleteAdminProduct } = useActions()
    const { isLoading } = useTypedSelector(state => state.admin)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    const toast = useToast()

    const deleteProductHandler = () => {
        deleteAdminProduct({
            product_id: product._id as string,
            callback: () => {
                toast({
                    title: 'Successfully deleted',
                    status: 'success',
                    position: 'top-right',
                    isClosable: true
                }),
                    router.replace(router.asPath)
            }
        })
    }

    return (
        <Box p={5} boxShadow={'dark-lg'} mt={5} borderRadius={'lg'}>
            <Stack spacing={2}>
                <Box pos={'relative'} w={'100%'} h={'200px'}>
                    <Image
                        fill
                        src={loadImage(product?.image)}
                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                        alt={product?.productName as string}
                    />
                </Box>
                <Heading fontSize={'xl'}>{product.productName}</Heading>
                <Divider />
                <Flex align={'center'} gap={2} fontSize={'16px'} color={'facebook.200'} fontWeight={'bold'} >
                    {product.location}
                </Flex>
                <Text fontWeight={'bold'} color={'facebook.500'}>
                    Status : {' '}
                    <Box as='span' color={product.isActive ? 'green.500' : 'red.500'}>
                        {product.isActive ? 'Active' : 'Draft'}
                    </Box>
                </Text>
                <ButtonGroup gap={4}>
                    <Button
                        w={'full'}
                        rightIcon={<VscOpenPreview />}
                        colorScheme='facebook'>
                        Preview
                    </Button>
                    <Button
                        w={'full'}
                        colorScheme='red'
                        rightIcon={<BsTrash />}
                        isLoading={isLoading}
                        onClick={onOpen}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete <strong>{product.productName}</strong>?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={deleteProductHandler}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default AdminProductCard
