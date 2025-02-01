import { HStack, Icon, Text } from '@chakra-ui/react';
import { MdOutlinePets } from 'react-icons/md';

const DarkLogo = (): JSX.Element => (
    <>

        <HStack fontSize={34}>
            <Text as='span' fontWeight={'bold'} display={{ base: 'none', lg: 'block' }} >Scooby</Text>
            <Icon as={MdOutlinePets} ml={2} />
        </HStack>
    </>

);
export default DarkLogo;