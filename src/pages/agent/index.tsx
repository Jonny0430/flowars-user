import { GetServerSideProps } from 'next'
import { withAgentLayout } from 'src/layouts/agentLayout'
import { AuthService } from 'src/service/auth.service'

const AgentPage = () => {
  return (
    <div>
      AgentPage
    </div>
  )
}

export default withAgentLayout(AgentPage)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // Проверка наличия куки refresh
    if (!req.cookies.refresh) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Проверка агента с помощью AuthService
    const agent = await AuthService.checkAgent(req.cookies.refresh);

    if (!agent) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Редирект на страницу клиентов агента
    return {
      redirect: {
        destination: '/agent/clients',
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Error while checking agent:', error);

    // В случае ошибки также редиректим на главную страницу
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

