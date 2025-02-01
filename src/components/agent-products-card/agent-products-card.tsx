import { Box, Button, Divider, Heading, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import { FC } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { CiViewList } from 'react-icons/ci'
import { SiGoogleanalytics } from 'react-icons/si'
import { VscOpenPreview } from 'react-icons/vsc'
import { loadImage } from 'src/helpers/image.helper'
import { AgentProductsCardProps } from './agent-draft-products-card.props'

const AgentProductsCard: FC<AgentProductsCardProps> = ({ item }): JSX.Element => {
    return (
        <HStack key={item.productName} p={45} boxShadow={useColorModeValue('xl', 'dark-lg')} mt={5} borderRadius={'lg'}>
            <Stack spacing={5} w={'70%'}>
                <Heading>{item.productName}</Heading>
                <Text fontSize={'20px'} color={'facebook.500'} fontWeight={'bold'}>
                    {item.species}
                </Text>
                <HStack fontSize={'xl'}>
                    <Button variant={'outline'} colorScheme='facebook' gap={1}>
                        <Icon as={CiViewList} />
                        <Text>{item.availability}</Text>
                    </Button>
                    <Button variant={'outline'} colorScheme='facebook' gap={1}>
                        <Icon as={AiOutlineClockCircle} />
                        <Text>{item.category}</Text>
                    </Button>
                    <Button variant={'outline'} colorScheme='facebook' gap={1}>
                        <Icon as={SiGoogleanalytics} />
                        <Text>{item.color}</Text>
                    </Button>
                </HStack>
                <Divider borderColor={useColorModeValue('blackAlpha.600', '')} />
                <HStack>
                    <Button
                        rightIcon={<VscOpenPreview />}
                        w={'50%'}
                        h={14}
                        color={'black'}
                        bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }}
                    >
                        Preview
                    </Button>

                </HStack>
            </Stack>
            <Box w={'40%'} h={'300px'} position={'relative'}>
                <Image
                    fill
                    src={loadImage(item?.image)}
                    alt={item?.productName as string}
                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
            </Box>
        </HStack>
    )
}

export default AgentProductsCard
