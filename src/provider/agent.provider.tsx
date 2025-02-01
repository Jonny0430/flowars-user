import { useActions } from "hooks/useActions";
import { FC, ReactNode, useEffect } from "react";
import { ProductTypes } from "src/interface/product.interface";

interface Props {
    children: ReactNode;
    products: ProductTypes[],
    product: ProductTypes,

}

const AgentProvider: FC<Props> = ({ children, products, product }): JSX.Element => {
    const { agentAllProducts, agentDetailedProduct } = useActions()

    useEffect(() => {
        if (products?.length) {
            agentAllProducts(products)
        }

        if (product) {
            agentDetailedProduct(product)
        }
    }, [products, product])

    return <>{children}</>
}

export default AgentProvider