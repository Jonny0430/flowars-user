import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Input, Radio, RadioGroup, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactStars from 'react-stars'
import { AllProductsCard } from 'src/components'
import SectionTitle from 'src/components/section-title/section-title'
import { productsFilter } from 'src/config/constants'
import { FilterItemProps, FilterProductType } from './products-page-component.props'



const productsPageComponent = () => {
    const [filter, setFilter] = useState<FilterProductType>({ id: '', category: '', rating: 0, location: '' })
    const [isLoading] = useState<boolean>(false)
    const { t } = useTranslation()
    const borderColorValue = useColorModeValue('gray.200', 'gray.700')
    const { products } = useTypedSelector(state => state.product)
    // const [allProducts, setAllProducts] = useState<ProductTypes[]>(products)

    // useEffect(() => {
    //     setAllProducts(() => {
    //         if (filter.id === "category" && filter.category) {


    //             return products.filter(c =>
    //                 c.category.toLowerCase() === filter.category.toLowerCase()
    //             );
    //         }
    //         if (filter.id === "rating" && filter.category) {
    //             return products.filter(c =>
    //                 c.reviewAvg >= Number(filter.category)
    //             );
    //         }
    //         if (filter.id === "location" && filter.category) {
    //             return products.filter(c =>
    //                 c.location.toLowerCase() === filter.category.toLowerCase()
    //             );
    //         }

    //         return products;
    //     });
    // }, [filter, products]);

    const filteredData = useCallback(() => {
        return products.filter(product => {
            if (filter.id === 'category' && filter.category) {
                return product.category === filter.category;
            }
            if (filter.id === 'price' && filter.rating && filter.rating) {
                return product.price >= filter.rating && product.price <= filter.rating;
            }
            if (filter.id === 'rating' && filter.category) {
                return String(product.reviewAvg) >= filter.category;
            }
            if (filter.id === 'location' && filter.category) {
                return product.location === filter.category;
            }

            return products;
        });
    }, [filter, products]);

    const filteredProducts = filteredData();

    return (
        <>
            <SectionTitle pt={5} textAlign={{ base: 'center' }} title={t('title', { ns: 'products' })} subtitle={t('description', { ns: 'products' })} />

            <Box pos={'relative'} mt={5}>
                <Input
                    h={14}
                    w={'full'}
                    bg={borderColorValue}
                    color={'gray.900'}
                    placeholder={t('search_input_placeholder', { ns: "products" }) || ''}
                    _placeholder={{ color: 'gray.500' }}
                />
                <Button pos={'absolute'} right={2} top={2} bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }} color={useColorModeValue('', 'black')} zIndex={999}>
                    {t('search_input_btn', { ns: "products" })}
                </Button>
                <Flex mt={5} gap={5} direction={{ base: 'column', md: 'row' }}>
                    <Box w={{ base: '100%', md: '30%' }} h={'fit-content'} p={5} border={'1px'} borderRadius={'lg'} borderColor={borderColorValue}>
                        {productsFilter.map((item, index) => <FilterItem item={item} index={index} key={item.id} setFilter={setFilter} />)}
                    </Box>
                    <Box w={{ base: '100%', md: '70%' }}>
                        {isLoading ? (
                            <Flex h={'60vh'} justify={'center'} align={'center'}>
                                <Spinner />
                            </Flex>
                        ) : (
                            <>
                                {filteredProducts.map(item => (
                                    <AllProductsCard key={item.productName} product={item} />
                                ))}
                            </>
                        )}
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default productsPageComponent


const FilterItem = ({ item, index, setFilter }: { item: FilterItemProps; index: number, setFilter: Dispatch<SetStateAction<FilterProductType>> }) => {
    const { t } = useTranslation()

    const renderFilterItem = () => (
        <>
            {item.categoryList.map(c => (
                <Radio
                    key={c.id}
                    value={c.id}
                    colorScheme={'facebook'}
                    onChange={() => setFilter({ category: c.id, id: item.id, rating: 0, location: '' })}
                >
                    <Flex gap={2}>
                        {item.id === 'rating' && <ReactStars value={Number(c.id)} edit={false} color2={'#e59819'} />}
                        {t(c.name, { ns: 'products' })}
                    </Flex>
                </Radio>
            ))}
        </>
    )

    return (
        <Accordion key={item.id} allowToggle defaultIndex={index === 0 ? 0 : index}>
            <AccordionItem borderTop={'none'}>
                <AccordionButton>
                    <Text fontSize={'xl'} flex={1} textAlign={'left'}>
                        {t(item.title, { ns: 'products' })}
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <RadioGroup>
                        <Stack>
                            {renderFilterItem()}
                        </Stack>
                    </RadioGroup>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}