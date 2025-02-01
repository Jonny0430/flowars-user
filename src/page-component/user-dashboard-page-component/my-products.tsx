import React, { FC } from 'react'
import { AllProductsCard } from 'src/components'
import { MyProductsProps } from './dashboard.props'


const MyProducts: FC<MyProductsProps> = ({ myProducts }): JSX.Element => {

    return (
        <>
            {myProducts.map(product => (
                <AllProductsCard product={product} isMyProduct={true} />
            ))}
        </>
    )
}

export default MyProducts
