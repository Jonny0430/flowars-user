import Carousel from "react-multi-carousel"
import SectionTitle from "../section-title/section-title"
import { sponsorshipCarousel } from "src/config/carousel"
import { trustedCompeny } from "src/config/constants"
import { Center, Icon } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

function Sponsorship() {
    const { t } = useTranslation()

    return (
        <>
            {/* <SectionTitle title="" subtitle={t('sponsor_title', { ns: 'home' })} textAlign={'center'} mb={5} /> */}

            <Carousel responsive={sponsorshipCarousel} arrows={false} showDots={false} infinite autoPlay={true} autoPlaySpeed={3000}>
                {trustedCompeny.map((item, index) => (
                    <Center>
                        {/* <Icon key={index} as={item} fontSize={50} /> */}
                    </Center>
                ))}
            </Carousel>
        </>
    )
}

export default Sponsorship


