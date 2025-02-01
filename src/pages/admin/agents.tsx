import { GetServerSideProps } from 'next'
import { AgentType } from 'src/interface/agent.interface'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AdminAgentsPageComponent } from 'src/page-component'
import { AdminService } from 'src/service/admin.service'
import { AuthService } from 'src/service/auth.service'

const Agents = () => {
    return <AdminAgentsPageComponent />
}

export default withAdminLayout(Agents)

export const getServerSideProps: GetServerSideProps<AgentPageType> = async ({ req }) => {
    try {
      // Проверка прав администратора
      const admin = await AuthService.checkAdmin(req.cookies.refresh);
  
      if (!admin) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }else {
        const agents = await AdminService.getAllAgents(req.cookies.refresh)

        return {
            props: { agents }
        }
    }
  
    } catch (error) {
      console.error('Error fetching agents or checking admin:', error);
  
      // Если произошла ошибка, можно вернуть пустой список агентов
      return {
        props: { agents: [] },
      };
    }
  };
  

interface AgentPageType extends Record<string, unknown> {
    agents: AgentType[];
}