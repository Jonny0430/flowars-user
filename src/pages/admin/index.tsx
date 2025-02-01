import { GetServerSideProps } from 'next'
import React from 'react'
import { withAdminLayout } from 'src/layouts/adminLayout'
import { AuthService } from 'src/service/auth.service'

const AdminPage = () => {
    return (
        <div>
            AdminPage
        </div>
    )
}

export default withAdminLayout(AdminPage)


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
      }
  
      // Перенаправление на страницу с клиентами, если проверка успешна
      return {
        redirect: {
          destination: `/admin/clients`,
          permanent: false,
        },
      };
    } catch (error) {
      console.error('Error checking admin status:', error);
  
      // В случае ошибки перенаправляем на домашнюю страницу
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
  