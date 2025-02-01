export const API_URL = `${process.env.NEXT_PUBLIC_API_SERVICE}/api`

export const getAuthUrl = (url: string) => `/auth/${url}`
export const getMailUrl = (url: string) => `/mail/${url}`
export const getUserUrl = (url: string) => `/user/${url}`
export const getAgentUrl = (url: string) => `/agent/${url}`
export const getProductUrl = (url: string) => `/product/${url}`
export const getFileUrl = (url: string) => `/file/${url}`
export const getAdminUrl = (url: string) => `/admin/${url}`
export const getBooksUrl = (url: string) => `/books/${url}`
export const getPaymentUrl = (url: string) => `/payment/${url}`
export const getReviewUrl = (url: string) => `/review/${url}`
export const getArticlesUrl= (url: string) => `/article/${url}`
