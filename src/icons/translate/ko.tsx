import { Icon } from '@chakra-ui/react';
import { IconProp } from '../icons.props';

const KorIcons = ({ ...props }: IconProp): JSX.Element => (
    <Icon
        xmlns='http://www.w3.org/2000/svg'
        width='30'
        zoomAndPan='magnify'
        viewBox='0 0 37.5 37.499999'
        height='30'
        preserveAspectRatio='xMidYMid meet'
        version='1.0'
        {...props}
    >
        <image
            href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1024px-Flag_of_South_Korea.svg.png"
            x="0"
            y="0"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
        />
        
    </Icon>
);

export default KorIcons;
