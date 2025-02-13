
import { NextPage } from 'next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { BecomeAgentPageComponent } from 'src/page-component'

const BecomeAgent: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Seo
            metaTitle={
                `Florist | ${t('agent', { ns: 'seo' })}` || 'PetStore | Become an agent'
            }
        >
            <BecomeAgentPageComponent />
        </Seo>
    )
}

export default withLayout(BecomeAgent)
