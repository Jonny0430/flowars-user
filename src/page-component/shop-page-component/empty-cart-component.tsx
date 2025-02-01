import { Card, CardBody, Center, Icon, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TiShoppingCart } from "react-icons/ti";

const EmptyCartComponent = () => {
    const { t } = useTranslation()

    return (
        <Center h="50vh">
            <Card boxShadow="lg" borderRadius="md" p={4}>
                <CardBody w={{ base: "90%", md: "60vh" }} textAlign="center">
                    <Stack spacing={4}>
                        <Text fontSize="xl" fontWeight="bold">
                            {t('empty', { ns: "products" })}
                        </Text>
                        <Text fontSize="md" color="gray.500">
                            {t("explore", { ns: 'products' })}
                        </Text>
                        <Center>
                            <Icon as={TiShoppingCart} fontSize={{ base: "100px", md: "150px" }} />
                        </Center>
                    </Stack>
                </CardBody>
            </Card>
        </Center>
    );
};

export default EmptyCartComponent;
