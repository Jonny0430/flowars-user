import React from 'react'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { SuccessPageComponent } from 'src/page-component'

const SuccessPage = () => {
    return (
        <Seo metaTitle={`Pet-Store product | Success `}>
            <SuccessPageComponent />
        </Seo>
    )

}

export default withLayout(SuccessPage)


