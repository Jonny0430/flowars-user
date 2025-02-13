import React from 'react'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { StatisticsPageComponent } from 'src/page-component'

const Statistics = () => {

    return (
        <Seo
            metaTitle={
                `Florist | Statistics`
            }
            metaDescription={
                `Florist | Statistics`
            }
        >
            <StatisticsPageComponent />
        </Seo>
    )

}

export default withLayout(Statistics)
