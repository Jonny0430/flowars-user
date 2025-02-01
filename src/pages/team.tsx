import { withLayout } from "src/layouts/layout"
import Seo from "src/layouts/seo/seo"
import { TeamPageComponent } from "src/page-component"

const Team = () => {
    return (
        <Seo
            metaTitle={
                `Pet-Store | Team`
            }
            metaDescription={
                `Pet-Store | Team`
            }
        >
            <TeamPageComponent />
        </Seo>
    )

}

export default withLayout(Team)
