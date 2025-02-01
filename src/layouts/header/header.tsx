import { Avatar, Badge, Box, Button, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useActions } from 'hooks/useActions'
import { useAuth } from 'hooks/useAuth'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { AiOutlineDashboard, AiOutlineLogin } from 'react-icons/ai'
import { BiMenuAltLeft, BiUserCircle } from 'react-icons/bi'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoIosLogOut, IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineContactSupport } from 'react-icons/md'
import { PiShoppingBagOpenDuotone } from "react-icons/pi"
import { RiAdminFill } from 'react-icons/ri'
import { TbWorld } from 'react-icons/tb'
import { language } from 'src/config/constants'
import { DarkLogo, LightLogo } from 'src/icons'
import { HeaderProps } from './header.props'
import { loadImage } from 'src/helpers/image.helper'
import { keyframes } from '@emotion/react'
import { IoNotificationsCircle } from 'react-icons/io5'



function Header({ onToggle }: HeaderProps) {
    const { toggleColorMode, colorMode } = useColorMode()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const { user } = useAuth()
    const { logout } = useActions()
    const { products, books } = useTypedSelector(state => state.cart)

    const onLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    const logoutHandler = () => {
        logout()
        router.push('/auth')
    }

    const pulse = keyframes`
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    `;

    // Animatsiya objekti
    const pulseAnimation = `${pulse} 1.5s infinite`;

    return (
        <Box
            zIndex={1400}
            w={{ base: '100%', lg: 'full' }}
            h={'10vh'}
            px={10}
            borderBottom={'1px'}
            pos={'fixed'}
            top={0}
            left={0}
            right={0}
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <Flex h={'full'} justify={'space-between'} align={'center'}>
                <HStack>
                    <Icon as={BiMenuAltLeft} onClick={onToggle} w={6} h={6} cursor={'pointer'} />
                    <HStack display={{ base: 'none', lg: 'block' }}>
                        <Link
                            href={'/'}>
                            {colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
                        </Link>
                    </HStack>
                </HStack>
                <HStack>
                    <IconButton
                        aria-label='support'
                        icon={<MdOutlineContactSupport />}
                        colorScheme={'facebook'}
                        variant={'ghost'}
                        onClick={() => router.push('/faq')}
                    />
                    <Box pos={'relative'}>
                        <IconButton
                            aria-label='cart'
                            onClick={() => router.push('/shop/cart')}
                            icon={<PiShoppingBagOpenDuotone />}
                            colorScheme='facebook'
                            variant={'outline'}
                        />
                        {[...products, ...books].length ? (
                            <Badge
                                pos={'absolute'}
                                backgroundColor={'red.500'}
                                top={-2}
                                left={-3}
                                colorScheme='facebook'
                                px={2}
                                py={1}
                                borderRadius={'50%'}
                            >
                                {[...products, ...books].length}
                            </Badge>
                        ) : null}
                    </Box>
                    <Menu placement='bottom'>
                        <MenuButton
                            as={Button}
                            rightIcon={<TbWorld />}
                            colorScheme={'facebook'}
                            variant={'outline'}
                            textTransform={'capitalize'}
                        >
                            {i18n.resolvedLanguage}
                        </MenuButton>
                        <MenuList p={0}>
                            {language.map(item => (
                                <MenuItem key={item.lng} onClick={() => onLanguage(item.lng)} icon={<item.icon />}
                                    backgroundColor={i18n.resolvedLanguage === item.lng ? 'facebook.500' : ''}
                                >
                                    {item.nativeLng}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    <Box pos="relative">
                        <Popover placement="bottom" isLazy>
                            <PopoverTrigger>
                                <IconButton
                                    aria-label="notification"
                                    icon={<IoMdNotificationsOutline />}
                                    colorScheme="facebook"
                                    variant="outline"
                                />
                            </PopoverTrigger>

                            {/* Badge with animation */}
                            <Badge
                                pos="absolute"
                                backgroundColor="red.500"
                                top="-2"
                                right="5"
                                color="white"
                                px={2}
                                py={1}
                                borderRadius="full"
                                fontSize="8px"
                                animation={pulseAnimation} // Animatsiyani qo'shish
                            >
                                2
                            </Badge>

                            <PopoverContent _focus={{ boxShadow: 'none' }}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader fontWeight="bold">Notifications</PopoverHeader>
                                <PopoverBody w="full">
                                    <Tabs isLazy colorScheme="green">
                                        <TabList>
                                            <Tab
                                                _focus={{ boxShadow: 'none' }}
                                                fontSize="xs"
                                                fontWeight="bold"
                                                w="50%"
                                            >
                                                Access
                                            </Tab>
                                            <Tab
                                                _focus={{ boxShadow: 'none' }}
                                                fontSize="xs"
                                                fontWeight="bold"
                                                w="30%"
                                            >
                                                Services
                                            </Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                "Welcome to Our Amazing World!"
                                                Get ready to access everything your new furry friend might need. Our mission is to provide you and your pet with the ultimate comfort and care!
                                            </TabPanel>
                                            <TabPanel>
                                                "Special Services for Your Beloved Pet!"
                                                Begin exploring our tailor-made services designed for you and your furry companion. Love and care are at the heart of everything we offer.
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>

                    <IconButton
                        aria-label='color-mode'
                        onClick={toggleColorMode}
                        icon={colorMode == 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
                        colorScheme={'facebook'}
                        variant={'outline'}
                    />
                    {user ? (
                        <Menu>
                            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} >
                                <Avatar backgroundColor={'facebook.500'} src={loadImage(user?.avatar)} />
                            </MenuButton>
                            <MenuList p={0} m={0}>
                                {user.role === 'AGENT' && (
                                    <MenuItem
                                        h={14}
                                        onClick={() => router.push('/agent')}
                                        fontWeight={'bold'}
                                        icon={<RiAdminFill fontSize={17} />}
                                    >
                                        {t('instructor_admin', { ns: 'agent' })}
                                    </MenuItem>

                                )}
                                {user.role === 'ADMIN' && (
                                    <MenuItem
                                        h={14}
                                        onClick={() => router.push('/admin/products')}
                                        fontWeight={'bold'}
                                        icon={<RiAdminFill fontSize={17} />}
                                    >
                                        {t('ADMIN', { ns: 'instructor' })}
                                    </MenuItem>

                                )}
                                <MenuItem
                                    h={14}
                                    onClick={() => router.push('/dashboard')}
                                    fontWeight={'bold'}
                                    icon={<AiOutlineDashboard fontSize={17} />}
                                >
                                    {t('dashboar', { ns: 'agent' })}
                                </MenuItem>
                                <MenuItem
                                    h={14}
                                    onClick={logoutHandler}
                                    fontWeight={'bold'}
                                    icon={<IoIosLogOut fontSize={17} />}
                                >
                                     {t('logout', { ns: 'agent' })}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <Button
                                display={{ base: 'none', md: 'flex' }}
                                rightIcon={<BiUserCircle />} onClick={() => router.push('/auth')}
                                bgColor={'#FFC196'}
                                color={"black"}
                            >
                                {t("login", { ns: 'layout' })}
                            </Button>
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                aria-label='login'
                                onClick={() => router.push('/auth')}
                                icon={<AiOutlineLogin />}
                                colorScheme={'facebook'}
                                variant={'outline'}
                            />
                        </>
                    )}
                </HStack>
            </Flex>
        </Box>
    )
}

export default Header
