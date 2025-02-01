import { Box, Button, Container, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";
import { agentSidebar, language } from "src/config/constants";
import { SideBarProps } from "./sidebar.props";


const AgentSidebar: FC<SideBarProps> = ({ toggle }): JSX.Element => {
    const router = useRouter()
    const { i18n } = useTranslation()

    const onLanguage = (lng: string) => {
        router.replace(router.asPath)
        i18n.changeLanguage(lng)
    }

    return (
        <Box
            zIndex={1001}
            w={{ base: 'full', lg: '300px' }}
            h={'90vh'}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            borderRight={'1px'}
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            pos={'fixed'}
            left={{ base: toggle ? 0 : '-100%', lg: 0 }}
            top={'10vh'}
            css={{
                '&::-webkit-scrollbar': { width: '1px' },
                '&::-webkit-scrollbar-track': { width: '1px' },
                '&::-webkit-scrollbar-thumb': { background: 'transparent' },
            }}
            transition={'all .4s ease'}
        >
            <Container maxW={'container.lg'}>
                <Menu placement="bottom">
                    <MenuButton
                        mt={4}
                        w={'full'}
                        as={Button}
                        rightIcon={<TbWorld />}
                        textTransform={'capitalize'}
                        colorScheme={"gray"}
                        variant={'outline'}
                        display={{ base: 'block', md: 'none' }}
                    >
                        {i18n.resolvedLanguage}
                    </MenuButton>
                    <MenuList p={0}>
                        {language.map(item => (
                            <MenuItem
                                key={item.lng}
                                onClick={() => onLanguage(item.lng)}
                                icon={<item.icon />}
                                backgroundColor={i18n.resolvedLanguage === item.lng ? 'facebook.500' : ''}
                            >
                                {item.nativeLng}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Text fontSize={'lg'} mt={10}>
                    Agent admin page
                </Text>
                {agentSidebar.map((item, index) => {
                    const active = `/agent/${router.pathname.split('/')[2]}` == `/agent/${item.route}`;

                    return (
                        <Link href={`/agent/${item.route}`} key={index}>
                            <Button
                                bgColor={active ? "#FFC196" : ''}  color={active ? 'black' : ''}
                                w={'full'}
                                h={14}
                                mt={3}
                                justifyContent={'flex-start'}
                                colorScheme="facebook"
                                variant={active ? 'solid' : 'ghost'}
                            >
                                <HStack gap={2}>
                                    <Icon as={item.icon} />
                                    <Text>{item.name}</Text>
                                </HStack>
                            </Button>
                        </Link>
                    )
                })}
            </Container>
        </Box>
    )

}

export default AgentSidebar