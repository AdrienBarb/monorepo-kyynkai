export const apiRouter = {
  me: '/api/me',
  forgotPassword: '/api/me/password/request',
  conversationsMessagesPrice: '/api/settings/conversations/messages-price',
  identityVerifications: '/api/admin/identity-verifications',
  confirmOrReject: '/api/admin/identity-verifications/confirm-or-reject',
  contentMonitoring: '/api/admin/content-monitoring',
  moderateContent: (id: string) =>
    `/api/admin/content-monitoring/${id}/moderate`,
};
