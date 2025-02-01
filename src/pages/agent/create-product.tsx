import { GetServerSideProps, NextPage } from 'next'
import { withAgentLayout } from 'src/layouts/agentLayout'
import { AgentCreateProductComponent } from 'src/page-component'
import { AuthService } from 'src/service/auth.service'

const CreateProduct: NextPage = () => {
  return <AgentCreateProductComponent/>
}

export default withAgentLayout(CreateProduct)


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // Проверка прав агента
    const agent = await AuthService.checkAgent(req.cookies.refresh);

    if (!agent) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Если агент существует, возвращаем пустые props (или можете добавить дополнительные данные)
    return {
      props: {},
    };
  } catch (error) {
    console.error('Error checking agent:', error);

    // В случае ошибки перенаправляем на главную страницу
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
