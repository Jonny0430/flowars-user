import React from 'react'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { StatisticsPageComponent } from 'src/page-component'

const Statistics = () => {

    return (
        <Seo
            metaTitle={
                `Pet-Store | Statistics`
            }
            metaDescription={
                `Pet-Store | Statistics`
            }
        >
            <StatisticsPageComponent />
        </Seo>
    )

}

export default withLayout(Statistics)
