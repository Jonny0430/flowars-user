import { GetServerSideProps } from 'next'
import { UserType } from 'src/interface/user.interface'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AdminUsersPageComponent } from 'src/page-component'
import { AdminService } from 'src/service/admin.service'
import { AuthService } from 'src/service/auth.service'

const Users = () => {
  return <AdminUsersPageComponent />
}

export default withAdminLayout(Users)


export const getServerSideProps: GetServerSideProps<UserPageType> = async ({ req }) => {
  try {
    // Проверка прав администратора


    if (req.cookies.refresh) {
      const admin = await AuthService.checkAdmin(req.cookies.refresh);
      if (!admin) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

    }

    // Получение списка пользователей
    const users = await AdminService.getUsers('5', req.cookies.refresh);

    return {
      props: { users },
    };
  } catch (error) {
    console.error('Error fetching users or checking admin status:', error);

    // В случае ошибки возвращаем пустой список пользователей
    return {
      props: { users: [] },
    };
  }
};


interface UserPageType extends Record<string, unknown> {
  users: UserType[]
}