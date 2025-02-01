import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { UserDashboardPageComponent } from 'src/page-component'
import { AuthService } from 'src/service/auth.service'


const Dashboard: NextPage = () => {
    const { t } = useTranslation()

    return (
        <Seo
            metaTitle={
                `Pet-Store | Dashboard`
            }
            metaDescription={
                `Pet-Store | Dashboard`
            }
        >
            <UserDashboardPageComponent />
        </Seo>
    )

}

export default withLayout(Dashboard)


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const user = await AuthService.checkAllUser(req.cookies.refresh)

    // If user is not authenticated, redirect to login page
    if (!user) {
        return {
            redirect: {
                destination: '/auth', // Redirect to your login page
                permanent: false
            }
        }
    }

    // If user is authenticated, return the page props
    return {
        props: {}
    }
}



