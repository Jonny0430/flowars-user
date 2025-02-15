import { Box, Grid, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { SavedCardsProps } from './dashboard.props'

// const SavedCards: FC<SavedCardsProps> = ({ savedCards }): JSX.Element => {
//     return (
//         <>
//             <Grid gridTemplateColumns={{base: '1fr', lg: '1fr 1fr'}} gap={5}>
//                 {savedCards.map(card => (
//                     <Box border={'1px'} p={5} borderRadius={'lg'} key={card._id}>
//                         <Text>
//                             {card.billing_details.name} |{' '}
//                             <Box as={'span'} fontWeight={'bold'}>
//                                 {card.card.brand} {card.card.last4}
//                             </Box>
//                         </Text>
//                         <Text>EXP: {card.card.exp_month}/{card.card.exp_year}</Text>
//                     </Box>
//                 ))}
//             </Grid>
//         </>
//     )
// }

// export default SavedCards

const SavedCards: FC<SavedCardsProps> = ({ savedCards }): JSX.Element => {
    if (!savedCards || savedCards.length === 0) {
        return <Text>Loading...</Text>;  // savedCards bo'sh yoki yuklanayotgan bo'lsa, loading ko'rsatish
    }

    return (
        <>
            <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={5}>
                {savedCards.map(card => (
                    <Box border={'1px'} p={5} borderRadius={'lg'} key={card._id}>
                        <Text>
                            {card.billing_details.name} |{' '}
                            <Box as={'span'} fontWeight={'bold'}>
                                {card.card.brand} {card.card.last4}
                            </Box>
                        </Text>
                        <Text>EXP: {card.card.exp_month}/{card.card.exp_year}</Text>
                    </Box>
                ))}
            </Grid>
        </>
    );
};

export default SavedCards;
