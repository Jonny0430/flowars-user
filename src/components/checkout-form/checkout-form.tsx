import { Box, Button, Flex, Radio, RadioGroup, Stack, Text, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import {
    AddressElement,
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { StripeAddressElement } from '@stripe/stripe-js';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { useState } from 'react';
import $axios from 'src/api/axios';
import { getMailUrl, getProductUrl } from 'src/config/api.config';
import { getTotalPrice } from 'src/helpers/total-price.helper';
import { ErrorAlert } from '../error-alert/error-alert';





const CheckoutForm = ({ cards }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [radioValue, setRadioValue] = useState<string>('0')
    const { products, books } = useTypedSelector(state => state.cart);
    const toast = useToast()


    const { colorMode } = useColorMode()
    const router = useRouter()

    const cardStyles = {
        base: {
            color: colorMode === 'light' ? '#000' : '#fff',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: colorMode === 'light' ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.4)',
                opacity: '0.7',
            },
        },
        ivalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    };




    const handleSubmit = async () => {
        if (!stripe || !elements) return;
        // router.push('/shop/success');

        setIsLoading(true);
        const addressElement = elements.getElement(
            'address'
        ) as StripeAddressElement;

        const { value } = await addressElement.getValue();


        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
            throw new Error("CardNumberElement not found. Ensure the CardNumberElement is rendered.");
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement, // Pass the card element
            billing_details: {
                address: {
                    line1: value.address.line1,
                    line2: value.address.line2 || undefined, // Convert null to undefined
                    city: value.address.city,
                    state: value.address.state,
                    postal_code: value.address.postal_code,
                    country: value.address.country,
                },
                name: value.name,
            },
        });



        if (error) {
            setError(`Your payment details couldn't be verified: ${error.message}`);
            console.log(error);
            setIsLoading(false);
        } else {
            paymentIntent(paymentMethod.id)
        }
    }

    const savedCardHandler = (paymentMethod: string) => {
        setIsLoading(true)
        paymentIntent(paymentMethod)
    }

    const paymentIntent = async (paymentMethod: string) => {
        if (!stripe) return

        try {
            const { data } = await $axios.post('/payment/books', {
                price: getTotalPrice(products, books),
                paymentMethod: paymentMethod
            })
            const payload = await stripe.confirmCardPayment(data)
            if (payload.error) {
                setIsLoading(false)
                setError(
                    `Your payment details couldn't be verified: ${payload.error.message}`
                );
            } else {
                for (const book of books) {
                    toast({
                        title: book.title,
                        description: 'Successfully purchased',
                        position: 'top-right',
                    });
                    await $axios.post(`${getMailUrl('books')}/${book._id}`)
                    await $axios.put(`${getProductUrl('enroll-user')}/${book._id}`)
                }
                for (const product of products) {
                    toast({
                        title: product.productName,
                        description: 'Successfully purchased',
                        position: 'top-right',
                    })
                    await $axios.post(`${getMailUrl('books')}/${product._id}`)
                    await $axios.put(`${getProductUrl('enroll-user')}/${product._id}`)
                }
            }


            router.push('/shop/success')




        } catch (error) {
            const result = error as Error
            setIsLoading(false)
            setError(result.message)
        }






    }

    return (
        <Stack>
            {error && <ErrorAlert title={error} clearHandler={() => setError('')} />}
            <RadioGroup onChange={setRadioValue} value={radioValue}>
                <Stack direction={'column'}>
                    {cards.map((card, idx) => (
                        <Box
                            key={card._id}
                            p={4}
                            border={'1px'}
                            borderColor={useColorModeValue('rgba(0,0,0,.1', 'rgba(255,255, 255,.1)')}
                        >
                            <Flex>
                                <Radio value={`${idx}`}>{card.billing_details.name}</Radio>
                                <Text ml={2} fontWeight={'bold'} textTransform={'capitalize'}>
                                    {card.card.brand} {card.card.last4}
                                </Text>
                            </Flex>
                            <Text ml={6}>
                                Exp {card.card.exp_month} / {card.card.exp_year}
                            </Text>
                            {radioValue === `${idx}` && (
                                <Box mt={5}>
                                    <Button
                                        color={'black'}
                                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                                        w={'full'}
                                        h={'14'}
                                        isLoading={isLoading}
                                        isActive
                                        onClick={() => savedCardHandler(card._id)}
                                        colorScheme={'facebook'}
                                    >
                                        Pay now{' '}
                                        {getTotalPrice(products, books).toLocaleString('ko-Kr', {
                                            style: 'currency',
                                            currency: 'KRW',
                                        })}
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}
                    <Box
                        p={4}
                        border={'1px'}
                        borderColor={useColorModeValue('rgba(0,0,0,.1)', 'rgba(255,255,255,.1)')}
                        bg={useColorModeValue('white', '#30303d')}
                    >
                        <Radio value={`${cards.length + 1}`}>New Credit card</Radio>
                    </Box>
                </Stack>
            </RadioGroup>
            {radioValue === `${cards.length + 1}` && (
                <>
                    <Flex gap={2}>
                        <Box
                            px={2}
                            py={3}
                            w={'60%'}
                            boxShadow={
                                colorMode === 'dark'
                                    ? '0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)'
                                    : ''
                            }
                            borderRadius={'md'}
                            border={'1px'}
                            borderColor={useColorModeValue('rgba(0,0,0,.1)', 'rgba(255,255,255,.1)')}
                            bg={useColorModeValue('white', '#30303d')}
                        >
                            <CardNumberElement
                                options={{ style: cardStyles, placeholder: 'XXXX XXXX XXXX XXXX', showIcon: true }}
                            />
                        </Box>
                        <Box
                            px={2}
                            w='20%'
                            py={3}
                            boxShadow={
                                colorMode === 'dark'
                                    ? '0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)'
                                    : ''
                            }
                            borderRadius={'md'}
                            border={'1px'}
                            borderColor={useColorModeValue('rgba(0,0,0,.1)', 'rgba(255,255,255,.1)')}
                            bg={useColorModeValue('white', '#30303d')}
                        >
                            <CardExpiryElement options={{ style: cardStyles }} />
                        </Box>
                        <Box
                            px={2}
                            w='20%'
                            py={3}
                            boxShadow={
                                colorMode === 'dark'
                                    ? '0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)'
                                    : ''
                            }
                            borderRadius={'md'}
                            border={'1px'}
                            borderColor={useColorModeValue('rgba(0,0,0,.1)', 'rgba(255,255,255,.1)')}
                            bg={useColorModeValue('white', '#30303d')}
                        >
                            <CardCvcElement options={{ style: cardStyles, placeholder: 'Security code' }} />
                        </Box>
                    </Flex>
                    <AddressElement options={{ mode: 'billing' }} />
                    <Button
                        w={'full'}
                        h={'14'}
                        mt={5}
                        color={'black'}
                        bg={'#4cea54'} _hover={{ bg: '#06e911e0' }}
                        isDisabled={isLoading || !stripe || !elements}
                        isLoading={isLoading}
                        boxShadow={'xl'}
                        onClick={handleSubmit}
                    >
                        Pay now{' '}
                        {getTotalPrice(products, books).toLocaleString('ko-KR', {
                            style: 'currency',
                            currency: 'KRW',
                        })}
                    </Button>
                </>
            )}

        </Stack>
    );
}

export default CheckoutForm