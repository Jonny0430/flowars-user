import { Icon } from '@chakra-ui/react';
import { IconProp } from '../icons.props';

const PetStoreIcon = ({ ...props }: IconProp): JSX.Element => {
    return (
        <Icon
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="24" cy="24" r="23" fill="#FFECB3" stroke="#FFB74D" strokeWidth="2" />
            <path
                d="M24 36C18 32 14 28 14 22C14 17.58 17.58 14 22 14C24 14 26 15 27 16C28 15 30 14 32 14C36.42 14 40 17.58 40 22C40 28 36 32 30 36C28.68 37 26.32 37 24 36Z"
                fill="#FF7043"
            />
            <circle cx="20" cy="21" r="2.5" fill="#FFFFFF" />
            <circle cx="28" cy="21" r="2.5" fill="#FFFFFF" />
            <circle cx="24" cy="26" r="3" fill="#FFFFFF" />
            <path
                d="M17 29C18 30 19 30 21 28"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M31 29C30 30 29 30 27 28"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </Icon>
    );
};

export default PetStoreIcon;
