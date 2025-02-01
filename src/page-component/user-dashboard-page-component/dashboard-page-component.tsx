import { Card, CardBody, Center, Flex, HStack, Spinner, Tab, TabList, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useState } from 'react'
import { CardType } from 'src/interface/paymentCart.interface'
import { ProductTypes } from 'src/interface/product.interface'
import { TransactionsType } from 'src/interface/user.interface'
import { AuthService } from 'src/service/auth.service'
import Account from './account'
import DangerZone from './danger-zone'
import MyProducts from './my-products'
import SavedCards from './saved-cards'
import Settings from './settings'
import Transactions from './transactions'
import { useTranslation } from 'react-i18next'


const UserDashboardPageComponent = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const { user } = useTypedSelector(state => state.user)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactions, setTransactions] = useState<
        TransactionsType[]
    >([]);
    const [myProducts, setMyProducts] = useState<ProductTypes[]>([])
    const [savedCards, setSavedCards] = useState<CardType[]>([])
    const { t } = useTranslation()

    const tabHandler = async (idx: number) => {
        setIsLoading(true)
        setTabIndex(idx)

        try {
            if (idx == 2 && !transactions.length) {
                const response = await AuthService.getTransactions()
                setTransactions(response)
            } else if (idx == 3 && !myProducts.length) {
                const response = await AuthService.getMyProducts()
                setMyProducts(response)
            } else if (idx == 4 && !savedCards.length) {
                const response = await AuthService.getSavedCards()
                setSavedCards(response)
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }




    return (
        <>
            <Card>
                <CardBody>
                    <Tabs
                        isFitted
                        variant={'enclosed'}
                        colorScheme={'facebook'}
                        orientation={'horizontal'}
                        onChange={tabHandler}
                        defaultValue={tabIndex}
                    >
                        <TabList mb={'1em'} h={'40px'}>
                            <Tab>{t('account', { ns: "global" })}</Tab>
                            <Tab>{t('settings', { ns: "global" })}</Tab>
                            <Tab>{t('transactions', { ns: "global" })}</Tab>
                            <Tab>{t('my_Products', { ns: "global" })}</Tab>
                            <Tab>{t('saved_Cards', { ns: "global" })}</Tab>
                            <Tab>{t('danger_Zone', { ns: "global" })}</Tab>
                        </TabList>
                        <TabPanels px={10}>
                            {isLoading ? (
                                <Center>
                                    <Spinner />
                                </Center>
                            ) : (
                                <>
                                    {tabIndex === 0 && user && <Account />}
                                    {tabIndex === 1 && <Settings />}
                                    {tabIndex === 2 && (<Transactions transactions={transactions} />)}
                                    {tabIndex === 3 && (<MyProducts myProducts={myProducts} />)}
                                    {tabIndex === 4 && (<SavedCards savedCards={savedCards} />)}
                                    {tabIndex === 5 && <DangerZone />}
                                </>
                            )}
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </>
    )
}

export default UserDashboardPageComponent 
