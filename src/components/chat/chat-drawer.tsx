import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    VStack,
    Text,
    Box,
    Flex,
    Avatar,
    Badge,
} from '@chakra-ui/react';
import { useSocket } from 'src/context/SocketContext';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

interface Message {
    id?: string;
    content: string;
    senderId: string;
    senderName: string;
    avatar: string;
    timestamp: string;
}

const ChatModal = () => {
    const { user } = useTypedSelector((state) => state.user);
    const socket = useSocket();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const userId = user?.id;
    const {t} = useTranslation()

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (isOpen) setUnreadCount(0);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                content: message,
                senderName: user?.fullName || 'Anonymous', // Foydalanuvchi ismi
                senderId: user?.id || '',                  // Foydalanuvchi ID-si
                avatar: user?.avatar || '', // Foydalanuvchi rasmi
            };
    
            // Diagnostika
            console.log('Sending message:', newMessage);
    
            socket.emit('send_message', newMessage);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive_message', (message: Message) => {
            setMessages((prev) => [message, ...prev]);
            if (!isOpen) setUnreadCount((prev) => prev + 1);
        });

        socket.on('previous_messages', (previousMessages: Message[]) => {
            setMessages(previousMessages.reverse());
        });

        return () => {
            socket.off('receive_message');
            socket.off('previous_messages');
        };
    }, [socket, isOpen]);

    return (
        <>
            <Button
                position="fixed"
                mb={"50px"}
                bottom="40px"
                right="16px"
                colorScheme="teal"
                size="sm"
                borderRadius="full"
                shadow="md"
                onClick={toggleModal}
            >
                Chat {unreadCount > 0 && <Badge ml="2">{unreadCount}</Badge>}
            </Button>

            <Modal isOpen={isOpen} onClose={toggleModal} size="xs">
                <ModalOverlay />
                <ModalContent width="300px" height="500px" maxHeight="500px">
                    <ModalHeader fontSize="md" bg="teal.500" color="white" textAlign="center">
                        Chat Room
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody p={4} overflowY="auto">
                        <VStack spacing={4} align="stretch">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <Flex
                                        key={index}
                                        p={3}
                                        bg={msg.senderId === userId ? 'blue.50' : 'gray.50'}
                                        borderRadius="md"
                                        align="center"
                                    >
                                        <Avatar size="sm" src={msg.avatar} />
                                        <Box ml={3}>
                                            <Text fontSize="sm" fontWeight="bold">
                                                {msg.senderName}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                {new Date(msg.timestamp).toLocaleString()}
                                            </Text>
                                            <Text mt={1} fontSize="sm">
                                                {msg.content}
                                            </Text>
                                        </Box>
                                    </Flex>
                                ))
                            ) : (
                                <Text fontSize="sm" color="red.500" textAlign="center">
                                    {/* No messages yet. */}
                                    {t("chat", {ns: 'global'})}
                                </Text>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Flex w="full" gap={2}>
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message"
                                size="sm"
                                borderRadius="md"
                                disabled
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={sendMessage}
                                // disabled={!message.trim()}
                                disabled

                            >
                                Send
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChatModal;
