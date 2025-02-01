import { Icon } from '@chakra-ui/react';

const CatsIcon = (props): JSX.Element => (
    <Icon viewBox="0 0 48 48" {...props}>
        <circle cx="24" cy="24" r="22" fill="#E91E63" />
        <path
            d="M14 22C14 18 18 16 24 16C30 16 34 18 34 22C34 28 30 34 24 34C18 34 14 28 14 22ZM24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22Z"
            fill="#FFFFFF"
        />
    </Icon>
);
export default CatsIcon;
