import { NextPage } from "next"
import { withLayout } from "src/layouts/layout"
import Seo from "src/layouts/seo/seo"
import { CartPageComponent } from "src/page-component"

const CartPage: NextPage = () => {
    return (
        <Seo metaTitle={`Florist product | Cart`}>
            <CartPageComponent />
        </Seo>
    )
}

export default withLayout(CartPage)
