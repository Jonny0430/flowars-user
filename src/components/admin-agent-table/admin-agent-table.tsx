import { Button, ButtonGroup, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineFieldNumber, AiOutlineReload } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { AdminAgentTableProps } from "./admin-agent-table.props";



const AdminAgentTable: FC<AdminAgentTableProps> = ({ agents, approved }): JSX.Element => {


    const { approveAgent, deleteAgent } = useActions()
    const { isLoading } = useTypedSelector(state => state.admin)
    const router = useRouter()
    const toast = useToast()

    const approveAgentHandler = (agent_id: string) => {
        approveAgent({
            agent_id,
            callback: () => {
                router.replace(router.asPath)
                toast({
                    title: 'Successfully approve',
                    status: 'success',
                    position: 'top-right',
                    isClosable: true
                })
            }
        })
    }


    const deleteAgentHandler = (agent_id: string) => {
        deleteAgent({
            agent_id,
            callback: () => {
                router.replace(router.asPath)
                toast({
                    title: 'Successfully deleted',
                    status: 'info',
                    position: 'top-right',
                    isClosable: true
                })
            }
        })
    }

    return (
        <>
            {/* <>{error && <ErrorAlert title={error as string} clearHandler={clearAdminError} />}</> */}
            <TableContainer>
                <Table variant={'striped'} colorScheme="teal">
                    <TableCaption>
                        <Button colorScheme="facebook" variant={'outline'} rightIcon={<AiOutlineReload />}>
                            more..
                        </Button>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>
                                <AiOutlineFieldNumber fontSize={20} />
                            </Th>
                            <Th>Email</Th>
                            <Th>FullName</Th>
                            <Th>Total Product</Th>
                            <Th>Social media</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {agents.map((agent, idx) => (
                            <Tr key={idx}>
                                <Td>{idx + 1}</Td>
                                <Td>{agent.author.email}</Td>
                                <Td>{agent.author.fullName}</Td>
                                <Td>{agent._id}</Td>
                                <Td>{agent.socialMedia}</Td>
                                <Td>
                                    <ButtonGroup variant={'solid'} color={'black'}
                                        bg={'#FFC196'} _hover={{ bg: '#FF9F6D' }}>
                                        {approved ? (
                                            <Button
                                                size={'sm'}
                                                rightIcon={<TiDeleteOutline fontSize={'24px'} />}
                                                colorScheme="red"
                                                onClick={() => deleteAgentHandler(agent._id)}
                                                isLoading={isLoading}
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            <Button
                                                size={'sm'}
                                                rightIcon={<FaCirclePlus fontSize={'20px'} />}
                                                colorScheme="facebook"
                                                isLoading={isLoading}
                                                onClick={() => approveAgentHandler(agent._id)}
                                            >
                                                Approve
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminAgentTable
