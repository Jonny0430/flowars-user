import SectionTitle from "../section-title/section-title"
import Carousel from "react-multi-carousel";
import { courseCarousel } from "src/config/carousel";
import { useTranslation } from "react-i18next";
import PopularProductsCard from "../popular-products-card/popular-products-card";
import { useTypedSelector } from "hooks/useTypedSelector";


function PopularProducts() {
    const { t } = useTranslation()
    const { products } = useTypedSelector(state => state.product)

    return (
        <>
            <SectionTitle  mt={4} textAlign={'center'} title={t('popular_products_title', { ns: 'home' })} subtitle={t('popular_products_description', { ns: 'home' })} />
            <Carousel
                responsive={courseCarousel}
                arrows={true}
                showDots={false}
                autoPlay={true}
                autoPlaySpeed={5000}
                infinite
            >
                {products.map(item => (
                    <PopularProductsCard item={item} key={item.productName} />
                ))}
            </Carousel>
        </>
    )
}

export default PopularProducts

