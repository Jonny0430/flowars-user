import { Box, Button, Divider, Flex, Heading, HStack, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { CiViewList } from 'react-icons/ci'
import { FiEdit2 } from 'react-icons/fi'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { SiGoogleanalytics } from 'react-icons/si'
import { VscOpenPreview } from 'react-icons/vsc'
import { loadImage } from 'src/helpers/image.helper'
import { AgentProductsCardProps } from './agent-draft-products-card.props'


const AgentEditProductCard: FC<AgentProductsCardProps> = ({ item }): JSX.Element => {
    const router = useRouter()
    const { deleteProduct } = useActions()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDelete = () => {
        deleteProduct({
            product_id: item._id as string,
            callback: () => {
                toast({
                    title: 'Successfully deleted',
                    description: item.productName,
                    position: 'top-right',
                    isClosable: true,
                })
                router.replace(router.asPath)
            }
        })
    }



    return (
        <HStack key={item.productName} p={5} boxShadow={'dark-lg'} mt={5} borderRadius={'lg'}>
            <Stack spacing={5}>
                <Box pos={'relative'} w={'full'} h={'200px'}>
                    <Image
                        fill
                        src={loadImage(item.image)}
                        style={{ objectFit: 'contain', borderRadius: '10px' }}
                        alt={item?.productName as string}
                    />
                </Box>
                <Text fontSize={'20px'} color={'facebook.500'} fontWeight={'bold'}>
                    {item.availability}
                </Text>
                <Heading>{item.productName}</Heading>
                <HStack>
                    <Flex align={'center'} gap={1}>
                        <Icon as={CiViewList} />
                        <Text>{item.category}</Text>
                    </Flex>
                    <Flex align={'center'} gap={1}>
                        <Icon as={AiOutlineClockCircle} />
                        <Text>{item.location}</Text>
                    </Flex>
                    <Flex align={'center'} gap={1}>
                        <Icon as={SiGoogleanalytics} />
                        <Text>{item.gender}</Text>
                    </Flex>
                </HStack>
                <Divider />
                <HStack>
                    <Button color={'black'}
                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }} rightIcon={<VscOpenPreview />}>Preview</Button>
                    <Button
                        color={'black'}
                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                        rightIcon={<FiEdit2 />}
                        onClick={() => router.push(`/agent/edit-products/${item.slug}`)}
                    >
                        Edit
                    </Button>
                    <Button rightIcon={<BsTrash />} onClick={onOpen} color={'black'}
                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}>Delete</Button>
                    <Button rightIcon={<HiOutlineStatusOnline />} color={'black'}
                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}>Status</Button>
                </HStack>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete <strong>{item.productName}</strong>?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onDelete}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </HStack>
    )
}

export default AgentEditProductCard


