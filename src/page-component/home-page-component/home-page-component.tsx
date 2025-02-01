import { Stack } from "@chakra-ui/react"
import { Agent, Articles, BooksHomePageComponent, Categories, ChatModal, Hero, HowItWorks, Newsletter, PopularProducts, Sponsorship, StatsWithIcons, Testimonials } from "src/components"



function HomePageComponent() {
    return (
        <Stack spacing={10}>
            <Hero />
            <StatsWithIcons />
            <Categories />
            <PopularProducts />
            <HowItWorks />
            <Agent />
            <Testimonials />
            <Articles />
            <Newsletter />
            <BooksHomePageComponent />
            <Sponsorship />
            <ChatModal />
        </Stack>
    )
}

export default HomePageComponent
