import React from 'react'
import Header from './header'
import { Box, Card, CardBody, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'




const DashboardPageComponent = () => {
    const { product } = useTypedSelector(state => state.product)



    return (
        <>
            <Header />
            <Box
                mt={'14vh'}
                
            >
            
            </Box>
        </>
    )
}

export default DashboardPageComponent
