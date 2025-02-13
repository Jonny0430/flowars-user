import { HStack, Icon, Text } from '@chakra-ui/react';


const DarkLogo = (): JSX.Element => (
    <>

        <HStack fontSize={34}>
            <Text as='span' fontWeight={'bold'} display={{ base: 'none', lg: 'block' }} >Monrovia</Text>
        </HStack>
    </>

);
export default DarkLogo;