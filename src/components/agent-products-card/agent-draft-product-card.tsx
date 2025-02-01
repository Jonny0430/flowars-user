import { Box, Button, Divider, Heading, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { loadImage } from 'src/helpers/image.helper'
import { ErrorAlert } from '../error-alert/error-alert'
import { AgentDraftProductCardProps } from './agent-draft-products-card.props'

const AgentDraftProductCard: FC<AgentDraftProductCardProps> = ({ item }): JSX.Element => {
  const { activateProduct, draftProduct, clearProductError } = useActions()
  const { isLoading, error } = useTypedSelector(state => state.product)
  const toast = useToast()
  const router = useRouter()
  const { t } = useTranslation()

  const activeHandler = () => {
    if (item.isActive) {
      draftProduct({
        product_id: item._id as string,
        callback: () => {
          toast({
            title: 'Successfully drafted your product',
            description: item.productName,
            position: 'top-right',
            isClosable: true
          })
          router.replace(router.asPath)
        }
      })
    } else {
      activateProduct({
        product_id: item._id as string,
        callback: () => {
          toast({
            title: 'Successfully activated your product',
            description: item.productName,
            position: 'top-right',
            isClosable: true
          })
          router.replace(router.asPath)
        }
      })
    }
  }

  return (
    <Box
      key={item.productName}
      mt={5}
      p={5}
      border={'1px'}
      borderRadius={'lg'}
      borderColor={useColorModeValue('gray', 'gray')}
      boxShadow={useColorModeValue('xl', 'dark-lg')}
    >
      <>{error == "string" && <ErrorAlert title={error as string} clearHandler={clearProductError} />}</>
      <Box pos={'relative'} w={'100%'} h={'200px'}>
        <Image
          src={loadImage(item?.image)}
          alt={item?.productName as string}
          fill
          style={{ objectFit: 'contain', borderRadius: '10px' }}
        />
      </Box>
      <Divider my={6} borderColor={useColorModeValue('blackAlpha.600', '')} />
      <Stack spacing={5}>
        <Heading>{item.productName}</Heading>
        <Text fontWeight={'bold'} color={'facebook.500'}>
          Status :{'  '}
          <Box as='span' color={item.isActive ? 'green.500' : 'red.500'}>
            {item.isActive ? 'Active' : 'Draft'}
          </Box>
        </Text>
        <Button
          colorScheme='facebook'
          h={12}
          variant={'outline'}
          rightIcon={<TbActivityHeartbeat />}
          isLoading={isLoading}
          loadingText={`${t('loading', { ns: 'global' })}`}
          onClick={activeHandler}

        >
          {!item.isActive ? 'Activate' : 'Draft'}
        </Button>
      </Stack>
    </Box>
  )
}

export default AgentDraftProductCard
