import { Grid } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React from 'react'
import { AgentEditProductCard } from 'src/components'
import SectionTitle from 'src/components/section-title/section-title'


const EditProductPageComponent = () => {
        const {products} = useTypedSelector(state=>state.agent)


  return (
   <>
        <SectionTitle 
            title='Edit product'
            subtitle='Managing products and creating catalogs for your pet-related offerings'
        />
        <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
            {products.map(item => (
                <AgentEditProductCard key={item.slug} item={item} />
            ))}
        </Grid>
   </>
  )
}

export default EditProductPageComponent
