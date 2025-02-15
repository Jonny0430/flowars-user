import axios from 'axios'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { API_URL } from 'src/config/api.config'
import { CardType } from 'src/interface/paymentCart.interface'
import { withLayout } from 'src/layouts/layout'
import Seo from 'src/layouts/seo/seo'
import { CheckoutPageComponent, EmptyCartComponent } from 'src/page-component'

const CheckoutPage: NextPage<CheckoutPageProps> = ({ cards }) => {
  const { books, products } = useTypedSelector(state => state.cart)

  const checkCard = () => books.length || products.length

  return (
    <Seo metaTitle={`Florist product | Checkout `}>
      {checkCard() ? <CheckoutPageComponent cards={cards} /> : <EmptyCartComponent />}
    </Seo>
  )
}

export default withLayout(CheckoutPage)



export const getServerSideProps: GetServerSideProps<CheckoutPageProps> = async ({ req }) => {
  // Check if the refresh token exists in cookies
  if (!req.cookies.refresh) {
    return {
      redirect: {
        destination: '/auth',
        permanent: true
      }
    };
  }

  try {
    // Make the API request to get the saved cards
    const { data } = await axios.get(`${API_URL}/customer/saved-cards`, {
      headers: {
        Authorization: `Bearer ${req.cookies.refresh}`
      }
    });

    return {
      props: {
        cards: data || [] // Fallback to an empty array if no cards are returned
      }
    };
  } catch (error) {
    console.error('Error fetching saved cards:', error);

    // Handle the error by redirecting to an error page or showing a default state
    return {
      redirect: {
        destination: '/error', // Customize this to your actual error page path
        permanent: false
      }
    };
  }
};

interface CheckoutPageProps extends Record<string, unknown> {
  cards: CardType[];
}
